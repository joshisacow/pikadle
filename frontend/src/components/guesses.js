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
function TypeColor({t1, t2, dt1, dt2}){
    let counter = 0;
    if (t1 == dt1 || t1 ==dt2){
        counter ++;
    }
    if (t2 ==dt1 || t2 == dt2){
        counter ++;
    }
    if (counter == 2){
        return(
            <div className = 'guessRight' id='pokeName'>
                <p>{t1}</p>
                <p>{t2}</p>
            </div>
        )
    }else if (counter ==1){
        return(
            <div className = 'guessOK' id='pokeName'>
                <p>{t1}</p>
                <p>{t2}</p>
            </div>
        )
    } else {
        return(
            <div className = 'guessWrong' id='pokeName'>
                <p>{t1}</p>
                <p>{t2}</p>
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
                            <TypeColor t1={pokemon.type1} t2={pokemon.type2} dt1 = {daily.type1} dt2= {daily.type2}/>
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