import React, { useState } from 'react';

const DeploymentOptions = ({ resumeData, template }) => {
  const [deploymentMethod, setDeploymentMethod] = useState(null);
  const [deployStatus, setDeployStatus] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const generateHTML = () => {
    // Generate the HTML content (same as in PortfolioPreview)
    const templateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.name} - Portfolio</title>
    <meta name="description" content="${resumeData.summary}">
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

  const handleNetlifyDeploy = async () => {
    setIsDeploying(true);
    setDeployStatus('Initiating Netlify deployment...');

    try {
      // In a real implementation, this would:
      // 1. Authenticate with Netlify OAuth
      // 2. Create a new site
      // 3. Upload the generated HTML
      
      // For this prototype, we'll simulate the process
      await simulateDeployment();
      
      setDeployStatus('✅ Successfully deployed to Netlify! (Simulation)');
      
      // Show instructions for manual deployment
      setTimeout(() => {
        alert(
          'Manual Netlify Deployment:\n\n' +
          '1. Go to https://app.netlify.com/drop\n' +
          '2. Download your portfolio HTML using the "Download HTML" button\n' +
          '3. Drag and drop the HTML file to Netlify Drop\n' +
          '4. Your site will be live instantly!'
        );
      }, 1000);
    } catch (error) {
      setDeployStatus('❌ Deployment failed. Please try manual deployment.');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleGitHubPagesDeploy = async () => {
    setIsDeploying(true);
    setDeployStatus('Initiating GitHub Pages deployment...');

    try {
      // In a real implementation, this would:
      // 1. Authenticate with GitHub OAuth
      // 2. Create a new repository (username.github.io)
      // 3. Push the generated HTML as index.html
      // 4. Enable GitHub Pages
      
      // For this prototype, we'll simulate the process
      await simulateDeployment();
      
      setDeployStatus('✅ Successfully deployed to GitHub Pages! (Simulation)');
      
      // Show instructions for manual deployment
      setTimeout(() => {
        alert(
          'Manual GitHub Pages Deployment:\n\n' +
          '1. Create a new repository: [your-username].github.io\n' +
          '2. Download your portfolio HTML using the "Download HTML" button\n' +
          '3. Rename it to index.html\n' +
          '4. Push to your repository\n' +
          '5. Enable GitHub Pages in repository settings\n' +
          '6. Your site will be live at https://[your-username].github.io'
        );
      }, 1000);
    } catch (error) {
      setDeployStatus('❌ Deployment failed. Please try manual deployment.');
    } finally {
      setIsDeploying(false);
    }
  };

  const simulateDeployment = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const openNetlifyDrop = () => {
    window.open('https://app.netlify.com/drop', '_blank');
  };

  const openGitHubRepo = () => {
    window.open('https://github.com/new', '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Deploy Your Portfolio</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Netlify Option */}
        <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
          deploymentMethod === 'netlify'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        }`}
        onClick={() => setDeploymentMethod('netlify')}>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
              N
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Netlify</h3>
              <p className="text-sm text-gray-600">Fast and simple deployment</p>
            </div>
          </div>
          <ul className="text-sm text-gray-700 space-y-1 mb-4">
            <li>✓ Instant deployment</li>
            <li>✓ Free SSL certificate</li>
            <li>✓ Custom domain support</li>
            <li>✓ Continuous deployment</li>
          </ul>
          {deploymentMethod === 'netlify' && (
            <div className="space-y-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNetlifyDeploy();
                }}
                disabled={isDeploying}
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeploying ? 'Deploying...' : 'Deploy to Netlify'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openNetlifyDrop();
                }}
                className="w-full bg-white border border-teal-500 text-teal-500 py-2 rounded-lg hover:bg-teal-50 transition-colors"
              >
                Open Netlify Drop
              </button>
            </div>
          )}
        </div>

        {/* GitHub Pages Option */}
        <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
          deploymentMethod === 'github'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        }`}
        onClick={() => setDeploymentMethod('github')}>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">GitHub Pages</h3>
              <p className="text-sm text-gray-600">Host directly from GitHub</p>
            </div>
          </div>
          <ul className="text-sm text-gray-700 space-y-1 mb-4">
            <li>✓ Free hosting</li>
            <li>✓ Version control</li>
            <li>✓ Custom domain support</li>
            <li>✓ Easy updates via Git</li>
          </ul>
          {deploymentMethod === 'github' && (
            <div className="space-y-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGitHubPagesDeploy();
                }}
                disabled={isDeploying}
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeploying ? 'Deploying...' : 'Deploy to GitHub Pages'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openGitHubRepo();
                }}
                className="w-full bg-white border border-gray-800 text-gray-800 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Create GitHub Repository
              </button>
            </div>
          )}
        </div>
      </div>

      {deployStatus && (
        <div className={`p-4 rounded-lg mb-6 ${
          deployStatus.includes('✅')
            ? 'bg-green-50 border border-green-200 text-green-800'
            : deployStatus.includes('❌')
            ? 'bg-red-50 border border-red-200 text-red-800'
            : 'bg-blue-50 border border-blue-200 text-blue-800'
        }`}>
          <p className="font-medium">{deployStatus}</p>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Quick Deploy Guide:</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Option 1: Netlify Drop (Easiest)</strong></p>
          <ol className="list-decimal ml-5 space-y-1">
            <li>Click "Download HTML" button above</li>
            <li>Visit <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">app.netlify.com/drop</a></li>
            <li>Drag and drop your HTML file</li>
            <li>Get instant live URL!</li>
          </ol>

          <p className="mt-4"><strong>Option 2: GitHub Pages (For developers)</strong></p>
          <ol className="list-decimal ml-5 space-y-1">
            <li>Create a repository named: [your-username].github.io</li>
            <li>Download HTML and rename to index.html</li>
            <li>Push to your repository</li>
            <li>Enable GitHub Pages in settings</li>
          </ol>

          <p className="mt-4 text-xs text-gray-600">
            <strong>Note:</strong> Full OAuth integration with automatic deployment will be available in the production version.
            This prototype provides manual deployment workflows.
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function (same as PortfolioPreview)
const generateTemplateHTML = (templateId, data) => {
  const templates = {
    modern: `Modern template HTML for ${data.name}`,
    creative: `Creative template HTML for ${data.name}`,
    minimal: `Minimal template HTML for ${data.name}`
  };
  
  return templates[templateId] || templates.modern;
};

export default DeploymentOptions;
