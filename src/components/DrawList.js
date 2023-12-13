import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DrawList({ setLoggedIn }) {
  const [draws, setDraws] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      fetchDraws();
      setLoaded(true);
    }
  }, [loaded]);

  async function fetchDraws() {
    try {
      const response = await fetch('http://localhost:8080/sorteo/getAll');
      const data = await response.json();
      setDraws(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function handleNewDraw() {
    const storedToken = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8080/temporizer', null, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      console.log(response);


      fetchDraws();
    } catch (error) {
      console.error('Error al crear nuevo sorteo:', error.message);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };
  
  return (
    <div className='drawlist'>
      <header className='drawlist-header'>Lista de Sorteos</header>
      <div className='drawlist-container'>
        {draws.map((draw, index) => (
          <Link to={`/draw/${draw.id}`} className='draw-link' key={draw.id}>
            <div className={draw.ended ? 'draw-ended' : 'draw-ongoing'} title={draw.id}>
              Sorteo {index + 1}
              <br/> <br/>
              {draw.participants !== null ? "Participantes: "+ draw.participants.length : "Participantes: 0"}
              <br/> <br/>
              {draw.winner !== null ? "Ganador: "+draw.winner : ""}
              <br/><br/>
              {draw.ended === true ? 'Estado: Finalizado' : 'Estado: En curso'}
            </div>
          </Link>
        ))}
      </div>
      <button className='add-draw' onClick={handleNewDraw}>
        Nuevo
      </button>
      <button className='footer-btn' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DrawList;