'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>ようこそ, {session.user?.name} さん！</p>
        <button onClick={() => signOut()}>サインアウト</button>
      </div>
    )
  } else {
    return <button onClick={() => signIn("google")}>Googleでログイン</button>
  }
}