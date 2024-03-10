

import React, { useReducer } from "react";

import LoginForm from "./Components/LoginForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import logo from './logo.svg';

import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Admin from './Components/Admin';

import Waiter from "./Components/Waiter"
import ViewEmployee from "./Components/ViewEmployee.js";
import ViewFinancialReport from "./Components/ViewFinancialReport.js";
import Input from "./Components/Input.js";
import { useState } from "react";
import Complete from "./Components/cook/Complete";
import Waitercom from "./Components/Waitercom.js";

function App() {
  const navigate = useNavigate();
  const [css,setCss]= useState(false);
  const [adcss,setadCss]=useState(false);
  const [wtcss,setWtCss]=useState(false);
   const [use,setUse] = useState();
   const settle=(cust)=>{
     setUse(cust)
     if(cust.role===1){
      setadCss(true);
     }else if(cust.role===1){
      setCss(true);
     }else{
      setWtCss(true);
     }
   }

   const x=()=>{
    
    setCss(false);
    setadCss(false);
    setWtCss(false);
    

   }

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<LoginForm fun={settle} />} />
        <Route path="/Fp0wLkQgHe3iMl7n4NqT/*" element={<Admin data={{adcss,x}}/>} />
        <Route path="/9v3pUZxEsR2dYr6wGh0I/*" element={<Complete data={{css,x}}/>} />
        <Route path="/s8JcN7Q0kD3gT1fH4zYb/*" element={<Waitercom data={{use,wtcss,x}}/>} />
        
      </Routes>
      

    </div>

  );
}

export default App;
