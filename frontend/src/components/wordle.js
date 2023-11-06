"use client"

import { useEffect, useState, useMemo } from "react"
import Guesses from './guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import './wordle.css'
import config from '../../config.json'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "bootstrap";

export default function Wordle () {
    const [pokeOptions, setPokeOptions] = useState([]);
    const [dailyPokemon, setDailyPokemon] = useState("");
    const [pokeGuess, setPokeGuess] = useState("");
    const [pokemon, setPokemon] = useState();

    const [c, setC] = useState(0)
    function handleSubmit(){}
    const [guessCount, setGuessCount] = useState(0);
    const [allowGuesses, setAllowGuesses] = useState(true);
    const [guesses, setGuesses] = useState([])

    const handleClick = async() => {
        // check if duplicate guess
        if (guesses.some(obj => obj.name === pokeGuess[0])) {
            toast.error("You already guessed that pokemon!");
            console.log("bye");
            return; 
        }

        setGuessCount(guessCount + 1)
        if (guessCount == 5){
            setAllowGuesses(false)
        } 
        
        const response = await fetch(config.POKEMON_URL + pokeGuess[0]);
        const guess = await response.json();  
        setPokemon(guess);
        // setTrigger(!trigger);
        setGuesses(oldArray => [...oldArray, guess]);
        console.log(pokemon);
        console.log("guessCount", guessCount);
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
    useEffect(() => {
        console.log("hi");
        if (dailyPokemon == "") {
            fetchDaily();
        }
        if (pokeOptions.length == 0) {
            fetchOptions();
        }
    }, [])

    
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
    // return (
    //     <div id='answers'>
    //         <h2 id = 'guessTitle'>Guess Today's Pokemon! </h2>
    //         <h2>Today's Pokemon</h2>
    //         <p>{dailyPokemon.name}! types: {dailyPokemon.type1} {dailyPokemon.type2} attack: {dailyPokemon.attack}</p>
    //         <Typeahead
    //             id="pokeInput"
    //             labelKey="name"
    //             onChange={setPokeGuess}
    //             options={pokeOptions}
    //             placeholder="Choose your pokemon..."
    //             selected={pokeGuess}
    //         />
    //         <Button id='submit' onClick ={handleClick}>
    //             Submit
    //         </Button>
    //         <Guesses pokemon = {pokemon} trigger = {trigger} setTrigger = {setTrigger} daily = {dailyPokemon}/>
    //     </div>
    // )
    return (
        <div id='answers'>
            <h2 id = 'guessTitle'>Guess Today's Pokemon! </h2>
            <h2>Today's Pokemon</h2>
            <p>{dailyPokemon.name}! types: {dailyPokemon.type1} {dailyPokemon.type2} attack: {dailyPokemon.attack}</p>
            {/* render input field if guesses remaining */}
            {allowGuesses ?
                <>
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
                </>
                :
                <>
                    <p>Out of guesses! Better luck next time!</p>
                </>
            }
            
            <ToastContainer />
            <Guesses pokemon = {pokemon} daily = {dailyPokemon} guesses={guesses} />
        </div>
    )   
}