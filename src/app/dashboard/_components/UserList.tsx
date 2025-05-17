"use client";
import { useEffect, useState } from "react";
import User from "@/types/user";

const GET_USERS = "/api/users"; 

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(GET_USERS, { cache: "no-store" });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center p-4">データを取得中です...</p>;
  }

  if (users.length === 0) {
    return <p className="text-center p-4">表示するユーザーがいません。</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="bg-gray-600 p-2 mb-2 rounded-md w-[200px] text-white">
          <p>
            {user.id} - {user.name}
          </p>
          <p>{user.email}</p>
          <p>{user.phone_number}</p>
        </li>
      ))}
    </ul>
  );
}
