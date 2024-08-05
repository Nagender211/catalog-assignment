import React from 'react';
import './styles.css';

function Header({ dataUSD, dataCurrency2, currency, currency2 }) {
  const getLatestPrice = (data) => data?.prices[data.prices.length - 1][1] || 0;
  const getOldPrice = (data) => data?.prices[0][1] || 0;

  const currentPriceUSD = getLatestPrice(dataUSD);
  const oldPriceUSD = getOldPrice(dataUSD);
  const changeUSD = currentPriceUSD - oldPriceUSD;
  const changePercentageUSD = (changeUSD / oldPriceUSD) * 100;

  return (
    <header className="header">
      <div className="currency-info currency1">
        <h1>{currentPriceUSD.toFixed(2)}</h1>
        <span className="currency-symbol">{currency.toUpperCase()}</span>
        <p className="change" style={{ color: changeUSD >= 0 ? 'green' : 'red' }}>
          {changeUSD.toFixed(2)} ({changePercentageUSD.toFixed(2)}%)
        </p>
      </div>
      {dataCurrency2 && (
        <div className="currency-info currency2">
          <h1>{getLatestPrice(dataCurrency2).toFixed(2)}</h1>
          <span className="currency-symbol2">{currency2.toUpperCase()}</span>
          <p className="change" style={{ color: (getLatestPrice(dataCurrency2) - getOldPrice(dataCurrency2)) >= 0 ? 'green' : 'red' }}>
            {(getLatestPrice(dataCurrency2) - getOldPrice(dataCurrency2)).toFixed(2)} 
            ({((getLatestPrice(dataCurrency2) - getOldPrice(dataCurrency2)) / getOldPrice(dataCurrency2) * 100).toFixed(2)}%)
          </p>
        </div>
      )}
    </header>
  );
}

export default Header;
