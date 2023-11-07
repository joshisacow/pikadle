"use client"

import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function Form() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        const email = target.email.value;
        const password = target.password.value;

        signIn('credentials', { 
            email: FormData.get('email'), 
            password: FormData.get('password'), 
            redirect: false
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button type="submit">Sign in</button>
        </form>
    )
}