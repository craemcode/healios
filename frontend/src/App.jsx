import { useState,useEffect } from 'react'
import api from "./api";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    api.get("/ping").then(res => {
      setMessage(res.data.message);
    }).catch(err => {
      setMessage("API error: " + err.message);
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>{message}</h1>
    </div>
  );
}

export default App
