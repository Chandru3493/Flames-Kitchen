import React from "react";
import "./Navbar.css"; // Import CSS for styling if needed

const Navbar = ({ onLogout }) => {
	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<img src="./logo.png" />
			</div>
			<div className="navbar-links">
				<button onClick={onLogout}>Logout</button>
			</div>
		</nav>
	);
};

export default Navbar;
