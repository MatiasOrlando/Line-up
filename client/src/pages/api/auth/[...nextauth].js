import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,

  // Use MongoDB for database
  adapter: {
    async getAdapter() {
      await client.connect();
      const db = client.db(process.env.MONGODB_DB);
      return {
        async getUser(id) {
          return await db.collection("users").findOne({ _id: id });
        },
        async getUserByEmail(email) {
          return await db.collection("users").findOne({ email });
        },
        async updateUser(user) {
          await db
            .collection("users")
            .updateOne({ _id: user.id }, { $set: user }, { upsert: true });
        },
        async createUser(user) {
          await db.collection("users").insertOne(user);
          return user;
        },
      };
    },
  },
});
