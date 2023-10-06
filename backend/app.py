from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

# Create the Flask app
app = Flask(__name__)
api = Api(app)
CORS(app)
url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(url)

@app.route('/')
def get():
    return 'Pikadle API'

import db.Pokemon as Pokemon

class Main(Resource):
    def get(self):
        return "pikadle API", 200

api.add_resource(Main, '/')
api.add_resource(Pokemon.Pokemon, '/pokemon/<string:pokeName>')
api.add_resource(Pokemon.Random, '/random')
api.add_resource(Pokemon.PokeNames, '/pokemon/names')

if __name__ == '__main__':
    app.run(port=8080, debug=True)
