import React, { useState } from "react";
import { useAppStore } from "../store/store";
import { useNavigate } from "react-router-dom";

const SideBar = ({ type }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarItems = [
    {
      label: "Feed",
      onClick: () => navigate("/dashboard"),
      path: "/dashboard",
    },
    {
      label: "Analytics",
      onClick: () => navigate("/user-analytics"),
      path: "/user-analytics",
    },
    {
      label: "Logout",
      onClick: () => {
        console.log("logout");
        navigate("/login");
      },
      path: "/login",
    },
  ];
  const sidebarAdminItems = [
    {
      label: "Feed",
      onClick: () => navigate("/dashboard"),
      path: "/dashboard",
    },
    {
      label: "Analytics",
      onClick: () => navigate("/user-analytics"),
      path: "/user-analytics",
    },
    {
      label: "User Credits",
      onClick: () => navigate("/credits-update"),
      path: "/credits-update",
    },
    {
      label: "Logout",
      onClick: () => {
        console.log("logout");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!isCollapsed && <h1 className="text-xl font-semibold">VertXAI</h1>}
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col space-y-2 p-4">
          {userInfo?.role == "user" &&
            sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`flex items-center justify-start w-full h-12 transition-colors duration-200 hover:bg-gray-800 hover:text-white rounded-md ${
                  item.active ? "bg-gray-800 text-white" : "text-gray-400"
                } ${isCollapsed ? "justify-center" : "justify-start"}`}
              >
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          {userInfo?.role == "admin" &&
            sidebarAdminItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`flex items-center justify-start w-full h-12 transition-colors duration-200 hover:bg-gray-800 hover:text-white rounded-md ${
                  item.active ? "bg-gray-800 text-white" : "text-gray-400"
                } ${isCollapsed ? "justify-center" : "justify-start"}`}
              >
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            ))}
        </nav>
      </div>
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <h1 className="text-blue-500 font-medium">{userInfo.name}</h1>
          <h1 className="text-sm text-gray-700">{userInfo.email}</h1>
        </div>
      )}
    </div>
  );
};

export default SideBar;
