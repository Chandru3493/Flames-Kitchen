import React,{ useState } from 'react'

import './anuragstyles.css'
import ViewEmployee from './ViewEmployee.js'
import ViewFinancialReport from './ViewFinancialReport'
import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom'
import Input from './Input.js'
const Admin = (props) => {
  const [one,setOne]= useState(true);
  const [two,setTwo]= useState(false);
  const [three,setThree]= useState(false);
 const navigate = useNavigate();
 const handleLogout = () => {
  // Clear the token from local storage
  localStorage.removeItem("token");
  // Redirect to the login page
  navigate("/");
};
 
  return (
   
   <div className='ful'>
  
   
    
    <div className='pac'>
    
    <div className='tx'>
        <div className='ex' onClick={()=>{setOne(true);setTwo(false);setThree(false)}}>
            View Staff details
        </div>
        <div className='ex' onClick={()=>{setOne(false);setTwo(true);setThree(false)}} >
            Edit Staff details
        </div>
        <div className='ex' onClick={()=>{setOne(false);setTwo(false);setThree(true)}}>
            View financial report
        </div>
        
    </div>
    </div>
    <div className='pag'>
      <div className='nav '><div id='tex'>Hello {props.data.name}</div><div id="fir"><div className='buttona' id='log'  onClick={()=>{handleLogout()}}>
          Logout
        </div></div></div>
    <Routes>
          
          {one&&<Route exact path="/" element={<ViewEmployee />} ></Route>}
          { two&& <Route exact path="/" element={<Input />} ></Route>}
          { three && <Route exact path="/" element={<ViewFinancialReport />} ></Route>}</Routes>
    </div>
    
    
    </div>
    
  )
}

export default Admin
