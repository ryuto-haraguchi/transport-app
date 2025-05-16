import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// クエリパラメーターを受け取る時は_requestを使う
export const GET = async (_request: NextRequest) => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("API Error (GET /api/users):", error);
    return NextResponse.json(
      { message: "データの取得に失敗しました。" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, phone_number } = await request.json();
    const user = await prisma.user.create({
      data: { name, email, phone_number },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("API Error (POST /api/users):", error);
    return NextResponse.json(
      { message: "データの作成に失敗しました。" },
      { status: 500 }
    );
  }
};
