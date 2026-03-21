import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { categories } from '../data/mockData';
import { Filter } from 'lucide-react';
import axios from 'axios';
import './ProductGrid.css';

export default function ProductGrid({ searchQuery = "", refreshKey = 0 }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3031/api/products');
      if (res.data && res.data.data) {
        setProducts(res.data.data);
        console.log(res.data.data)
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  let filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  if (searchQuery.trim() !== '') {
    const lowerQuery = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) || 
      (p.description && p.description.toLowerCase().includes(lowerQuery))
    );
  }

  return (
    <div className="product-grid-section">
      <div className="grid-header">
        <h2 className="grid-title">
          Recently Added
        </h2>

        <div className="filters-wrapper">
          <div className="filter-pills">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`filter-pill ${activeCategory === category.id ? 'active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <button className="mobile-filter-btn">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <p>No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
