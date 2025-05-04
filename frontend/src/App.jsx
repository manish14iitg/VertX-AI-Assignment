import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User/Dashboard";
import { useAppStore } from "./store/store";
import apiClient, { GET_USER_INFO } from "./lib/apiClient";
import Analytics from "./pages/User/Analytics";
import AdminUserCards from "./components/AdminUserCards";
import CreditsUpdate from "./pages/Admin/CreditsUpdate";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to={"/dashboard"} /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />
        {userInfo?.role == "admin" && (
          <Route path="/credits-update" element={<CreditsUpdate />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
