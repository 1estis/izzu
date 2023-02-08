from __future__ import annotations
from datetime import datetime as dt, timedelta
from flask_security import UserMixin, RoleMixin
from app import db
from .history import View
from .content import Content
from .money import Payment, Subscription, Allocate, SubscriptionFragment


class Role(db.Document, RoleMixin):
  name: str = db.StringField(max_length=80, primary_key=True)
  description: str = db.StringField(max_length=255)
  
  def __unicode__(self) -> str:
    return self.name


class User(db.Document, UserMixin):
  active: bool = db.BooleanField(default=True)
  username: str = db.StringField(max_length=80, required=True)
  email: str = db.StringField(max_length=255, required=True, unique=True)
  password: str = db.StringField(max_length=255, required=True)
  roles: list = db.ListField(db.ReferenceField(Role), default=list)
  confirmed: dt | None = db.DateTimeField(default=None)
  _view_time: float = db.FloatField(required=True, default=0)
  views: list[View] = db.ListField(db.ReferenceField(View), default=list)
  subscriptions: list[Subscription] = db.EmbeddedDocumentListField(Subscription, default=list)
  allocated_subscriptions: list[Subscription] = db.EmbeddedDocumentListField(Subscription, default=list)
  pending_subscriptions: list[Subscription] = db.EmbeddedDocumentListField(Subscription, default=list)
  '''Subscriptions that are waiting for pause to end'''
  subscription_paused: bool = db.BooleanField(default=False)
  
  @property
  def view_time(self) -> timedelta:
    return timedelta(seconds=self._view_time)
  
  @view_time.setter
  def view_time(self, value: timedelta):
    '''The amount of time user can watch content'''
    self._view_time = value.total_seconds()
  
  @property
  def last_view(self) -> View | None:
    if self.views: return self.views[-1]
  
  @property
  def last_subscription(self) -> Subscription | None:
    if self.subscriptions: return self.subscriptions[-1]
    if self.allocated_subscriptions: return self.allocated_subscriptions[-1]
  
  @property
  def first_subscription(self) -> Subscription | None:
    if self.allocated_subscriptions: return self.allocated_subscriptions[0]
    if self.subscriptions: return self.subscriptions[0]
  
  @property
  def subscription_end_date(self):
    return last_subscription.end if (last_subscription := self.last_subscription) else None
  
  @property
  def next_unallocated_fragment(self) -> SubscriptionFragment | None:
    '''Next fragment of subscription that has not been allocated yet.'''
    if self.subscriptions: return None
    return self.subscriptions[0].next_unallocated_fragment()
  
  def __unicode__(self) -> str: return self.username
  
  def subscribed(self, time: dt) -> bool:
    if not (last_subscription := self.last_subscription): return False
    return last_subscription.end > time
  
  def current_subscription(self, time: dt) -> Subscription | None:
    if not self.subscribed(time): return None
    for subscription in self.subscriptions + self.allocated_subscriptions:
      if subscription.start <= time < subscription.end: return subscription
  
  def fragment(self, time: dt) -> SubscriptionFragment | None:
    '''Fragment of subscription that contains given time.'''
    if not (subscription := self.current_subscription(time)): return None
    return subscription.fragment(time)
  
  def next_atime(self, time: dt) -> dt | None:
    '''Next allocation time for this user after given time.'''
    
    if not (last_subscription := self.last_subscription): return None
    if last_subscription.final_atime() < time: return None
    
    if self.allocated_subscriptions \
      and self.allocated_subscriptions[-1].final_atime() > time:
      for subscription in self.allocated_subscriptions:
        atime = subscription.next_atime(time)
        if atime: return atime
    
    for subscription in self.subscriptions:
      atime = subscription.next_atime(time)
      if atime: return atime
  
  def previous_atime(self, time: dt) -> dt | None:
    '''Previous allocation time for this user before given time.'''
    
    if not (first_subscription := self.first_subscription): return None
    if first_subscription.start > time: return None
    
    if self.subscriptions \
      and self.subscriptions[0].start < time:
      for subscription in reversed(self.subscriptions):
        atime = subscription.previous_atime(time)
        if atime: return atime
        
    for subscription in reversed(self.allocated_subscriptions):
      atime = subscription.previous_atime(time)
      if atime: return atime
  
  def add_view(self, content: Content, view_time: timedelta, time: dt):
    last_view = self.last_view
    
    if last_view and self.next_atime(last_view.time) > time:
      last_view.duration += view_time
      last_view.save()
    else:
      view = View(
        user=self, content=content,
        time=time, view_time=view_time
      )
      self.views.append(view)
      view.save()
    
    self.view_time -= view_time
    self.save()
  
  def subscribe(self, payment: Payment, duration: timedelta, time: dt = ...):
    '''Subscribe user for given duration of time.'''
    if time is ...: time = dt.now()
    if not self.subscription_paused:
      if not (sed := self.subscription_end_date): sed = time
      self.subscriptions.append(
        Subscription(start=sed, end=sed + duration, payment=payment) \
          .calculate_fragments()
      )
    else:
      if self.pending_subscriptions: sed = self.pending_subscriptions[-1].end
      else: sed = time
      self.pending_subscriptions.append(
        Subscription(start=sed, end=sed + duration, payment=payment) \
          .calculate_fragments()
      )
    self.view_time += duration / 2
    
    # create new allocation task for this user if there is no task for this user
    if not Allocate.objects(user=self) and self.subscriptions:
      Allocate(user=self, time=self.next_unallocated_fragment.atime).save()
  
  def allocate_next_fragment(self) -> None:
    '''Allocate the next fragment of subscription to this user.'''
    if not self.subscriptions: raise Exception('No subscriptions to allocate')
    self.subscriptions[0].allocate_next_fragment()
    if not (nuf := self.subscriptions[0].next_unallocated_fragment()):
      self.allocated_subscriptions.append(self.subscriptions.pop(0))
      nuf = self.next_unallocated_fragment
    if nuf:
      Allocate(user=self, time=nuf.atime).save()
    
    self.save()
  
  def _split_subscription_list_by_time(self, subscriptions: list[Subscription], time: dt) -> tuple[list[Subscription], list[Subscription]]:
    '''Split subscription list into two lists by given time.'''
    first_list = []
    second_list = []
    for subscription in subscriptions:
      if subscription.end <= time:
        first_list.append(subscription)
      elif subscription.start >= time:
        second_list.append(subscription)
      else:
        split1, split2 = subscription.split(time)
        if split1: first_list.append(split1)
        if split2: second_list.append(split2)
    return first_list, second_list
    
  def pause_subscription(self, time: dt = ...):
    '''Pause the subscription by splitting the last subscription into two and adding the second part to pending subscriptions.'''
    if self.subscription_paused: return
    if time is ...: time = dt.now()
    if not self.subscribed(time): return
    self.subscriptions, self.pending_subscriptions = self._split_subscription_list_by_time(self.subscriptions, time)
    self.subscription_paused = True
  
  def resume_subscription(self, time: dt = ...):
    '''Resume the subscription by moving the pending subscriptions to the main subscription list.'''
    if not self.subscription_paused: return
    if time is ...: time = dt.now()
    if not (sed := self.subscription_end_date) or sed < time: sed = time
    for subscription in self.pending_subscriptions:
      subscription.move_to(sed)
    self.subscriptions += self.pending_subscriptions
    self.pending_subscriptions = []
    self.subscription_paused = False