import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import config from '../../config.json'

function AchievementTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the entire Achievement table from the API
    fetch(config.ACHIEVEMENT_URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching Achievement data:', error));
  }, []);

  return (
    <div>
      <h1>Achievement Table</h1>
      <table>
        <thead>
          <tr>
            <th>Achievement Name</th>
            <th>Description</th>
            <th>Criteria</th>
          </tr>
        </thead>
        <tbody>
          {data.map((achievement) => (
            <tr key={achievement.achievement_name}>
              <td>{achievement.achievement_name}</td>
              <td>{achievement.achievement_description}</td>
              <td>{achievement.achievement_criteria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AchievementTable;






/*
"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import config from '../../config.json'

export default function achievement(){ 
    const [badgeName, setBadgeName] = useState("");
    const [BadgeDescription, setBadgeDescription] = useState("");
    const inputRef = useRef(null);


    const fetchAcheivements = () =>{
        fetch(config.ACHIEVEMNET_URL)
    }


    

}
*/