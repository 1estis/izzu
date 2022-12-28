from flask import Blueprint, redirect, render_template, url_for
from flask_login import login_required
from flask_security import roles_required


admin_blueprint = Blueprint('admin', __name__, template_folder='templates')


@admin_blueprint.route('/admin/')
@login_required
@roles_required('admin')
def admin():
    # return render_template('admin/admin.html')
    return redirect(url_for('admin.dictionaries'))


@admin_blueprint.route('/admin/dictionaries')
@login_required
@roles_required('admin')
def dictionaries():
    return render_template('admin/dictionaries.html', active_page='dictionaries')


@admin_blueprint.route('/admin/add')
@login_required
@roles_required('admin')
def add():
    return render_template('admin/add.html')