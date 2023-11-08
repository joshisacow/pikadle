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
    def __init__(self, name, description, criteria):
        self.name = name
        self.description = description
        self.criteria = criteria
        self.is_unlocked = False

    def unlock(self, user_progress):
        if self.criteria_met(user_progress):
            self.is_unlocked = True

    def criteria_met(self, user_progress):
        # Implement logic to check if user_progress meets badge criteria
        return user_progress >= self.criteria
    


