from sqlite3 import Cursor
from flask import Flask
from flask_restful import Api, Resource
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(url)


sql2 = """ COPY Pokemon(pokedex_number, generation, type1, type2, hp, sp_attack, attack, defense, sp_defense, speed, height_m, weight_kg)
           FROM '/Users/williamyun/pikadle/backend/db/data/pokemon.csv' DELIMITER ',' CSV HEADER;
           """


with conn:
    with conn.cursor() as curs:
        curs.execute(sql2)