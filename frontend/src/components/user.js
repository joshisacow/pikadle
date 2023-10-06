"use client"

import { useEffect, useState } from "react"
import config from '../../config.json'


export default function User () {
    const [user, setUser] = useState()

    let user1 = {username: "hello", uid: 1, email: "whatever"}

    const fetchUser = () =>{
        fetch(config.USER_URL + "1")
            .then(response => response.json())
            .then((data) => {
                setUser(data)
            })
    }
    useEffect(() =>{
        fetchUser()
    }, [])
    return (
        <div>
            <div id='username'>{user1.username}</div>
            <div id="uid">{user1.uid}</div>
            <div id = "email">{user1.email}</div>
            {/* <div id='username'>{user.username}</div>
            <div id="uid">{user.uid}</div>
            <div id = "email">{user.email}</div> */}
        </div>
    )
}