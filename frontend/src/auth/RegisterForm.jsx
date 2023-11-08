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
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" />
                <input type="password" name="password" />
                <button type="submit">Sign up</button>
            </form>
            <ToastContainer />
        </>
    )
}

export default RegisterForm