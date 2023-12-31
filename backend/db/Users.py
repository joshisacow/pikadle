from flask import Flask, request
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os
import json
from flask_bcrypt import Bcrypt
import uuid
from datetime import date
import db.Badges as Badges

app = Flask(__name__)
bcrypt = Bcrypt(app)
load_dotenv()
url = os.getenv('DATABASE_URL')

class Users(Resource):
    def get(self, uid):
        # get user info
        # parse arguments
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM Users WHERE uid = %s", (uid,))
        user = cur.fetchone()
        cur.close()

        # fetch badge information
        b = Badges.Badge()
        badgearr = b.get(uid)
        # no badges found
        if badgearr[0] == 404:
            badgearr = []
        if user:
            user_data = {
                "username": str(user[1]),
                "email":str(user[2]),
                "number_of_pokemon": int(user[3]),
                "safari_score": int(user[4]),
                "number_of_badges": len(badgearr),
                "badge_array": badgearr,
            }

        return user_data, 200


# determine if user has completed the daily wordle already
class CanGuess(Resource):
    def get(self, uid):
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT last_guess_date FROM Users WHERE uid = %s", (uid,))
        user = cur.fetchone()
        cur.close()

        # determine if user can attempt daily
        today = date.today()
        can_attempt = True
        if user[0] is not None:
            if today <= user[0]:
                can_attempt = False

        return can_attempt, 200
    
    def post(self, uid):
        # update last attempted date to today
        today = date.today()

        # update last attempted date
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("UPDATE users SET last_guess_date=%s WHERE uid=%s", (today, uid,))
        conn.commit()
        cur.close()
        return "success", 200
        
    
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
            }
        else:
            return "Username doesn't exist", 401
        
        # check password
        if not bcrypt.check_password_hash(user_data.get("password", ""), password):
            return "Incorrect password", 401
        
        del user_data["password"]
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
        cur.execute("""INSERT INTO Users (uid, username, password, number_of_pokemon, safari_score) 
VALUES (%s, %s, %s, %s, %s);""", (str(uid), username, hashed_password, 0, 0))
        conn.commit()
        cur.close()
        return "Success!", 201
        


        
class UserSafari(Resource):
    def get(self, uid):
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT safari_score FROM users WHERE users.uid = %s", (uid,))
        safari_score = cur.fetchone()
        print(safari_score)
        cur.close()
        if safari_score:
            return safari_score[0]
        else:
            return 0

    def post(self):
        register_post_args = reqparse.RequestParser()
        register_post_args.add_argument("uid", type=str, required=True)
        register_post_args.add_argument("score", type=int, required=True)
        args = register_post_args.parse_args()

        uid= args['uid']
        score = args['score']

        conn = psycopg2.connect(url)
        cur = conn.cursor()
        highest_score = max(score, self.get(uid))
        print(score)
        print(self.get(uid))
        cur.execute("UPDATE users SET safari_score = %s WHERE users.uid = %s", (highest_score,uid))
        conn.commit()
        conn.close()
        return "success", 201

