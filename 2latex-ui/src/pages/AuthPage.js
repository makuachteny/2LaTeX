import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { login, signup, socialLogin } from '../utils/auth';
import './AuthPage.css';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState(searchParams.get('mode') || 'login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUniversity, setSignupUniversity] = useState('');

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam) {
      setMode(modeParam);
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(loginEmail, loginPassword);
    setLoading(false);

    if (result.success) {
      navigate('/editor');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (signupPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    const result = await signup(signupName, signupEmail, signupPassword, signupUniversity);
    setLoading(false);

    if (result.success) {
      navigate('/editor');
    } else {
      setError(result.error || 'Signup failed. Please try again.');
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    const result = await socialLogin(provider);
    setLoading(false);

    if (result.success) {
      navigate('/editor');
    } else {
      setError(result.error || `${provider} login failed. Please try again.`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="brand-content">
            <div className="brand-logo">
              <div className="logo-icon-large">Lx</div>
              <h1 className="brand-title">LaTeX Pro</h1>
            </div>
            <h2 className="brand-tagline">Transform Your Homework in Seconds</h2>
            <p className="brand-description">
              Join thousands of students who've already discovered the easiest way to convert handwritten notes into perfect LaTeX documents.
            </p>
            <div className="brand-features">
              <div className="brand-feature">
                <span className="feature-check">✓</span>
                <span>AI-powered conversion</span>
              </div>
              <div className="brand-feature">
                <span className="feature-check">✓</span>
                <span>95%+ accuracy rate</span>
              </div>
              <div className="brand-feature">
                <span className="feature-check">✓</span>
                <span>Export to any format</span>
              </div>
              <div className="brand-feature">
                <span className="feature-check">✓</span>
                <span>Free trial included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="auth-forms">
          <div className="form-container">
            <button className="back-button" onClick={() => navigate('/')}>
              ← Back to Home
            </button>

            {/* Tab Switcher */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
              >
                Login
              </button>
              <button 
                className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Login Form */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="auth-form">
                <h2 className="form-title">Welcome Back</h2>
                <p className="form-subtitle">Sign in to continue your homework journey</p>

                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input
                    type="email"
                    id="login-email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="student@university.edu"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <input
                    type="password"
                    id="login-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="forgot-password">
                  <a href="#fpassword">Forgot password?</a>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="divider">
                  <span>or continue with</span>
                </div>

                <div className="social-buttons">
                  <button 
                    type="button" 
                    className="btn-social"
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                      <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                      <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                      <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                    </svg>
                    Google
                  </button>
                  <button 
                    type="button" 
                    className="btn-social"
                    onClick={() => handleSocialLogin('github')}
                    disabled={loading}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                    </svg>
                    GitHub
                  </button>
                </div>
              </form>
            )}

            {/* Signup Form */}
            {mode === 'signup' && (
              <form onSubmit={handleSignup} className="auth-form">
                <h2 className="form-title">Create Account</h2>
                <p className="form-subtitle">Start your free trial - no credit card required</p>

                <div className="form-group">
                  <label htmlFor="signup-name">Full Name</label>
                  <input
                    type="text"
                    id="signup-name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-email">University Email</label>
                  <input
                    type="email"
                    id="signup-email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="student@university.edu"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-university">University (Optional)</label>
                  <input
                    type="text"
                    id="signup-university"
                    value={signupUniversity}
                    onChange={(e) => setSignupUniversity(e.target.value)}
                    placeholder="e.g., MIT, Stanford, Harvard"
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <div className="divider">
                  <span>or continue with</span>
                </div>

                <div className="social-buttons">
                  <button 
                    type="button" 
                    className="btn-social"
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                      <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                      <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                      <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                    </svg>
                    Google
                  </button>
                  <button 
                    type="button" 
                    className="btn-social"
                    onClick={() => handleSocialLogin('github')}
                    disabled={loading}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                    </svg>
                    GitHub
                  </button>
                </div>

                <div className="terms-text">
                  By signing up, you agree to our <a href="#terms">Terms of Service</a> and <a href="#pp">Privacy Policy</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}