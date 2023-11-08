"use client"
//Safari Idea: 20 guesses to catch as many pokemon as possible
//Each pokemon will be a certain type
import { useEffect, useState, useMemo, useRef } from "react"
import Guesses from '../../components/guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import './wordle.css'
import config from '../../config.json'
import Button from 'react-bootstrap/Button'

export default function Safari(){
    const [pokeOptions, setPokeOptions] = useState([]);
    const [randomPokemon, setRandomPokemon] = useState("");
    const [pokeGuess, setPokeGuess] = useState("");
    const [pokeType, setPokeType] = useState("")
    const [pokemon, setPokemon] = useState();

    const [trigger, setTrigger] = useState(false);
    const [c, setC] = useState(0)
    function handleSubmit(){}


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

    const fetchRandomGivenType = () =>{
        fetch(config.RANDOM_GIVEN_TYPE_URL + {pokeType})
            .then(response => response.json())
            .then((data) => {
                setRandomPokemon(data)
            })
    }
    
    const fetchOptions = () =>{
        fetch(config.NAMES_URL)
            .then(response => response.json())
            .then((data) => {
                setPokeOptions(data)
            })
    }
    
    const fetchType = async() =>{
        fetch(config.TYPE_URL).then(response=>response.json())
        .then((data)=>{
            setPokeType(data)
        })
    }

    useMemo(async() => {
        const response = await fetch(config.TYPE_URL)
        const type = await response.json();
        setPokeType(type)
        // fetchType()
        fetchOptions()
        fetchRandomGivenType()
    }, [c])

    return (
        <div id='answers'>
            <h2>Safari Zone!</h2>
            <h3>Today's type: {pokeType} </h3>
            <p>In Safari Mode, you get 20 tries to catch as many pokemon of a certain type!</p>
            <p>Try to catch more than you friends!</p>
            <h2>Today's Pokemon</h2>
            <p>{randomPokemon.name}! types: {randomPokemon.type1} {randomPokemon.type2} attack: {randomPokemon.attack}</p>
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
            <Guesses pokemon = {pokemon} trigger = {trigger} setTrigger = {setTrigger} daily = {randomPokemon}/>
        </div>
    )
}
