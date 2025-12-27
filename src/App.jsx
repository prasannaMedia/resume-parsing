import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import TemplateSelector from './components/TemplateSelector';
import PortfolioPreview from './components/PortfolioPreview';
import DeploymentOptions from './components/DeploymentOptions';

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleResumeUpload = (data) => {
    setResumeData(data);
    setCurrentStep(2);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentStep(3);
  };

  const handleBackToUpload = () => {
    setResumeData(null);
    setSelectedTemplate(null);
    setCurrentStep(1);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Resume to Portfolio Generator
          </h1>
          <p className="text-gray-600">
            Upload your resume, choose a template, and deploy your portfolio instantly
          </p>
        </header>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Upload Resume</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Choose Template</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Preview & Deploy</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 1 && (
            <FileUpload onResumeUpload={handleResumeUpload} />
          )}

          {currentStep === 2 && resumeData && (
            <TemplateSelector
              resumeData={resumeData}
              onTemplateSelect={handleTemplateSelect}
              onBack={handleBackToUpload}
            />
          )}

          {currentStep === 3 && resumeData && selectedTemplate && (
            <div>
              <PortfolioPreview
                resumeData={resumeData}
                template={selectedTemplate}
                onBack={handleBackToTemplates}
              />
              <DeploymentOptions
                resumeData={resumeData}
                template={selectedTemplate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
