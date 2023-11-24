import React, { useState } from 'react';

function Draw({ setLoggedIn }) {
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState('');

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
      </div>
    </div>
  );


}

export default Draw;
