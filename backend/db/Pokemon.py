from flask import Flask
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os
import random
from datetime import date, datetime

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
    
    def getById(self, pid):
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM pokemon WHERE pokemon_id = %s", (pid,))
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
        
class DailyPokemon(Resource):
    def get(self):
        # get current daily pokemon
        epoch = datetime(2023, 11, 8)
        today = date.today()
        days = (today - epoch.date()).days
        random.seed(days)
        pokemonid = random.randint(1, 801)
        pokemon = Pokemon.getById(self, pokemonid)
        return pokemon
    
    def post(self):
        date_post_args = reqparse.RequestParser()
        date_post_args.add_argument("date", type=str, help="date is required", required=True)
        args = date_post_args.parse_args()
        date = args['date'].split('-')
        epoch = datetime(2023, 11, 8)
        archive = datetime(int(date[0]), int(date[1]), int(date[2]))
        days = (archive.date() - epoch.date()).days
        random.seed(days)
        pokemonid = random.randint(1, 801)
        pokemon = Pokemon.getById(self, pokemonid)
        return pokemon

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

class TypeRandom(Resource):
    def get(self):
        #get a random type
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT type1 FROM pokemon ORDER BY RANDOM() LIMIT 1")
        type = cur.fetchone()
        cur.close()
        if type: 
            return type[0]
        else:
            return {"message": "type not found"}, 404
