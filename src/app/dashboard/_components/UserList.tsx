"use client";
import useSWR, { mutate } from "swr";
import User from "@/types/user";
import UserDrawer from "./UserDrawer";
import { fetcher } from "@/lib/fetchers";
import { Suspense } from "react";

const GET_USERS_API_KEY = "/api/users";

export default function UserList() {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<User[]>(GET_USERS_API_KEY, fetcher, {
    revalidateOnFocus: false, 
    suspense: true,
    fallbackData: [],
  });

  const handleUserUpdated = () => {
    mutate(GET_USERS_API_KEY);
  };

  if (error) {
    console.error("Failed to fetch users (SWR):", error);
    const errorMessage = error.info?.message || error.message || "不明なエラー";
    const errorStatus = error.status ? ` (Status: ${error.status})` : "";
    return (
      <p className="text-center p-4 text-red-500">
        データの取得に失敗しました。エラー: {errorMessage}
        {errorStatus}
      </p>
    );
  }

  if (!users || users.length === 0) {
    return <p className="text-center p-4">表示するユーザーがいません。</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Suspense fallback={<p className="text-center p-4">データを取得中です...</p>}>
        {users.map((user) => (
          <div key={user.id} className="mb-2 rounded-md w-[250px] text-white">
            <UserDrawer
              trigger={
                <div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.phone_number}</p>
                </div>
              }
              title={user.name}
              description={user.email}
              user={user}
              onUserUpdated={handleUserUpdated}
              />
          </div>
        ))}
      </Suspense>
    </div>
  );
}
