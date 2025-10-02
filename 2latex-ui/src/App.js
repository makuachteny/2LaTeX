import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import EditorPage from './pages/EditorPage';
import { isAuthenticated } from './utils/auth';

// Protected Route Component
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/auth" replace />;
}

// Public Route Component (redirect if already logged in)
function PublicRoute({ children }) {
  return !isAuthenticated() ? children : <Navigate to="/editor" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Page (Login/Signup) */}
      <Route 
        path="/auth" 
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } 
      />
      
      {/* Main Editor (Protected) */}
      <Route 
        path="/editor" 
        element={
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all - redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}