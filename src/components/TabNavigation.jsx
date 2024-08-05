import React from 'react';
import './styles.css'; // Ensure you import the CSS file

function TabNavigation({ activeTab, onTabChange }) {
  return (
    <>
      <nav>
        <ul className="nav nav-underline-row">
          {['summary', 'chart', 'statistics', 'analysis', 'setting'].map((tab) => (
            <li key={tab} className="nav-item">
              <a
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                aria-current={activeTab === tab ? 'page' : undefined}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange(tab);
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
    </>
  );
}

export default TabNavigation;
