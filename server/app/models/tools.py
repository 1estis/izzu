from __future__ import annotations
from datetime import datetime as dt
from typing import Self, Type
from mongoengine import ValidationError
from time import sleep
from re import match

from . import dicts, _types
from app import db, DLC


class Task(db.Document):
  meta = {'allow_inheritance': True, 'indexes': ['time', 'error']}
  id: int = db.SequenceField(primary_key=True)
  time: dt = db.DateTimeField(required=True)
  error: str = db.StringField(default='')
  
  def __unicode__(self) -> str:
    return f'{self.__class__.__name__} {self.time}'
  
  def do(self) -> bool:
    '''Do task. You must override this method.'''
    raise NotImplementedError
  
  @classmethod
  def next(cls) -> Type[Task] | None:
    '''Get next task in instance of subclass of Task.'''
    return cls.objects(error='').order_by('time').first()

  @classmethod
  def run_handler(cls):
    while True:
      if task := cls.next():
        
        if (time := task.time) <= (now := dt.now()):
          
          try: task.do()
          except Exception as e:
            task.error = str(e)
            task.save()
        
        else: sleep(min(60, (time - now).total_seconds()))
      
      else: sleep(60)
  
  @classmethod
  def run_handler_async(cls):
    from threading import Thread
    Thread(target=cls.run_handler, daemon=True).start()


class TitleManager:
  _title: str = db.StringField(max_length=255, required=True)
  _plural: str = db.StringField(max_length=255)
  _titles: list[_types.Title] = db.EmbeddedDocumentListField(_types.Title, unique=True, default=list)
  _plurals: list[_types.Title] = db.EmbeddedDocumentListField(_types.Title, unique=True, default=list)
  plural_title: bool = False
  
  def title(self, language: dicts.Language | None = None, default: bool = True, plural: bool = False):
    if language is None or language.code == DLC:
      if plural: return self._plural if self._plural else self._title if default else ''
      else: return self._title
    title_list = self._plurals if plural else self._titles
    t: _types.Title | None = title_list.get(language=language)
    if t: return t.title
    if not default: return ''
    if plural:
      t: _types.Title | None = self._titles.get(language=language)
      if t: return t.title
      return self._plural or self._title
    return self._title
  
  def set_title(self, language: dicts.Language | None, title: str, save: bool = True, plural: bool = False) -> Self:
    if title == '': return self.remove_title(language, save, plural) if language else self
    if language is None or language.code == DLC:
      if plural: self._plural = title
      else: self._title = title
      return self.save() if save else self
    for t in self._plurals if plural else self._titles:
      if t.language == language:
        t.title = title
        return self.save() if save else self
    if plural: self._plurals.append(_types.Title(language=language, title=title))
    else: self._titles.append(_types.Title(language=language, title=title))
    return self.save() if save else self
  
  def remove_title(self, language: dicts.Language, save: bool = True, plural: bool = False) -> Self:
    if plural and (language is None or language.code == DLC):
      self._plural = ''
      return self.save() if save else self
    for t in self._plurals if plural else self._titles:
      if t.language == language:
        if plural: self._plurals.remove(t)
        else: self._titles.remove(t)
        return self.save() if save else self
    return self


class PosterManager:
  _posters: list[_types.Poster] = db.EmbeddedDocumentListField(_types.Poster, unique=True, default=list)
  
  def poster(self, language: dicts.Language | None = None) -> str:
    ln_code = language.code if language else DLC
    for p in self._posters:
      if p.language.code == ln_code:
        return p.paths[0]
    return ''
  
  def posters(self, language: dicts.Language | None = None) -> list[str]:
    ln_code = language.code if language else DLC
    for p in self._posters:
      if p.language.code == ln_code:
        return p.paths
    return []
  
  def add_poster(self, language: dicts.Language, path: str, save: bool = True):
    for p in self._posters:
      if p.language == language:
        if path not in p.paths:
          p.paths.append(path)
        if save: self.save()
        return self
    self._posters.append(_types.Poster(language=language, paths=[path]))
    if save: self.save()
    return self
  
  def remove_poster(self, language: dicts.Language, path: str, save: bool = True):
    for p in self._posters:
      if p.language == language:
        if path in p.paths:
          p.paths.remove(path)
          if not p.paths:
            self._posters.remove(p)
          if save: self.save()
    return self


class DescriptionManager:
  _descriptions: list[_types.Description] = db.EmbeddedDocumentListField(_types.Description, unique=True, default=list)
  
  def description(self, language: dicts.Language | None = None) -> str:
    ln_code = language.code if language else DLC
    for d in self._descriptions:
      if d.language.code == ln_code:
        return d.description
    return ''
  
  def set_description(self, language: dicts.Language, description: str, save: bool = True):
    if description == '': return self.remove_description(language, save)
    for d in self._descriptions:
      if d.language == language:
        d.description = description
        if save: self.save()
        return self
    self._descriptions.append(_types.Description(language=language, description=description))
    if save: self.save()
    return self
  
  def remove_description(self, language: dicts.Language, save: bool = True):
    for d in self._descriptions:
      if d.language == language:
        self._descriptions.remove(d)
        if save: self.save()
    return self


class MediafileManager: pass


class Dictionary(db.Document, TitleManager, DescriptionManager):
  meta = {'abstract': True, 'allow_inheritance': True, 'ordering': ['code'], 'indexes': ['code']}
  active: bool = db.BooleanField(default=True, required=True)
  code: str = db.StringField(max_length=80, primary_key=True, required=True)
  _code_pattern: str = '^[a-z0-9_]{1,255}$'
  
  @classmethod
  @property
  def code_pattern(cls):
    codes = [f'^{o.code}$' for o in cls.objects]
    codes = f'(?!{"|".join(codes)})' if codes else ''
    return f'{codes}{cls._code_pattern}'
  
  @property
  def self_code_pattern(self):
    codes = [f'^{o.code}$' for o in self.__class__.objects if o != self]
    codes = f'(?!{"|".join(codes)})' if codes else ''
    return f'{codes}{self._code_pattern}'
  
  def validate(self, clean: bool = True) -> None:
    if not match(self.self_code_pattern, self.code):
      raise ValidationError(f'Invalid code: {self.code}')
    super().validate(clean)
  
  def __unicode__(self) -> str: return self.title()
  def __str__(self) -> str: return self.title()
  def __repr__(self) -> str: return f'<{self.__class__.__name__} {self.code}>'
  def __eq__(self, other: Self) -> bool: return self.__class__ == other.__class__ and self.code == other.code
  def __ne__(self, other: Self) -> bool: return not self == other