import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker - use local worker from node_modules
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export const parseResume = async (file) => {
  const fileType = file.type;
  let text = '';

  try {
    if (fileType === 'application/pdf') {
      text = await parsePDF(file);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      text = await parseWord(file);
    } else {
      throw new Error('Unsupported file format. Please upload a PDF or Word document.');
    }

    return extractResumeData(text);
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw error;
  }
};

const parsePDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};

const parseWord = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const extractResumeData = (text) => {
  // Basic extraction logic - can be enhanced with better parsing
  const lines = text.split('\n').filter(line => line.trim());
  
  // Extract name (usually first line or prominent text)
  const name = lines[0]?.trim() || 'Your Name';

  // Extract email
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : '';

  // Extract phone
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phoneMatch = text.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // Extract LinkedIn
  const linkedinRegex = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+/gi;
  const linkedinMatch = text.match(linkedinRegex);
  const linkedin = linkedinMatch ? linkedinMatch[0] : '';

  // Extract GitHub
  const githubRegex = /(https?:\/\/)?(www\.)?github\.com\/[\w-]+/gi;
  const githubMatch = text.match(githubRegex);
  const github = githubMatch ? githubMatch[0] : '';

  // Extract skills (basic keyword matching)
  const skillsSection = extractSection(text, ['skills', 'technical skills', 'core competencies']);
  const skills = extractSkills(skillsSection);

  // Extract experience
  const experienceSection = extractSection(text, ['experience', 'work experience', 'employment']);
  const experience = extractExperience(experienceSection);

  // Extract education
  const educationSection = extractSection(text, ['education', 'academic', 'qualification']);
  const education = extractEducation(educationSection);

  // Extract summary/about
  const summarySection = extractSection(text, ['summary', 'profile', 'about', 'objective']);
  const summary = summarySection || lines.slice(1, 4).join(' ');

  return {
    name,
    email,
    phone,
    linkedin,
    github,
    summary,
    skills,
    experience,
    education,
    rawText: text
  };
};

const extractSection = (text, keywords) => {
  const lowerText = text.toLowerCase();
  
  for (const keyword of keywords) {
    const index = lowerText.indexOf(keyword);
    if (index !== -1) {
      // Get text after the keyword
      const afterKeyword = text.substring(index);
      // Find the next section or take next 500 chars
      const nextSection = afterKeyword.substring(0, 500);
      return nextSection;
    }
  }
  
  return '';
};

const extractSkills = (skillsText) => {
  if (!skillsText) return [];
  
  // Common tech skills to look for
  const commonSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust',
    'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
    'HTML', 'CSS', 'Sass', 'Tailwind', 'Bootstrap',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQL',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'Git', 'CI/CD', 'Agile', 'Scrum',
    'REST', 'GraphQL', 'API', 'Microservices'
  ];

  const foundSkills = [];
  const lowerSkillsText = skillsText.toLowerCase();

  for (const skill of commonSkills) {
    if (lowerSkillsText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  }

  return foundSkills.length > 0 ? foundSkills : ['Web Development', 'Programming', 'Software Engineering'];
};

const extractExperience = (experienceText) => {
  if (!experienceText) return [];

  // Split into potential job entries
  const lines = experienceText.split('\n').filter(line => line.trim());
  const experiences = [];
  let currentExp = null;

  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    const line = lines[i].trim();
    
    // Skip the header
    if (line.toLowerCase().includes('experience') || line.toLowerCase().includes('employment')) {
      continue;
    }

    // Check if line contains a date pattern (likely a job entry)
    if (/\d{4}/.test(line) || /\d{2}\/\d{2}/.test(line)) {
      if (currentExp) {
        experiences.push(currentExp);
      }
      currentExp = {
        title: line,
        company: lines[i + 1] || '',
        duration: extractDuration(line),
        description: lines.slice(i + 2, i + 5).join(' ')
      };
    }
  }

  if (currentExp) {
    experiences.push(currentExp);
  }

  // If no experiences found, create a sample one
  if (experiences.length === 0) {
    experiences.push({
      title: 'Software Developer',
      company: 'Tech Company',
      duration: '2020 - Present',
      description: 'Working on exciting projects'
    });
  }

  return experiences.slice(0, 3); // Return max 3 experiences
};

const extractEducation = (educationText) => {
  if (!educationText) return [];

  const lines = educationText.split('\n').filter(line => line.trim());
  const education = [];

  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i].trim();
    
    // Skip the header
    if (line.toLowerCase().includes('education') || line.toLowerCase().includes('academic')) {
      continue;
    }

    // Look for degree or institution
    if (line.length > 5 && (
      line.toLowerCase().includes('university') ||
      line.toLowerCase().includes('college') ||
      line.toLowerCase().includes('bachelor') ||
      line.toLowerCase().includes('master') ||
      line.toLowerCase().includes('degree')
    )) {
      education.push({
        degree: line,
        institution: lines[i + 1] || '',
        year: extractYear(line) || extractYear(lines[i + 1] || '')
      });
    }
  }

  // If no education found, create a sample one
  if (education.length === 0) {
    education.push({
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University',
      year: '2020'
    });
  }

  return education.slice(0, 2); // Return max 2 education entries
};

const extractDuration = (text) => {
  const durationMatch = text.match(/\d{4}\s*-\s*(\d{4}|present|current)/i);
  return durationMatch ? durationMatch[0] : '';
};

const extractYear = (text) => {
  const yearMatch = text.match(/\d{4}/);
  return yearMatch ? yearMatch[0] : '';
};
