import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
  throw new Error('Google認証の環境変数が設定されていません');
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
  ],
})