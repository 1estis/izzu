from app import db

class Language(db.Document):
    active = db.BooleanField(default=True)
    name = db.StringField(max_length=255, unique=True, required=True)
    code = db.StringField(max_length=255, unique=True, required=True)


class ContentType(db.Document):
    active = db.BooleanField(default=True)
    name = db.StringField(max_length=255, unique=True, required=True)
    label = db.StringField(max_length=255)


class Genre(db.Document):
    active = db.BooleanField(default=True)
    name = db.StringField(max_length=255, unique=True, required=True)
    description = db.StringField()


class Episode(db.Document):
    number = db.IntField(required=True)
    title = db.StringField(required=True)
    description = db.StringField()
    release_date = db.DateTimeField(required=True)
    original_language = db.ReferenceField(Language, required=True)
    translations = db.ListField(db.ReferenceField(Language), default=[], required=True, ordering='number')


class Season(db.Document):
    number = db.IntField(required=True)
    title = db.StringField(required=True)
    description = db.StringField()
    release_date = db.DateTimeField(required=True)
    original_language = db.ReferenceField(Language, required=True)
    translations = db.ListField(db.ReferenceField(Language), default=[])
    episodes = db.ListField(db.ReferenceField(Episode), default=[], required=True, ordering='number')


class Content(db.Document):
    # auto increment id
    id = db.SequenceField(primary_key=True)
    meta = {'allow_inheritance': True, 'indexes': ['id'], 'ordering': ['-id'], }
    type = db.ReferenceField(ContentType, required=True)
    title = db.StringField(required=True)
    description = db.StringField(required=True)
    release_date = db.DateTimeField(required=True)
    original_language = db.ReferenceField(Language, required=True)
    translations = db.ListField(db.ReferenceField(Language), default=[])
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