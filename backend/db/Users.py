from flask import Flask, request
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os
import json
from flask_bcrypt import Bcrypt
import uuid
from flask_cors import CORS

app = Flask(__name__)
bcrypt = Bcrypt(app)
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

        
    
class Auth(Resource):
    def put(self):
        # validate login
        login_post_args = reqparse.RequestParser()
        login_post_args.add_argument("username", type=str, help="username is required", required=True)
        login_post_args.add_argument("password", type=str, help="password is required", required=True)
        args = login_post_args.parse_args()

        username = args['username']
        password = args['password']

        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM Users WHERE username = %s", (username,))
        user = cur.fetchone()
        cur.close()
        
        # check user exists
        if user:
            user_data = {
                "uid": str(user[0]),
                "username": str(user[1]),
                "password": str(user[2]),
                "number_of_pokemon":int(user[3]),
                "number_of_badges":int(user[4])
            }
        else:
            return "Username doesn't exist", 401
        
        # check password
        if not bcrypt.check_password_hash(user_data.get("password", ""), password):
            return "Incorrect password", 401
        
        return user_data, 200

    def post(self):
        # register user
        register_post_args = reqparse.RequestParser()
        register_post_args.add_argument("username", type=str, help="username is required", required=True)
        register_post_args.add_argument("password", type=str, help="password is required", required=True)
        args = register_post_args.parse_args()

        username = args['username']
        password = args['password']

        # check if username already taken
        conn = psycopg2.connect(url)
        cur = conn.cursor() 
        cur.execute("SELECT * FROM Users WHERE username = %s", (username,))
        user = cur.fetchone()
        if user:
            cur.close()
            return "Username already taken", 401

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        if not bcrypt.check_password_hash(hashed_password, password):
            cur.close()
            return "Invalid password", 401
        uid = uuid.uuid1()
        cur.execute("""INSERT INTO Users (uid, username, password, number_of_pokemon, number_of_badges) 
VALUES (%s, %s, %s, %s, %s);""", (str(uid), username, hashed_password, 0, 0))
        conn.commit()
        cur.close()
        return "Success!", 201
        

class Badge(Resource):
    def get(self, uid):
        # get user badges
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM user_badges WHERE user_id = %s", (uid,))
        badges = cur.fetchall()
        cur.close()
        if badges:
            badges_data = []
            for badge in badges:
                badges_data.append(int(badge[1]))
            
            return self.getBadgeInfo(badges_data)
        else:
            return "Badges not found", 404
    
    def getBadgeInfo(self, badges):
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        ret = []
        for badge_id in badges:
            cur.execute("SELECT badge_name, badge_description FROM badges WHERE badge_id = %s", (badge_id,))
            badge = cur.fetchone()
            badge_data = {
                "badge_name": str(badge[0]),
                "badge_description": str(badge[1])
            }
            ret.append(badge_data)
        cur.close()
        return ret
        

