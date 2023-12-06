"use client";

import React from 'react'
import { register } from './requests'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await register(data.get('username'), data.get('password'));
            toast(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="registerpage">
            <h1 id="registerheader">Register</h1>
            <form id= 'registerform' onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder='username'/>
                <input type="password" name="password" placeholder='password'/>
                <button type="submit">Sign up</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default RegisterForm