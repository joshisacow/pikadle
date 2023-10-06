from flask import Flask, request
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
url = os.getenv('DATABASE_URL')

class Users(Resource):
    def get(self):
        # get user info
        # parse arguments
        argparse = reqparse.RequestParser()
        argparse.add_argument("uid", type=int, help="User ID is required", required=True)
        args = argparse.parse_args()
        userID = args['uid']
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM Users WHERE uid = %s", (userID,))
        user = cur.fetchone()
        cur.close()
        return user, 200

    def post(self):
        # create new user
        # parse arguments
        content = request.json
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("""INSERT INTO Users (uid, username, email, number_of_pokemon, number_of_badges) 
VALUES (%s, %s, %s, %s, %s);""", (content['uid'], content['username'], content['email'], content['number_of_pokemon'], content['number_of_badges']))
        cur.close()
        return content, 201
        

