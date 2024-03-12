import React,{ useState } from 'react'
import terms from './terms.js'

import ViewEmployee from './ViewEmployee.js'
import ViewFinancialReport from './ViewFinancialReport'
import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom'
import Input from './Input.js'
import Logo from "../imgs/Logo.png"

const Admin = (props) => {
  
 
  
 const navigate = useNavigate();
 const handleLogout = async () => {
  localStorage.removeItem("token");
  await terms.fun2();
  props.data.x();
  navigate("/");
  window.location.reload();
};
if (props.data && props.data.adcss ? props.data.adcss : true) {
  import('./anuragstyles.css');
}
 
  return (<>
    <div className='nav'>
      <div id="fir">
      <div id='ine'><img className='imag' src={Logo} /></div><div id='tuo'>FLAMES KITCHEN</div></div>
        
        <div id='tex'><div id='usern'>Hello {terms.user.name}</div>
                             <div className='buttona' id='log'  onClick={()=>{handleLogout()}}>
    Logout</div>
        </div>
        
  </div>
  
   <div className='ful'>
  
  
    
    <div className='pac'>
    
    <div className='tx'>
        <div className='ex' onClick={()=>{navigate("AddEmployee")}}>
            View Staff Details
        </div>
        <div className='ex' onClick={()=>{navigate('EditEmployee')}} >
            Edit Staff Details
        </div>
        <div className='ex' onClick={()=>{navigate('ViewFinancial')}}>
            View Financial Report
        </div>
        
    </div>
    </div>
    <div className='pag'>
      
    <Routes>
          
          <Route  path="AddEmployee" element={<ViewEmployee data={props.data.adcss}/>} ></Route>
          <Route exact path="EditEmployee" element={<Input data={props.data.adcss}/>} ></Route>
          <Route exact path="ViewFinancial" element={<ViewFinancialReport data={props.data.adcss}/>} ></Route></Routes>
    </div>
    
    
    </div>
    </>
    
  )
}

export default Admin
