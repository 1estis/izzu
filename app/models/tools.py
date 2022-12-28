from __future__ import annotations
from . import _types, content
from app import db


class LabelManager:
    name: str = db.StringField(max_length=255, required=True)
    _labels: list[_types.Label] = db.ListField(db.EmbeddedDocumentField(_types.Label, unique=True), default=[])
    
    def label(self, language: Language | None = None) -> str:
        ln_code = language.code if language else 'en'
        for l in self._labels:
            if l.language.code == ln_code:
                return l.label
        return self.name.capitalize()
    
    def set_label(self, language: Language, label: str, save: bool = True):
        for l in self._labels:
            if l.language == language:
                l.label = label
                if save: self.save()
                return self
        self._labels.append(_types.Label(language=language, label=label))
        if save: self.save()
        return self
    
    def remove_label(self, language: Language, save: bool = True):
        for l in self._labels:
            if l.language == language:
                self._labels.remove(l)
                if save: self.save()
        return self


class TitleManager:
    original_title: str = db.StringField(max_length=255, required=True)
    _titles: list[_types.Title] = db.ListField(db.EmbeddedDocumentField(_types.Title), default=[])
    
    def title(self, language: Language | None = None) -> str:
        ln_code = language.code if language else 'en'
        for t in self._titles:
            if t.language.code == ln_code:
                return t.title
        return self.original_title
    
    def set_title(self, language: Language, title: str, save: bool = True):
        for t in self._titles:
            if t.language == language:
                t.title = title
                if save: self.save()
                return self
        self._titles.append(t.Title(language=language, title=title))
        if save: self.save()
        return self
    
    def remove_title(self, language: Language, save: bool = True):
        for t in self._titles:
            if t.language == language:
                self._titles.remove(t)
                if save: self.save()
        return self


class PosterManager:
    _posters: list[_types.Poster] = db.ListField(db.EmbeddedDocumentField(_types.Poster), default=[])
    
    def poster(self, language: Language | None = None) -> str:
        ln_code = language.code if language else 'en'
        for p in self._posters:
            if p.language.code == ln_code:
                return p.paths[0]
        return ''
    
    def posters(self, language: Language | None = None) -> list[str]:
        ln_code = language.code if language else 'en'
        for p in self._posters:
            if p.language.code == ln_code:
                return p.paths
        return []
    
    def add_poster(self, language: Language, path: str, save: bool = True):
        for p in self._posters:
            if p.language == language:
                if path not in p.paths:
                    p.paths.append(path)
                if save: self.save()
                return self
        self._posters.append(_types.Poster(language=language, paths=[path]))
        if save: self.save()
        return self
    
    def remove_poster(self, language: Language, path: str, save: bool = True):
        for p in self._posters:
            if p.language == language:
                if path in p.paths:
                    p.paths.remove(path)
                    if not p.paths:
                        self._posters.remove(p)
                    if save: self.save()
        return self


class DescriptionManager:
    _descriptions: list[_types.Description] = db.ListField(db.EmbeddedDocumentField(_types.Description), default=[])
    
    def description(self, language: Language | None = None) -> str:
        ln_code = language.code if language else 'en'
        for d in self._descriptions:
            if d.language.code == ln_code:
                return d.description
        return ''
    
    def set_description(self, language: Language, description: str, save: bool = True):
        for d in self._descriptions:
            if d.language == language:
                d.description = description
                if save: self.save()
                return self
        self._descriptions.append(_types.Description(language=language, description=description))
        if save: self.save()
        return self
    
    def remove_description(self, language: Language, save: bool = True):
        for d in self._descriptions:
            if d.language == language:
                self._descriptions.remove(d)
                if save: self.save()
        return self


class MediafileManager: pass


class Dictionary(db.Document, LabelManager, DescriptionManager):
    meta = {'abstract': True, 'allow_inheritance': True, 'ordering': ['name'], 'indexes': ['name', 'code']}
    active: bool = db.BooleanField(default=True, required=True)
    name: str = db.StringField(max_length=255, required=True)
    code: str = db.StringField(max_length=255, primary_key=True, required=True)
    
    def __unicode__(self) -> str:
        return str(self.name).capitalize()


class Language(Dictionary): code: str = db.StringField(max_length=2, primary_key=True)