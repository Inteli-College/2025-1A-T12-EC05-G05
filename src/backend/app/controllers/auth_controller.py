from flask import jsonify, request

def login():
    data = request.get_json()
    return jsonify(message="Login bem-sucedido"), 200
