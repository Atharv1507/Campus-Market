import React from 'react';
import { Instagram, Twitter, Facebook, Github } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-socials">
            <a href="#" className="social-link">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="social-link">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="social-link">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="social-link">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
          
          <div className="footer-info">
            <div className="footer-brand">
              <div className="footer-icon">
                C
              </div>
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
