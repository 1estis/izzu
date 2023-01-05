from __future__ import annotations
from . import tools
from app import db


class Title(db.EmbeddedDocument):
    language: tools.Language = db.ReferenceField('tools.Language', primary_key=True)
    title: str = db.StringField(max_length=255, required=True)


class Poster(db.EmbeddedDocument):
    language: tools.Language = db.ReferenceField('tools.Language', primary_key=True)
    paths: list[str] = db.ListField(db.StringField(max_length=255, required=True, unique=True), default=[])


class Description(db.EmbeddedDocument):
    language: tools.Language = db.ReferenceField('tools.Language', primary_key=True)
    description: str = db.StringField(required=True)