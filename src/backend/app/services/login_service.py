from flask import jsonify, session
from flask_bcrypt import Bcrypt
from models import db, User

bcrypt = Bcrypt()

class authService:
    def get_current_user(self):
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401
        
        user = User.query.filter_by(id=user_id).first()
        return jsonify({
            "id": user.id,
            "email": user.email
        }) 


    def register_user(self, req):
        email = req.json["email"]
        password = req.json["password"]

        user_exists = User.query.filter_by(email=email).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        session["user_id"] = new_user.id

        return jsonify({
            "id": new_user.id,
            "email": new_user.email
        })

    def login_user(self, req):
        email = req["email"]
        password = req["password"]

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"error": "Unauthorized"}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Unauthorized"}), 401
        
        session["user_id"] = user.id

        return jsonify({
            "id": user.id,
            "email": user.email
        })

    def logout_user():
        session.pop("user_id")
        return "200"