"use client"
import React, { useEffect, useState, useRef } from "react"
import Guesses from './guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import './wordle.css'
import config from '../../config.json'
import Button from 'react-bootstrap/Button'
import EndModal from "./endModal.js";
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";


export default function Wordle () {
    const [pokeOptions, setPokeOptions] = useState([]);
    const [dailyPokemon, setDailyPokemon] = useState("");
    const [pokeGuess, setPokeGuess] = useState("");
    const [pokemon, setPokemon] = useState();
    const [guessCount, setGuessCount] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [allowGuesses, setAllowGuesses] = useState(true);
    const [guesses, setGuesses] = useState([]);
    const [correct, setCorrect] = useState(false);
    const typeaheadRef = useRef(null);

    const { data: session, status } = useSession();
    const handleClick = async() => {
        if (pokeGuess == ""){
            toast.error("Enter a pokemon")
            return
        }
        // check if duplicate guess
        if (guesses.some(obj => obj.name === pokeGuess[0])) {
            toast.error("You already guessed that pokemon!");
            return; 
        }

        setGuessCount(guessCount + 1)
        if (guessCount == config.MAX_COUNT - 1){
            updateLatestDate();
        } 
        const response = await fetch(config.POKEMON_URL + pokeGuess[0]);
        const guess = await response.json();  
        setPokemon(guess);
        // setTrigger(!trigger);
        setGuesses(oldArray => [...oldArray, guess]);
        if (pokeGuess[0] == dailyPokemon.name){
            setCorrect(true)
            if (session){
                // successful guess
                const uid = session.user.uid
                const pokemon_id = dailyPokemon.pokemon_id
                const attempts = guessCount + 1

                // should set can guess to false
                updateLatestDate();
                const req2 = await fetch(config.BASE_URL + "badge/" + uid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"gametype": "p", "score": 1})
                })
                const request = await fetch(config.CATCH_URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"uid": uid, "pokemon_id": pokemon_id, "attempts": attempts})
                })
                console.log(request)
                console.log(req2);
                // if (req2.ok )
            }
        }  
        

        // console.log("guessCount", guessCount);
        setPokeGuess("");
        typeaheadRef.current.clear();
    }
    
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
    const checkIfAvailable = () => {
        // check if user has already guessed today
        if (session) {
            fetch(config.SITE_URL + "canguess/" + session.user.uid)
                .then(response => response.json())
                .then((data) => {
                    setAllowGuesses(data)
                })
        }
    }

    const updateLatestDate = async () => {
        // update latest attempted date in db
        if (session) {
            const request = await fetch(config.SITE_URL + "canguess/" + session.user.uid, {
                method: "POST",
            })
            const response = await request.json();
            console.log(response);
        }
    }

    useEffect(() => {
        if (dailyPokemon == "") {
            fetchDaily();
        }
        if (pokeOptions.length == 0) {
            fetchOptions();
        }
    }, [])

    useEffect(() => {
        checkIfAvailable();
    }, [session])

    return(
        <div id='answers'>
            {allowGuesses ?
                <>
                    <div id='wordleheader'>
                        <h2 id = 'guessTitle'>Guess Today's Pokemon! </h2>
                        <div className="inputs">
                            <Typeahead
                                id="pokeInput"
                                labelKey="name"
                                onChange={setPokeGuess}
                                options={pokeOptions}
                                placeholder="Choose your pokemon..."
                                selected={pokeGuess}
                                ref={typeaheadRef}
                                />
                            {(guessCount != config.MAX_COUNT && !correct) && 
                                <Button id='submit' onClick ={handleClick}>
                                    Submit
                                </Button>
                            }
                            {(guessCount == config.MAX_COUNT || correct) && 
                                <Button id='submit' disabled> 
                                    Submit
                                </Button>
                            }
                        </div>
                    </div>
                    {/* <h2>Today's Pokemon</h2> */}
                    {/* <p>{dailyPokemon.name}! types: {dailyPokemon.type1} {dailyPokemon.type2} attack: {dailyPokemon.attack}</p> */}
                    <ToastContainer />
                    <Guesses guesses={guesses} trigger = {trigger} setTrigger = {setTrigger} daily = {dailyPokemon} setCorrect = {setCorrect} correct = {correct}/>
                    {(guessCount == config.MAX_COUNT || correct) &&<EndModal correct = {correct} pokemon = {dailyPokemon.name} guesses={guessCount}/>}
                </> 
                :
                <div id='wordleheader'>
                    <h2 id = 'guessTitle'>Check back tomorrow! </h2>
                </div>
            }
        </div>
    )
    
}

