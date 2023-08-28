#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from models import *

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

class Signup(Resource):
    def post(self):
        username = request.get_json()['username']
        email = request.get_json()['email']
        new_user = User(
            username = username,
            email = email,
        )

        password = request.get_json()['password']
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id

        return new_user.to_dict()
api.add_resource(Signup, "/signup")

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()

        password = request.get_json()['password']
        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(only=("username",))
        
        return {'error': 'Invalid username or password'}, 401
api.add_resource(Login, '/login')

class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204
    
api.add_resource(Logout, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

