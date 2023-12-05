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
    if (attr==0){
        return(
            <div >
                <p>Attribute</p>
                <p>Unavailable</p>
            </div>
        )
    } else if (attr < dailyAttr){
        return(
            <div className = 'upArrow' id='pokeArrow'></div>
        )
    }
    if (attr > dailyAttr){
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
function SpriteAttr ({sprite, daily, guess}){
    if (sprite == "N/A"){
        if(daily == guess){
            return(
                <div className = 'guessRight' id='sprite'>
                    <p>{daily}</p>
                    <p>Sprite N/A</p>
                </div>
            )
        }else {
            return(
                <div className = 'guessWrong' id='sprite'>
                    <p>{guess}</p>
                    <p>Sprite N/A</p>
                </div>
            )
        }
    }
    if(daily == guess){
        return(
            <div className = 'guessRight' id='sprite'>
                <p>{daily}</p>
                <img className='guessSprite'src={sprite} alt="N/A"></img>
            </div>
        )
    }else {
        return(
            <div className = 'guessWrong' id='sprite'>
                <p>{guess}</p>
                <img className='guessSprite'src={sprite} alt = "N/A"></img>
            </div>
        )
    }
}
//pokemon: the pokemon that is guessed, daily: actual pokemon
export default function Guesses({pokemon, daily, guesses}) {
    const guessname = guesses[guesses.length-1]
    const [pokeSprite, setPokeSprite] = useState([])
    let counter = 0;
    const fetchSprite = () => {
        fetch(` https://pokeapi.co/api/v2/pokemon/${guessname.name.toLowerCase()}`)
            .then((response) => {
                if (response.ok){
                    return response.json()
                }
                setPokeSprite(oldArray => [...oldArray, "N/A"])
                throw new Error('PokeAPI not available')
            })
            .then((data) =>{
                console.log(data.sprites.front_default)
                setPokeSprite(oldArray => [...oldArray, data.sprites.front_default]);
            })
    }
    useEffect(()=>{
        if (guesses.length>0){
            fetchSprite()
        } else if (guesses.length==0){
            setPokeSprite([])
        }
    }, [guesses])
    
    if (guesses){
        return(
            <div id='guesses'>
                <div id='attrTitles'>
                    <p>Pokemon</p>
                    <p>Generation</p>
                    <p>Type</p>
                    <p>Health</p>
                    <p>Attack</p>
                    <p>Defense</p>
                    <p>Height</p>
                    <p>Weight</p>
                    <p>Speed</p>
                </div>
                {
                    guesses.map((pokemon, index) => {
                        console.log(guessname)
                        pokemon.sprite=pokeSprite[index]
                        if (pokemon){
                            return(
                            
                                <div className = 'guess'key = {pokemon.pokemon_id}>
                                    <SpriteAttr sprite={pokemon.sprite} daily={daily.name} guess={pokemon.name}></SpriteAttr>
                                    <AttrColor attr = {pokemon.generation} dailyAttr = {daily.generation}/>
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
                    })
                }
            </div>
        )
    }
    
}