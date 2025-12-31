import React from 'react';
import Template1 from './Templtae1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design with a focus on readability',
    component: Template1,
    thumbnail: '🎨'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Bold and colorful design perfect for creative professionals',
    component: Template2,
    thumbnail: '✨'
  },
  {
    id: 'minimal',
    name: 'Minimal Elegance',
    description: 'Minimalist design with elegant typography',
    component: Template3,
    thumbnail: '📄'
  }
];

const TemplateSelector = ({ resumeData, onTemplateSelect, onBack }) => {
  const [hoveredTemplate, setHoveredTemplate] = React.useState(null);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Choose Your Portfolio Template
          </h2>
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => {
            const TemplateComponent = template.component;
            
            return (
              <div
                key={template.id}
                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  hoveredTemplate === template.id
                    ? 'border-blue-500 shadow-xl scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                }`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => onTemplateSelect(template)}
              >
                <div className="bg-gray-50 p-8 h-64 overflow-hidden relative">
                  <div className="transform scale-[0.3] origin-top-left absolute top-0 left-0 w-[333%] h-[333%]">
                    <TemplateComponent resumeData={resumeData} isPreview={true} />
                  </div>
                </div>
                
                <div className="p-4 bg-white">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-2">{template.thumbnail}</span>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {template.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {template.description}
                  </p>
                  <button
                    onClick={() => onTemplateSelect(template)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Select Template
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Preview:</strong> Each template is fully responsive and optimized for all devices. 
            You can customize the content after selection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
