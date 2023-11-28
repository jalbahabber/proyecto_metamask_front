import React, { useState } from 'react';
import axios from 'axios';
import Timer from './Timer';

function Draw({ setLoggedIn }) {
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [winner, setWinner] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const handleInputChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentName.trim() !== '') {
        setNames([...names, currentName]);
        setCurrentName('');
      }
    }
  };

  const handleDraw = async () => {
    const storedToken = localStorage.getItem('token');
    setButtonDisabled(true);
    setShowTimer(true);

    try {
      const response = await axios.post('http://localhost:8080/temporizer', names, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      console.log('Respuesta del servidor:', response.data);
      setWinner(response.data);
      showTimer(false);
    } catch (error) {
      console.error('Error al hacer el sorteo:', error.message);
    }
  };

  return (
    <div className="draw-container">
      <h1>Introduce los nombres de los participantes</h1>
      <div className="input-container">
        <input
          type="text"
          value={currentName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un nombre y presiona Enter"
        />
      </div>
      <div className="names-container">
        <h2>Nombres:</h2>
        <ul className="names-list">
          {names.map((name, index) => (
            <li key={index} className="name-card">
              {name}
            </li>
          ))}
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

        <button className="logout-btn" onClick={handleDraw} disabled={buttonDisabled}>
          Draw
        </button>
        {showTimer && <Timer />}
        {winner !== '' && <p className='winner'>El ganador es {winner}</p>}
      </div>
    </div>
  );
}

export default Draw;
