import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await axios.get('http://localhost:5000/user');
    setScore(response.data.totalScore);
    setPrizes(response.data.prizesWon);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/click');
      setScore(response.data.user.totalScore);
      setPrizes(response.data.user.prizesWon);
      
      if (response.data.gotPrize) {
        setNotifications(prev => [...prev, 'You won a prize!']);
        setTimeout(() => {
          setNotifications(prev => prev.slice(1));
        }, 3000);
      }
    } catch (error) {
      console.error('Click error:', error);
    }
  };


  const reseting = async () => {
    try {
      const response = await axios.post('http://localhost:5000/reset');
      setPrizes(response.data.user.prizesWon);
      setScore(response.data.user.totalScore);
    } catch (error) {
      console.error('Reset error:', error);
    }
  };


  return (
    <div className="App">
      <h1>Score: {score}</h1>
      <h2>Prizes: {prizes}</h2>
      <button 
        className="click-button" 
        onClick={handleClick}
      >
        Click Me!
      </button>
      
      <div className="notifications">
        {notifications.map((msg, i) => (
          <div key={i} className="notification">
            {msg}
          </div>
        ))}
      </div>

      <div className='resetBtn' onClick={reseting}>Reset</div>
    </div>
  );
}

export default App;