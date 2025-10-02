# 2LaTeX Document Converter

A React-based LaTeX document converter that transforms images, PDFs, and text files into structured LaTeX documents.

## Features

- 📁 **Multi-format Support**: Upload images, PDFs, or text files
- 📷 **Camera Capture**: Take photos directly for OCR processing
- ✏️ **Live Editor**: Edit LaTeX code with syntax highlighting and line numbers
- 👁️ **Multiple Preview Modes**: View as Paper, PDF, or Raw LaTeX
- ⌨️ **Keyboard Shortcuts**:
  - `Ctrl/Cmd + S`: Save locally
  - `Ctrl/Cmd + B`: Toggle sidebar
  - `Ctrl/Cmd + D`: Download .tex file
- 💾 **Auto-save**: Automatically saves your work to localStorage
- 🎨 **Bootstrap UI**: Clean, responsive interface

## Installation

1. Create a new React project or use the provided files
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
latex-converter/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Toolbar.js
│   │   ├── FileSidebar.js
│   │   ├── Editor.js
│   │   └── Preview.js
│   ├── utils/
│   │   ├── fileUtils.js
│   │   └── latexConverter.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── .gitignore
└── README.md
```

## Usage

1. **Upload Files**: Click "Upload" or drag files into the drop zone
2. **Camera Capture**: Use "Capture" to take photos on mobile devices
3. **Edit**: Modify the LaTeX code in the editor
4. **Preview**: Switch between Paper, PDF, and Raw views
5. **Download**: Export as .tex or .md file
6. **Save**: Use Ctrl/Cmd+S to save locally

## Customization

### Adding Real OCR

Replace the simulated OCR in `src/utils/latexConverter.js` with a real API:

```javascript
extractTextFromImage: async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('YOUR_OCR_API_ENDPOINT', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return { text: data.text, confidence: data.confidence };
}
```

### Styling

Modify `src/App.css` to customize the appearance.

## Technologies Used

- React 18
- Bootstrap 5
- Lucide React (icons)
- HTML5 File API
- localStorage for persistence

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

// ============================================
// SETUP INSTRUCTIONS
// ============================================

SETUP STEPS FOR VSCODE:

1. Create a new folder for your project:
   mkdir latex-converter
   cd latex-converter

2. Initialize npm and create React app:
   npx create-react-app .

3. Install additional dependencies:
   npm install lucide-react bootstrap

4. Create the folder structure:
   mkdir src/components src/utils

5. Copy the files from above into the appropriate locations:
   - Copy package.json content (merge with existing)
   - Copy public/index.html
   - Copy all src/ files to their respective folders
   - Copy .gitignore and README.md

6. Start the development server:
   npm start

7. Your app should open at <http://localhost:3000>

ALTERNATIVE: If you want to use the files directly without create-react-app,
you'll need to set up webpack/babel manually or use Vite instead:

   npm create vite@latest latex-converter -- --template react
   cd latex-converter
   npm install
   npm install lucide-react bootstrap

Then copy the files as described above.
