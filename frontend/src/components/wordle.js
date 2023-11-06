"use client"

import { useEffect, useState, useMemo } from "react"
import Guesses from './guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import './wordle.css'
import config from '../../config.json'
import Button from 'react-bootstrap/Button'
import EndModal from "./endModal.js";
import 'bootstrap/dist/css/bootstrap.css'

export default function Wordle () {
    const [pokeOptions, setPokeOptions] = useState([]);
    const [dailyPokemon, setDailyPokemon] = useState("");
    const [pokeGuess, setPokeGuess] = useState("");
    const [pokemon, setPokemon] = useState();

    const [trigger, setTrigger] = useState(false);
    const [c, setC] = useState(0)
    const [guessCount, setGuessCount] = useState(0);
    const [correct, setCorrect] = useState(false)

    const handleClick = async() => {
        setGuessCount(guessCount + 1)
        const response = await  fetch(config.POKEMON_URL + pokeGuess[0])
        const guess =await response.json();  
        setPokemon(guess)
        setTrigger(!trigger)
        console.log(pokemon)
        console.log("guessCount", guessCount)
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
    
    return(
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
            {(guessCount != 6 && !correct) && 
            <Button id='submit' onClick ={handleClick}>
                Submit
            </Button>}
            {(guessCount == 6 || correct) && <Button id='submit' disabled> 
                Submit
            </Button>}
        
            <Guesses pokemon = {pokemon} trigger = {trigger} setTrigger = {setTrigger} daily = {dailyPokemon} setCorrect = {setCorrect} correct = {correct}/>
            {(guessCount ==6 || correct) &&<EndModal correct = {correct} pokemon = {pokemon.name} guesses={guessCount}/>}
        </div>
    )
    
}