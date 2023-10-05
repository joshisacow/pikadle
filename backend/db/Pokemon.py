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
        cur.execute("SELECT * FROM pokemon WHERE pokemon_id = %s", (pokeID,))
        pokemon = cur.fetchone()
        cur.close()
        if pokemon:
            pokemon_data = {
                "pokemon_id": int(pokemon[0]),
                "generation": int(pokemon[1]),
                "type1": str(pokemon[2]),
                "type2": str(pokemon[3]),
                "health": int(pokemon[4]),
                "special_attack": int(pokemon[5]),
                "attack": int(pokemon[6]),
                "defense": int(pokemon[7]),
                "special_defense": int(pokemon[8]),
                "speed": int(pokemon[9]),
                "height": float(pokemon[10]),
                "weight": float(pokemon[11]),
                "name": str(pokemon[12])
                # Add other fields as needed
            }
            return pokemon_data, 200
        else:
            return {"message": "Pokemon not found"}, 404
        

class Random(Resource):
    def get(self):
        # Get a random pokemon from the database
        cur = conn.cursor()
        cur.execute("SELECT * FROM pokemon ORDER BY RANDOM() LIMIT 1")
        pokemon = cur.fetchone()
        cur.close()
        if pokemon:
            pokemon_data = {
                "pokemon_id": int(pokemon[0]),
                "generation": int(pokemon[1]),
                "type1": str(pokemon[2]),
                "type2": str(pokemon[3]),
                "health": int(pokemon[4]),
                "special_attack": int(pokemon[5]),
                "attack": int(pokemon[6]),
                "defense": int(pokemon[7]),
                "special_defense": int(pokemon[8]),
                "speed": int(pokemon[9]),
                "height": float(pokemon[10]),
                "weight": float(pokemon[11]),
                "name": str(pokemon[12])
                # Add other fields as needed
            }
            return pokemon_data, 200
        else:
            return {"message": "Pokemon not found"}, 404