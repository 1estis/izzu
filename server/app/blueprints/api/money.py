from fractions import Fraction
from flask import request

from ..utils import abort, login_required
from . import bl


day_cost = Fraction(1, 2)
week_cost = Fraction(3, 1)
month_cost = Fraction(10, 1)


@bl.post('/subscribe')
@login_required
def subscribe():
  days = request.json.get('days')
  weeks = request.json.get('weeks')
  months = request.json.get('months')
  
  if not (days or weeks or months):
    return abort(400, 'days, weeks or months is missing')
  
  cost = 0
  for var, name, cost in (
    (days, 'days', day_cost),
    (weeks, 'weeks', week_cost),
    (months, 'months', month_cost),
  ):
    if var:
      if not isinstance(var, int) or var < 0:
        return abort(400, f'`{name}` is not a positive integer')
      cost += var * cost
  
  # TODO: return payment link or something like that
  return {
    'message': 'subscription cost',
    'cost': cost,
  }
  
  