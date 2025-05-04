import React, { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/store";
import apiClient, { GET_USER_INFO, SIGNUP_ROUTE } from "../../lib/apiClient";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [error, setError] = useState(null);
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password || !username) {
      setError("All feilds are required.");
      return;
    }

    const response = await apiClient.post(SIGNUP_ROUTE, {
      name,
      email,
      username,
      password,
      adminToken,
    });

    const token = response.data.token;
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
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-[]"
          />
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="w-[]"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <Input
            onChange={(e) => setAdminToken(e.target.value)}
            placeholder="Type 123456"
          />
          <Button onClick={handleSignUp} type="primary">
            Sign Up
          </Button>
        </form>
        <p className="text-red-500 text-sm m-4">{error}</p>
        <h3 className="m-4">
          Already have an account?{" "}
          <Link className="text-blue-700" to={"/login"}>
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default SignUp;
