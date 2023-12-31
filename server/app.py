#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, abort
from flask_restful import Resource
from models import *
from werkzeug.exceptions import Unauthorized
import re

# Local imports
from config import app, db, api

# Add your model imports
from models import *

# Views go here!


# @app.before_request
# def check_if_logged_in():
#     open_access = ["signup", "login", "dishes"]
#     if request.endpoint not in open_access and not session.get("user_id"):
#         print("Checking if")
#         raise Unauthorized
#         # return {'error': 'no good!'}, 401


class Signup(Resource):
    def post(self):
        username = request.get_json()["username"]
        email = request.get_json()["email"]
        new_user = User(
            username=username,
            email=email,
        )

        password = request.get_json()["password"]
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id

        all = Collection(
            name="all",
            user_id=new_user.id,
            image="images/all-collection.png",
        )
        favorite = Collection(
            name="favorites",
            user_id=new_user.id,
            image="images/favorites.png",
        )

        db.session.add(all)
        db.session.add(favorite)
        db.session.commit()

        # return new_user.to_dict()
        return new_user.to_dict()


api.add_resource(Signup, "/signup")


class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        user = User.query.filter(User.username == username).first()

        password = request.get_json()["password"]
        if user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(rules=("_password_hash",))

        return {"error": "Invalid username or password"}, 401


api.add_resource(Login, "/login")


class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return user.to_dict(rules=("_password_hash",))
            # return user.to_dict(only=("username",))

        else:
            return {"message": "401: Not Authorized"}, 401


api.add_resource(CheckSession, "/check_session")


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "204: No Content"}, 204


api.add_resource(Logout, "/logout")


class Dishes(Resource):
    def get(self):
        dishes = [
            dish.to_dict(rules=("-quantities.ingredient.quantities",))
            for dish in Dish.query.all()
        ]
        for dish in dishes:
            dish["instructions"] = re.split(r"\d+\.\s", dish["instructions"])[1:]
        return make_response(dishes, 200)

    def post(self):
        data = request.get_json()
        try:
            new_dish = Dish(
                dish_name=data["dish_name"],
                instructions=data["instructions"],
                time_to_cook=data["time_to_cook"],
                time_to_prepare=data["time_to_prepare"],
                image="images/table-food.jpg" if not data["image"] else data["image"],
                user_id=session["user_id"],
            )
        except ValueError as e:
            abort(422, e.args[0])
        db.session.add(new_dish)
        db.session.commit()

        return make_response(
            new_dish.to_dict(rules=("-quantities.ingredient.quantities",)), 201
        )


api.add_resource(Dishes, "/dishes")


class Ingredients(Resource):
    def get(self):
        ingredients = [ingredient.to_dict() for ingredient in Ingredient.query.all()]
        return make_response(ingredients, 200)


api.add_resource(Ingredients, "/ingredients")


class Collections(Resource):
    def get(self):
        collections = [
            c.to_dict(
                rules=(
                    "-user",
                    "-notes.dish.quantities.ingredient.quantities",
                )
            )
            for c in Collection.query.all()
        ]
        return make_response(collections, 200)

    def post(self):
        data = request.get_json()
        try:
            new_coll = Collection(**data)
        except ValueError as e:
            abort(422, e.args[0])
        db.session.add(new_coll)
        db.session.commit()

        return make_response(new_coll.to_dict(), 201)


api.add_resource(Collections, "/collections")


class CollectionById(Resource):
    def delete(self, id):
        collection = Collection.query.filter_by(id=id).first()
        if not collection:
            return make_response({"error": "Collection not found"}, 404)
        db.session.delete(collection)
        db.session.commit()
        return make_response({}, 204)

    def patch(self, id):
        data = request.get_json()
        collection = Collection.query.filter(Collection.id == id).first()
        if not collection:
            abort(404, "cannot find user id")
        for key in data:
            setattr(collection, key, data[key])
        db.session.add(collection)
        db.session.commit()
        return make_response(collection.to_dict(), 202)


api.add_resource(CollectionById, "/collections/<int:id>")


class Notes(Resource):
    def get(self):
        notes = [note.to_dict() for note in Note.query.all()]
        return make_response(notes, 200)

    def post(self):
        data = request.get_json()
        try:
            new_note = Note(
                notes=data["notes"],
                collection_id=data["collection_id"],
                dish_id=data["dish_id"],
            )
        except ValueError as e:
            abort(422, e.args[0])
        db.session.add(new_note)
        db.session.commit()

        return make_response(new_note.to_dict(), 201)


api.add_resource(Notes, "/notes")


class Quantities(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_quant = Quantity(
                quantity=data["quantity"],
                measurement=data["measurement"],
                dish_id=data["dish_id"],
                ingredient_id=data["ingredient_id"],
            )
        except ValueError as e:
            abort(422, e.args[0])
        db.session.add(new_quant)
        db.session.commit()

        return make_response(new_quant.to_dict(), 201)


api.add_resource(Quantities, "/quantities")


class Users(Resource):
    def get(self):
        users = [
            user.to_dict(
                rules=(
                    "-collections",
                    "-dishes",
                )
            )
            for user in User.query.all()
        ]
        return make_response(users, 200)


api.add_resource(Users, "/users")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
