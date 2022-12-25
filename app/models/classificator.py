from app import db


class Classificator(db.Document):
    meta = {'abstract': True, 'allow_inheritance': True, 'ordering': ['name'], 'indexes': ['name', 'code']}
    active = db.BooleanField(default=True, required=True)
    name = db.StringField(max_length=255, unique=True, required=True)
    code = db.StringField(max_length=255, primary_key=True, required=True)
    _labels = db.DictField(db.StringField(max_length=255, required=True), default={}, required=True)
    description = db.StringField()
    
    # after creating new classificator, add default label
    # def save(self, *args, **kwargs):
    #     if not self._labels:
    #         self._labels['en'] = self.name.capitalize()
    #     super(Classificator, self).save(*args, **kwargs)
    
    def label(self, language = None):
        if language and language.code in self._labels:
            return self._labels[language.code]
        else:
            if 'en' in self._labels: return self._labels['en']
            else: return self.name.capitalize()
    
    def set_label(self, language, label: str, save: bool = True):
        self._labels[language.code] = label
        if save: self.save()
    
    def remove_label(self, language, save: bool = True):
        if language.code in self._labels and language.code != 'en':
            del self._labels[language.code]
            if save: self.save()
    
    def __unicode__(self):
        return str(self.name).capitalize()