from __future__ import annotations
from typing import Self
from app import db, DLC
from .tools import Dictionary


class ContentType(Dictionary): plural_title = True
class Genre(Dictionary): pass


class Currency(Dictionary):
  code: str = db.StringField(max_length=3, primary_key=True)
  symbol: str = db.StringField(max_length=1, required=True)
  rate: float = db.FloatField(default=1)
  _code_pattern: str = r'^[A-Z]{3}$'
  plural_title: bool = True


class Language(Dictionary):
  code: str = db.StringField(max_length=5, primary_key=True)
  _code_pattern: str = '^[a-z]{2}_[A-Z]{2}$' # ISO 639-1 + ISO 3166-1 alpha-2
  self_title: str = db.StringField(max_length=255, required=True)
  
  @classmethod
  @property
  def default(cls) -> Self: return cls.objects(code=DLC).first()
  
  @classmethod
  @property
  def other(cls) -> list[Self]: return cls.objects(code__ne=DLC)
  
  def title(self, language: Language | None = None, default: bool = True) -> str:
    if language == self: return self.self_title
    return super().title(language, default)
  
  def set_title(self, language: Language | None, title: str, save: bool = True) -> Self:
    if language == self:
      self.self_title = title
      if self.code != DLC: return self.save() if save else self
    return super().set_title(language, title, save)
  
  def remove_title(self, language: Language, save: bool = True):
    if language == self: raise ValueError('Cannot remove title for language itself')
    return super().remove_title(language, save)