"use client"

import { useEffect, useState } from "react"
import Guesses from './guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import './wordle.css'

export default function Wordle () {
    const [pokemonID, setPokemonID] =useState("");
    const [pokeOptions, setPokeOptions] = useState([]);
    const [dailyPokemon, setDailyPokemon] = useState("");
    const [pokeGuess, setPokeGuess] = useState(null);
    const [trigger, setTrigger] = useState(false);
    function handleSubmit(){}
    // const fetchGuess = ()  => {
    //     fetch(`http://localhost:8080/pokemon/${pokemonID}`)
    //         .then((response) => {
    //          setTrigger(prevTrigger => !prevTrigger)
    //          return response.json())
    // } 
    //         .then((data) => {
    //             setPokeGuess(data)
    //         })
    // }

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     fetchGuess();
    //     guesses.add(pokeGuess);
    // }

    let options = ["pokemon"]
    let daily = {id: 1, pokemon: "pikachu", type: ["electric", "water"], evc: 3, health: 100, defense: 90, attack: 80, height: 70, weight: 60, speed: 50}
    let poke2 = {id: 2, pokemon: "grah", type: ["water"], evc: 3, health: 100, defense: 90, attack: 80, height: 70, weight: 60, speed: 50}

    let guesses = [daily, poke2]

    // const fetchDaily = () =>{
    //     fetch(randPokemonUrl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setDailyPokemon(data)
    //         })
    // }
    // useEffect(() => {
    //     fetchDaily()
    // })
    // U
    // const fetchPokemon = () => {
    //     fetch(pokemonurl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //   
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
            <Typeahead
                id="pokeInput"
                labelKey="name"
                onChange={setPokeOptions}
                options={options}
                placeholder="Choose your pokemon..."
                selected={pokeOptions}
                onSubmit={handleSubmit}
            />
            <Guesses pokemon = {guesses} setTrigger = {setTrigger} daily = {daily}/>
        </div>
    )
}