import React, { useState, useEffect } from 'react';
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
      const number = await axios.get('http://localhost:8080/participants/giveId');

      await axios.post('http://localhost:8080/participants/save', {
        "number": number.data,
        "name": currentName,
        "wallet": currentWallet,
        "sorteo" : id
      });
    
    } catch (error) {
      console.error('Error al persistir el participante:', error.message);
    }
  };

  async function obtenerGanadorSorteo(){
    try {
      const response = await axios.get(`http://localhost:8080/sorteo/${id}/ganador`); 
      setWinner(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error al obtener el ganador del sorteo:', error);
    }
  };

  useEffect(() => {
    obtenerGanadorSorteo();
  }, []);

  return (
    <div  className="draw-container">
      {winner !== '' ? (
        <p className='winner'>Sorteo terminado, el ganador es {winner}</p>
      ) : (
        <div>
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
          <div className='buttons'>
            <button className='footer-btn' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Draw;
