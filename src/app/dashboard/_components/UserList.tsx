"use client";

import User from "@/types/user";
import { useEffect, useState } from "react";

const UserList = () => {
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
    <ul className="bg-gray-400 p-2 rounded-md w-1/2">
      {users.map((user) => (
        <li key={user.id}>
          <p>{user.id} - {user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone_number}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
