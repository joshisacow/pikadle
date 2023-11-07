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
    def get(self):
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

        # check password
        if not bcrypt.check_password_hash(user[2], password):
            return "Invalid credentials", 401
        
        users_instance = Users()
        user_data, status_code = users_instance.get(user[0])        
        return user_data, status_code

    def post(self):
        # register user
        register_post_args = reqparse.RequestParser()
        register_post_args.add_argument("username", type=str, help="username is required", required=True)
        register_post_args.add_argument("password", type=str, help="password is required", required=True)
        args = register_post_args.parse_args()

        username = args['username']
        password = args['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        if not bcrypt.check_password_hash(hashed_password, password):
            return "Invalid password", 401
        uid = uuid.uuid1()

        return [uid.int, username, hashed_password], 201
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("""INSERT INTO Users (uid, username, email, number_of_pokemon, number_of_badges) 
VALUES (%d, %s, %s, %d, %d);""", (uid.int, username, hashed_password, 0, 0))
        conn.commit()
        cur.close()
        return "success", 201
        
        

