import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password } = data;

    // Validation using RegExp
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^.{6,}$/;

    // Reset previous errors
    setErrors({
      name: "",
      email: "",
      password: "",
    });

    if (!namePattern.test(name)) {
      // Invalid name format
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Invalid name format",
      }));
      return;
    }

    if (!emailPattern.test(email)) {
      // Invalid email format
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }

    if (!passwordPattern.test(password)) {
      // Password should be at least 6 characters long
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should be at least 6 characters long",
      }));
      return;
    }

    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });

      if (data.error) {
        console.log("error", data.error);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="auth-container">
      <section>
        <form onSubmit={registerUser}>
          <p>Sign Up</p>
          <div className="auth-wrapper">
            <input
              type="text"
              placeholder="Firstname"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            ></input>
            {errors.name && <h5 className="error-message">{errors.name}</h5>}
            <input
              type="email"
              placeholder="Email address"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            ></input>
            {errors.email && <h5 className="error-message">{errors.email}</h5>}
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            ></input>
            {errors.password && (
              <h5 className="error-message">{errors.password}</h5>
            )}
          </div>
          <button className="auth-btn">Create an account</button>
          <div className="auth-acc">
            <h3>Already have an account?</h3>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
