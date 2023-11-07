

-- CREATING TABLES 

-- Create the User table
CREATE TABLE Users (
    uid INT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    -- email VARCHAR(255),
    number_of_pokemon INT,
    number_of_badges INT,
);

-- Create the hasPokemon table
CREATE TABLE hasPokemon (
    uid INT,
    pokemon_id INT,
    date DATE,
    number_of_attempts INT,
    FOREIGN KEY (uid) REFERENCES User(uid),
    FOREIGN KEY (pokemon_id) REFERENCES Pokemon(pokemon_id)
);

-- Create the hasGymLeaders table
CREATE TABLE hasGymLeaders (
    uid INT,
    gym_name VARCHAR(255),
    date DATE,
    FOREIGN KEY (uid) REFERENCES User(uid),
    FOREIGN KEY (gym_name) REFERENCES GymLeader(name)
);

-- Create the Pokemon table
CREATE TABLE Pokemon (
    pokemon_id INT PRIMARY KEY,
    generation INT,
    type1 VARCHAR(255),
    type2 VARCHAR(255),
    health INT,
    special_attack INT,
    attack INT,
    defense INT,
    special_defense INT,
    speed INT,
    height DECIMAL(5, 2),
    weight DECIMAL(5, 2)
);

-- Create the GymLeader table
CREATE TABLE GymLeader (
    name VARCHAR(255) PRIMARY KEY,
    generation INT
);

-- Create the gymleaderPokemon table
CREATE TABLE gymleaderPokemon (
    gym_name VARCHAR(255),
    pokemon_id INT,
    FOREIGN KEY (gym_name) REFERENCES GymLeader(name),
    FOREIGN KEY (pokemon_id) REFERENCES Pokemon(pokemon_id)
);

-- Create the hasAchievements table
CREATE TABLE hasAchievements (
    uid INT,
    achievement_name VARCHAR(255),
    FOREIGN KEY (uid) REFERENCES User(uid),
    FOREIGN KEY (achievement_name) REFERENCES Achievement(achievement_name)
);

-- Create the Achievement table
CREATE TABLE Achievement (
    achievement_name VARCHAR(255) PRIMARY KEY,
    achievement_description VARCHAR(255)
);

-- Create the History table
CREATE TABLE History (
    date DATE,
    pokemon_id INT,
    FOREIGN KEY (pokemon_id) REFERENCES Pokemon(pokemon_id)
);


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




