import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../lib/mongodb"


export default NextAuth ({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({token, session}) => {
      if (session?.user && token) {
        session.user = {
          ...session.user,
          id: token.sub,
        };
      }
      return session;
    },
  },
})