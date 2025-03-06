from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from app.config import ApplicationConfig
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.from_object(ApplicationConfig)


bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)

db = SQLAlchemy(app)

from app.controllers.authController import auth_blueprint
app.register_blueprint(auth_blueprint, url_prefix="/auth")

from app import models


