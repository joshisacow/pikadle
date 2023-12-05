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
    /** 
    <nav style={navStyle}>
      <NavLink to="/" exact style={linkStyle} activeStyle={activeLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/user" style={linkStyle} activeStyle={activeLinkStyle}>
        User
      </NavLink>
      <NavLink to="/safari" style={linkStyle} activeStyle={activeLinkStyle}>
        Safari
      </NavLink>
    </nav>
    */
    <nav className="bg-white-400">
    <div className="container mx-auto flex items-center justify-between">
      <ul className="flex space-x-6 text-black">
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
              className="absolute top-8 right-10 text-lg font-medium bg-slate-500 p-2 text-white hover:bg-slate-600 rounded-lg active:bg-slate-700"
            >
              Login
            </Link>
          )}
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: config.BASE_URL })}
              className="absolute top-8 right-10 text-lg font-medium bg-slate-500 p-2 text-white hover:bg-slate-600 rounded-lg active:bg-slate-700"
            >
              Sign out
            </button>
          )}
          
      </ul>
    </div>
  </nav>
    );
};
    // <div className="sidebar-sticky">
    //   <nav className="col-md-2 d-md-block bg-navblue sidebar">
    //     <div>
    //       <div className="navbar-logo">
    //         <NavLink to="/home">
    //           <img src={chipImage} alt="Logo" className="logo-image" />
    //         </NavLink>
    //       </div>
    //       <ul className="nav flex-column">
    //         <li className="nav-item">
    //           <NavLink to="/home" className="nav-link">
    //             Home
    //           </NavLink>
    //         </li>

    //         {!loggedIn && (
    //           <>
    //             <li className="nav-item">
    //               <NavLink to="/" onClick={handleLoginClick} className="nav-link">
    //                 Login
    //               </NavLink>
    //             </li>
    //           </>
    //         )}

    //         {loggedIn && (
    //           <>
    //             <li className="nav-item">
    //               <NavLink to="/viewsboms" className="nav-link">
    //                 View SBOMs
    //               </NavLink>
    //             </li>
    //             <li className="nav-item">
    //               <NavLink to="/generatesboms" className="nav-link">
    //                 Generate SBOMs
    //               </NavLink>
    //             </li>
    //             <li className="nav-item">
    //               <NavLink to="http://localhost:8080/destroy" className="nav-link">
    //                 Logout
    //               </NavLink>
    //             </li>

    //             {/* profile information in the bottom left corner */}
    //             <ProfileComp username={username} netid={netid} />
    //           </>
    //         )}
    //       </ul>
    //     </div>
    //   </nav>
    // </div>

export default NavBar;