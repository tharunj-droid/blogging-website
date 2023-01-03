import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login", inputs);
      console.log(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>login</button>
        {err && <p>{err}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
