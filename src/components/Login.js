import React, { useState } from 'react';
import axios from 'axios';

function Login({setLoggedIn}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/authenticate', {
        username,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Usuario:</p>
        <input type="text" className="input-field" onChange={(e) => setUsername(e.target.value)} />
        <p>Contraseña:</p>
        <input type="password" className="input-field" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input type="submit" className="submit-btn" />
      </form>
    </div>
  );
}

export default Login;