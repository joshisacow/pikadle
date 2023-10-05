from flask import Flask
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(url)

class Pokemon(Resource):
    def get(self, pokeID):
        # Get the pokemon from the database
        cur = conn.cursor()
        cur.execute("SELECT * FROM pokemon WHERE id = %s", (pokeID,))
        pokemon = cur.fetchone()
        cur.close()
        return pokemon, 200        