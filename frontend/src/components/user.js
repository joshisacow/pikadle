"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import config from '../../config.json'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';



export default function User () {
        const { data: session, status } = useSession({
          required: true,
          onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/user");
          },
        });
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