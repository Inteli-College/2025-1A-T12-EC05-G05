from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db

import controllers.login_controller as auth_blueprint

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)

db.init_app(app)

app.register_blueprint(auth_blueprint.auth_blueprint, url_prefix="/auth")

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)