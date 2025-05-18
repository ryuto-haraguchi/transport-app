import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex-1 p-2 md:p-4">
      {children}
    </main>
  );
}
