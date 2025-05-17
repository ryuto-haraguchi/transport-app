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
  } catch (error: any) {
    if (
      error &&
      typeof error.code === "string" &&
      error.code === "P2002" &&
      error.meta?.target
    ) {
      console.log(error);
      const target = error.meta.target; // metaとtargetの存在は上でチェック済み
      const fields = Array.isArray(target) ? target : undefined;
      let friendlyMessage = "指定された情報が既に使用されています。";

      if (fields && fields.includes("email")) {
        friendlyMessage = "このメールアドレスは既に使用されています。";
         friendlyMessage = "この電話番号は既に使用されています。";
      } else if (fields) {
        friendlyMessage = `「${fields.join(
          ", "
        )}」の値が既に使用されています。`;
      }
      return NextResponse.json({ message: friendlyMessage }, { status: 409 });
    }
    // その他のエラー
    return NextResponse.json(
      { message: "ユーザー作成中に予期せぬエラーが発生しました。" },
      { status: 500 }
    );
  }
};
