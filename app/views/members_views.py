from flask import Blueprint, render_template, request, redirect, url_for
from flask_security import login_required, current_user, roles_required
from app import babel
from flask import current_app as app
import gettext

members_blueprint = Blueprint('members', __name__, template_folder='templates')


@members_blueprint.route('/profile')
@login_required
def profile():
    return render_template('members/profile.html')