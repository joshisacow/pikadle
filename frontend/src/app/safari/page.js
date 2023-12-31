"use client"
//Safari Idea: 30 guesses to catch as many pokemon as possible
//Each pokemon will be a certain type
import { useEffect, useState, useMemo, useRef } from "react"
import Guesses from '../../components/guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import '../../components/wordle.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../../config.json'
import Button from 'react-bootstrap/Button'
import EndModal from "../../components/safariEndModal.js";
import 'bootstrap/dist/css/bootstrap.css'
import { useSession } from "next-auth/react";

export default function Safari(){
    const [pokeOptions, setPokeOptions] = useState([]); //same as in wordle.js
    const [randomPokemon, setRandomPokemon] = useState(""); //generates random pokemon given the type of the day
    const [pokeGuess, setPokeGuess] = useState(""); //value input from the Typeahead
    const [pokeType, setPokeType] = useState("") // random type of the day
    const [pokemon, setPokemon] = useState(); // the pokemon that is guessed, set after pokeGuess
    const [guesses, setGuesses] = useState([]) // lits of guesses, which resets after they guess one right
    const [guessCount, setGuessCount] = useState(0) //total number of guesses per day (30)
    const [score, setScore] = useState(0)
    const [isButtonDisabled, setButtonDisabled] = useState(false)
    const typeaheadRef = useRef(null)

    const { data: session, status } = useSession();

    const handleClick = async() => {
        if (pokeGuess == ""){
            toast.error("Enter a pokemon")
            return
        }
        if (guesses.some(obj => obj.name === pokeGuess[0])) {
            toast.error("You already guessed that pokemon!");
            return; 
        }
        const response = await fetch(config.API_URL + "pokemon/" + pokeGuess[0])
        const guess =await response.json();  
        setPokemon(guess)
        setGuessCount(guessCount + 1)
        setGuesses(oldArray => [...oldArray, guess]);
        setButtonDisabled(true)
        setTimeout(() => {
            if (pokeGuess[0] == randomPokemon.name){
                setScore(score + 1);
                fetchRandomGivenType(pokeType);
                setGuesses(oldArray => []);
            }
            setPokeGuess("")
            typeaheadRef.current.clear();
            setButtonDisabled(false)
        }
        , 500);
        if(guessCount + 1>= config.SAFARI_MAX_GUESS){
            if(session){
                const setscore = score + 1;
                const uid = session.user.uid
                const request = fetch(config.API_URL + "safariscore", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"uid": uid, "score": setscore})
                })
                const req2 = await fetch(config.API_URL + "badge/" + uid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"gametype": "s", "score": setscore})
                })
                if (req2.ok ) {
                    toast("You've unlocked a badge! Check your user page to see it.")
                }
            }
        }
    }

    const fetchRandomGivenType = (input) =>{
        fetch(config.API_URL + "random/type/" + input)
            .then(response => response.json())
            .then((data) => {
                setRandomPokemon(data)
                console.log(data.name)
            })
    }
    
    const fetchOptions = () =>{
        fetch(config.API_URL + "pokemon/names")
            .then(response => response.json())
            .then((data) => {
                setPokeOptions(data)
            })
    }
    
    const fetchType = async() =>{
        fetch(config.API_URL + "random/type").then(response=>response.json())
        .then((data)=>{
            setPokeType(data)
        })
    }

    useEffect(() => {
        if (pokeType == "") {
            fetchType();
        }
        if (pokeOptions.length == 0) {
            fetchOptions();
        }
    }, [])//get daily type

    useEffect(() =>{
        if (pokeType) {
            fetchRandomGivenType(pokeType);
        }
    }, [pokeType])//when type is set, get a random pokemon of that type

    return (
        <div id='answers' className="relative">
            <h1>Safari Zone!</h1>
            <p>In Safari Mode, you get 30 tries to catch as many pokemon of a certain type!</p>
            <h3>Today's type: {pokeType} </h3>
            <div id='wordleheader'>
                <p>Guesses Remaining: {config.SAFARI_MAX_GUESS - guessCount}</p>
                <p>Score: {score}</p>
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
                    {(guessCount < config.SAFARI_MAX_GUESS) && <Button id='submit' onClick ={handleClick} disabled={isButtonDisabled}>
                        Submit
                    </Button>}
                    {(guessCount >= config.SAFARI_MAX_GUESS) && <Button id='submit'> 
                        Submit
                    </Button>}
                </div>
            </div>
            <ToastContainer/>
            <Guesses pokemon = {pokemon} daily = {randomPokemon} guesses = {guesses}/>
            {(guessCount==config.SAFARI_MAX_GUESS)&&<EndModal score = {score}></EndModal>}
        </div>
    )
}
