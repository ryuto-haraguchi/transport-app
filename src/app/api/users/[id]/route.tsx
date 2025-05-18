import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { message: "User ID not found in request parameters" },
        { status: 400 }
      );
    }

    const { name, email, phoneNumber } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { name, email, phoneNumber },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found for update" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "User not found to update" },
        { status: 404 }
      );
    }
    if (error.code === "P2002" && error.meta?.target) {
      const targetFields = Array.isArray(error.meta.target)
        ? error.meta.target.join(", ")
        : error.meta.target;
      let friendlyMessage = `A user with this ${targetFields} already exists.`;
      if (
        Array.isArray(error.meta.target) &&
        error.meta.target.includes("email")
      ) {
        friendlyMessage = "このメールアドレスは既に使用されています。";
      } else if (
        typeof error.meta.target === "string" &&
        error.meta.target === "email"
      ) {
        friendlyMessage = "このメールアドレスは既に使用されています。";
      }
      return NextResponse.json({ message: friendlyMessage }, { status: 409 });
    }
    return NextResponse.json(
      { message: "ユーザー更新中にエラーが発生しました。" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  try {
    if (!id) {
      return NextResponse.json(
        { message: "User ID not found in request parameters" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "ユーザーを削除しました。" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "User not found to delete" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "ユーザーの削除に失敗しました。" },
      { status: 500 }
    );
  }
};
