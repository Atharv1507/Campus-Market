import React from 'react';
import { useAuth, SignIn, SignUp, UserButton } from '@clerk/react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './AuthPage.css';

export default function AuthPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!isLoaded) return null;

  // Logic to show user UI if already signed in
  if (isSignedIn) {
    return (
      <div className="signed-in-header">
        <h1>You are already logged in!</h1>
        <UserButton afterSignOutUrl="/auth/login" />
        <Link to="/">Go to Dashboard</Link>
      </div>
    );
  }

  return (

    <div className="auth-container">
      <Link to='/'>Go Home</Link>
      <div className="auth-wrapper">
        {/* Render SignUp by default or if the path is /signup */}
   {pathname.startsWith('/auth/login') ? (
          <SignIn 
            routing="path" 
            path="/auth/login" 
            signUpUrl="/auth/signup"
            forceRedirectUrl="/"
          />
        ) : (
          <SignUp 
            routing="path" 
            path="/auth/signup" 
            signInUrl="/auth/login"
            forceRedirectUrl="/"
          />
        )}
      </div>
    </div>

  );
}