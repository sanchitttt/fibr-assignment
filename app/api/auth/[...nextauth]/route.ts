import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import config from "@/app/config/config";

const authOptions: NextAuthOptions = {
    providers:
        [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
            }),
            CredentialsProvider({
                type: "credentials",
                credentials: {
                    email: { label: "Email", type: "email", placeholder: "Enter your email" },
                    password: { label: "Password", type: "password", placeholder: "Enter your password" }
                },
                async authorize(credentials, req) {
                    try {
                        try {
                            const verifiedUser = await axios.post(`${config.BACKEND_ENDPOINT}/user/login`, {
                                email: credentials?.email,
                                password: credentials?.password
                            })
                            return verifiedUser.data;
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    } catch (error) {
                        console.log('pura hi error', error)
                        return null;
                    }
                },
            })
        ],
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 60 * 60 * 60 * 24 * 30
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                await axios.post(`${config.BACKEND_ENDPOINT}/user/signup`, {
                    email: profile?.email,
                    image: user.image,
                })
            } catch (error) {
                console.log(error);
            }
            return true;
        },
    }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };