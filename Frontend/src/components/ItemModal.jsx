import React, { useEffect } from 'react';
import { X, Calendar, User, Tag, ShieldCheck, MessageCircle, Heart } from 'lucide-react';
import './ItemModal.css';

export default function ItemModal({ product, onClose }) {
  // Prevent scrolling when modal is open and fix layout shift
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, []);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="item-modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>

        <div className="item-modal-content">
          <div className="item-image-section">
            <img src={product.image} alt={product.title} className="item-modal-image" />
          </div>

          <div className="item-details-section">
            <h2 className="item-modal-title">{product.title}</h2>
            <p className="item-modal-price">${product.price}</p>

            <div className="item-modal-meta">
              <div className="meta-item">
                <Tag className="h-4 w-4 meta-icon" />
                <span>{product.category}</span>
              </div>
              <div className="meta-item">
                <ShieldCheck className="h-4 w-4 meta-icon" />
                <span>Condition: {product.condition}</span>
              </div>
              <div className="meta-item">
                <User className="h-4 w-4 meta-icon" />
                <span>Seller: {product.seller}</span>
              </div>
              <div className="meta-item">
                <Calendar className="h-4 w-4 meta-icon" />
                <span>Posted {product.datePosted}</span>
              </div>
            </div>

            <p className="item-modal-description">
              {product.description}
            </p>

            <div className="item-modal-actions">
              <button className="btn-modal-primary">
                <MessageCircle className="h-5 w-5" /> Contact Seller
              </button>
              <button className="btn-modal-secondary" title="Save to Watchlist">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
