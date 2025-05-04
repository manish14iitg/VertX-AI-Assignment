import React, { useEffect, useState } from "react";
import apiClient from "../lib/apiClient";
import { useAppStore } from "../store/store";

const AdminUserCards = () => {
  const [users, setUsers] = useState([]);
  const [creditUpdates, setCreditUpdates] = useState({});
  const { userInfo } = useAppStore();

  const getUsers = async () => {
    try {
      const res = await apiClient.get("api/auth/users");
      setUsers(res.data);
    } catch (error) {
      console.log("error geting all users.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (userId, value) => {
    setCreditUpdates((prev) => ({ ...prev, [userId]: value }));
  };

  const handleUpdate = async (userId) => {
    const credits = creditUpdates[userId];
    if (isNaN(credits) || credits < 0) {
      setMessage((prev) => ({ ...prev, [userId]: "Invalid credit value" }));
      return;
    }

    try {
      const res = await apiClient.patch(`/api/admin/users/${userId}/credits`, {
        credits,
      });

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, credits: res.data.user.credits }
            : user
        )
      );
    } catch (error) {
      console.log("error updating credits");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {users.map((user) => (
        <div key={user._id} className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold">{user.name || user.email}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="mt-2">
            <strong>Current Credits:</strong> {user.credits}
          </p>
          <input
            type="number"
            className="border mt-2 px-2 py-1 w-full rounded"
            placeholder="New credits"
            value={creditUpdates[user._id] ?? user.credits}
            onChange={(e) => handleChange(user._id, parseInt(e.target.value))}
          />
          <button
            onClick={() => handleUpdate(user._id)}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Update Credits
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminUserCards;
