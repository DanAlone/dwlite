import React from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';

function App() { 
  const isLogged = localStorage.getItem("isLoggedin");
  const token = localStorage.getItem("jwt");
  
  require('typeface-montserrat');

  if ((isLogged === "true") && (token !== "")) {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;