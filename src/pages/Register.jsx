// src/pages/Register.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegistraterForm";
import "../style/global.css"; // Adding custom styles

const Register = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="register-container">
        <RegisterForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default Register;
