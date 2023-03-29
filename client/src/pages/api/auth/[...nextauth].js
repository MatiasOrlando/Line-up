import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "my-project",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await axios.post(
          "http://localhost:3001/api/user/login",
          payload
        );
        const userData = res.data[0];

        if (userData) {
          console.log(userData);
          return userData;
        } else {
          console.log(`User not found`);
        }

        // Return null if user data could not be retrieved
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log(token, "TOKEN");
      console.log(user, "USER");
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
