
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import logo from "./cook/Navbar/logo.png";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setErrors({});
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!password.trim()) {
      setErrors({ password: "Password is required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseData = await response.json();
      const { user_id, token, user_roleId} = responseData; // Change user_role to user_id
      
      const decodedToken = jwtDecode(token);
      const names =decodedToken.userName;
      const ids =decodedToken.userId;
      props.fun({name: names,id: ids,role: user_roleId});

      if (user_roleId === 1) {
        navigate("/Fp0wLkQgHe3iMl7n4NqT");
      } else if (user_roleId === 3) {
        navigate("/9v3pUZxEsR2dYr6wGh0I");
      } else if (user_roleId === 2) {
        navigate("/s8JcN7Q0kD3gT1fH4zYb");
      }
    } catch (error) {
      setShowCustomAlert(true);
      console.error("Login error:", error);
    }
  };

  return (
    <div id="main">
      <img src={logo} alt="Flame-s-Kitchen-Logo"  id="Hotel_logo"/>
      <div className="login-background">
        <div className="login-container">
          <center>
            <h2>Flame's Kitchen</h2>
          </center>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label id="emailab" htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <br />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label id="passlab" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
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
