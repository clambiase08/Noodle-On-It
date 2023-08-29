#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import *

# Views go here!


class Dishes(Resource):
    def get(self):
        dishes = [
            dish.to_dict(rules=("-quantities.ingredient.quantities",))
            for dish in Dish.query.all()
        ]
        return make_response(dishes, 200)


api.add_resource(Dishes, "/dishes")


class Ingredients(Resource):
    def get(self):
        ingredients = [ingredient.to_dict() for ingredient in Ingredient.query.all()]
        return make_response(ingredients, 200)


api.add_resource(Ingredients, "/ingredients")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
