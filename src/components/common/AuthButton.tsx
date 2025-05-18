"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>ようこそ, {session.user?.name} さん！</p>
      </div>
    );
  } else {
    return (
      <button onClick={() => signIn("google", undefined, { prompt: "select_account" })}>
        Googleでログイン
      </button>
    );
  }
}
