"use client"

import { useState } from "react"
import Guesses from './guesses.js'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';


export default function Wordle () {
    const [pokemonName, setPokemonName] =useState("");
    const [pokeOptions, setPokeOptions] = useState([]);
    function handleSubmit(){}
    function handleChange(){}
    let options = ["pokemon"]
    return (
        <div id='answers'>
            <Form.Group>
                <Form.Label>Single Selection</Form.Label>
                <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                onChange={setPokeOptions}
                options={options}
                placeholder="Choose your pokemon..."
                selected={pokeOptions}
                />
            </Form.Group>
            <Guesses pokemon = {pokemonName}/>
        </div>
    )
}