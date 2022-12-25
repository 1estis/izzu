from datetime import datetime as dt
from app import db
from typing import List
from .classificator import Classificator


class Language(Classificator): pass
class ContentType(Classificator): pass
class Genre(Classificator): pass


class Episode(db.Document):
    number: int = db.IntField(required=True)
    title: str = db.StringField(required=True)
    description: str = db.StringField()
    release_date: dt = db.DateTimeField(required=True)
    original_language: Language = db.ReferenceField(Language, required=True)
    translations: List[Language] = db.ListField(db.ReferenceField(Language), default=[], required=True, ordering='number')

class Season(db.Document):
    number: int = db.IntField(required=True)
    title: str = db.StringField(required=True)
    description: str = db.StringField()
    release_date: dt = db.DateTimeField(required=True)
    original_language: Language = db.ReferenceField(Language, required=True)
    translations: List[Language] = db.ListField(db.ReferenceField(Language), default=[])
    episodes: List[Episode] = db.ListField(db.ReferenceField(Episode), default=[], required=True, ordering='number')

class Content(db.Document):
    # autoincrement id
    id: int = db.SequenceField(primary_key=True)
    meta = {'allow_inheritance': True, 'indexes': ['id'], 'ordering': ['-id'], }
    type: ContentType = db.ReferenceField(ContentType, required=True)
    title: str = db.StringField(required=True)
    description: str = db.StringField(required=True)
    release_date: dt = db.DateTimeField(required=True)
    original_language: Language = db.ReferenceField(Language, required=True)
    translations: List[Language] = db.ListField(db.ReferenceField(Language), default=[])
    # duration = db.IntField()
    # rating = db.IntField()
    # genres = db.ListField(db.ReferenceField(Genre))
    # actors = db.ListField(db.ReferenceField(Actor))
    # directors = db.ListField(db.ReferenceField(Director))
    # writers = db.ListField(db.ReferenceField(Writer))
    # countries = db.ListField(db.ReferenceField(Country))
    # subtitles = db.ListField(db.ReferenceField(Language))
    # audio = db.ListField(db.ReferenceField(Language))
    # production_companies = db.ListField(db.ReferenceField(ProductionCompany))
    # production_countries = db.ListField(db.ReferenceField(Country))
    # budget = db.IntField()
    # revenue = db.IntField()
    # imdb_id = db.StringField(max_length=255)
    # imdb_rating = db.IntField()
    # imdb_votes = db.IntField()
    # tmdb_id = db.IntField()
    # tmdb_rating = db.IntField()
    # tmdb_votes = db.IntField()
    # youtube_trailer = db.StringField(max_length=255)
    # youtube_trailer_id = db.StringField(max_length=255)
    # poster = db.StringField(max_length=255)
    # backdrop = db.StringField(max_length=255)
    # homepage = db.StringField(max_length=255)
    # tagline = db.StringField(max_length=255)
    

# db.register([i for i in locals().values() if isinstance(i, type) and issubclass(i, db.Document)])