from flask import Flask, request
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os
import json

app = Flask(__name__)
load_dotenv()
url = os.getenv('DATABASE_URL')

class Badge:
    def __init__(self, name, description, criteria, sprite):
        self.name = name
        self.description = description
        self.criteria = criteria
        self.sprite = sprite
        self.is_unlocked = False

    def unlock(self, user_progress):
        if self.criteria_met(user_progress):
            self.is_unlocked = True

    def criteria_met(self, user_progress):
        # Implement logic to check if user_progress meets badge criteria
        return user_progress >= self.criteria
    


class UserBadge(Resource):
    def get(self, uid):
        # get all badges associated with user
        # parse arguments
        # args = request.args.get('uid')
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT * FROM user_badges WHERE user_badges.user_id = %s", (uid,))
        badges = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        cur.close()

        badges = [dict(zip(columns, row)) for row in badges]

        if badges:   
            for b in badges:
                if b['date']:
                    b['date'] = b['date'].isoformat()
        if badges:
            return badges, 200
        else: 
            return {"message": "Badge not found"}, 400

    def post(self, uid, type, score){
        
    }