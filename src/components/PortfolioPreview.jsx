import React, { useState } from 'react';

const PortfolioPreview = ({ resumeData, template, onBack }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const TemplateComponent = template.component;

  const generateHTML = () => {
    // This will generate a standalone HTML file
    const templateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.name} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>
</head>
<body>
    ${generateTemplateHTML(template.id, resumeData)}
</body>
</html>`;
    
    return templateHTML;
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.name.replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Preview Your Portfolio</h2>
            <p className="text-gray-600">Template: {template.name}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={downloadHTML}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📥 Download HTML
            </button>
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isFullScreen ? '🗙 Exit' : '⛶ Full Screen'}
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Change Template
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className={`border-2 border-gray-300 rounded-lg overflow-hidden ${
          isFullScreen ? 'fixed inset-0 z-50 border-0 rounded-none' : 'h-[600px]'
        }`}>
          <div className="w-full h-full overflow-auto bg-white">
            <TemplateComponent resumeData={resumeData} isPreview={false} />
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Next Step:</strong> Review your portfolio and deploy it to Netlify or GitHub Pages below.
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate static HTML for each template
const generateTemplateHTML = (templateId, data) => {
  const templates = {
    modern: generateModernHTML(data),
    creative: generateCreativeHTML(data),
    minimal: generateMinimalHTML(data)
  };
  
  return templates[templateId] || templates.modern;
};

const generateModernHTML = (data) => {
  return `
    <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl font-bold mb-4">${data.name}</h1>
        <p class="text-xl text-blue-100 mb-6">${data.summary}</p>
        <div class="flex flex-wrap gap-4 text-sm">
          ${data.email ? `<a href="mailto:${data.email}" class="flex items-center hover:text-blue-200"><span class="mr-2">📧</span> ${data.email}</a>` : ''}
          ${data.phone ? `<span class="flex items-center"><span class="mr-2">📱</span> ${data.phone}</span>` : ''}
          ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="flex items-center hover:text-blue-200"><span class="mr-2">💼</span> LinkedIn</a>` : ''}
          ${data.github ? `<a href="${data.github}" target="_blank" class="flex items-center hover:text-blue-200"><span class="mr-2">💻</span> GitHub</a>` : ''}
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-8 py-12">
      ${data.skills && data.skills.length > 0 ? `
        <section class="mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Skills</h2>
          <div class="flex flex-wrap gap-3">
            ${data.skills.map(skill => `<span class="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">${skill}</span>`).join('')}
          </div>
        </section>
      ` : ''}
      ${data.experience && data.experience.length > 0 ? `
        <section class="mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Experience</h2>
          <div class="space-y-6">
            ${data.experience.map(exp => `
              <div class="border-l-4 border-blue-600 pl-6">
                <h3 class="text-xl font-semibold text-gray-800">${exp.title}</h3>
                <p class="text-gray-600 mb-2">${exp.company} • ${exp.duration}</p>
                <p class="text-gray-700">${exp.description}</p>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}
      ${data.education && data.education.length > 0 ? `
        <section class="mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Education</h2>
          <div class="space-y-4">
            ${data.education.map(edu => `
              <div>
                <h3 class="text-xl font-semibold text-gray-800">${edu.degree}</h3>
                <p class="text-gray-600">${edu.institution} • ${edu.year}</p>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}
    </main>
    <footer class="bg-gray-100 py-8 px-8 text-center text-gray-600">
      <p>© ${new Date().getFullYear()} ${data.name}. All rights reserved.</p>
    </footer>
  `;
};

const generateCreativeHTML = (data) => {
  return `
    <div class="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div class="max-w-6xl mx-auto px-8 py-12">
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold">
              ${data.name.charAt(0)}
            </div>
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">${data.name}</h1>
              <p class="text-gray-700 text-lg mb-4">${data.summary}</p>
              <div class="flex flex-wrap justify-center md:justify-start gap-4">
                ${data.email ? `<a href="mailto:${data.email}" class="text-purple-600 hover:text-purple-800">📧 ${data.email}</a>` : ''}
                ${data.phone ? `<span class="text-gray-600">📱 ${data.phone}</span>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="text-purple-600 hover:text-purple-800">💼 LinkedIn</a>` : ''}
                ${data.github ? `<a href="${data.github}" target="_blank" class="text-purple-600 hover:text-purple-800">💻 GitHub</a>` : ''}
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-1">
            ${data.skills && data.skills.length > 0 ? `
              <div class="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <h2 class="text-2xl font-bold text-purple-600 mb-4">Skills</h2>
                <div class="space-y-2">
                  ${data.skills.map(skill => `<div class="flex items-center"><div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div><span class="text-gray-700">${skill}</span></div>`).join('')}
                </div>
              </div>
            ` : ''}
            ${data.education && data.education.length > 0 ? `
              <div class="bg-white rounded-2xl shadow-xl p-6">
                <h2 class="text-2xl font-bold text-purple-600 mb-4">Education</h2>
                <div class="space-y-4">
                  ${data.education.map(edu => `<div><h3 class="font-semibold text-gray-800">${edu.degree}</h3><p class="text-sm text-gray-600">${edu.institution}</p><p class="text-sm text-purple-600">${edu.year}</p></div>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>
          <div class="md:col-span-2">
            ${data.experience && data.experience.length > 0 ? `
              <div class="bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-3xl font-bold text-purple-600 mb-6">Experience</h2>
                <div class="space-y-8">
                  ${data.experience.map(exp => `
                    <div class="relative pl-8 border-l-4 border-purple-500">
                      <h3 class="text-xl font-bold text-gray-800 mb-1">${exp.title}</h3>
                      <p class="text-purple-600 font-medium mb-2">${exp.company}</p>
                      <p class="text-sm text-gray-500 mb-3">${exp.duration}</p>
                      <p class="text-gray-700">${exp.description}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="mt-8 text-center text-gray-600">
          <p>© ${new Date().getFullYear()} ${data.name}. Created with passion ❤️</p>
        </div>
      </div>
    </div>
  `;
};

const generateMinimalHTML = (data) => {
  return `
    <div class="bg-gray-50 min-h-screen">
      <div class="max-w-4xl mx-auto px-8 py-16">
        <header class="text-center mb-16">
          <h1 class="text-6xl font-light text-gray-900 mb-4 tracking-tight">${data.name}</h1>
          <div class="w-24 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">${data.summary}</p>
          <div class="flex justify-center gap-6 mt-8 text-sm text-gray-600">
            ${data.email ? `<a href="mailto:${data.email}" class="hover:text-gray-900">${data.email}</a>` : ''}
            ${data.phone ? `<span>${data.phone}</span>` : ''}
            ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="hover:text-gray-900">LinkedIn</a>` : ''}
            ${data.github ? `<a href="${data.github}" target="_blank" class="hover:text-gray-900">GitHub</a>` : ''}
          </div>
        </header>
        ${data.experience && data.experience.length > 0 ? `
          <section class="mb-16">
            <h2 class="text-3xl font-light text-gray-900 mb-8 tracking-wide">EXPERIENCE</h2>
            <div class="space-y-10">
              ${data.experience.map(exp => `
                <div>
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="text-xl font-medium text-gray-900">${exp.title}</h3>
                      <p class="text-gray-600">${exp.company}</p>
                    </div>
                    <span class="text-sm text-gray-500">${exp.duration}</span>
                  </div>
                  <p class="text-gray-700 leading-relaxed">${exp.description}</p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
        ${data.skills && data.skills.length > 0 ? `
          <section class="mb-16">
            <h2 class="text-3xl font-light text-gray-900 mb-8 tracking-wide">SKILLS</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              ${data.skills.map(skill => `<div class="text-gray-700 text-center py-3 border-b border-gray-300">${skill}</div>`).join('')}
            </div>
          </section>
        ` : ''}
        ${data.education && data.education.length > 0 ? `
          <section class="mb-16">
            <h2 class="text-3xl font-light text-gray-900 mb-8 tracking-wide">EDUCATION</h2>
            <div class="space-y-6">
              ${data.education.map(edu => `
                <div>
                  <h3 class="text-xl font-medium text-gray-900">${edu.degree}</h3>
                  <div class="flex justify-between items-center mt-1">
                    <p class="text-gray-600">${edu.institution}</p>
                    <span class="text-sm text-gray-500">${edu.year}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
        <footer class="text-center pt-8 border-t border-gray-300">
          <p class="text-sm text-gray-500">© ${new Date().getFullYear()} ${data.name}</p>
        </footer>
      </div>
    </div>
  `;
};

export default PortfolioPreview;
