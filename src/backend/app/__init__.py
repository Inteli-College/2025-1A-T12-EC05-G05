from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db

import controllers.login_controller as auth_blueprint
import controllers.statusfitas_controller as fita_blueprint
import controllers.qrcode_controller as qrcode_blueprint
import controllers.robot_controller as robot_blueprint
import controllers.historico_controller as historico_blueprint
import controllers.logs_controller as logs_blueprint
import controllers.sensores_controller as sensores_blueprint
import controllers.inventory_controller as inventory_blueprint

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)

db.init_app(app)

app.register_blueprint(auth_blueprint.auth_blueprint, url_prefix="/auth")
app.register_blueprint(fita_blueprint.fita_blueprint, url_prefix="/api")
app.register_blueprint(qrcode_blueprint.qrcode_blueprint)
app.register_blueprint(robot_blueprint.robot_blueprint, url_prefix="/robot")
app.register_blueprint(historico_blueprint.historico_blueprint, url_prefix="/api")
app.register_blueprint(logs_blueprint.logs_blueprint, url_prefix="/api")
app.register_blueprint(sensores_blueprint.sensors_blueprint, url_prefix="/api")
app.register_blueprint(inventory_blueprint.inventory_blueprint, url_prefix="/api")

with app.app_context():
    db.create_all() 

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
