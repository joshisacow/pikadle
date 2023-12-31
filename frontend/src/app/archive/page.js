"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import Guesses from '@/components/guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import '@/components/wordle.css'
import config from '../../../config.json'
import Button from 'react-bootstrap/Button'
import EndModal from "@/components/endModal.js";
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Wordle () {
    const [date, setDate] = useState("");
    const [pokeOptions, setPokeOptions] = useState([]);
    const [dailyPokemon, setDailyPokemon] = useState("");
    const [pokeGuess, setPokeGuess] = useState("");
    const [guessCount, setGuessCount] = useState(0);
    const [trigger, setTrigger] = useState(false)
    const [guesses, setGuesses] = useState([]);
    const [correct, setCorrect] = useState(false)
    const typeaheadRef = useRef(null)

    const handleClick = async() => {
        // check if duplicate guess
        if (pokeGuess == ""){
            toast.error("Enter a pokemon")
            return
        }

        if (guesses.some(obj => obj.name === pokeGuess[0])) {
            toast.error("You already guessed that pokemon!");
            return; 
        }

        setGuessCount(guessCount + 1)
        // if (guessCount == 5){
        //     setAllowGuesses(false)
        // } 
        
        const response = await fetch(config.API_URL + "pokemon/" + pokeGuess[0]);
        const guess = await response.json();  
        // setPokemon(guess);
        // setTrigger(!trigger);
        setGuesses(oldArray => [...oldArray, guess]);
        if (pokeGuess[0] == dailyPokemon.name){
            setCorrect(true)
        }
        setPokeGuess("")
        typeaheadRef.current.clear();
    }
    
    const fetchOptions = () =>{
        fetch(config.API_URL + "pokemon/names")
            .then(response => response.json())
            .then((data) => {
                setPokeOptions(data)
            })
    }
    useEffect(() => {
        if (dailyPokemon == "") {
            fetchDate();
        }
        if (pokeOptions.length == 0) {
            fetchOptions();
        }
    }, [])
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day

    const maxDate = today.toISOString().split('T')[0];

    const fetchDate = async (date) => {
        if (date) {
            const request = await fetch(config.API_URL + "daily", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"date": date})
            })
            const response = await request.json();
            // validate response?
            setDailyPokemon(response)
            return response;
        }
    }
    useEffect(()=>{
        setGuesses([])
        setGuessCount(0)
    }, [date])

    const handleDateChange = (event) => {
        setDate(event.target.value);
        fetchDate(event.target.value);
        if (typeaheadRef.current){
            setPokeGuess("")
            typeaheadRef.current.clear()
        }
    };
    return(
        <div id='answers'>
            {!date && <p>Select a Date to Guess a Previous Date's Pokemon</p>}
            <input type="date" id="datepicker" class="form-control" onChange = {handleDateChange} selected={date} max={maxDate}/>

            {date && <div id='archivewordle'>
                <div id='wordleheader'>
                    <h2 id = 'guessTitle'>Guess the Pokemon for {date} </h2>
            {/* <h2>Today's Pokemon</h2> */}
            {/* <p>{dailyPokemon.name}! types: {dailyPokemon.type1} {dailyPokemon.type2} attack: {dailyPokemon.attack}</p> */}
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
            <ToastContainer />
            <Guesses guesses={guesses} trigger = {trigger} setTrigger = {setTrigger} daily = {dailyPokemon} setCorrect = {setCorrect} correct = {correct}/>
            {(guessCount == config.MAX_COUNT || correct) &&<EndModal correct = {correct} pokemon = {dailyPokemon.name} guesses={guessCount}/>} </div>}
        </div>
    )
    
}

