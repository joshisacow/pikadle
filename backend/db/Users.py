from flask import Flask, request
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(url)

class Users(Resource):
    def get(self, userID):
        # get user info
        cur = conn.cursor()
        cur.execute("SELECT * FROM pokemon WHERE name = %s", (userID,))
        pokemon = cur.fetchone()
        cur.close()

    def post(self):
        # create new user
        # parse arguments
        content = request.json
        cur = conn.cursor()
        cur.execute("""INSERT INTO Users (uid, username, email, number_of_pokemon, number_of_badges) 
VALUES (%s, %s, %s, %s, %s);""", (content['uid'], content['username'], content['email'], content['number_of_pokemon'], content['number_of_badges']))
        cur.close()
        return content, 201
        

