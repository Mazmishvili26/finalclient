import { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "", // New error state for login failure
  });

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    // Validation using RegExp
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^.{6,}$/;

    // Reset previous errors
    setErrors({
      email: "",
      password: "",
      login: "",
    });

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
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      if (data.error) {
        // Login failure, set error message
        setErrors((prevErrors) => ({
          ...prevErrors,
          login: "Incorrect email or password",
        }));
      } else {
        setUser(data);
        setData({});
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle other errors
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="auth-container">
      <section>
        <form onSubmit={loginUser}>
          <p>Login</p>
          <div className="auth-wrapper">
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
          <button type="submit" className="auth-btn">
            Login to your account
          </button>
          {errors.login && (
            <h4 className="incorrect-message">{errors.login}</h4>
          )}
          <div className="auth-acc">
            <h3>Don't have an account?</h3>
            <Link to="/register">
              <span>Sign Up</span>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
