import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { categories } from '../data/mockData';
import { Filter } from 'lucide-react';
import './ProductGrid.css';

export default function ProductGrid({ products }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <p>No items found in this category.</p>
        </div>
      )}
      
      <div className="load-more-wrapper">
        <button className="btn-load-more">
          Load More
        </button>
      </div>
    </div>
  );
}
