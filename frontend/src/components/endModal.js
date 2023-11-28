import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export default function EndModal ({correct, pokemon, guesses}){
    const [pokeSprite, setPokeSprite] = useState(null)
    const fetchSprite = () => {
        fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
            .then((response) => {
                if (response.ok){
                    return response.json()
                }
                throw new Error('PokeAPI not available')
            })
            .then((data) =>{
                console.log(data.sprites.front_default)
                setPokeSprite(data.sprites.front_default)
            })
    }
    useEffect(()=>{
        fetchSprite();
    }, [])
    const handleClick = () => {
        document.getElementById("exampleModalCenter").style.display= "none";
    }
    let modalbody = ""
    let modaltitle = ""
    console.log(guesses)
    console.log(pokemon)
    if (correct){
        modalbody = "Congratulations on getting the pokemon in " + guesses + " guesses! The pokemon was " + pokemon 
        modaltitle = "Good job!"
    } else {
        modalbody = "You didn't get the pokemon. Better luck next time :P. The pokemon was " + pokemon
        modaltitle = "BOOHOO"
    }
    return(
        <div className="modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{modaltitle}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {modalbody}
                    <img src={pokeSprite} alt="image unavailable"></img>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleClick}>Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}