'use client'

export default function Guesses(pokemon) {
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
    return(
        <div>
            <div className = 'guess'>
                <div className = 'guessAttr'>
                    <p>box</p>
                </div>
                <div className = 'guessAttr'>
                    <p>box</p>
                </div>
                <div className = 'guessAttr'>
                    <p>box</p>
                </div>
                <div className = 'guessAttr'>
                    <p>box</p>
                </div>
            </div>
        </div>
    )
}