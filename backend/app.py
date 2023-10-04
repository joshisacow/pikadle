from flask import Flask
# from .db import DB
from werkzeug.urls import url_quote

# Create the Flask app
app = Flask(__name__)
# app.db = DB(app)


@app.route('/')
def get():
    return 'Pikadle API'

if __name__ == '__main__':
    app.run(port=8080, debug=True)