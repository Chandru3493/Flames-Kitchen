import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div>
      <h3>Admin Module</h3>
      <p>This is Admin module in your application.</p>
      <Link to="/signup">
        <button type="" className="btn-login">
          Manage Credentials
        </button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Admin;
