import React, { useEffect, useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { categories } from '../data/mockData';
import axios from 'axios';
import { useUser } from '@clerk/react';
import './UploadProductModal.css';

export default function UploadProductModal({ onClose, onSuccess }) {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: 'New',
    description: '',
    image_url: '' // placeholder for now
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [imageFile, setImageFile] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setIsUploadingImage(true);
    setError(null);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Marketplace');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dmxf5exhr/image/upload', data);
      setFormData(prev => ({ ...prev, image_url: res.data.secure_url }));
    } catch (err) {
      console.error('Cloudinary Upload Error:', err);
      setError('Failed to upload image. Please check your network and try again.');
      setImageFile(null);
      setImagePreview('');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, {
        ...formData,
        price: parseFloat(formData.price),
        created_by: user ? user.id : 'anonymous'
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="upload-modal-container">
        
        <div className="upload-modal-header">
          <h2 className="upload-modal-title">Sell an Item</h2>
          <button className="modal-close-btn" onClick={onClose} style={{position: 'static'}}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="upload-modal-content">
          <form id="upload-form" className="auth-form" style={{padding: 0}} onSubmit={handleSubmit}>
            
            <div className="upload-dropzone" style={{ position: 'relative', overflow: 'hidden' }}>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageUpload}
                disabled={isUploadingImage}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
              />
              {imagePreview ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={imagePreview} alt="Preview" style={{ height: '80px', objectFit: 'contain', marginBottom: '8px', borderRadius: '4px' }} />
                  <p className="upload-text-primary" style={{ fontSize: '0.875rem' }}>{isUploadingImage ? 'Uploading image...' : 'Image uploaded successfully!'}</p>
                </div>
              ) : (
                <>
                  <UploadCloud className="upload-icon" />
                  <p className="upload-text-primary">Click to select an image</p>
                  <p className="upload-text-secondary">PNG, JPG, or WEBP</p>
                </>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="title">Title</label>
              <input 
                id="title" 
                type="text" 
                className="form-input" 
                placeholder="e.g. Intro to CS Textbook" 
                value={formData.title}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="upload-form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="price">Price (₹)</label>
                <input 
                  id="price" 
                  type="number" 
                  min="0"
                  step="0.01"
                  className="form-input" 
                  placeholder="0.00" 
                  value={formData.price}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="category">Category</label>
                <select id="category" className="form-input" value={formData.category} onChange={handleInputChange} required>
                  <option value="">Select category...</option>
                  {categories.map(c => c.id !== 'all' && (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="condition">Condition</label>
              <select id="condition" className="form-input" value={formData.condition} onChange={handleInputChange} required>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea 
                id="description" 
                className="form-input upload-desc-input" 
                placeholder="Describe your item, formatting, defects, etc." 
                value={formData.description}
                onChange={handleInputChange}
                required 
              ></textarea>
            </div>
            {error && <p className="error-text" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </form>
        </div>

        <div className="upload-modal-footer">
          <button type="button" className="btn-modal-secondary" onClick={onClose} disabled={isLoading || isUploadingImage}>
            Cancel
          </button>
          <button type="submit" form="upload-form" className="btn-modal-primary" disabled={isLoading || isUploadingImage}>
            {isLoading || isUploadingImage ? 'Processing...' : 'Post Item'}
          </button>
        </div>

      </div>
    </div>
  );
}
