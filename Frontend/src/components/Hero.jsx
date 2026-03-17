import React from 'react';
import { Search } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text-wrapper">
          <h1 className="hero-title">
            <span>Buy, sell & trade</span>{' '}
            <span className="hero-title-highlight">on campus</span>
          </h1>
          <p className="hero-subtitle">
            The easiest way for students to buy textbooks, dorm essentials, electronics, and more from other students right here on campus.
          </p>

          <div className="hero-search-wrapper">
            <div className="hero-search-container">
              <Search className="hero-search-icon" />
              <input
                className="hero-search-input"
                placeholder="Search campus items, textbooks, housing..."
                type="text"
              />
              <button className="btn-hero-search">Search</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
