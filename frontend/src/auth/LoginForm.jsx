"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import config from '../../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast(response);
        } catch (error) {
            console.log(error);
        }   
    };
    return (
        <div id="loginpage">
            <h1 id="logheader">Login</h1>
            <form id="loginform" onSubmit={handleSubmit}>
                <input id="username" type="text" name="username" />
                <input id="password" type="password" name="password" />
                <button id = "signin"type="submit">Sign in</button>
                <button iid = "signup"type="button" onClick={() => router.push("/register")}>Sign up</button>
            </form>
            <ToastContainer />
        </div>
    )
}