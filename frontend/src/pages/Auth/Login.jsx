import { Button, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiClient, { LOGIN_ROUTE } from "../../lib/apiClient";
import { useAppStore } from "../../store/store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUserInfo } = useAppStore();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("All feilds are required.");
      return;
    }

    const response = await apiClient.post(LOGIN_ROUTE, { email, password });
    console.log(response);
    localStorage.setItem("token", token);
    console.log("token", token);
    const userData = await apiClient.get(GET_USER_INFO);
    setUserInfo(userData.data);
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[50%] p-5 ">
        <form className="flex flex-col m-4 gap-3">
          <Input placeholder="Email" />
          <Input placeholder="password" />
          <Button onClick={handleLogin} type="primary">
            Login
          </Button>
        </form>
        <p className="text-red-500 text-sm m-4">{error}</p>
        <h3 className="m-4">
          Don't have an account?{" "}
          <Link className="text-blue-700" to={"/signup"}>
            SignUp
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Login;
