import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { validate } from '@/auth/requests.js'

export const options = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                console.log(credentials);
                console.log("authorize");
                try {
                    const response = await validate(credentials.username, credentials.password);
                    if (response === "Incorrect password") {
                        return null;
                    }
                    return response;
                } catch (error) {
                    console.error(error);
                    return null;
                }
                
                // console.log(response.status);
                // if (response.status === 200) {
                //     return {
                //         id: response.uid,
                //         name: response.username
                //     }
                // } else {
                //     return "fail";
                // }
            }
        }),
    ],
}