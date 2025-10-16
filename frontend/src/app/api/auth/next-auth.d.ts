// next-auth.d.ts
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name?: string;
      last_name?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    first_name?: string;
    last_name?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id: string;
    first_name?: string;
    last_name?: string;
  }
}
