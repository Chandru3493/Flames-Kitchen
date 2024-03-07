import React from "react";
import Cook from "./Cook.jsx";
import Navbar from "./Navbar/Navbar";

function Complete(props) {
    // Assigning props.data.css to v if it's defined, otherwise default to false
    
    if (props.data && props.data.css ? props.data.css : true) {
       import('./tail.css');
    }

    return (
        <div>
            <Navbar d={props.data} />
            <Cook d={props.data.use}/>
        </div>
    );
}

export default Complete;
