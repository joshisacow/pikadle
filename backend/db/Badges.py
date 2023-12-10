from flask import Flask, request
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os
import json
from datetime import date, datetime

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

class NewBadge(Resource):
    def post(self):
        register_post_args = reqparse.RequestParser()
        register_post_args.add_argument("uid", type=str, required=True)
        register_post_args.add_argument("gametype", type=str, required=True)
        register_post_args.add_argument("score", type=int, required=True)
        args = register_post_args.parse_args()

        uid= args['uid']
        gametype = args['gametype']
        score = args['score']

        conn = psycopg2.connect(url)
        cur = conn.cursor()
        if gametype == "p":
            cur.execute("SELECT number_of_pokemon FROM users WHERE uid = %s", (uid,))
            pokecounttuple = cur.fetchone()
            pokecount = pokecounttuple[0] + 1
            cur.execute("SELECT badge_id FROM badges WHERE type = %s AND badge_criteria <= %s", (gametype, pokecount))
            badgesmet = cur.fetchall()
        else: 
            cur.execute("SELECT badge_id FROM badges WHERE type = %s AND badge_criteria <= %s", (gametype, score))
            badgesmet = cur.fetchall()
        cur.execute("SELECT badge_id FROM user_badges WHERE user_id = %s", (uid,))
        currentbadges = cur.fetchall()
        
        # find diff between two sets
        badgesmet, currentbadges = set(badgesmet), set(currentbadges)
        diff = badgesmet.difference(currentbadges)
        if not diff:
            # no new badges
            cur.close()
            return False
        else:
            # new badges
            today = date.today()
            for badge_id in diff:
                cur.execute("INSERT INTO user_badges (user_id, badge_id, date) VALUES (%s, %s, %s)", (uid, badge_id, today))
        conn.commit()
        cur.close()
        return True
    