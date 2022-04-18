import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { dbUsers } from "../../../database";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Custom Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        console.log({ credentials });

        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  //Callbacks

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.accessToken;
        switch (account.type) {
          case "credentials":
            token.user = user;

            break;
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;
          default:
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.accesstoken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
});
