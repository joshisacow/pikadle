'use client'
import { useEffect , useState} from 'react';
import './wordle.css'

function AttrColor({attr, dailyAttr}){
    if(attr == dailyAttr){
        if (typeof attr === "number"){
            return(
                <div className='guessRight' id='pokeName'>
                    <NumberArrows attr = {attr} dailyAttr={dailyAttr}/>
                </div>
            )
        }
        return(
            <div className = 'guessRight' id='pokeName'>
                <p>{attr}</p>
            </div>
        )
    }else {
        if (typeof attr === "number"){
            return(
                <div className='guessWrong' id='pokeName'>
                    <NumberArrows attr = {attr} dailyAttr={dailyAttr}/>
                </div>
            )
        }
        return(
            <div className = 'guessWrong' id='pokeName'>
                <p>{attr}</p>
            </div>
        )
    }
}

function NumberArrows({attr, dailyAttr}){
    if (attr > dailyAttr){
        return(
            <div className = 'upArrow' id='pokeArrow'></div>
        )
    }
    if (attr < dailyAttr){
        return(
            <div className='downArrow' id='pokeArrow'></div>
        )
    }
    return(
        <div className = 'square guessWrong' id='pokeSquare'></div>
    )
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

export default function Guesses({pokemon, setTrigger, daily , trigger, setCorrect}) {
    const [guesses, setGuesses] = useState([])
    useEffect(() => {
        setGuesses(oldArray => [...oldArray, pokemon])
        console.log("hello")
    }, [trigger])
    
    useEffect(()=> {
        if (pokemon){
            if (pokemon.name == daily.name){
                setCorrect(true)
            }
        }
    }, [trigger])
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
                guesses.map((pokemon => {
                    if (pokemon){
                        return(
                        
                            <div className = 'guess'key = {pokemon.pokemon_id}>
                                
                                <AttrColor attr = {pokemon.name} dailyAttr = {daily.name}/>
                                <TypeColor t1 = {pokemon.type1} t2 = {pokemon.type2} dt1={daily.type1} dt2 = {daily.type2}/>
                                <AttrColor attr = {pokemon.health} dailyAttr = {daily.health}/>
                                <AttrColor attr = {pokemon.attack} dailyAttr = {daily.attack}/>
    
                                <AttrColor attr = {pokemon.defense} dailyAttr = {daily.defense}/>
                                <AttrColor attr = {pokemon.height} dailyAttr = {daily.height}/>
                                <AttrColor attr = {pokemon.weight} dailyAttr = {daily.weight}/>
                                <AttrColor attr = {pokemon.speed} dailyAttr = {daily.speed}/>
    
                            </div>
                        )
                    }
                    
                   
                }))
            }
        </div>
    )
}