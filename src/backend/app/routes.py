from flask import Blueprint
from app.controllers.auth_controller import login

def init_routes(app):
    auth_bp = Blueprint('auth', __name__)
    auth_bp.add_url_rule('/login', 'login', login, methods=['POST'])
    app.register_blueprint(auth_bp)
