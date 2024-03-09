import React,{ useState } from 'react'


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
  localStorage.removeItem("token");
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
      <div id='ine'><img className='imag' src="./logo.png" /></div><div id='tuo'>FLAMES KITCHEN</div></div>
        
        <div id='tex'><div id='usern'>Hello {props.data.use.name}</div>
                             <div className='buttona' id='log'  onClick={()=>{handleLogout()}}>
    Logout</div>
        </div>
        
  </div>
  
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
      
    <Routes>
          
          {one&&<Route exact path="/" element={<ViewEmployee data={props.data.adcss}/>} ></Route>}
          { two&& <Route exact path="/" element={<Input data={props.data.adcss}/>} ></Route>}
          { three && <Route exact path="/" element={<ViewFinancialReport data={props.data.adcss}/>} ></Route>}</Routes>
    </div>
    
    
    </div>
    </>
    
  )
}

export default Admin
