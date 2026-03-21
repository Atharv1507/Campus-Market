import React, { useState } from 'react';
import { ShoppingCart, User, Menu, Bell, PlusCircle, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { UserButton } from '@clerk/react';
import logo from '../assets/logo.png';

export default function Header({ isSignedIn, onOpenUpload }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo Section */}
        <Link to="/" className="header-brand" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="Logo" style={{ height: '9rem', width: 'auto', objectFit: 'contain' }} />
          <span className="brand-text">Scaler <span className="brand-highlight">Market</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>Browse</Link>
          <Link to="/all-ads" className={`nav-link ${location.pathname === '/all-ads' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>Requests</Link>
          <Link to="/my-ads" className={`nav-link ${location.pathname === '/my-ads' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>My Ads</Link>
          <Link to="/my-posts" className={`nav-link ${location.pathname === '/my-posts' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>My Posts</Link>
        </nav>

        {/* Desktop & Mobile Actions */}
        <div className="header-actions">
          <button className="btn-sell desktop-only" onClick={onOpenUpload}>
            <PlusCircle className="h-4 w-4" /> Sell Item
          </button>

          <button className="action-icon-btn">
            <span className="notification-dot"></span>
            <Bell className="h-5 w-5" />
          </button>

          {isSignedIn ? <UserButton afterSignOutUrl="/auth/login" /> :
            <Link to="/auth/signup" className="user-profile-btn" style={{ textDecoration: 'none' }} title="Login / Signup">
              <div className="user-avatar">
                <User className="h-4 w-4" />
              </div>
            </Link>
          }

          {/* Mobile menu button */}
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-menu">
          <nav className="mobile-nav-links">
            <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Browse</Link>
            <button className="mobile-nav-link">Chats</button>
            <Link to="/all-ads" className={`mobile-nav-link ${location.pathname === '/all-ads' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Requests</Link>
            <Link to="/my-ads" className={`mobile-nav-link ${location.pathname === '/my-ads' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>My Ads</Link>
            <Link to="/my-posts" className={`mobile-nav-link ${location.pathname === '/my-posts' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>My Posts</Link>
            <button className="btn-sell mobile-sell-btn" onClick={() => { onOpenUpload(); setIsMobileMenuOpen(false); }}>
              <PlusCircle className="h-4 w-4" /> Sell Item
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
