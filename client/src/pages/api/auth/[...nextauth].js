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
          const userData = res.data;
          return userData;
        } catch (error) {
          console.error(error);
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
      // console.log(token, "TOKEN");
      // console.log(user, "USER");
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
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
});
