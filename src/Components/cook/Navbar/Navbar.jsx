import React from "react";
import "./Navbar.css"; // Import CSS for styling if needed
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
	const navigate = useNavigate();
    const onLogout=()=>{
		props.d.x();
		
		navigate("/");
		window.location.reload(true);
	}


	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<img src="./logo.svg" />
			</div>
			<div className="navbar-links">
				<button onClick={onLogout}>Logout</button>
			</div>
		</nav>
	);
};

export default Navbar;
