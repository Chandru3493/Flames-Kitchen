import React from "react";
import "./App.css";
import LoginForm from "./Components/LoginForm";
import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import Cook from "./Components/Cook";
import Waiter from "./Components/Waiter"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cook" element={<Cook />} />
        <Route path="/waiter" element={<Waiter />} />
      </Routes>
    </div>
  );
}

export default App;
