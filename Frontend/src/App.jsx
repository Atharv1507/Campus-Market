import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import UploadProductModal from './components/UploadProductModal';
import MyAds from './components/MyAds';
import OthersNeeds from './components/OthersNeeds';
import { products } from './data/mockData';
import './index.css';
import './App.css';

function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="app-container">
      <Header onOpenUpload={() => setIsUploadOpen(true)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProductGrid products={products} />
            </>
          } />
          <Route path="/auth/login/*" element={<AuthPage />} />
          <Route path="/auth/signup/*" element={<AuthPage />} />
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/others-needs" element={<OthersNeeds />} />
        </Routes>
      </main>

      <Footer />

      {isUploadOpen && (
        <UploadProductModal onClose={() => setIsUploadOpen(false)} />
      )}
    </div>
  );
}

export default App;
