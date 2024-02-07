import React,{ useState } from 'react'

import './anuragstyles.css'
import ViewEmployee from './ViewEmployee'
import ViewFinancialReport from './ViewFinancialReport'
import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom'
const Admin = () => {
 const navigate = useNavigate();
  const [toggle,setToggle] = useState(true)
  return (
   
   <div className='full'>
  
   
    
    <div className='pack'>
    {toggle &&
    <div className='toolbar'>
        <div className='element' onClick={()=>{navigate("/ViewEmployee")}}>
            View Staff details
        </div>
        <div className='element' >
            Edit Staff details
        </div>
        <div className='element' onClick={()=>{navigate("/ViewFinancial")}}>
            View financial report
        </div>
        <div className='element'>
          Logout
        </div>
    </div>}<div className='backarrow' onClick={()=>{setToggle(!toggle)}}>{toggle?"←":"≡"}</div>
    </div>
    <div className='page'>
      <Routes>
     <Route exact path="/ViewEmployee" element={<ViewEmployee />}/>
     <Route exact path="/ViewFinancial" element={ <ViewFinancialReport />}/>
    </Routes></div>
    
    
    </div>
    
  )
}

export default Admin
