import React from "react";
import "./Navbar.css"; // Import CSS for styling if needed
import { useNavigate } from "react-router-dom";
import terms from "../../terms";

const Navbar = (props) => {
	const navigate = useNavigate();
    const onLogout=async()=>{
		props.d.x();
		await terms.fun2();
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
