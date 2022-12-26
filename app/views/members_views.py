from datetime import datetime
from flask import Blueprint, render_template, request, redirect, url_for
from flask_security import login_required, current_user
from app import babel
from flask import current_app as app
from ..models.content import *
import gettext

members_blueprint = Blueprint('members', __name__, template_folder='templates')


@babel.localeselector
def get_locale():
    translations = [str(translation) for translation in babel.list_translations()]
    return request.accept_languages.best_match(translations)


def set_lang(lang):
    i18n_dir = app.config['BABEL_TRANSLATION_DIRECTORIES']
    gettext.install('lang', i18n_dir)
    trans_file = i18n_dir + lang + '/LC_MESSAGES/flask_security'
    tr = gettext.translation(trans_file, 'locale',  languages=[lang])
    tr.install()
    app.jinja_env.install_gettext_translations(tr)


@members_blueprint.before_app_first_request
def init_my_blueprint():
    if not app.user_datastore.get_user('admin@self.com'):
        en: Language = Language(name='english', code='en').save()
        ru: Language = Language(name='russian', code='ru').save()
        en.set_label(en, 'English')
        en.set_label(ru, 'Английский')
        ru.set_label(en, 'Russian')
        ru.set_label(ru, 'Русский')
        ContentType(name='movies', code='movies')\
            .set_label(en, 'Movies')\
            .set_label(ru, 'Фильмы')
        print(en.label(ru))
        app.user_datastore.create_role(name="admin")
        app.user_datastore.create_user(
            username='admin', email='admin@self.com',
            confirmed_at=datetime.now(),
            password='vxtr5w7c_nxd', roles=['admin']
        )
    pass


@members_blueprint.before_app_request
def before_request():
    lang = get_locale()
    lang = lang if lang else app.config['BABEL_DEFAULT_LOCALE']
    set_lang(lang)

    if request.path.startswith('/admin'):
        if current_user.is_authenticated:
            if not current_user.has_role("admin"):
                return redirect(url_for('security.logout'))
        else:
            return redirect(url_for('security.login'))


@members_blueprint.route('/profile')
@login_required
def member_page():
    return render_template('members/profile.html')
