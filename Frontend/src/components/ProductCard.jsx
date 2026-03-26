import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import ItemModal from './ItemModal';
import { useUsersContext } from '../context/UserContext';
import { useUser } from '@clerk/react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { usersMap, handleContact } = useUsersContext();
  const { user } = useUser();

  const onContact = (e) => {
    e.stopPropagation();
    const contacterEmail = user?.emailAddresses?.[0]?.emailAddress;
    handleContact(product.created_by, product.title, contacterEmail);
  };

  return (
    <>
      <div className="product-card" onClick={() => setIsModalOpen(true)}>
        <div className="card-image-wrapper">
          <img
            src={product.image || product.image_url || 'https://via.placeholder.com/300?text=No+Image'}
            alt={product.title}
            className="card-image"
          />
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
              <p className="card-seller" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Posted by {usersMap[product.created_by] ? usersMap[product.created_by].name : 'Unknown User'}
              </p>
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
            <p className="card-price">₹{product.price}</p>
            <button className="btn-waitlist" onClick={onContact}>
              <MessageCircle className="h-4 w-4" /> Contact Seller
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
