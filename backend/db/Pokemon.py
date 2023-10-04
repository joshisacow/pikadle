from flask import Flask
from flask_restful import Resource, reqparse


app = Flask(__name__)

class Pokemon(Resource):
    def get(self, pokeID):
        # Get the pokemon from the database
        return "Pokemon", 200
