from sqlite3 import Cursor
from flask import Flask
from flask_restful import Api, Resource
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()


url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(url)

sql = '''CREATE TABLE Pokemon (
    pokedex_number INT PRIMARY KEY,
    generation INT,
    type1 VARCHAR(255),
    type2 VARCHAR(255),
    hp INT,
    sp_attack INT,
    attack INT,
    defense INT,
    sp_defense INT,
    speed INT,
    height_m DECIMAL(5, 2),
    weight_kg DECIMAL(5, 2)
);'''

with conn:
    with conn.cursor() as curs:
        curs.execute(sql)
