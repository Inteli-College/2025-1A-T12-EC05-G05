from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db

import controllers.login_controller as auth_blueprint
import controllers.statusfitas_controller as fita_blueprint
import controllers.qrcode_controller as qrcode_blueprint

# Inicializando a aplicação
app = Flask(__name__)

# Configurações da aplicação
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config.from_object(ApplicationConfig)

# Inicializando as extensões
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)

# Inicializando o banco de dados
db.init_app(app)

# Registrando blueprints
app.register_blueprint(auth_blueprint.auth_blueprint, url_prefix="/auth")
app.register_blueprint(fita_blueprint.fita_blueprint, url_prefix="/api")
app.register_blueprint(qrcode_blueprint.qrcode_blueprint)

# Função para criar o banco de dados
with app.app_context():
    db.create_all()  # Criar todas as tabelas no banco

# Executando a aplicação
if __name__ == "__main__":
    app.run(debug=True)
