from sqlite3 import Cursor
from flask import Flask
from flask_restful import Api, Resource
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

# Create the Flask app
app = Flask(__name__)
api = Api(app)
url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(url)

cursor = conn.cursor 

sql = '''CREATE TABLE Pokemon (
    pokemon_id INT PRIMARY KEY,
    generation INT,
    type1 VARCHAR(255),
    type2 VARCHAR(255),
    health INT,
    special_attack INT,
    attack INT,
    defense INT,
    special_defense INT,
    speed INT,
    height DECIMAL(5, 2),
    weight DECIMAL(5, 2)
);'''

cursor.execute(sql)

sql2 = '''LOAD DATA INFILE '/Users/williamyun/pikadle/backend/db/data/pokemon.csv'  
INTO TABLE Pokemon
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
SET
    pokemon_id = @pokedex_number, 
    generation = @generation, 
    type1 = @type1, 
    type2 = @type2, 
    health = @hp, 
    special_attack = @sp_attack, 
    attack = @attack, 
    defense = @defense, 
    special_defense = @special_defense, 
    speed = @speed, 
    height = @height, 
    weight = @weight;'''

cursor.execute(sql2)

sql3 = '''SELECT * FROM Pokemon;'''
cursor.execute(sql3) 
for i in cursor.fetchall(): 
    print(i)

conn.commit() 
conn.close() 

@app.route('/')
def get():
    return 'Pikadle API'

import db.Pokemon as Pokemon

class Main(Resource):
    def get(self):
        return "pikadle API", 200

api.add_resource(Main, '/')
api.add_resource(Pokemon.Pokemon, '/pokemon/<int:pokeID>')


<<<<<<< HEAD



=======
>>>>>>> 3e65c93ff568f70ba8308265e9b06e7d4052b353
if __name__ == '__main__':
    app.run(port=8080, debug=True)
