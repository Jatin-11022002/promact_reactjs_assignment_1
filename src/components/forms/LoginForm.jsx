// src/components/forms/LoginForm.jsx
import React, { useState } from "react";
import { loginUser } from "../../services/authService"; // Import the login function
import { login } from '../../redux/userSlice';  // Import the login action
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "../../style/forms.css";

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, profile } = await loginUser(formData); // Assume API returns user info and token
      dispatch(login({ profile, token })); // Dispatch the login action with user info
      onSuccess(); // Trigger redirect after successful login
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Login</h2>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-icon">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-icon">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
      </div>
      <button type="submit" className="form-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
