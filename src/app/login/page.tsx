"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6">
            <Image src="/images/track.jpeg" alt="logo" width={100} height={100} className="rounded-full" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        </div>
        <form className="w-full flex flex-col gap-4 mb-4">
          <Input type="email" placeholder="メールアドレス" />
          <Button type="submit" className="w-full" variant="default">
            続ける
          </Button>
        </form>
        <div className="w-full text-center mb-4">
          <span className="text-sm text-gray-500">
            アカウントが未登録ですか？{" "}
            <a href="#" className="text-green-600 hover:underline">
              サインアップ
            </a>
          </span>
        </div>
        <div className="flex items-center w-full mb-4 gap-2 min-w-0">
          <Separator className="flex-grow basis-0 min-w-0" />
          <span className="text-gray-400 text-sm whitespace-nowrap flex-shrink-0">
            または
          </span>
          <Separator className="flex-grow basis-0 min-w-0" />
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Button
            type="button"
            onClick={() => signIn("google")}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Google で続ける
          </Button>
        </div>
        <div className="flex justify-center gap-2 text-xs text-gray-400">
          <a href="#" className="hover:underline">
            Terms of use
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
}
