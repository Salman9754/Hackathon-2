import apiInstance from "@/utils/api-instance";
import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await apiInstance.post("/sign-in", credentials);
          const { token, user } = response.data;

          if (user) {
            return {
              id: user._id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              accessToken: token,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.email = user.email;
        token.name = `${user.first_name} ${user.last_name}`;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
};

export default authOptions;
