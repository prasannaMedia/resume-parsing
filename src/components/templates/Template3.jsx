import React from 'react';

const Template3 = ({ resumeData, isPreview = false }) => {
  const scale = isPreview ? 'scale-50' : 'scale-100';
  
  return (
    <div className={`bg-gray-50 min-h-screen ${isPreview ? 'transform ' + scale : ''}`}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-light text-gray-900 mb-4 tracking-tight">
            {resumeData.name}
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {resumeData.summary}
          </p>
          <div className="flex justify-center gap-6 mt-8 text-sm text-gray-600">
            {resumeData.email && (
              <a href={`mailto:${resumeData.email}`} className="hover:text-gray-900 transition-colors">
                {resumeData.email}
              </a>
            )}
            {resumeData.phone && (
              <span>{resumeData.phone}</span>
            )}
            {resumeData.linkedin && (
              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                LinkedIn
              </a>
            )}
            {resumeData.github && (
              <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                GitHub
              </a>
            )}
          </div>
        </header>

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-8 tracking-wide">
              EXPERIENCE
            </h2>
            <div className="space-y-10">
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-8 tracking-wide">
              SKILLS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="text-gray-700 text-center py-3 border-b border-gray-300">
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-8 tracking-wide">
              EDUCATION
            </h2>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-xl font-medium text-gray-900">{edu.degree}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-gray-600">{edu.institution}</p>
                    <span className="text-sm text-gray-500">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {resumeData.name}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Template3;
