import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Draw from './components/Draw';
import axios from 'axios';

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
    <div className="App">
      <header className="App-header">
        {loggedIn ? (
          <Draw setLoggedIn={setLoggedIn} />
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </header>
    </div>
  );
}

export default App;