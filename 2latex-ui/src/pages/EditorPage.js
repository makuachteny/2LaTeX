import React, { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import FileSidebar from "../components/FileSidebar";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { fileUtils } from "../utils/fileUtils";
import { latexConverter } from "../utils/latexConverter";
import { logout, getUser } from "../utils/auth";

export default function EditorPage() {
  const navigate = useNavigate();
  const user = getUser();

  const [latexCode, setLatexCode] = useState("");
  const [compiledOutput, setCompiledOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingStatus, setProcessingStatus] = useState("");
  const [lineNumbers, setLineNumbers] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previewMode, setPreviewMode] = useState("paper");
  const [zoom, setZoom] = useState(100);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const processFile = async (file) => {
    const fileData = {
      id: fileUtils.generateFileId(file),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: null,
      status: "queued",
      confidence: 0,
    };

    if (file.type.startsWith("image/")) {
      try {
        fileData.preview = await fileUtils.readFileAsDataURL(file);
      } catch (e) {
        console.error("Preview error:", e);
      }
    }
    return fileData;
  };

  const extractTextFromFile = async (file) => {
    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      const { text, confidence } = await latexConverter.extractTextFromImage(
        file
      );
      return { text, confidence: Math.round(confidence * 100), status: "done" };
    } else if (
      file.type.startsWith("text/") ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md")
    ) {
      const text = await fileUtils.readFileAsText(file);
      const latex = await latexConverter.convertToLatex(text);
      return { text: latex, confidence: 100, status: "done" };
    }
    return { text: "", confidence: 0, status: "skipped" };
  };

  const handleFiles = useCallback(async (filesArray) => {
    const files = Array.from(filesArray);
    if (!files.length) return;

    setLoading(true);
    setProcessingStatus("Processing documents with AI...");

    try {
      let combinedText = "";

      for (const file of files) {
        const fileData = await processFile(file);
        setUploadedFiles((prev) => [...prev, fileData]);

        fileData.status = "processing";
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileData.id ? fileData : f))
        );

        const { text, confidence, status } = await extractTextFromFile(file);
        combinedText += text + "\n\n";

        fileData.status = status;
        fileData.confidence = confidence;
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileData.id ? { ...fileData } : f))
        );
      }

      if (combinedText.trim()) {
        setLatexCode(combinedText);
        setCompiledOutput(combinedText);
        setProcessingStatus("AI conversion complete!");
      } else {
        setProcessingStatus("No extractable text found.");
      }
    } catch (err) {
      console.error("Processing error:", err);
      setProcessingStatus("Error: " + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setProcessingStatus(""), 2000);
    }
  }, []);

  const handleFileUpload = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleRecompile = () => {
    setLoading(true);
    setProcessingStatus("Recompiling document...");
    setTimeout(() => {
      setCompiledOutput(latexCode);
      setLoading(false);
      setProcessingStatus("Recompiled successfully");
      setTimeout(() => setProcessingStatus(""), 1200);
    }, 700);
  };

  const handleDownload = (type = "tex") => {
    if (!latexCode) return;
    const fileContent =
      type === "md"
        ? latexCode
            .replace(/\\documentclass[\s\S]*?\\begin\{document\}/, "")
            .replace(/\\end\{document\}/, "")
        : latexCode;
    const blob = new Blob([fileContent], {
      type: type === "md" ? "text/markdown" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `document.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (latexCode) {
      navigator.clipboard.writeText(latexCode).then(() => {
        setProcessingStatus("Copied to clipboard");
        setTimeout(() => setProcessingStatus(""), 1000);
      });
    }
  };

  const handleClear = () => {
    if (!window.confirm("Clear the current document and uploaded files?"))
      return;
    setLatexCode("");
    setUploadedFiles([]);
    setProcessingStatus("Cleared");
    setTimeout(() => setProcessingStatus(""), 1000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ADD THIS RETURN STATEMENT - This was missing!
  return (
    <div className="editor-page">
      <Navbar user={user} onLogout={handleLogout} />

      <Toolbar
        onRecompile={handleRecompile}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onClear={handleClear}
        disabled={loading}
        lineNumbers={lineNumbers}
        setLineNumbers={setLineNumbers}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode} // Now being used!
        zoom={zoom}
        setZoom={setZoom}
        status={processingStatus}
      />

      <div className="editor-container">
        {sidebarOpen && (
          <FileSidebar
            files={uploadedFiles}
            onClose={() => setSidebarOpen(false)}
          />
        )}
          <Editor
            code={latexCode}
            onChange={setLatexCode}
            lineNumbers={lineNumbers}
          />

        <Preview content={compiledOutput} mode={previewMode} zoom={zoom} />
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.txt,.md"
        multiple
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
}
