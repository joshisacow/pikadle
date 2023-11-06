"use client"

import { useEffect, useState, useMemo } from "react"
import Guesses from './guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import './wordle.css'
import config from '../../config.json'
import Button from 'react-bootstrap/Button'

export default function Wordle () {
    const [pokeOptions, setPokeOptions] = useState([]);
    const [dailyPokemon, setDailyPokemon] = useState("");
    const [pokeGuess, setPokeGuess] = useState("");
    const [pokemon, setPokemon] = useState();

    const [trigger, setTrigger] = useState(false);
    const [c, setC] = useState(0)
    function handleSubmit(){}

    let daily = {id: 1, pokemon: "pikachu", type1: "electric", type2: "water", health: 100, defense: 90, attack: 80, height: 70, weight: 60, speed: 50}
    let poke2 = {id: 2, pokemon: "grah", type1: "water", type2: "none", health: 100, defense: 90, attack: 80, height: 70, weight: 60, speed: 50}

    let guesses = [daily, poke2]

    const handleClick = async() => {
        const response = await fetch(config.POKEMON_URL + pokeGuess[0])
        const guess =await response.json();  
        setPokemon(guess)
        setTrigger(!trigger)
        console.log(pokemon)

    }
    // const handleChange =(e) => {
    //     fetch(config.POKEMON_URL + )
    // }

    const fetchDaily = () =>{
        fetch(config.RANDOM_URL)
            .then(response => response.json())
            .then((data) => {
                setDailyPokemon(data)
            })
    }
    const fetchOptions = () =>{
        fetch(config.NAMES_URL)
            .then(response => response.json())
            .then((data) => {
                setPokeOptions(data)
            })
    }
    useMemo(() => {
        fetchDaily()
        fetchOptions()
    }, [c])
    
    // const fetchPokemon = () => {
    //     fetch(pokemonurl)
    //         .then((response) => response.json())
    //         .then((data) => {
      
    //             setPokeOptions(data)
    //         })
    // }
    // useEffect(() => {
    //     fetchPokemon()
    //     // debugger lines
    //     // console.log("was triggered");
    //     // console.log("CURRENT USER, from get: ", userId);
    // }, [trigger])
    return (
        <div id='answers'>
            <h2 id = 'guessTitle'>Guess Today's Pokemon! </h2>
            <h2>Today's Pokemon</h2>
            <p>{dailyPokemon.name}! types: {dailyPokemon.type1} {dailyPokemon.type2} attack: {dailyPokemon.attack}</p>
            <Typeahead
                id="pokeInput"
                labelKey="name"
                onChange={setPokeGuess}
                options={pokeOptions}
                placeholder="Choose your pokemon..."
                selected={pokeGuess}
            />
            <Button id='submit' onClick ={handleClick}>
                Submit
            </Button>
            <Guesses pokemon = {pokemon} trigger = {trigger} setTrigger = {setTrigger} daily = {dailyPokemon}/>
        </div>
    )
}