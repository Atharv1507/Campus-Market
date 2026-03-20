import React, { createContext, useState, useContext, useEffect } from 'react';
import ErrorPopup from '../components/ErrorPopup';
import axios from 'axios';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const showError = (message) => {
    setErrorMessage(message || 'An unexpected error occurred. Please try again later.');
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  // Set up global axios interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Extract a user-friendly message
        let message = 'Something went wrong.';
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          message = error.response.data?.message || `Error: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
          // The request was made but no response was received
          message = 'Network error: No response from server. Check your connection.';
        } else {
          // Something happened in setting up the request that triggered an Error
          message = error.message;
        }

        showError(message);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, clearError }}>
      {children}
      <ErrorPopup message={errorMessage} onClose={clearError} />
    </ErrorContext.Provider>
  );
};
