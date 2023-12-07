import React, { useState } from 'react';
import Timer from './Timer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Draw({ setLoggedIn }) {
  const [currentName, setCurrentName] = useState('');
  const [currentWallet, setCurrentWallet] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [winner, setWinner] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };

  const handleNameChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleWalletChange = (e) => {
    setCurrentWallet(e.target.value);
  };

  async function sendParticipant() {
    try {
      const id = await axios.get('http://localhost:8080/participants/giveId');
      await axios.post('http://localhost:8080/participants/save', {
        "id": id,
        "name": currentName,
        "wallet": currentWallet
      });
    
    } catch (error) {
      console.error('Error al persistir el participante:', error.message);
    }
  };

  return (
    <div className="draw-container">
      <header>Introduce los datos del participante</header>
      <div className="input-container">
        <h2>Nombre</h2>
        <input
          type="text"
          value={currentName}
          onChange={handleNameChange}
          placeholder="Escribe un nombre"
        />
        <h2>Wallet</h2>
        <input
          type="text"
          value={currentWallet}
          onChange={handleWalletChange}
          placeholder="Escribe la dirección de una wallet"
        />
        <button className='part-btn' onClick={sendParticipant}>Enviar participante</button>

      </div>
      {showTimer && <Timer />}
      {winner !== '' && <p className='winner'>El ganador es {winner}</p>}
      <div className='buttons'>
        <button className='footer-btn' onClick={handleLogout}>Logout</button>
        {showTimer && <button className='footer-btn'>Empezar sorteo</button>}
      </div>
    </div>
  );
}

export default Draw;
