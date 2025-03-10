from flask import Blueprint
from services.login_service import authService

auth_blueprint = Blueprint("auth", __name__)
authUser = authService()

@auth_blueprint.route("/@me")
def me():
    return authUser.get_current_user()

@auth_blueprint.route("/register", methods=["POST"])
def register():
    return authUser.register_user()

@auth_blueprint.route("/login", methods=["POST"])
def login():
    return authUser.login_user()

@auth_blueprint.route("/logout", methods=["POST"])
def logout():
    return authUser.logout_user()