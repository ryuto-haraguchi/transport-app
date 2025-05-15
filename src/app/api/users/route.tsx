import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("API Error (GET /api/user):", error);
    return NextResponse.json(
      { message: "データの取得に失敗しました。" },
      { status: 500 }
    );
  }
}
