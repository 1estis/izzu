from __future__ import annotations
from app import db
import typing as t
from . import content_models as cm


class Classificator(db.Document):
    meta = {'abstract': True, 'allow_inheritance': True, 'ordering': ['name'], 'indexes': ['name', 'code']}
    active: bool = db.BooleanField(default=True, required=True)
    name: str = db.StringField(max_length=255, unique=True, required=True)
    code: str = db.StringField(max_length=255, primary_key=True, required=True)
    _labels: t.Dict[str, str] = db.DictField(db.StringField(max_length=255, required=True), default={}, required=True)
    description: str | None = db.StringField()
    
    def label(self, language: cm.Language | None = None) -> str:
        if language and language.code in self._labels:
            return self._labels[language.code]
        else:
            if 'en' in self._labels: return self._labels['en']
            else: return self.name.capitalize()
    
    def set_label(self, language: cm.Language, label: str, save: bool = True) -> None:
        self._labels[language.code] = label
        if save: self.save()
    
    def remove_label(self, language: cm.Language, save: bool = True) -> None:
        if language.code in self._labels and language.code != 'en':
            del self._labels[language.code]
            if save: self.save()
    
    def __unicode__(self) -> str:
        return str(self.name).capitalize()