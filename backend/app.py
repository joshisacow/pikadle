from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

# Create the Flask app
app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route('/')
def get():
    return 'Pikadle API'

import db.Pokemon as Pokemon
import db.Users as Users
import db.Badges as Badges
class Main(Resource):
    def get(self):
        return "pikadle API", 200

api.add_resource(Main, '/')
api.add_resource(Pokemon.Pokemon, '/pokemon/<string:pokeName>')
api.add_resource(Pokemon.PokeNames, '/pokemon/names')
api.add_resource(Pokemon.RandomGivenFixedType, '/random/type/<string:type>')
api.add_resource(Pokemon.TypeRandom, '/random/type')
api.add_resource(Pokemon.DailyPokemon, '/daily')
api.add_resource(Pokemon.CatchPokemon, '/catch')
api.add_resource(Pokemon.Caught, '/caught/<string:uid>')
api.add_resource(Users.Users, '/users/<string:uid>')
api.add_resource(Users.Auth, '/auth')
api.add_resource(Users.CanGuess, '/canguess/<string:uid>')
api.add_resource(Users.UserSafari, '/safariscore')
api.add_resource(Badges.Badge, '/badge/<string:uid>')

if __name__ == '__main__':
    app.run(port=8080, debug=True)
