import React from "react";
import { useNavigate } from "react-router-dom";

function Waiter() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div>
      <h3>Waiter Module</h3>
      <p>This is waiter module in your application.</p>
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Waiter;
