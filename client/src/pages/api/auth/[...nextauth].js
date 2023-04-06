import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "line-up",
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        try {
          const res = await axios.post(
            "http://localhost:3001/api/user/login",
            payload
          );
          const user = res.data;
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: "Matias",
    signingKey: "Matias",
    encryption: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      const isUserSignedIn = user ? true : false;
      if (isUserSignedIn) {
        const dataToken = jwt.sign(user, "Matias", {
          expiresIn: "2d",
        });
        token.accessToken = dataToken;
        token.role = { admin: user.admin, operator: user.operator };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.accessToken;
      session.role = token.role;
      return session;
    },
  },
});
