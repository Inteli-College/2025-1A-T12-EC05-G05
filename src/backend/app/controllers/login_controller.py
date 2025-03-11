from flask import Blueprint, request
from flask_cors import cross_origin
from services.login_service import authService

auth_blueprint = Blueprint("auth", __name__)
authUser = authService()

@auth_blueprint.route("/@me")
@cross_origin(supports_credentials=True)
def me():
    return authUser.get_current_user()

@auth_blueprint.route("/register", methods=["POST"])
@cross_origin(supports_credentials=True)
def register():
    return authUser.register_user(request.get_json())

@auth_blueprint.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    return authUser.login_user(request.get_json())

@auth_blueprint.route("/logout", methods=["POST"])
@cross_origin(supports_credentials=True)
def logout():
    return authUser.logout_user()
