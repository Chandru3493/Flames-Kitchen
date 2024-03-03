
import React, { useReducer } from "react";
import "./App.css";
import LoginForm from "./Components/LoginForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Admin from './Components/Admin';
import Cook from "./Components/Cook";
import Waiter from "./Components/Waiter"
import ViewEmployee from "./Components/ViewEmployee.js";
import ViewFinancialReport from "./Components/ViewFinancialReport.js";
import Input from "./Components/Input.js";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
   const [use,setUse] = useState();
   const settle=(cust)=>{
     setUse(cust)
   }

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<LoginForm fun={settle} />} />
        <Route path="/Fp0wLkQgHe3iMl7n4NqT" element={<Admin data={use}/>} />
        <Route path="/9v3pUZxEsR2dYr6wGh0I" element={<Cook data={use}/>} />
        <Route path="/s8JcN7Q0kD3gT1fH4zYb" element={<Waiter data={use}/>} />
        
      </Routes>
      
    </div>

  );
}

export default App;
