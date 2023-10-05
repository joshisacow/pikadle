'use client'
import { useEffect } from 'react';
import './wordle.css'

function AttrColor({attr, dailyAttr}){
    if(attr == dailyAttr){
        return(
            <div className = 'guessRight' id='pokeName'>
                <p>{attr}</p>
            </div>
        )
    }else {
        return(
            <div className = 'guessWrong' id='pokeName'>
                <p>{attr}</p>
            </div>
        )
    }
}
function TypeColor({attr, dailyAttr}){
    let counter = 0;
    for (var i = 0; i< attr.length; i++){
        if (dailyAttr.includes(attr[i])){
            counter ++;
        }
    }
    if (counter == dailyAttr.length){
        return(
            <div className = 'guessRight' id='pokeName'>
                {attr.map((type =>{
                    return(
                        <p>{type}</p>
                    )
                }))}
            </div>
        )
    }else if (counter >0 && counter != dailyAttr.length){
        return(
            <div className = 'guessOK' id='pokeName'>
                {attr.map((type =>{
                    return(
                        <p>{type}</p>
                    )
                }))}
            </div>
        )
    } else {
        return(
            <div className = 'guessWrong' id='pokeName'>
                {attr.map((type =>{
                    return(
                        <p>{type}</p>
                    )
                }))}
            </div>
        )
    }
}

export default function Guesses({pokemon, setTrigger, daily}) {
        // const fetchPokemon = () => {
    //     fetch(pokemonurl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //   
    //             setPokemon(data)
    //         })
    // }

    // // set trigger for fetching SBOMs
    // useEffect(() => {
    //     fetchPokemon()
    //     // debugger lines
    //     // console.log("was triggered");
    //     // console.log("CURRENT USER, from get: ", userId);
    // }, [trigger])
    // let guesses  = [];
    // useEffect(() => {
    //     setTrigger(prevTrigger => !prevTrigger)
    //     guesses.push(pokemon);
    // })
    return(
        <div id='guesses'>
            <div id='attrTitles'>
                <p>Pokemon</p>
                <p>Type</p>
                <p>EvC</p>
                <p>Health</p>
                <p>Attack</p>
                <p>Defense</p>
                <p>Height</p>
                <p>Weight</p>
                <p>Speed</p>
            </div>
            {
                pokemon.map((pokemon => {
                    return(
                        <div className = 'guess'key = {pokemon.id}>

                            <AttrColor attr = {pokemon.pokemon} dailyAttr = {daily.pokemon}/>
                            <TypeColor attr = {pokemon.type} dailyAttr = {daily.type}/>
                            <AttrColor attr = {pokemon.evc} dailyAttr = {daily.evc}/>
                            <AttrColor attr = {pokemon.health} dailyAttr = {daily.health}/>
                            <AttrColor attr = {pokemon.attack} dailyAttr = {daily.attack}/>

                            <AttrColor attr = {pokemon.defense} dailyAttr = {daily.defense}/>
                            <AttrColor attr = {pokemon.height} dailyAttr = {daily.height}/>
                            <AttrColor attr = {pokemon.weight} dailyAttr = {daily.weight}/>
                            <AttrColor attr = {pokemon.speed} dailyAttr = {daily.speed}/>

                        </div>
                    )
                   
                }))
            }
        </div>
    )
}