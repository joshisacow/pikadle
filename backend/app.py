from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

# Create the Flask app
app = Flask(__name__)
api = Api(app)
CORS(app)


# cur = conn.cursor()
# cur.execute("""CREATE TABLE Users(
#     uid INT PRIMARY KEY,
#     username VARCHAR(255) NOT NULL,
#     email VARCHAR(255),
#     number_of_pokemon INT,
#     number_of_badges INT
# );""")
# cur.close()

@app.route('/')
def get():
    return 'Pikadle API'

import db.Pokemon as Pokemon
import db.Users as Users
class Main(Resource):
    def get(self):
        return "pikadle API", 200

api.add_resource(Main, '/')
api.add_resource(Pokemon.Pokemon, '/pokemon/<string:pokeName>')
api.add_resource(Pokemon.Random, '/random')
api.add_resource(Pokemon.PokeNames, '/pokemon/names')
api.add_resource(Users.Users, '/users')

if __name__ == '__main__':
    app.run(port=8080, debug=True)
