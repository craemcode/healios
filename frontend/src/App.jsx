import { useState,useEffect } from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import api from "./api";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return(
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* You will create these pages later */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/about" element={<h1>About Us</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
