from flask import Flask
from .db import DB

# Create the Flask app
app = Flask(__name__)
app.db = DB(app)


