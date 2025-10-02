import React from 'react';
import { FileText, ChevronLeft } from 'lucide-react';
import { fileUtils } from '../utils/fileUtils';

export default function FileSidebar({
  sidebarOpen,
  uploadedFiles,
  onAddClick,
  onCameraClick,
  onRemoveFile,
  dropRef,
  processingStatus,
  loading,
  onToggle
}) {
  return (
    <div className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      {sidebarOpen && (
        <>
          <div className="sidebar-header">
            <h3 className="sidebar-title">
              Files
              <span className="badge">{uploadedFiles.length}</span>
            </h3>
            <div className="sidebar-actions">
              <button className="small-btn" onClick={onAddClick}>Add</button>
              <button className="small-btn" onClick={onCameraClick}>Camera</button>
            </div>
          </div>
          
          <div className="sidebar-content">
            <div ref={dropRef} className="drop-zone">
              <FileText size={40} className="drop-icon" />
              <div className="drop-zone-text">Drop files here</div>
              <div className="drop-zone-subtext">Images, PDFs, or text files</div>
            </div>

            {uploadedFiles.length === 0 && (
              <div className="empty-state">No files uploaded yet</div>
            )}

            {uploadedFiles.map((f) => (
              <div key={f.id} className="file-card">
                <div className="file-preview">
                  {f.preview ? (
                    <img src={f.preview} alt={f.name} className="file-preview-img" />
                  ) : (
                    <FileText size={24} style={{color: '#94a3b8'}} />
                  )}
                </div>
                <div className="file-info">
                  <div className="file-name">{f.name}</div>
                  <div className="file-size">{fileUtils.formatFileSize(f.size)}</div>
                  <div className="file-status">
                    {f.status} {f.confidence > 0 && `(${f.confidence}%)`}
                  </div>
                  <div className="file-actions">
                    <button className="file-btn" onClick={() => onRemoveFile(f.id)}>Remove</button>
                    {f.preview && <a href={f.preview} download={f.name} className="file-btn">Preview</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="status-text">
              {loading && <div className="spinner" />}
              <span>{processingStatus || 'Ready'}</span>
            </div>
          </div>
        </>
      )}
      <button className="collapse-btn" onClick={onToggle}>
        <ChevronLeft size={16} style={{transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s'}} />
      </button>
    </div>
  );
}