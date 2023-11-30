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
                try {
                    const response = await validate(credentials.username, credentials.password);
                    if (response.status !== 200) {
                        return null;
                    }
                    const data = await response.json();
                    delete data.password;
                    console.log(data);
                    return data;
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
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            console.log(session)
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
            token.user = user;
            }
            return token;
        },
    },
}