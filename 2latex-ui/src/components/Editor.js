import React from 'react';
import { ChevronRight } from 'lucide-react';
import { fileUtils } from '../utils/fileUtils';

export default function Editor({
  latexCode,
  setLatexCode,
  lineNumbers,
  fontSize,
  previewMode,
  onCopy,
  onDownload,
  editorOpen,
  onToggle
}) {
  return (
    <div className={`editor ${editorOpen ? '' : 'collapsed'}`}>
      {editorOpen && (
        <>
          <div className="editor-header">
            <div>
              <h3 className="editor-title">LaTeX Editor</h3>
              <div className="editor-subtitle">
                {fileUtils.getLineCount(latexCode)} lines • {latexCode.length} characters
              </div>
            </div>
          </div>
          
          <div className="editor-body">
            {lineNumbers && (
              <div className="line-numbers">
                {Array.from({ length: fileUtils.getLineCount(latexCode) }, (_, i) => (
                  <div key={i} className="line-number">{i + 1}</div>
                ))}
              </div>
            )}
            <textarea
              value={latexCode}
              onChange={(e) => setLatexCode(e.target.value)}
              className="latex-textarea"
              style={{fontSize: `${fontSize}px`}}
              placeholder="Type or paste LaTeX code here, or upload a file..."
              spellCheck={false}
            />
          </div>
        </>
      )}
      <button className="collapse-btn" onClick={onToggle}>
        <ChevronRight size={16} style={{transform: editorOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s'}} />
      </button>
    </div>
  );
}