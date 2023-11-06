-- LOADING DATA INTO TABLES 

-- Into Pokemon Table 

LOAD DATA INFILE '/Users/williamyun/pikadle/pokemon.csv'  
INTO TABLE Pokemon
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
SET
    pokemon_id = @pokedex_number, 
    generation = @generation, 
    type1 = @type1, 
    type2 = @type2, 
    health = @hp, 
    special_attack = @sp_attack, 
    attack = @attack, 
    defense = @defense, 
    special_defense = @special_defense, 
    speed = @speed, 
    height = @height, 
    weight = @weight;

-- Into Moves Table

INSERT INTO Users (uid, username, email, number_of_pokemon, number_of_badges) 
VALUES (%s, %s, %s, %s, %s);



LOAD DATA INFILE '/Users/williamyun/pikadle/backend/db/data/pikadle_badges.csv'
INTO TABLE achievement
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
SET 
    achievement_name = @achievement_name,
    achievement_description = @Description, 
    achievement_criteria = @Criteria; 


