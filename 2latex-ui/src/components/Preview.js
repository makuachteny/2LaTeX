import React from 'react';
import { FileText } from 'lucide-react';

export default function Preview({
  compiledOutput,
  previewMode,
  setPreviewMode,
  fontSize,
  zoom
}) {
  return (
    <div className="preview">
      <div className="preview-header">
        <h3 className="preview-title">Preview</h3>
      </div>

      <div className="preview-body">
        {!compiledOutput ? (
          <div className="preview-empty">
            <FileText size={64} style={{color: '#cbd5e1', marginBottom: '16px'}} />
            <div className="preview-empty-text">No preview available</div>
            <div className="preview-empty-subtext">Upload files or type LaTeX code to see preview</div>
          </div>
        ) : (
          <>
            {previewMode === 'raw' && (
              <pre className="raw-preview">{compiledOutput}</pre>
            )}
            {previewMode === 'paper' && (
              <div className="paper-preview" style={{fontSize: `${fontSize}px`, transform: `scale(${zoom / 100})`}}>
                <div className="paper-header">
                  <h1 className="paper-title">Document Title</h1>
                  <div className="paper-author">Author Name</div>
                  <div className="paper-date">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="paper-content">
                  {compiledOutput.split('\n\n').map((block, i) => (
                    <p key={i} className="paper-paragraph">
                      {block.replace(/\\[a-zA-Z]+\{.*?\}/g, '').slice(0, 500)}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {previewMode === 'pdf' && (
              <div className="pdf-preview">
                <div className="pdf-header">document.tex</div>
                <pre className="pdf-content">{compiledOutput.slice(0, 3000)}</pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}