import React from 'react';
import { Instagram, Twitter, Facebook, Github } from 'lucide-react';
import './Footer.css';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-content">

          <div className="footer-info">
            <div className="footer-brand">
              <span className="footer-brand-text">Scaler<span className="footer-brand-highlight">Market</span></span>
            </div>
            <p className="footer-copyright">
              &copy; 2026 Scaler Market Inc. All rights reserved. Built for students, by students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
