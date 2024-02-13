import React, { useState } from "react";
import "./LoginForm.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
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
        console.log("Request sent");

        if (!response.ok) {
          throw new Error("Login failed");
        }

        // Parse the JSON data from the response body
        const responseData = await response.json();

        console.log("SUCCESSFUL LOGIN", responseData);

        // Access the username value from the responseData object
        const loggedInUserrole = responseData[0].user_role;
        console.log("Logged in username:", loggedInUserrole);

        if (loggedInUserrole === "admin") {
          // Redirect to the admin page
          navigate("/admin");
        } else if (loggedInUserrole === "cook") {
          // Redirect to the cook page
          navigate("/cook");
        } else if (loggedInUserrole === "waiter") {
          // Redirect to the waiter page
          navigate("/waiter");
        }

        // Handle successful login, e.g., redirect to another page
      } catch (error) {
        alert("Wrong Login ID and Password");
        // Handle login error, e.g., display an error message to the user
      }
    } else {
      // Set errors state to display error messages
      setErrors(errors);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
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
              Login
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
