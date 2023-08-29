from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    serialize_rules = (
        "-collections.user",
        "-dishes.user",
        "-dishes.note",
    )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"User {self.username}, ID {self.id}"

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        # return bcrypt.check_password_hash(password.encode("utf-8"),self._password_hash)
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    collections = db.relationship("Collection", backref="user", cascade="delete")
    dishes = db.relationship("Dish", backref="user", cascade="delete")
    notes = association_proxy("dishes", "note")


class Collection(db.Model, SerializerMixin):
    __tablename__ = "collections"
    serialize_rules = (
        "-notes.collection",
        # "-user.collections",
        # "-notes.dish",
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f"Collection {self.name}, ID {self.id}"

    # user = db.relationship("User", back_populates="collections")
    notes = db.relationship("Note", backref="collection", cascade="delete")
    dishes = association_proxy("notes", "dish")


class Note(db.Model, SerializerMixin):
    __tablename__ = "notes"
    serialize_rules = (
        "-collection",
        "-dish.notes",
        "-dish.quantities",
        "-dish.user",
    )

    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.String)
    collection_id = db.Column(db.Integer, db.ForeignKey("collections.id"))
    dish_id = db.Column(db.Integer, db.ForeignKey("dishes.id"))

    def __repr__(self):
        return f"Note {self.notes}, ID {self.id}"

    # collection = db.relationship("Collection", back_populates="notes")
    # dish = db.relationship("Dish", back_populates="notes")


class Dish(db.Model, SerializerMixin):
    __tablename__ = "dishes"
    serialize_rules = (
        "-user.dishes",
        "-notes.dish",
        "-quantities.dish",
        "-quantities.ingredient",
    )

    id = db.Column(db.Integer, primary_key=True)
    dish_name = db.Column(db.String)
    image = db.Column(db.String)
    instructions = db.Column(db.Text)
    time_to_cook = db.Column(db.Integer)
    time_to_prepare = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f"Dish {self.dish_name}, ID {self.id}"

    @validates(time_to_prepare, time_to_cook)
    def validate_time(self, key, value):
        if not value > 0:
            raise ValueError("Time must be greater than 0")
        return value

    # user = db.relationship("User", back_populates="dishes")
    notes = db.relationship("Note", backref="dish", cascade="delete")
    quantities = db.relationship("Quantity", backref="dish", cascade="delete")
    ingredients = association_proxy("quantities", "ingredient")


class Quantity(db.Model, SerializerMixin):
    __tablename__ = "quantities"
    # serialize_rules = (
    #     "-dish.quantities",
    #     "-ingredient.quantities",
    # )

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    measurement = db.Column(db.String)
    dish_id = db.Column(db.Integer, db.ForeignKey("dishes.id"))
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"))

    def __repr__(self):
        return f"Quantity {self.quantity}"

    # dish = db.relationship("Dish", back_populates="quantities")
    # ingredient = db.relationship("Ingredient", back_populates="quantities")

    @validates(measurement)
    def validate_measurement(self, key, measurement):
        quantity_list = [
            "tsp",
            "tbsp",
            "C",
            "pt",
            "qt",
            "gal",
            "oz",
            "fl oz",
            "lb",
            "L",
            "g",
            "kg",
            "mL",
            "",
        ]
        if measurement not in quantity_list:
            return ValueError("Invalid measurement")
        return measurement


class Ingredient(db.Model, SerializerMixin):
    __tablename__ = "ingredients"
    serialize_rules = (
        "-quantities.ingredient",
        "-quantities.dish",
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return f"Ingredient {self.name}"

    quantities = db.relationship("Quantity", backref="ingredient", cascade="delete")
    dishes = association_proxy("quantities", "dish")
