import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import DrawList from './components/DrawList';
import Draw from './components/Draw';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    verifyToken();
  }, []);

  async function verifyToken() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const response = await axios.get('http://localhost:8080/verifytoken', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        if (response.status === 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error al verificar el token:', error.message);
      }
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={loggedIn ? <DrawList setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn} />} />
          <Route path="/draw/:id" element={<Draw setLoggedIn={setLoggedIn}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;