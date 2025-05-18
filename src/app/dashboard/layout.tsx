import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    console.log("Unauthorized");
    redirect("/");
  }

  return (
    <main className="flex-1 p-2 md:p-4">
      {children}
    </main>
  );
}
