import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import TimeframeButtons from './components/TimeframeButtons';
import CryptoChart from './components/CryptoChart';
import CompareButton from './components/CompareButton';
import FullscreenButton from './components/FullscreenButton';
import './components/styles.css';

function App() {
  const [cryptoDataUSD, setCryptoDataUSD] = useState(null);
  const [cryptoDataCurrency2, setCryptoDataCurrency2] = useState(null);
  const [timeframe, setTimeframe] = useState('7'); 
  const [activeTab, setActiveTab] = useState('chart'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currency2, setCurrency2] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUSD = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${timeframe}`);
        setCryptoDataUSD(responseUSD.data);

        if (isComparing && currency2) {
          const responseCurrency2 = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency2}&days=${timeframe}`);
          setCryptoDataCurrency2(responseCurrency2.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [timeframe, currency2, isComparing]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isFullscreen]);

  const handleTimeframeChange = (newTimeframe) => {
    let days;
    switch (newTimeframe) {
      case '1d': days = '1'; break;
      case '3d': days = '3'; break;
      case '1w': days = '7'; break;
      case '1m': days = '30'; break;
      case '6m': days = '180'; break;
      case '1y': days = '365'; break;
      case 'max': days = 'max'; break;
      default: days = 'max';
    }
    setTimeframe(days);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency2(newCurrency);
    setIsComparing(true);
  };

  const enterFullscreen = () => {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.mozRequestFullScreen) { 
      containerRef.current.mozRequestFullScreen();
    } else if (containerRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
      containerRef.current.webkitRequestFullscreen();
    } else if (containerRef.current.msRequestFullscreen) { 
      containerRef.current.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { 
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  return (
    <div className={`App ${isFullscreen ? 'fullscreen' : ''}`} ref={containerRef}>
      {!isFullscreen && (
        <>
          <Header 
            dataUSD={cryptoDataUSD} 
            dataCurrency2={isComparing ? cryptoDataCurrency2 : null} 
            currency="usd" 
            currency2={currency2} 
          />
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        </>
      )}
      <div className="tab-content">
        {activeTab === 'chart' && (
          <div className={`chart-container ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className="chart-controls">
              <TimeframeButtons setTimeframe={handleTimeframeChange} activeTimeframe={timeframe} />
              <div className="chart-buttons">
                <FullscreenButton
                  isFullscreen={isFullscreen}
                  onEnterFullscreen={enterFullscreen}
                  onExitFullscreen={exitFullscreen}
                />
                {!isFullscreen && ( // Hide CompareButton in fullscreen mode
                  <CompareButton onCurrencyChange={handleCurrencyChange} />
                )}
              </div>
            </div>
            <CryptoChart 
              dataUSD={cryptoDataUSD} 
              dataCurrency2={isComparing ? cryptoDataCurrency2 : null} 
              timeframe={timeframe} 
            />
          </div>
        )}
        
        {activeTab !== 'chart' && (
          <>
            {activeTab === 'summary' && <p className='content-paragraph'>This is the summary</p>}
            {activeTab === 'statistics' && <p className='content-paragraph'>This is the statistics</p>}
            {activeTab === 'analysis' && <p className='content-paragraph'>This is the analysis</p>}
            {activeTab === 'setting' && <p className='content-paragraph'>This is the settings</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
