import React from "react";

import { useNavigate } from "react-router-dom";
import terms from "../../terms";
import Logo from "../../../imgs/Logo.png"

const Navbar = (props) => {

	if (props.data && props.data.css ? props.data.css : true) {
		import('./Navbar.css');
	 }
	const navigate = useNavigate();
    const handleLogout=async()=>{
		props.d.x();
		await terms.fun2();
		navigate("/");
		window.location.reload(true);
	}


	return (
		<div className='nav'>
      <div id="fir">
      <div id='ine'><img className='imag' src={Logo} /></div><div id='tuo'>FLAMES KITCHEN</div></div>
        
        <div id='tex'><div id='usern'>Hello {terms.user.name}</div>
                             <div className='buttona' id='log'  onClick={()=>{handleLogout()}}>
    Logout</div>
        </div>
        
  </div>
	);
};

export default Navbar;
