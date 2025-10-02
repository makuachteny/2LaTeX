import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for development
});

export const latexConverter = {
  // Extract text from images using GPT-4 Vision
  extractTextFromImage: async (file) => {
    try {
      const base64Image = await fileToBase64(file);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Latest GPT-4 with vision
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all text from this image and convert it to properly formatted LaTeX code. Include all mathematical equations, formulas, text content, and formatting. Return ONLY the LaTeX code without explanations."
              },
              {
                type: "image_url",
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ],
        max_tokens: 4096
      });

      const latexCode = response.choices[0].message.content;
      return {
        text: latexCode,
        confidence: 0.95
      };
    } catch (error) {
      console.error('AI extraction error:', error);
      throw new Error('Failed to extract text with AI: ' + error.message);
    }
  },

  // Convert plain text to LaTeX using GPT
  convertToLatex: async (text) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert LaTeX converter. Convert the given text into properly formatted LaTeX code. Include appropriate document structure, packages, and formatting. Preserve all mathematical notation and convert it to LaTeX math mode."
          },
          {
            role: "user",
            content: `Convert this text to LaTeX:\n\n${text}`
          }
        ],
        max_tokens: 4096,
        temperature: 0.3
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI conversion error:', error);
      // Fallback to basic conversion
      return `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\title{Document}
\\author{Author}
\\date{\\today}

\\begin{document}
\\maketitle

${text}

\\end{document}`;
    }
  }
};

// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}