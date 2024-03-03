
import React from "react";
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

function App() {
  const navigate = useNavigate();
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Fp0wLkQgHe3iMl7n4NqT" element={<Admin />} />
        <Route path="/9v3pUZxEsR2dYr6wGh0I" element={<Cook />} />
        <Route path="/s8JcN7Q0kD3gT1fH4zYb" element={<Waiter />} />
        
      </Routes>
      
    </div>

  );
}

export default App;
