import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import ItemModal from './ItemModal';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // We want clicks on interactive elements (Heart, Waitlist) to not trigger the modal
  const handleInteraction = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="product-card" onClick={() => setIsModalOpen(true)}>
        <div className="card-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="card-image"
          />
          <button className="card-heart-btn" onClick={handleInteraction}>
            <Heart className="h-4 w-4" />
          </button>
          <div className="card-badges">
            <span className="badge-condition">
              {product.condition}
            </span>
          </div>
        </div>
        
        <div className="card-content">
          <div>
            <div className="card-title-group">
              <h3 className="card-title">{product.title}</h3>
              <p className="card-category">{product.category}</p>
            </div>
            
            <div className="card-tags">
              {product.tags && product.tags.map(tag => (
                 <span key={tag} className="tag">
                   {tag}
                 </span>
              ))}
            </div>
          </div>
          
          <div className="card-footer">
            <p className="card-price">${product.price}</p>
            <button className="btn-waitlist" onClick={handleInteraction}>
              <MessageCircle className="h-4 w-4" /> Waitlist
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ItemModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
