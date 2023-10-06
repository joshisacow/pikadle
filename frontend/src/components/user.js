"use client"

import { useEffect, useState } from "react"
import config from '../../config.json'
import Button from 'react-bootstrap/Button'
import { URLSearchParams } from 'url';



export default function User () {
    const [user, setUser] = useState()
    const[userName, setUserName] = useState("")

    const fetchUser = () =>{
        fetch(config.USER_URL + "?uid=2")
            .then(response => response.json())
            .then((data) => {
                setUser(data)
                console.log(config.USER_URL)
            })
    }
    useEffect(() =>{
        fetchUser()
        console.log(user)
    }, [])

    const handleSubmit = (e) => {
        console.log(username)
        fetch(config.USER_URL, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                uid: 40,
                username: "fwe",
                email: "hello",
                number_of_pokemon: 1,
                number_of_badges: 1
            })})
            .then (response =>response.json())

    }
    if (user){
        return (
            <div>
                {/* <div id='username'>{user1.username}</div>
                <div id="uid">{user1.uid}</div>
                <div id = "email">{user1.email}</div> */}
                <div id='username'>{user[1]}</div>
                <div id="uid">{user[0]}</div>
                <div id = "email">{user[2]}</div>
                <input type ="text" id= "username"onChange={setUserName}/>
                <Button onClick = {handleSubmit}> hit</Button>
    
    
            </div>
        )
    }

}