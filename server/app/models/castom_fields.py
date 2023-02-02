from app import db
from fractions import Fraction


# db has not FractionField, so go write your own
class FractionField(db.fields.BaseField):
  def __init__(self, **kwargs):
    super().__init__(**kwargs)
  
  def to_python(self, value):
    if isinstance(value, Fraction):
      return value
    elif isinstance(value, dict):
      return Fraction(value['numinator'], value['denominator'])
    elif isinstance(value, str):
      return Fraction(value)
    else:
      raise ValueError(f'Cannot convert {value} to Fraction')
  
  def to_mongo(self, value):
    if isinstance(value, Fraction):
      return {'numinator': value.numerator, 'denominator': value.denominator}
    elif isinstance(value, dict):
      return value
    elif isinstance(value, str):
      return {'numinator': Fraction(value).numerator, 'denominator': Fraction(value).denominator}
    else:
      raise ValueError(f'Cannot convert {value} to Fraction')
  
  def validate(self, value):
    if not isinstance(value, Fraction):
      self.error(f'Value {value} is not a Fraction')
  
  def prepare_query_value(self, op, value):
    if isinstance(value, Fraction):
      return value
    elif isinstance(value, dict):
      return Fraction(value['numinator'], value['denominator'])
    elif isinstance(value, str):
      return Fraction(value)
    else:
      raise ValueError(f'Cannot convert {value} to Fraction')