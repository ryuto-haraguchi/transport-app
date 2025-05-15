"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  type User = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
  };

  const GET_USERS = "api/users";
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(GET_USERS, {
        cache: "no-store",
      });
      const data = await response.json();
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul className="bg-gray-400 p-2 rounded-md w-1/2">
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.id} - {user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone_number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
