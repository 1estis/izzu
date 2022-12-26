from __future__ import annotations
from datetime import datetime as dt
from app import db
from .tools import Dictionary, Language, PosterMixin, TitleMixin


class ContentType(Dictionary): pass
class Genre(Dictionary): pass


class Content(db.Document, TitleMixin, PosterMixin):
    # autoincrement id
    id: int = db.SequenceField(primary_key=True)
    meta = {'allow_inheritance': True, 'abstract': True, 'indexes': ['id'], 'ordering': ['-id'], }
    type: ContentType = db.ReferenceField(ContentType, required=True)
    description: str = db.StringField(required=True)
    release_date: dt = db.DateTimeField(required=True)
    added_date: dt = db.DateTimeField(default=dt.utcnow, required=True)
    original_language: Language = db.ReferenceField(Language, required=True)


class Mediafile(db.EmbeddedDocument):
    # path: str = db.StringField(required=True)
    # size: int = db.IntField(required=True)
    language: Language = db.ReferenceField(Language, required=True)
    genres: list[Genre] = db.ListField(db.ReferenceField(Genre), default=[])
    # duration: int = db.IntField()
    # resolution: str = db.StringField(max_length=255)


class Movie(Content):
    mediafiles: list[Mediafile] = db.ListField(db.EmbeddedDocumentField(Mediafile), default=[], required=True)


class Episode(db.EmbeddedDocument):
    number: int = db.IntField(required=True)
    title: str = db.StringField(required=True)
    description: str = db.StringField()
    release_date: dt = db.DateTimeField(required=True)
    original_language: Language = db.ReferenceField(Language, required=True)
    mediafiles: list[Mediafile] = db.ListField(db.EmbeddedDocumentField(Mediafile, unique=True), default=[])


class Season(db.EmbeddedDocument):
    number: int = db.IntField(required=True)
    title: str = db.StringField(required=True)
    episodes: list[Episode] = db.ListField(db.EmbeddedDocumentField(Episode, unique=True), default=[])
    description: str = db.StringField()


class Series(Content):
    seasons: list[Season] = db.ListField(db.EmbeddedDocumentField(Season, unique=True), default=[])