import React from 'react';
import './NotFound.css'
export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-text">
      <img src={require('./images/sad-face.svg')} alt='404' />
          404: Page Not Found
      </div>
    </div>

  )
} 