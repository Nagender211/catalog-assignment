import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

function CompareButton({ onCurrencyChange }) {
  const [currencies, setCurrencies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching supported currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    onCurrencyChange(currency); 
    setShowDropdown(false); 
  };

  return (
    <div className="compare-button compare-btn">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <ControlPointIcon style={{ marginLeft: '-18px', color: '#6F7177', width: '15px', marginTop: '-3.4px', position: 'absolute'}} />
        Compare with {selectedCurrency.toUpperCase()}
      </button>
      {showDropdown && (
        <ul className="currency-dropdown">
          {currencies.map(currency => (
            <li key={currency} onClick={() => handleCurrencySelect(currency)}>
              {currency.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompareButton;
