import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./lib/db";
import User from "./models/user.model";

import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          await connectDb();
          const email = credentials.email;
          const password = credentials.password as string;
          const user = await User.findOne({ email });

          if (!user) {
            //throw new Error("user does not exits");
            return null;
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            // throw new Error("Passwrod is incorrect");
            return null;
          }

          //return user
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          return null;
          // throw new Error(`login error: ${error}`);
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // trigger when comming from google
    async signIn({ user, account }) {
      if (account?.provider == "google") {
        await connectDb();
        console.log("google user is ", user);
        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
        user.id = dbUser._id.toString();
        user.role = dbUser.role;
      }
      return true;
    },

    //token is genrated by nextauth after signIn
    //user is what authorize return
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        //inise nextauth we have uesr and it asuem three thins id ,name and email
        //as adding role as user.role so we have to add this in that use inside next-auth package
        //this is bascilay for typescript
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, //giving in seconds(this example is 10 days)
  },
  secret: process.env.AUTH_SECRET,
});
