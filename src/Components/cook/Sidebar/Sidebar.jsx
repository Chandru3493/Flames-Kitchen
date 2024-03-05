import React, { useState } from "react";

import "./Sidebar.css";
// import ViewEmployee from "./ViewEmployee";
// import ViewFinancialReport from "./ViewFinancialReport";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import ListTasks from "../ListTasks";
const Sidebar = () => {
	// const navigate = useNavigate();
	const [toggle, setToggle] = useState(true);
	return (
		<div className="pack">
			{toggle && (
				<div className="toolbar">
					<div className="element" onClick={() => {}}>
						Go To Profile
					</div>
					<div className="element">Menu</div>
					<div className="element">Logout</div>
				</div>
			)}
			<div
				className="backarrow"
				onClick={() => {
					setToggle(!toggle);
				}}
			>
				{toggle ? "←" : "≡"}
			</div>
		</div>
	);
};

export default Sidebar;
