"use client"

import { useState } from "react"
import Guesses from './guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import './wordle.css'

export default function Wordle () {
    const [pokemonName, setPokemonName] =useState("");
    const [pokeOptions, setPokeOptions] = useState([]);
    function handleSubmit(){}
    function handleChange(){}
    let options = ["pokemon"]
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
            />
            <Guesses pokemon = {pokemonName}/>
        </div>
    )
}