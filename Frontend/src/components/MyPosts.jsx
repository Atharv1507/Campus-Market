import React, { useState, useEffect } from 'react';
import { Trash2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MyPosts.css';
import axios from 'axios';
import { useUser } from '@clerk/react';
import UploadProductModal from './UploadProductModal';

export default function MyPosts() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [products, setProducts] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user) return;
    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => {
        const data = res.data.data.filter(product => product.created_by === user.id);
        setProducts(data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, [user, refreshKey]);

  const handleDelete = (id) => {
    axios({
      method: 'delete',
      url: `${import.meta.env.VITE_API_URL}/api/products/${id}`,
    }).then((res) => {
      console.log('Deleted product:', res.data);
      setProducts(products.filter(p => p.product_id !== id));
    }).catch((err) => {
      console.error('Error deleting product:', err);
    });
  };

  if (!isLoaded) return <div className="my-posts-page"><p style={{ color: 'var(--text-muted)' }}>Loading...</p></div>;
  if (!isSignedIn) {
    return (
      <div className="my-posts-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', maxWidth: '400px' }}>
          <div style={{ width: '4rem', height: '4rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Lock className="h-8 w-8" style={{ color: 'var(--primary-500)' }} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Authentication Required</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>Create an account or sign in to view and centrally manage your enlisted products.</p>
          <Link to="/auth/signup" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.625rem 1.25rem', backgroundColor: 'var(--primary-500)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: '500', textDecoration: 'none', transition: 'background-color 0.2s' }}>Sign up / Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-posts-page">
      <div className="my-posts-header-section">
        <div>
          <h1 className="my-posts-title">My Listed Products</h1>
          <p className="my-posts-subtitle">Manage the items you're selling.</p>
        </div>
        <button className="btn-post-product" onClick={() => setIsUploadOpen(true)}>
          <Plus className="h-5 w-5" /> Sell an Item
        </button>
      </div>

      <div className="posts-grid-section">
        <h2 className="section-title">Active Listings</h2>
        {products.length === 0 ? (
          <div className="empty-posts-state">
            <p>You haven't listed any products yet.</p>
          </div>
        ) : (
          <div className="posts-grid">
            {products.map(product => (
              <div key={product.product_id} className="post-card">
                <div className="post-card-image-wrapper">
                  <img src={product.image_url || 'https://via.placeholder.com/300?text=No+Image'} alt={product.title} />
                </div>
                <div className="post-card-content">
                  <div className="post-card-header">
                    <h3>{product.title}</h3>
                    <span className="post-price">₹{product.price}</span>
                  </div>
                  <p className="post-desc">{product.description}</p>
                  <div className="post-meta">
                    <span className="post-category">{product.category}</span>
                    <span className="post-condition">{product.condition}</span>
                  </div>
                  <button className="btn-delete-post" onClick={() => handleDelete(product.product_id)}>
                    <Trash2 className="h-4 w-4" /> Remove Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isUploadOpen && (
        <UploadProductModal 
          onClose={() => setIsUploadOpen(false)} 
          onSuccess={() => setRefreshKey(prev => prev + 1)}
        />
      )}
    </div>
  );
}
