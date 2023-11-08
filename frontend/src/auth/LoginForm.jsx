"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import config from '../../config'

export default function Form() {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await signIn('credentials', { 
                username: data.get('username'), 
                password: data.get('password'), 
                callbackUrl: config.BASE_URL
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }   
    };
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" />
                <input type="password" name="password" />
                <button type="submit">Sign in</button>
                <button type="button" onClick={() => router.push("/register")}>Sign up</button>
            </form>
        </>
    )
}