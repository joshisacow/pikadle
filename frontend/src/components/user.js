"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import config from '../../config.json'


export default function User () {
        const [userName, setUserName] = useState("");
        const [userData, setUserData] = useState(null);
        const [loading, setLoading] = useState(false);
        const inputRef = useRef(null);
        useEffect(() => {
            if(userName) {
                setLoading(true);
                fetch(config.USER_URL + userName).then((response) => {
                    if (!response.ok) {
                        throw new Error('User not found');
                    }
                    return response.json();
                    }).then((data) => {
                      setUserData(data);
                      setLoading(false);
                    }).catch((error) => {
                    console.error('Error fetching User data:', error);
                      setUserData(null);
                      setLoading(false);
                    });
            }
        }, [userName]);
        
        const handleInputChange = (e) => {
            setUserName(e.target.value);
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="shadow-md rounded p-6 max-w-xl w-full">
                <h1 className="text-2xl font-bold mb-4">User Information</h1>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter a User ID"
                    ref={inputRef}
                    //onChange={handleInputChange}
                  />
                </div>
                <button
                  className="w-full py-2 px-4 text-white bg-blue-400 rounded-md hover:bg-blue-700"
                  onClick={() => setUserName(inputRef.current.value)}
                >
                  Get Info
                </button>
                {loading && <p className="mt-4">Loading...</p>}
                {userData && (
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold">{userData.username}</h2>
                    <p>Number of Pokemon: {userData.number_of_pokemon}</p>
                    <p>Number of Badges: {userData.number_of_badges}</p>
                    <p>Email: {userData.email}</p>
                  </div>
                )}
              </div>
            </div>
      );
}
        
=======
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
                username: username,
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