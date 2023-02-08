from __future__ import annotations
from fractions import Fraction
from . import dicts
from app import db


class Title(db.EmbeddedDocument):
  language: dicts.Language = db.ReferenceField('dicts.Language', primary_key=True)
  title: str = db.StringField(max_length=255, required=True)


class Poster(db.EmbeddedDocument):
  language: dicts.Language = db.ReferenceField('dicts.Language', primary_key=True)
  paths: list[str] = db.ListField(db.StringField(max_length=255, required=True, unique=True), default=list)


class Description(db.EmbeddedDocument):
  language: dicts.Language = db.ReferenceField('dicts.Language', primary_key=True)
  description: str = db.StringField(required=True)


class CurrencyAmount(db.EmbeddedDocument):
  currency: dicts.Currency = db.ReferenceField('dicts.Currency', primary_key=True)
  numerator: int = db.IntField(required=True, default=0)
  denominator: int = db.IntField(required=True, default=1)
  
  @property
  def amount(self) -> Fraction:
    return Fraction(self.numerator, self.denominator)
  
  @amount.setter
  def amount(self, value: Fraction):
    self.numerator, self.denominator = value.numerator, value.denominator