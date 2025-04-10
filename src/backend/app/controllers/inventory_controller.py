from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.inventory_service import InventoryService

inventory_service = InventoryService()
inventory_blueprint = Blueprint("inventory", __name__)

@inventory_blueprint.route("/inventory/bins", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_all_bins():
    bins = inventory_service.get_all_bins()
    return jsonify(bins)

@inventory_blueprint.route("/inventory/bins/<bin_id>", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_bin(bin_id):
    bin_data = inventory_service.get_bin(bin_id)
    if bin_data:
        return jsonify(bin_data)
    return jsonify({"error": "Bin not found"}), 404

@inventory_blueprint.route("/inventory/bins/<bin_id>", methods=["PATCH"])
@cross_origin(supports_credentials=True)
def update_bin(bin_id):
    result, status_code = inventory_service.update_bin(bin_id, request.json)
    return jsonify(result), status_code


@inventory_blueprint.route("/inventory/bins", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_bin():
    result, status_code = inventory_service.create_bin(request.json)
    return jsonify(result), status_code if isinstance(status_code, int) else 201


@inventory_blueprint.route("/inventory/bins/<bin_id>/decrement", methods=["PATCH"])
@cross_origin(supports_credentials=True)
def decrement_bin_quantity(bin_id):
    result = inventory_service.decrement_bin_quantity(bin_id)
    return jsonify(result)
