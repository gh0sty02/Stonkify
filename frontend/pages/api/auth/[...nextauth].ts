import axios from "axios";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers

  //@ts-ignore
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.BACKEND_URL}/api/users/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token = { accessToken: user.token };
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as User;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
