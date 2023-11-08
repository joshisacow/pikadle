"use client"

import Wordle from '@/components/wordle.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '@/components/navbar';
import User from '@/components/user.js'
import Safari from '@/components/safari.js'
import Login from '@/app/auth/Login'
export default function Home() {
  return (
    <main>
      <h1 class="text-4xl font-bold text-center my-8">Pikadle</h1>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Wordle />} />
          <Route path="/user" element={<User />} />
          <Route path="/safari" element={<Safari />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </main>
  )
}
