"use client"

import { useEffect, useState, useMemo, useRef, use } from "react"
import config from '../../../config.json'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import "./page.css"


export default function User () {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const [badgeCount, setBadgeCount] = useState(0)
  const [pokeCount, setPokeCount] = useState(0)
  const [userBadges, setUserBadges] = useState([])
  const [userPokemon, setUserPokemon] = useState([])
  const [pokeSprite, setPokeSprite] = useState({})

  const fetchUserInfo = () =>{
    if (session) {
      fetch(config.USER_URL + session.user.uid)
      .then(response => response.json())
      .then((data) => {
          setPokeCount(data.number_of_pokemon);
          setBadgeCount(data.number_of_badges);

          // iterate through badges and set state
          const newUserBadges = [];
          for (let i = 0; i < data.number_of_badges; i++){
            newUserBadges.push(data.badge_array[i]);
          }
          setUserBadges(newUserBadges);
      })
    }
  }

  const fetchPokeDisplay = () => {
    if (session) {
      fetch(config.CAUGHT_URL + session.user.uid)
      .then(response => response.json())
      .then((data) => {
        setUserPokemon(data);
        if(data.length > 0) {
          // reset sprites every time we get new pokemon
          for (let i = 0; i < data.length; i++){
            fetchSprite(data[i].name)
          }
        }
      })
    } 
  }
  const fetchSprite = (pokemon) => {
    fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
        .then((response) => {
            if (response.ok){
                return response.json()
            }
        })
        .then((data) =>{
          if (data){
            let updatedValue = {}
            updatedValue[pokemon] = data.sprites.front_default
              setPokeSprite(oldObject => ({
                ...oldObject,
                ...updatedValue
              }));
        }
        })
  }
  
  // refetch user info when session changes
  useEffect(()=>{
    fetchUserInfo();
    fetchPokeDisplay();
  }, [session]);

  return session ? (
    <div id='user-page'>
      <div id ="user-info">
        <h2 id='welcome'>Welcome {session.user.username}!</h2>
      </div>
      <div id = "user-pokemon-info">
        <h2>User Pokemon Information</h2>
        <p className="descriptions">You have {pokeCount} pokemon.</p>
        {userPokemon.length > 0 && <div id = "pokemon-display">
          {userPokemon.map((pokemon, id) => {
            if(pokemon){
              return(
                <div className="pokesprite" id = {id}>
                  <p className="pokename">{pokemon.name}</p>
                  <p>Date Caught: {pokemon.date ? pokemon.date: 'N/A'}</p>
                  <p>Attempts: {pokemon.attempts ? pokemon.attempts: 'N/A'}</p>
                  <img className='userpokeSprite'src={pokeSprite[pokemon.name]} alt="N/A"></img>
                  {/* <p>Date Caught: {pokemon.date}</p>
                  <p>Number of Guess Attempts: {pokemon.number_of_attempts}</p> */}
                </div>
              )
            }
          })}
        </div>}
      </div>
      <div id = "badge-info">
        <h3>User Badge Information</h3>
        <p className='descriptions'>You have {badgeCount} badges.</p>
        {userBadges && <div id = "badge-display">
          {userBadges.map((badge => {
            if(badge){
              return(
                <div id = {badge.badge_id}>
                  <p>Badge Name: {badge.badge_name}</p>
                  <p>Badge Criteria: {badge.badge_description}</p>
                </div>
              )
            }
          }))}
        </div>}
      </div>
    </div>
    
  ) : null;
  
  
//   user
// : 
// number_of_badges
// : 
// 0
// number_of_pokemon
// : 
// 0
// uid
// : 
// "05b9468c-7e9b-11ee-a5bf-f9d0ae8cd451"
// username
// : 
// "olly"


  // const [userName, setUserName] = useState("");
  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const inputRef = useRef(null);
  // useEffect(() => {
  //     if(userName) {
  //         setLoading(true);
  //         fetch(config.USER_URL + userName).then((response) => {
  //             if (!response.ok) {
  //                 throw new Error('User not found');
  //             }
  //             return response.json();
  //             }).then((data) => {
  //               setUserData(data);
  //               setLoading(false);
  //             }).catch((error) => {
  //             console.error('Error fetching User data:', error);
  //               setUserData(null);
  //               setLoading(false);
  //             });
  //     }
  // }, [userName]);
  // const handleInputChange = (e) => {
  //     setUserName(e.target.value);
  // };

  // return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //       <div className="shadow-md rounded p-6 max-w-xl w-full">
  //         <h1 className="text-2xl font-bold mb-4">User Information</h1>
  //         <div className="mb-4">
  //           <input
  //             type="text"
  //             className="w-full px-3 py-2 border rounded-md"
  //             placeholder="Enter a User ID"
  //             ref={inputRef}
  //             //onChange={handleInputChange}
  //           />
  //         </div>
  //         <button
  //           className="w-full py-2 px-4 text-white bg-blue-400 rounded-md hover:bg-blue-700"
  //           onClick={() => setUserName(inputRef.current.value)}
  //         >
  //           Get Info
  //         </button>
  //         {loading && <p className="mt-4">Loading...</p>}
  //         {userData && (
  //           <div className="mt-4">
  //             <h2 className="text-xl font-semibold">{userData.username}</h2>
  //             <p>Number of Pokemon: {userData.number_of_pokemon}</p>
  //             <p>Number of Badges: {userData.number_of_badges}</p>
  //             <p>Email: {userData.email}</p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  // );
}