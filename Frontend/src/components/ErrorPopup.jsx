import React from 'react';
import './ErrorPopup.css';
import { X, AlertCircle } from 'lucide-react';

const ErrorPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-popup-overlay">
      <div className="error-popup-content">
        <div className="error-popup-header">
          <AlertCircle className="error-icon" size={24} />
          <h3>Couldn't Connect</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="error-popup-body">
          <p>{message}</p>
        </div>
        <div className="error-popup-footer">
          <button className="error-ok-btn" onClick={onClose}>Dismiss</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
