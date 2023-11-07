import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                const user = { id: 1, name: 'ash', password: "pikachu" };
                if (user && user.password === credentials.password && user.name === credentials.username) {
                    return user
                } else {
                    return null
                }
            }
        }),
    ],
}