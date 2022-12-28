from __future__ import annotations
from datetime import datetime as dt, date
from app import db
from .tools import DescriptionManager, Dictionary, Language, MediafileManager, PosterManager, TitleManager


class ContentType(Dictionary): pass
class Genre(Dictionary): pass


class Content(db.Document, TitleManager, PosterManager):
    # autoincrement id
    id: int = db.SequenceField(primary_key=True)
    meta = {'allow_inheritance': True, 'abstract': True, 'indexes': ['id'], 'ordering': ['-id'], }
    type: ContentType = db.ReferenceField(ContentType, required=True)
    release_date: date = db.DateField(required=True)
    added_date: dt = db.DateTimeField(default=dt.utcnow, required=True)
    original_language: Language = db.ReferenceField(Language, required=True)


class File(db.Document):
    name: str = db.StringField(max_length=255, required=True)
    


class Mediafile(db.EmbeddedDocument):
    # size: int = db.IntField(required=True)
    language: Language = db.ReferenceField(Language, required=True)
    genres: list[Genre] = db.ListField(db.ReferenceField(Genre), default=[])
    # duration: int = db.IntField()
    # resolution: str = db.StringField(max_length=255)


class Movie(Content, MediafileManager): pass

class Episode(db.EmbeddedDocument, MediafileManager, DescriptionManager, TitleManager):
    number: int = db.IntField(primary_key=True)
    release_date: dt = db.DateTimeField(required=True)
    original_language: Language = db.ReferenceField(Language, required=True)


class Season(db.EmbeddedDocument, DescriptionManager, TitleManager):
    number: int = db.IntField(primary_key=True)
    episodes: list[Episode] = db.ListField(db.EmbeddedDocumentField(Episode, unique=True), default=[])


class Series(Content):
    seasons: list[Season] = db.ListField(db.EmbeddedDocumentField(Season, unique=True), default=[])