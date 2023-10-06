"use client"

import React from 'react';
import { NavLink } from 'react-router-dom';

// loggedIn is the state of being logged in or not
// username is the Display Name of the user, fetched from SHIB
// netid is the Net ID of the user, fetched from SHIB
const NavBar = () => {
  return (
    <nav>
        <NavLink to = '/#'>
            Home
        </NavLink>
        <NavLink to = '/user'>
            User
        </NavLink>
    </nav>
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
  );
};

export default NavBar;