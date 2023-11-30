# from flask import Flask, request
# from flask_restful import Resource, reqparse
# import psycopg2
# from dotenv import load_dotenv
# import os
# import json
# from flask_bcrypt import Bcrypt
# import uuid
# from flask_cors import CORS

# app = Flask(__name__)
# bcrypt = Bcrypt(app)
# load_dotenv()
# url = os.getenv('DATABASE_URL')

# class Caught(Resource):
#     def get(self, uid):
#         # get all pokemon associated with user
#         # parse arguments
#         args = request.args.get('uid')
#         conn = psycopg2.connect(url)
#         cur = conn.cursor()
#         cur.execute("SELECT *.name FROM Pokemon WHERE pokemon_id IN (User_pokemon WHERE uid = %s)", (uid,))
#         pokemonall = cur.fetchall()
#         cur.close()
        
#         if pokemonall:   
#             return pokemonall, 200
#         else: 
#             return {"message": "Pokemon not found"}, 400
