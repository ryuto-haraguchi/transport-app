import NextAuth, { type User as NextAuthUser } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import User from "@/types/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }: { user: NextAuthUser }): Promise<string | boolean> {
      if (!user.email) {
        return `/auth/login?error=EmailNotFound`;
      }
      try {
        const signUpedUser: User | null = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (!signUpedUser) {
          return `/auth/login?error=UserNotRegistered`;
        }
        return true;
      } catch (dbError) {
        console.error("Database error during signIn:", dbError);
        return `/auth/login?error=DatabaseError`;
      }
    },
  },
});
