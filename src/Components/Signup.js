import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    user_role: "",
    password: "",
    removeUsername: "", // Add removeUsername to the form data
  });

  const [errors, setErrors] = useState({
    passwordError: "",
    usernameError: "",
    backendError: "",
  });

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [removalSuccess, setRemovalSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear backend error message when user starts typing
    setErrors((prevState) => ({ ...prevState, backendError: "" }));
    setSignupSuccess(false); // Reset signup success message
    setRemovalSuccess(false); // Reset removal success message
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validatePassword() && validateUsername()) {
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorMessage = await response.json(); // Read response as JSON
          throw new Error(errorMessage.error || "Signup failed");
        } else {
          // Signup successful
          setSignupSuccess(true);
          setFormData({
            username: "",
            user_role: "",
            password: "",
            removeUsername: "", // Clear removeUsername after successful signup
          });
        }
      } catch (error) {
        console.error("Error:", error.message);
        // Display backend error message
        setErrors((prevState) => ({
          ...prevState,
          backendError: error.message,
        }));
      }
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: formData.removeUsername }), // Send removeUsername to backend
      });

      if (!response.ok) {
        const errorMessage = await response.json(); // Read response as JSON
        throw new Error(errorMessage.error || "Removal failed");
      } else {
        // Removal successful
        setRemovalSuccess(true);
        setFormData((prevState) => ({
          ...prevState,
          removeUsername: "", // Clear removeUsername after successful removal
        }));
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Display backend error message
      setErrors((prevState) => ({
        ...prevState,
        backendError: error.message,
      }));
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError:
          "Password must contain at least 8 characters, one uppercase letter, one number, and one special character.",
      }));
      return false;
    }
    setErrors((prevState) => ({ ...prevState, passwordError: "" }));
    return true;
  };

  const validateUsername = () => {
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!usernameRegex.test(formData.username)) {
      setErrors((prevState) => ({
        ...prevState,
        usernameError: "Username must be a valid email address.",
      }));
      return false;
    }
    setErrors((prevState) => ({ ...prevState, usernameError: "" }));
    return true;
  };

  return (
    <div id="SignUp">
      <div id="SignUpBox">
        <form onSubmit={handleSignup}>
          <center>
            <h2>Add Credential</h2>
          </center>
          <div id="usernameInput">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.usernameError && <span>{errors.usernameError}</span>}
          </div>
          <div id="userRoleInput">
            <label htmlFor="user_role">User Role</label>
            <select
              id="user_role"
              name="user_role"
              value={formData.user_role}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="admin">admin</option>
              <option value="cook">cook</option>
              <option value="waiter">waiter</option>
            </select>
          </div>
          <div id="passwordInput">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.passwordError && <span>{errors.passwordError}</span>}
          </div>
          <center>
            <div id="backendError">
              {errors.backendError && <span>{errors.backendError}</span>}
            </div>
          </center>
          <center>
            {signupSuccess && <div>User signed up successfully</div>}
          </center>
          <center>
            <button type="submit" id="SignUpButton">
              Sign Up
            </button>
          </center>
        </form>

        <form onSubmit={handleRemove}>
          <center>
            <h2>Remove Credential</h2>
          </center>
          <div id="removeUsernameInput">
            <label htmlFor="removeUsername">Username</label>
            <input
              type="email"
              id="removeUsername"
              name="removeUsername"
              value={formData.removeUsername} // bind removeUsername to the input value
              onChange={handleChange}
              required
            />
          </div>
          <center>
            <div id="removeBackendError">
              {errors.backendError && <span>{errors.backendError}</span>}
            </div>
          </center>
          <center>
            {removalSuccess && <div>Credentials removed successfully</div>}
          </center>
          <center>
            <button type="submit" id="RemoveCredentialsButton">
              Remove Credentials
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Signup;
