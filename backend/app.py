from flask import Flask
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

# Create the Flask app
app = Flask(__name__)
url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(url)

@app.route('/')
def get():
    return 'Pikadle API'



if __name__ == '__main__':
    app.run(port=8080, debug=True)