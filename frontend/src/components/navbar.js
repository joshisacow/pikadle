"use client"

import React from 'react';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from 'next/link';
import config from '../../config'
import './wordle.css'
import './navbar.css'

// loggedIn is the state of being logged in or not
// username is the Display Name of the user, fetched from SHIB
// netid is the Net ID of the user, fetched from SHIB
const NavBar = () => {

  const { data: session, status } = useSession();

  const navStyle = {
    backgroundColor: '#FFFFFF',
    padding: '20px 0',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#000000',
    fontWeight: 'bold',
    margin: '0 15px',
    transition: 'color 0.3s',
  };

  const activeLinkStyle = {
      color: '#66d9ff',
  };

  return (
    <nav className="bg-white-400">
    <div className="container mx-auto flex items-center justify-between">
      <ul className="flex space-x-6 text-black linklist">
        <Link
          href="/"
          className="navlink hover:text-blue-400"
        >
          <button className='navbutton'>
            Home
          </button>
        </Link>
        <Link
          href="/user"
          className="navlink hover:text-blue-400"
        >
          <button className='navbutton'>
            User
          </button>
        </Link>
        <Link
          href="/safari"
          className="navlink hover:text-blue-400"
        >
          <button className='navbutton'>
            Safari
          </button>
        </Link>
        <Link
            href="/archive"
            className="navlink hover:text-blue-400"
          >
          <button className='navbutton'>
            Archive
          </button>
        </Link>

          {!session && (
            <Link
              href="/login"
              className="loginbutton absolute top-8 right-10 text-lg font-medium text-white rounded-lg"
            >
              Login
            </Link>
          )}
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: config.BASE_URL })}
              className="loginbutton absolute top-8 right-10 text-lg font-medium text-white rounded-lg"
            >
              Sign out
            </button>
          )}
          
      </ul>
    </div>
  </nav>
    );
};

export default NavBar;