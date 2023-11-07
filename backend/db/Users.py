from flask import Flask, request
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os
import json

app = Flask(__name__)
load_dotenv()
url = os.getenv('DATABASE_URL')

class Users(Resource):
    def get(self, uid):
        # get user info
        # parse arguments
        args = request.args.get('uid')
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM Users WHERE uid = %s", (uid,))
        user = cur.fetchone()
        cur.close()
        if user:
            user_data = {
                "username": str(user[1]),
                "email":str(user[2]),
                "number_of_pokemon":int(user[3]),
                "number_of_badges":int(user[4])
            }
    
        return user_data, 200

    def post(self):
        # create new user
        # parse arguments
        content = request.json
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("""INSERT INTO Users (uid, username, email, number_of_pokemon, number_of_badges, current_badge) 
VALUES (%s, %s, %s, %s, %s);""", (content['uid'], content['username'], content['email'], content['number_of_pokemon'], content['number_of_badges'], content['current_badge']))
        conn.commit()
        cur.close()
        return content, 201
        

