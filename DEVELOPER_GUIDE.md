# Developer Reference

## Quick Commands

### Development
\`\`\`bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
\`\`\`

### Package Management
\`\`\`bash
npm install          # Install dependencies
npm install [pkg]    # Add new package
npm update           # Update packages
npm audit fix        # Fix vulnerabilities
\`\`\`

## Project Commands

### Creating New Components
\`\`\`bash
# Create in src/components/
touch src/components/NewComponent.jsx
\`\`\`

### Adding New Templates
\`\`\`bash
# Create in src/components/templates/
touch src/components/templates/Template4.jsx
\`\`\`

## File Locations

### Configuration Files
- \`vite.config.js\` - Vite configuration
- \`tailwind.config.js\` - Tailwind CSS configuration
- \`postcss.config.js\` - PostCSS configuration
- \`package.json\` - Project dependencies

### Source Files
- \`src/App.jsx\` - Main application component
- \`src/main.jsx\` - Application entry point
- \`src/index.css\` - Global styles
- \`src/components/\` - React components
- \`src/utils/\` - Utility functions

## Important Code Patterns

### Adding a New Template

1. Create template component:
\`\`\`jsx
// src/components/templates/Template4.jsx
import React from 'react';

const Template4 = ({ resumeData, isPreview = false }) => {
  return (
    <div className="bg-white min-h-screen">
      <h1>{resumeData.name}</h1>
      {/* Your template design */}
    </div>
  );
};

export default Template4;
\`\`\`

2. Register in TemplateSelector.jsx:
\`\`\`jsx
import Template4 from './templates/Template4';

const templates = [
  // ... existing templates
  {
    id: 'template4',
    name: 'Template Name',
    description: 'Template description',
    component: Template4,
    thumbnail: '🎯'
  }
];
\`\`\`

### Customizing Parser

Edit \`src/utils/resumeParser.js\`:

\`\`\`javascript
// Add new extraction function
const extractCustomField = (text) => {
  // Your extraction logic
  return extractedValue;
};

// Add to extractResumeData function
const extractResumeData = (text) => {
  // ... existing code
  const customField = extractCustomField(text);
  
  return {
    // ... existing fields
    customField
  };
};
\`\`\`

## Styling Guide

### Tailwind CSS Classes

Common patterns used:
\`\`\`css
/* Containers */
max-w-4xl mx-auto px-8 py-12

/* Buttons */
bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700

/* Cards */
bg-white rounded-lg shadow-lg p-8

/* Gradients */
bg-gradient-to-r from-blue-600 to-blue-800
\`\`\`

### Adding Custom Styles

In \`src/index.css\`:
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700;
  }
}
\`\`\`

## Debugging

### Browser Console
- Open DevTools: F12 or Ctrl+Shift+I
- Check Console tab for errors
- Use React DevTools extension

### Common Issues

**Issue: Resume not parsing**
- Check file format (PDF/DOCX only)
- Verify file size (< 10MB)
- Check console for errors

**Issue: Template not rendering**
- Verify component import
- Check template registration
- Look for JSX errors

**Issue: Build fails**
- Run \`npm install\`
- Clear node_modules: \`rm -rf node_modules && npm install\`
- Check for syntax errors

## Testing

### Manual Testing Checklist

- [ ] Upload PDF resume
- [ ] Upload Word resume
- [ ] Invalid file format shows error
- [ ] Large file shows error
- [ ] All 3 templates load
- [ ] Template preview works
- [ ] Download HTML works
- [ ] Downloaded HTML opens correctly
- [ ] Responsive on mobile
- [ ] All links work

### Test Data

Create test resumes with:
- Various formats (PDF, DOCX)
- Different structures
- Multiple languages
- Missing sections
- Special characters

## Performance Tips

### Optimization
- Keep components small and focused
- Use React.memo for expensive components
- Lazy load templates if adding many
- Optimize images and assets
- Minimize bundle size

### Bundle Analysis
\`\`\`bash
npm run build
# Check dist/ folder size
\`\`\`

## Git Workflow

### Initial Setup
\`\`\`bash
git init
git add .
git commit -m "Initial commit: Resume parser app"
git branch -M main
git remote add origin [your-repo-url]
git push -u origin main
\`\`\`

### Regular Workflow
\`\`\`bash
git add .
git commit -m "Description of changes"
git push
\`\`\`

### Branching
\`\`\`bash
git checkout -b feature/new-template
# Make changes
git add .
git commit -m "Add new template"
git checkout main
git merge feature/new-template
\`\`\`

## Environment Variables

Create \`.env\` for sensitive data:
\`\`\`env
VITE_NETLIFY_TOKEN=your_token_here
VITE_GITHUB_TOKEN=your_token_here
\`\`\`

Access in code:
\`\`\`javascript
const token = import.meta.env.VITE_NETLIFY_TOKEN;
\`\`\`

## Browser Support

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## VS Code Extensions

Recommended:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

## Keyboard Shortcuts (VS Code)

- \`Ctrl+P\` - Quick file open
- \`Ctrl+Shift+F\` - Search in files
- \`Ctrl+\`\` - Toggle terminal
- \`Alt+Shift+F\` - Format document
- \`F2\` - Rename symbol

## API Integration (Future)

### Netlify Deploy API
\`\`\`javascript
const deployToNetlify = async (html) => {
  const response = await fetch('https://api.netlify.com/api/v1/sites', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'my-portfolio',
      files: { 'index.html': html }
    })
  });
  return response.json();
};
\`\`\`

### GitHub API
\`\`\`javascript
const createRepo = async (name) => {
  const response = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Authorization': \`token \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, public: true })
  });
  return response.json();
};
\`\`\`

## Resources

### Documentation
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [PDF.js Docs](https://mozilla.github.io/pdf.js/)

### Learning
- [React Tutorial](https://react.dev/learn)
- [Tailwind Course](https://tailwindcss.com/docs)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Tools
- [Can I Use](https://caniuse.com) - Browser compatibility
- [Bundlephobia](https://bundlephobia.com) - Package size
- [Netlify](https://netlify.com) - Hosting
- [GitHub](https://github.com) - Version control

## Support

### Getting Help
1. Check documentation files
2. Review code comments
3. Search GitHub issues
4. Check browser console
5. Test in different browsers

### Contributing
- Fork repository
- Create feature branch
- Make changes
- Submit pull request

## License

MIT License - free to use and modify

---

Happy coding! 💻
