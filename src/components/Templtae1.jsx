import React from 'react';

const Template1 = ({ resumeData, isPreview = false }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
              {resumeData.name}
            </h1>
            <div className="h-1 w-24 bg-blue-300 mb-6"></div>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl">
              {resumeData.summary}
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 mt-8">
              {resumeData.email && (
                <a href={`mailto:${resumeData.email}`} 
                   className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
                  <span>📧</span>
                  <span className="text-sm">{resumeData.email}</span>
                </a>
              )}
              {resumeData.phone && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <span>📱</span>
                  <span className="text-sm">{resumeData.phone}</span>
                </div>
              )}
              {resumeData.linkedin && (
                <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
                  <span>💼</span>
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              {resumeData.github && (
                <a href={resumeData.github} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
                  <span>💻</span>
                  <span className="text-sm">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-bold text-gray-100">Skills</h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group px-5 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-bold text-gray-800">Experience</h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
            </div>
            <div className="space-y-8">
              {resumeData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="absolute left-0 top-8 w-1 h-16 bg-gradient-to-b from-blue-600 to-blue-400 rounded-r-full"></div>
                  
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-4">
                      <span className="font-semibold">{exp.company}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-bold text-gray-800">Education</h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
            </div>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{edu.degree}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-gray-600">
                    <span>{edu.institution}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="text-sm">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} {resumeData.name}. Built with passion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Template1;