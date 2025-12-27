import React from 'react';

const Template2 = ({ resumeData, isPreview = false }) => {
  const scale = isPreview ? 'scale-50' : 'scale-100';
  
  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen ${isPreview ? 'transform ' + scale : ''}`}>
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold">
              {resumeData.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                {resumeData.name}
              </h1>
              <p className="text-gray-700 text-lg mb-4">{resumeData.summary}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {resumeData.email && (
                  <a href={`mailto:${resumeData.email}`} className="text-purple-600 hover:text-purple-800">
                    📧 {resumeData.email}
                  </a>
                )}
                {resumeData.phone && (
                  <span className="text-gray-600">📱 {resumeData.phone}</span>
                )}
                {resumeData.linkedin && (
                  <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                    💼 LinkedIn
                  </a>
                )}
                {resumeData.github && (
                  <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                    💻 GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Skills */}
          <div className="md:col-span-1">
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">Skills</h2>
                <div className="space-y-2">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">Education</h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-purple-600">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Experience */}
          <div className="md:col-span-2">
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-purple-600 mb-6">Experience</h2>
                <div className="space-y-8">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 border-l-4 border-gradient-to-b from-purple-500 to-pink-500">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.title}</h3>
                      <p className="text-purple-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-3">{exp.duration}</p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} {resumeData.name}. Created with passion ❤️</p>
        </div>
      </div>
    </div>
  );
};

export default Template2;
