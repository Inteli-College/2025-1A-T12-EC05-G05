from flask import Blueprint
from app.services.authServices import authService 

auth_blueprint = Blueprint("auth", __name__)

authser = authService()

@auth_blueprint.route("/@me")
def me():
    return authser.get_current_user()


@auth_blueprint.route("/register", methods=["POST"])
def register():
    return authser.register_user()


@auth_blueprint.route("/login", methods=["POST"])
def login():
    return authser.login_user()


@auth_blueprint.route("/logout", methods=["POST"])
def logout():
    return authser.logout_user()


