from flask import Flask
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
url = os.getenv('DATABASE_URL')

class Pokemon(Resource):
    def get(self, pokeName):
        # Get the pokemon from the database
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM pokemon WHERE name = %s", (pokeName,))
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
        
class PokeNames(Resource):
    def get(self):
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT name FROM pokemon")
        pokemon = cur.fetchall()
        cur.close()
        if pokemon:
            pokemon_data = []
            for x in pokemon:
                pokemon_data.append(x[0])
            # pokemon_data = {
            #     "pokemon_id": int(pokemon[0][0]),
            #     "name": str(pokemon[1])
            #     # Add other fields as needed
            # }
            return pokemon_data, 200
        else:
            return {"message": "Pokemon not found"}, 404
    
class Random(Resource):
    def get(self):
        # Get a random pokemon from the database
        conn = psycopg2.connect(url)
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
            return {"message": "Pokemon not found"}, 400

#given the type of the day in safari, get a random pokemon of that type
class RandomGivenFixedType(Resource):
    def get(self, type):
        #get a random pokemon of a fixed type from the database
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM pokemon WHERE type1 = %s ORDER BY RANDOM() LIMIT 1", (type,))
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

#get a random type that will be the type of the day for the safari
class TypeRandom(Resource):
    def get(self):
        #get a random pokemon of a fixed type from the database
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT type1 FROM pokemon ORDER BY RANDOM() LIMIT 1")
        type = cur.fetchone()
        cur.close()
        if type: 
            return type[0]
        else:
            return {"message": "type not found"}, 404
