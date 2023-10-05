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