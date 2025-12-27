import React from 'react';

const Template1 = ({ resumeData, isPreview = false }) => {
  const scale = isPreview ? 'scale-50' : 'scale-100';
  
  return (
    <div className={`bg-white min-h-screen ${isPreview ? 'transform ' + scale : ''}`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{resumeData.name}</h1>
          <p className="text-xl text-blue-100 mb-6">{resumeData.summary}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            {resumeData.email && (
              <a href={`mailto:${resumeData.email}`} className="flex items-center hover:text-blue-200">
                <span className="mr-2">📧</span> {resumeData.email}
              </a>
            )}
            {resumeData.phone && (
              <span className="flex items-center">
                <span className="mr-2">📱</span> {resumeData.phone}
              </span>
            )}
            {resumeData.linkedin && (
              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-200">
                <span className="mr-2">💼</span> LinkedIn
              </a>
            )}
            {resumeData.github && (
              <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-200">
                <span className="mr-2">💻</span> GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600 mb-2">{exp.company} • {exp.duration}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-8 text-center text-gray-600">
        <p>© {new Date().getFullYear()} {resumeData.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Template1;
