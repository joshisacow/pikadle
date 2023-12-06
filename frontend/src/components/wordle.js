"use client"
import React, { useEffect, useState, useMemo, useRef } from "react"
import Guesses from './guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import './wordle.css'
import config from '../../config.json'
import Button from 'react-bootstrap/Button'
import EndModal from "./endModal.js";
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "bootstrap";
import { useSession } from "next-auth/react";


export default function Wordle () {
    const [pokeOptions, setPokeOptions] = useState([]);
    const [dailyPokemon, setDailyPokemon] = useState("");
    const [pokeGuess, setPokeGuess] = useState("");
    const [pokemon, setPokemon] = useState();
    const [guessCount, setGuessCount] = useState(0);
    const [trigger, setTrigger] = useState(false)
    const [allowGuesses, setAllowGuesses] = useState(true);
    const [guesses, setGuesses] = useState([]);
    const [correct, setCorrect] = useState(false)
    const [pokeSprite, setPokeSprite] = useState(null)
    const typeaheadRef = useRef(null)

    const { data: session, status } = useSession();
    console.log(session)
    const handleClick = async() => {
        if (pokeGuess == ""){
            toast.error("Enter a pokemon")
            return
        }
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
        if (pokeGuess[0] == dailyPokemon.name){
            setCorrect(true)
            if (session){
                // console.log(pokemon)
                const uid = session.user.uid
                const pokemon_id = dailyPokemon.pokemon_id
                const attempts = guessCount + 1
                var number_of_pokemon = session.user.number_of_pokemon + 1
                console.log("number pokemon", number_of_pokemon)
                // console.log(typeof number_of_pokemon)

                
                console.log(uid)

                const request = await fetch(config.CATCH_URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"uid": uid, "pokemon_id": pokemon_id, "attempts": attempts})
                })
                console.log(request);
            }
        }  
        

        console.log("guessCount", guessCount);
        setPokeGuess("")
        typeaheadRef.current.clear();
    }
    
    // const handleChange =(e) => {
    //     fetch(config.POKEMON_URL + )
    // }
    
    const fetchDaily = () =>{
        fetch(config.DAILY_URL)
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

    
    return(
        <div id='answers'>
            <div id='wordleheader'>
                <h2 id = 'guessTitle'>Guess Today's Pokemon! </h2>
                <Typeahead
                    id="pokeInput"
                    labelKey="name"
                    onChange={setPokeGuess}
                    options={pokeOptions}
                    placeholder="Choose your pokemon..."
                    selected={pokeGuess}
                    ref={typeaheadRef}
                />
                {(guessCount != 6 && !correct) && 
                <Button id='submit' onClick ={handleClick}>
                    Submit
                </Button>}
                {(guessCount == 6 || correct) && <Button id='submit' disabled> 
                    Submit
                </Button>}
            </div>
            {/* <h2>Today's Pokemon</h2> */}
            {/* <p>{dailyPokemon.name}! types: {dailyPokemon.type1} {dailyPokemon.type2} attack: {dailyPokemon.attack}</p> */}
            <ToastContainer />
            <Guesses guesses={guesses} trigger = {trigger} setTrigger = {setTrigger} daily = {dailyPokemon} setCorrect = {setCorrect} correct = {correct}/>
            {(guessCount ==6 || correct) &&<EndModal correct = {correct} pokemon = {dailyPokemon.name} guesses={guessCount}/>}
        </div>
    )
    
}

