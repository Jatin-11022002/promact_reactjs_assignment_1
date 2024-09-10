// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/chat"); // Redirect to the chat page after successful login
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default Login;
