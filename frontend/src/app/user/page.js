"use client"

import { useEffect, useState } from "react"
import config from '../../../config.json'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import Image from 'next/image';
import "./page.css";


export default function User () {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const [badgeCount, setBadgeCount] = useState(0);
  const [pokeCount, setPokeCount] = useState(0);
  const [userBadges, setUserBadges] = useState([]);
  const [userPokemon, setUserPokemon] = useState([]);
  const [safariScore, setSafariScore] = useState(0);
  const [pokeSprite, setPokeSprite] = useState({});

  const fetchUserInfo = () =>{
    if (session) {
      fetch(config.USER_URL + session.user.uid)
      .then(response => response.json())
      .then((data) => {
          setPokeCount(data.number_of_pokemon);
          setBadgeCount(data.number_of_badges);
          setSafariScore(data.safari_score);

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
        <h2 className="font-bold text-xl">User Pokemon Information</h2>
        <p className="descriptions">You have {pokeCount} pokemon.</p>
        <p className="safari-score">Safari High Score: {safariScore} </p>
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
        <h2 className="font-bold text-xl">User Badge Information</h2>
        <p className='descriptions'>You have {badgeCount} badges.</p>
        {userBadges && <div id = "badge-display">
          {userBadges.map((badge => {
            if(badge){
              return(
                <div id = {badge.badge_id} className = "badge-box" >
                  {/* <img className='badgeSprite'src={badge.badge_sprite}></img> */}
                  <Image src={"/trophy.svg"} width="40" height="40" className="badge-sprite" />
                  <div className="badge-description">
                    <p className="text-lg font-semibold">{badge.badge_name}</p>
                    <p>{badge.badge_description}</p>
                  </div>
                </div>
              )
            }
          }))}
        </div>}
      </div>
    </div>
    
  ) : null;
}