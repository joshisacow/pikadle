"use client"

import { useEffect, useState } from "react"
import config from '../../config.json'
import Button from 'react-bootstrap/Button'


export default function User () {
    const [user, setUser] = useState()
    const[username, setUsername] = useState("")
    let user1 = {username: "hello", uid: 1, email: "whatever"}

    // const fetchUser = () =>{
    //     fetch(config.USER_URL + "1")
    //         .then(response => response.json())
    //         .then((data) => {
    //             setUser(data)
    //             console.log(config.USER_URL)
    //         })
    // }
    // useEffect(() =>{
    //     fetchUser()
    // }, [])

    const fetchPost = () =>{
       ;
    }
    const handleSubmit = (e) => {
        fetch(config.USER_URL, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                uid: 0,
                username: username,
                email: "hello",
                number_of_pokemon: 1,
                number_of_badges: 1
            })})

    }
    return (
        <div>
            <div id='username'>{user1.username}</div>
            <div id="uid">{user1.uid}</div>
            <div id = "email">{user1.email}</div>
            {/* <div id='username'>{user.username}</div>
            <div id="uid">{user.uid}</div>
            <div id = "email">{user.email}</div> */}
            <input type ="text" id= "username"onChange={setUsername}/>
            <input type ="text" id= "username"onChange={setUsername}/>
            <input type ="text" id= "username"onChange={setUsername}/>
            <input type ="text" id= "username"onChange={setUsername}/>
            <input type ="text" id= "username"onChange={setUsername}/>

            <Button onSubmit = {handleSubmit}> hit</Button>
        </div>
    )
}