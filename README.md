# Resume Parser & Portfolio Generator

A React-based web application that automatically converts resumes (PDF/Word) into beautiful, deployable portfolio websites.

## Features

- **📄 Resume Upload**: Drag-and-drop or click to upload PDF or Word documents
- **🤖 Smart Parsing**: Automatically extracts name, contact info, skills, experience, and education
- **🎨 Multiple Templates**: Choose from 3 professionally designed portfolio templates
  - Modern Professional
  - Creative Portfolio
  - Minimal Elegance
- **👀 Live Preview**: See your portfolio in real-time before deployment
- **📥 Export**: Download generated portfolio as standalone HTML file
- **🚀 Easy Deployment**: Deploy to Netlify or GitHub Pages with guided instructions

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **pdfjs-dist** - PDF parsing
- **Mammoth.js** - Word document parsing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open your browser and navigate to \`http://localhost:5173\`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the \`dist\` folder.

## Usage

1. **Upload Resume**: Click or drag-and-drop your resume (PDF or DOCX format)
2. **Choose Template**: Select from available portfolio templates
3. **Preview**: Review your generated portfolio
4. **Download**: Download the HTML file
5. **Deploy**: Follow instructions to deploy to Netlify or GitHub Pages

## Deployment Options

### Netlify (Recommended for beginners)

1. Download the generated HTML file
2. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop your HTML file
4. Get instant live URL!

### GitHub Pages (For developers)

1. Create a repository: \`[your-username].github.io\`
2. Download and rename file to \`index.html\`
3. Push to your repository
4. Enable GitHub Pages in repository settings
5. Access at \`https://[your-username].github.io\`

## Project Structure

\`\`\`
resume-parser/
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx          # File upload component
│   │   ├── TemplateSelector.jsx    # Template selection UI
│   │   ├── PortfolioPreview.jsx    # Preview component
│   │   ├── DeploymentOptions.jsx   # Deployment UI
│   │   └── templates/
│   │       ├── Template1.jsx       # Modern Professional
│   │       ├── Template2.jsx       # Creative Portfolio
│   │       └── Template3.jsx       # Minimal Elegance
│   ├── utils/
│   │   └── resumeParser.js         # Resume parsing logic
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
\`\`\`

## Features to Add (Future Enhancements)

- [ ] OAuth integration for Netlify and GitHub
- [ ] Automated deployment directly from the app
- [ ] More portfolio templates
- [ ] Template customization (colors, fonts)
- [ ] Project showcase section
- [ ] Photo upload for profile picture
- [ ] Multi-language support
- [ ] Dark mode templates
- [ ] Resume export to PDF

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF parsing
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) for Word document parsing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast development

---

Built with ❤️ using React and Tailwind CSS
