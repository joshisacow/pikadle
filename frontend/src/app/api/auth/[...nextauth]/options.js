import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { validate } from '@/app/auth/requests.js'

export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                console.log(credentials);
                const response = await validate(credentials.username, credentials.password);
                console.log(response);
                
                if (response.status === 200) {
                    return {
                        id: response.id,
                        name: response.name
                    }
                } else {
                    return null;
                }
            }
        }),
    ],
}