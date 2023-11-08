"use client";

import React from 'react'
import { register } from './requests'

const RegisterForm = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await register(data.get('username'), data.get('password'));
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" />
                <input type="password" name="password" />
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default RegisterForm