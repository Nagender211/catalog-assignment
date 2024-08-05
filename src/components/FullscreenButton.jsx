import React from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import './styles.css'; 

function FullscreenButton({ isFullscreen, onEnterFullscreen, onExitFullscreen }) {
  return (
    <div className="fullscreen-controls">
      {!isFullscreen ? (
        <button className="fullscreen-button" onClick={onEnterFullscreen}>
          <OpenInFullIcon style={{ marginLeft: '-20px', color: '#6F7177', width: '15px', marginTop: '-3px', position: 'absolute'}} />
          Fullscreen
        </button>
      ) : (
        <button className="exit-fullscreen-button" onClick={onExitFullscreen}>
          <OpenInFullIcon style={{ marginRight: '8px' }} />
          Exit Fullscreen
        </button>
      )}
    </div>
  );
}

export default FullscreenButton;
