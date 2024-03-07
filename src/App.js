
import React, { useReducer } from "react";
import "./App.css";
import LoginForm from "./Components/LoginForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Admin from './Components/Admin';

import Waiter from "./Components/Waiter"
import ViewEmployee from "./Components/ViewEmployee.js";
import ViewFinancialReport from "./Components/ViewFinancialReport.js";
import Input from "./Components/Input.js";
import { useState } from "react";
import Complete from "./Components/cook/Complete";

function App() {
  const navigate = useNavigate();
  const [css,setCss]= useState(false);
   const [use,setUse] = useState();
   const settle=(cust)=>{
     setUse(cust)
     setCss(true)
   }

   const x=()=>{
    
    setCss(false);
    

   }

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<LoginForm fun={settle} />} />
        <Route path="/Fp0wLkQgHe3iMl7n4NqT" element={<Admin data={{use}}/>} />
        <Route path="/9v3pUZxEsR2dYr6wGh0I" element={<Complete data={{use,css,x}}/>} />
        <Route path="/s8JcN7Q0kD3gT1fH4zYb" element={<Waiter data={{use}}/>} />
        
      </Routes>
      
    </div>

  );
}

export default App;
