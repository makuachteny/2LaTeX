import React from 'react';
import { RefreshCw, Copy, Trash2, ZoomIn, ZoomOut, Eye, EyeOff, FileText, FileCode } from 'lucide-react';

export default function Toolbar({
  onRecompile,
  lineNumbers,
  setLineNumbers,
  previewMode,
  setPreviewMode,
  onCopy,
  onDownload,
  onClear,
  disabled,
  zoom,
  setZoom,
  status
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <button 
          className={`toolbar-btn primary-btn ${disabled ? 'disabled' : ''}`}
          onClick={onRecompile} 
          disabled={disabled}
        >
          <RefreshCw size={16} />
          <span>Compile</span>
        </button>

        <button 
          className={`toolbar-btn ${lineNumbers ? 'active' : ''}`}
          onClick={() => setLineNumbers(!lineNumbers)}
        >
          {lineNumbers ? <Eye size={16} /> : <EyeOff size={16} />}
          <span>{lineNumbers ? 'Hide' : 'Show'} Lines</span>
        </button>

        <div className="btn-group">
          <button 
            className={`toolbar-btn ${previewMode === 'paper' ? 'active-btn' : ''}`}
            onClick={() => setPreviewMode('paper')}
          >
            Paper
          </button>
          <button 
            className={`toolbar-btn ${previewMode === 'pdf' ? 'active-btn' : ''}`}
            onClick={() => setPreviewMode('pdf')}
          >
            PDF
          </button>
          <button 
            className={`toolbar-btn ${previewMode === 'raw' ? 'active-btn' : ''}`}
            onClick={() => setPreviewMode('raw')}
          >
            Raw
          </button>
        </div>
      </div>

      {status && (
        <div className="toolbar-status">
          {status}
        </div>
      )}

      <div className="toolbar-right">
        <div className="zoom-controls">
          <button 
            className="zoom-btn" 
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            disabled={zoom <= 50}
          >
            <ZoomOut size={16} />
          </button>
          <span className="zoom-text">{zoom}%</span>
          <button 
            className="zoom-btn" 
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            disabled={zoom >= 200}
          >
            <ZoomIn size={16} />
          </button>
        </div>

        <button 
          className="toolbar-btn" 
          onClick={onCopy} 
          disabled={disabled}
        >
          <Copy size={16} />
          <span>Copy</span>
        </button>

        <button 
          className="toolbar-btn" 
          onClick={() => onDownload('tex')} 
          disabled={disabled}
        >
          <FileCode size={16} />
          <span>.tex</span>
        </button>

        <button 
          className="toolbar-btn" 
          onClick={() => onDownload('md')} 
          disabled={disabled}
        >
          <FileText size={16} />
          <span>.md</span>
        </button>

        <button 
          className="toolbar-btn danger-btn" 
          onClick={onClear}
        >
          <Trash2 size={16} />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}