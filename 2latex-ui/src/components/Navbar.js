import React from 'react';
import { List, Camera, Upload } from 'lucide-react';

export default function Navbar({ 
  setSidebarOpen, 
  onCameraClick, 
  onUploadClick, 
  fontSize, 
  setFontSize 
}) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="logo">
            <span className="logo-text">LaTeX</span>
            <span className="logo-accent">Pro</span>
          </div>
          <span className="navbar-title">AI-Powered Document Converter</span>
        </div>
        <div className="navbar-right">
          <button className="nav-btn" onClick={() => setSidebarOpen(s => !s)} title="Toggle Files">
            <List size={18} />
          </button>
          <button className="nav-btn" onClick={onCameraClick} title="Capture">
            <Camera size={18} />
          </button>
          <button className="nav-btn" onClick={onUploadClick} title="Upload">
            <Upload size={18} />
          </button>
          <div className="divider" />
          <select className="font-select" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}>
            <option value={12}>12pt</option>
            <option value={14}>14pt</option>
            <option value={16}>16pt</option>
            <option value={18}>18pt</option>
          </select>
        </div>
      </div>
    </nav>
  );
}