import React, { useState } from 'react';
import './styles.css'; 

function TimeframeButtons({ setTimeframe }) {
  // Initialize the active timeframe state with '1w'
  const [activeTimeframe, setActiveTimeframe] = useState('1w');
  
  // Define the timeframes
  const timeframes = ['1d', '3d', '1w', '1m', '6m', '1y', 'max'];
  
  // Handle button click to set the timeframe and update active button
  const handleButtonClick = (tf) => {
    setActiveTimeframe(tf); 
    setTimeframe(tf); 
  };

  return (
    <div className="timeframe-buttons">
      {timeframes.map(tf => (
        <button
          className={`time-frame ${activeTimeframe === tf ? 'active' : ''}`}
          key={tf}
          onClick={() => handleButtonClick(tf)}
        >
          {tf}
        </button>
      ))}
    </div>
  );
}

export default TimeframeButtons;
