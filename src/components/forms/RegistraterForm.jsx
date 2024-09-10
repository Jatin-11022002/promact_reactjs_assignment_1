import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../services/authService";
import "../../style/forms.css";

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create Account</h2>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-icon">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <div className="input-icon">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="form-button">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
