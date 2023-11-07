import React from 'react'
import { register } from './requests'

const RegisterForm = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const response = await register(data.get('username'), data.get('password'));
        console.log(response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" />
            <input type="password" name="password" />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm