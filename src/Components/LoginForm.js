import React, { useState, useEffect } from "react";
import "./LoginForm.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Adjusted import statement

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showCustomAlert, setShowCustomAlert] = useState(false); // State to control custom alert visibility
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);

    // Validate email dynamically as the user types
    const errors = {};

    if (!value.trim()) {
      errors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      errors.username = "Invalid email format";
    }

    setErrors(errors);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    if (!username.trim()) {
      errors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      errors.username = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        // Parse the JSON data from the response body
        const responseData = await response.json();

        // Store the token in local storage
        localStorage.setItem("token", responseData.token);

        // Redirect based on user role
        const decodedToken = jwtDecode(responseData.token);
        if (decodedToken.user_role === "admin") {
          navigate("/admin");
        } else if (decodedToken.user_role === "cook") {
          navigate("/cook");
        } else if (decodedToken.user_role === "waiter") {
          navigate("/waiter");
        }
      } catch (error) {
        setShowCustomAlert(true); // Show custom alert
        // Handle login error, e.g., display an error message to the user
      }
    } else {
      // Set errors state to display error messages
      setErrors(errors);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && (decodedToken.user_role === "admin" || decodedToken.user_role === "cook" || decodedToken.user_role === "waiter")) {
        navigate(`/${decodedToken.user_role}`);
      }
    }
  }, []);

  return (
    <div id="main">
      <div className="login-background">
        <div className="login-container">
          <center>
            <h2>Flame's Kitchen</h2>
          </center>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <br />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <center>
              <button type="submit" className="btn-login">
                Log In
              </button>
            </center>
          </form>
          {showCustomAlert && (
            <div className="custom-alert">
              <div className="custom-alert-content">
                <center>
                  <span id="LoginFrom-waringSign">Wrong ID and Password</span>
                </center>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
