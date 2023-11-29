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
    const [pokemon, setPokemon] = useState();
    const [guessCount, setGuessCount] = useState(0);
    const [trigger, setTrigger] = useState(false)
    const [allowGuesses, setAllowGuesses] = useState(true);
    const [guesses, setGuesses] = useState([]);
    const [correct, setCorrect] = useState(false)
    const typeaheadRef = useRef(null)

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
        if (pokeGuess[0] == dailyPokemon.name){
            setCorrect(true)
        }
        console.log("guessCount", guessCount);
        typeaheadRef.current.clear();
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
            fetchDate();
        }
        if (pokeOptions.length == 0) {
            fetchOptions();
        }
    }, [])
    console.log(date)
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day

    const maxDate = today.toISOString().split('T')[0];

    const fetchDate = async (date) => {
        const request = await fetch(config.DAILY_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"date": date})
        })
        const response = await request.json();
        // validate response?
        console.log(response);
        setDailyPokemon(response)
        return response;
    }
    useEffect(()=>{
        setGuesses([])
    }, [date])

    const handleDateChange = (event) => {
        setDate(event.target.value);
        const currPokemon = fetchDate(event.target.value);

    };
    return(
        <div id='answers'>
            <input type="date" id="datepicker" class="form-control" onChange = {handleDateChange} selected={date} max={maxDate}/>

            {date && <div>
                <h2 id = 'guessTitle'>Guess the Pokemon for {date} </h2>
            <h2>Today's Pokemon</h2>
            <p>{dailyPokemon.name}! types: {dailyPokemon.type1} {dailyPokemon.type2} attack: {dailyPokemon.attack}</p>
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
            <ToastContainer />
            <Guesses guesses={guesses} trigger = {trigger} setTrigger = {setTrigger} daily = {dailyPokemon} setCorrect = {setCorrect} correct = {correct}/>
            {(guessCount ==6 || correct) &&<EndModal correct = {correct} pokemon = {dailyPokemon.name} guesses={guessCount}/>} </div>}
        </div>
    )
    
}

