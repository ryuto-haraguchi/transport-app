"use client";
import useSWR, { mutate } from "swr";
import User from "@/types/user";
import UserDrawer from "./UserDrawer";
import { fetcher } from "@/lib/fetchers";

const GET_USERS_API_KEY = "/api/users";

export default function UserList() {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<User[]>(GET_USERS_API_KEY, fetcher, {
    revalidateOnFocus: false, // ウィンドウフォーカス時の自動再検証を無効化
    revalidateOnMount: false, // マウント時の自動再検証を無効化
    // dedupingInterval: 5000, // 短期間での重複リクエストを抑制 (ミリ秒)
  });

  const handleUserUpdated = () => {
    // ユーザー更新後、GET_USERS_API_KEYに紐づくデータを再検証 (再フェッチ)
    // mutateの第2引数にfalseを渡すと、ローカルキャッシュを更新せずに再フェッチのみ行う
    mutate(GET_USERS_API_KEY);
  };

  if (isLoading) {
    return <p className="text-center p-4">データを取得中です...</p>;
  }

  if (error) {
    console.error("Failed to fetch users (SWR):", error);
    // errorオブジェクトにstatusやinfoが含まれている可能性があるので、それも表示するとデバッグに役立ちます
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
      {users.map((user) => (
        <div key={user.id} className="p-2 mb-2 rounded-md w-[250px] text-white">
          <UserDrawer
            trigger={<p>{user.name}</p>}
            title={user.name}
            description={user.email}
            user={user}
            onUserUpdated={handleUserUpdated}
          />
        </div>
      ))}
    </div>
  );
}
