from flask import Flask, request
from flask_restful import Resource, reqparse
import psycopg2
from dotenv import load_dotenv
import os
import json
from datetime import date

app = Flask(__name__)
load_dotenv()
url = os.getenv('DATABASE_URL')

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
                # array of badge_id + date
                badges_data.append((int(badge[1]), badge[2]))
            return self.getBadgeInfo(badges_data)
        else:
            return [404]
    
    def getBadgeInfo(self, badges):
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        ret = []
        for badge_info in badges:
            cur.execute("SELECT badge_id, badge_name, badge_description, sprite FROM badges WHERE badge_id = %s", (badge_info[0],))
            badge = cur.fetchone()
            if badge_info[1]:
                date = badge_info[1].isoformat()
            else:
                date = "NA"
            
            badge_data = {
                "badge_id": str(badge[0]),
                "badge_name": str(badge[1]),
                "badge_description": str(badge[2]),
                "sprite": str(badge[3]),
                "date": date,
            }
            ret.append(badge_data)
        cur.close()
        return ret
    
    def post(self, uid):
        register_post_args = reqparse.RequestParser()
        register_post_args.add_argument("gametype", type=str, required=True)
        register_post_args.add_argument("score", type=int, required=True)
        args = register_post_args.parse_args()

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
        print(diff)
        if not diff:
            # no new badges
            cur.close()
            return False, 404
        else:
            # new badges
            today = date.today()
            for badge_id in diff:
                cur.execute("INSERT INTO user_badges (user_id, badge_id, date) VALUES (%s, %s, %s)", (uid, badge_id, today))
        conn.commit()
        cur.close()
        return True, 200

