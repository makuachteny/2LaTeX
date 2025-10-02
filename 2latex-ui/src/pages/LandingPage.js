import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="logo">
          <div className="logo-icon">Lx</div>
          <span className="logo-text">LaTeX Pro</span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <button className="btn-login" onClick={() => navigate('/auth?mode=login')}>
            Login
          </button>
          <button className="btn-signup" onClick={() => navigate('/auth?mode=signup')}>
            Sign Up Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>NEW</span>
            AI-Powered Conversion
          </div>
          <h1>
            Stop Wasting Time<br/>
            <span className="hero-highlight">Start Getting A's</span>
          </h1>
          <p>
            Snap a photo of your handwritten homework and watch it transform into perfect LaTeX code in seconds. 
            No more tedious typing. No more formatting headaches. Just pure academic excellence.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/auth?mode=signup')}>
              Start Free Trial
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior: 'smooth'})}>
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <div className="section-badge">Why Students Love Us</div>
          <h2>Homework Made Easy</h2>
          <p>Everything you need to ace your assignments without spending hours on formatting</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>Instant Photo Conversion</h3>
            <p>Snap a picture of your handwritten work, equations, or diagrams. Our AI instantly converts it to perfect LaTeX code.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Accuracy</h3>
            <p>Using GPT-4 Vision, we recognize equations, symbols, and formatting with 95%+ accuracy. Even complex mathematical notation.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Convert entire homework assignments in seconds. What used to take hours now takes minutes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✏️</div>
            <h3>Real-Time Editing</h3>
            <p>Make changes instantly with our intuitive editor. See your changes rendered in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Work from anywhere. Capture, convert, and edit right from your phone or tablet.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Export Anywhere</h3>
            <p>Download as .tex, .pdf, or .md files. Compatible with all major platforms and submission systems.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <div className="section-badge">Simple Process</div>
          <h2>From Photo to Perfect in 3 Steps</h2>
          <p>It's so easy, you'll wonder how you ever did homework without it</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Capture Your Work</h3>
            <p>Take a photo of your handwritten homework, equations, or notes. Works with notebooks, whiteboards, or loose paper.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Does the Magic</h3>
            <p>Our advanced AI reads your handwriting, recognizes equations, and converts everything to beautifully formatted LaTeX code.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Edit & Submit</h3>
            <p>Make any final tweaks in our editor, preview your document, and export it ready for submission. Done!</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Ace Your Homework?</h2>
        <p>Join thousands of students who've already saved countless hours on LaTeX formatting. Start your free trial today—no credit card required.</p>
        <button className="btn-primary" onClick={() => navigate('/auth?mode=signup')}>
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo" style={{marginBottom: '20px'}}>
              <div className="logo-icon">Lx</div>
              <span style={{color: 'white'}}>LaTeX Pro</span>
            </div>
            <p>The fastest way for students to convert handwritten homework into professional LaTeX documents.</p>
          </div>
          <div className="footer-section">
            <h3>Product</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#career">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 LaTeX Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
