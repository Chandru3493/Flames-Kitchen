import React from "react";
import { useNavigate } from "react-router-dom";

function Cook() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div>
      <h3>Cook Module</h3>
      <p>This is cook module in your application.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Cook;
