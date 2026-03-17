import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth success
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-header">
          <h2 className="auth-title">Welcome to CampusMart</h2>
          <p className="auth-subtitle">Join your university marketplace today.</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Alex Student"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">University Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="student@university.edu"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="auth-action">
            <button type="submit" className="btn-auth-submit">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
