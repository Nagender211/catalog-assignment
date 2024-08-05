import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './styles.css';

function CryptoChart({ dataUSD, dataCurrency2, timeframe }) {
  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    return timeframe === '1'
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString();
  };

  const chartDataUSD = dataUSD?.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString(),
    priceUSD: price,
    priceCurrency2: null
  })) || [];

  if (dataCurrency2) {
    dataCurrency2.prices.forEach(([timestamp, price], index) => {
      if (index < chartDataUSD.length) {
        chartDataUSD[index].priceCurrency2 = price;
      }
    });
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`Date: ${new Date(payload[0].payload.date).toLocaleString()}`}</p>
          <p>{`USD: $${payload[0].value.toFixed(2)}`}</p>
          {payload[1] && <p>{`Currency2: ${payload[1].value.toFixed(2)}`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container char-graph">
      <ResponsiveContainer width={839} height={343}>
        <AreaChart
          data={chartDataUSD}
          margin={{ top: 10, right: 60, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis}
            axisLine={false}
            tickLine={false}
          />
          <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="priceUSD" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.3}
          />
          {dataCurrency2 && (
            <Area 
              type="monotone" 
              dataKey="priceCurrency2" 
              stroke="#82ca9d" 
              fill="#82ca9d" 
              fillOpacity={0.3}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

}

export default CryptoChart;