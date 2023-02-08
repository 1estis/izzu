from __future__ import annotations
from datetime import datetime as dt, date
from fractions import Fraction
from app import db
from .dicts import ContentType, Currency, Language
from .tools import DescriptionManager, MediafileManager, PosterManager, TitleManager
from ._types import CurrencyAmount

class Mediafile(db.EmbeddedDocument):
  # size: int = db.IntField(required=True)
  language: Language = db.ReferenceField(Language, required=True)
  # genres: list[Genre] = db.EmbeddedDocumentListField(Genre, default=list)
  # duration: int = db.IntField()
  # resolution: str = db.StringField(max_length=255)


class Content(db.Document, TitleManager, PosterManager, DescriptionManager):
  meta = {'allow_inheritance': True, 'ordering': ['-added_date'],
  'indexes': ['code', 'type', 'release_date', 'added_date'], }
  code: str = db.StringField(max_length=255, primary_key=True, required=True)
  type: ContentType = db.ReferenceField(ContentType, required=True)
  release_date: date = db.DateField()
  royalty_amounts: list[CurrencyAmount] = db.EmbeddedDocumentListField(CurrencyAmount, default=list)
  added_date: dt = db.DateTimeField(default=dt.utcnow, required=True)
  original_language: Language = db.ReferenceField(Language, required=True)
  _code_pattern: str = r'^[a-z-0-9]+$'
  
  def royalty_amount(self, currency: Currency):
    if currency_amount := self.royalty_amounts.get(currency=currency):
      currency_amount: CurrencyAmount
      return currency_amount.amount
    return Fraction(0)
  
  def add_royalty_amount(self, currency: Currency, amount: Fraction):
    if currency_amount := self.royalty_amounts.get(currency=currency):
      currency_amount: CurrencyAmount
      currency_amount.amount += amount
    else:
      self.royalty_amounts.append(CurrencyAmount(currency=currency, amount=amount))
  
  @classmethod
  @property
  def code_pattern(cls):
    codes = [f'^{o.code}$' for o in Content.objects]
    codes = f'(?!{"|".join(codes)})' if codes else ''
    return f'{codes}{cls._code_pattern}'
  
  @property
  def self_code_pattern(self):
    codes = [f'^{o.code}$' for o in Content.objects if o.code != self.code]
    codes = f'(?!{"|".join(codes)})' if codes else ''
    return f'{codes}{self._code_pattern}'
  
  def __unicode__(self) -> str: return self.title()


class Movie(Content, MediafileManager): pass


class Episode(db.EmbeddedDocument, MediafileManager, DescriptionManager, TitleManager):
  number: int = db.IntField(primary_key=True)
  release_date: dt = db.DateTimeField(required=True)
  original_language: Language = db.ReferenceField(Language, required=True)


class Season(db.EmbeddedDocument, DescriptionManager, TitleManager):
  number: int = db.IntField(primary_key=True)
  episodes: list[Episode] = db.EmbeddedDocumentListField(Episode, default=list)


class Series(Content):
  seasons: list[Season] = db.EmbeddedDocumentListField(Season, default=list)


class File(db.Document):
  name: str = db.StringField(max_length=255, required=True)
  