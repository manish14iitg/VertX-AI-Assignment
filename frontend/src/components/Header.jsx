import React, { useEffect, useState } from "react";
import { useAppStore } from "../store/store";

function Header({ credits, setCredits }) {
  const { userInfo } = useAppStore();

  useEffect(() => {
    setCredits(userInfo.credits);
  }, [userInfo, credits]);
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-lg w-full h-16 flex justify-between items-center px-6 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize">
          {userInfo?.name || "User Name"}
        </h1>
        <div
          className={`rounded-full px-3 py-1 text-xs font-medium
            ${
              userInfo?.role === "admin"
                ? "bg-blue-500/20 text-amber-800"
                : "bg-green-500/20 text-amber-800"
            }`}
        >
          {userInfo?.role || "user"}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {userInfo && (
          <span className="text-sm font-medium text-gray-600">
            Credits: <span className="text-green-500">{credits}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Header;
