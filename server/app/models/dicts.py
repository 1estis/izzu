from __future__ import annotations
from app import db
from .tools import Dictionary


class Currency(Dictionary):
  code: str = db.StringField(max_length=3, primary_key=True)
  symbol: str = db.StringField(max_length=1, required=True)
  rate: float = db.FloatField(default=1)
  _code_pattern: str = r'^[A-Z]{3}$'
  plural_title: bool = True