import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          return res.data;
        } catch (error) {
          return;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  basePath: process.env.NEXTAUTH_URL,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      try {
        const userData = await this.getData(session.user.email);
        session.user.data = userData;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.accessTokenExpires = token.accessTokenExpires;
        return session;
      } catch (error) {
        console.error(error);
      }
    },
    async getData(email) {
      const res = await axios.get(
        `http://localhost:3001/api/user/email/${email}`
      );
      return res.data;
    },
  },
});
