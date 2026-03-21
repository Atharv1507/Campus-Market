import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import UploadProductModal from './components/UploadProductModal';
import MyAds from './components/MyAds';
import AllAds from './components/AllAds';
import MyPosts from './components/MyPosts';
import { products } from './data/mockData';
import './index.css';
import './App.css';
import { useAuth, useUser } from '@clerk/react';
import axios from 'axios'

function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [allAds, setAllAds] = useState([])

  function handleUserLogin() {
    axios({
      method: 'post',
      url: 'http://localhost:3031/api/user',
      data: {
        id: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }


  useEffect(() => {
    if (!isSignedIn || !user) return
    handleUserLogin()

  }, [isSignedIn])

  return (
    <div className="app-container">
      <Header isSignedIn={isSignedIn} onOpenUpload={() => setIsUploadOpen(true)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero onSearch={setSearchQuery} />
              <ProductGrid searchQuery={searchQuery} refreshKey={refreshKey} />
            </>
          } />
          <Route path="/auth/login/*" element={<AuthPage />} />
          <Route path="/auth/signup/*" element={<AuthPage />} />
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/all-ads" element={<AllAds ads={allAds} />} />
        </Routes>
      </main>

      <Footer />

      {isUploadOpen && (
        <UploadProductModal 
          onClose={() => setIsUploadOpen(false)} 
          onSuccess={() => setRefreshKey(prev => prev + 1)} 
        />
      )}
    </div>
  );
}

export default App;
