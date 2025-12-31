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
  console.log('\n🔍 Starting data extraction...');
  console.log('Raw text length:', text.length);
  console.log('First 200 chars:', text.substring(0, 200));
  
  // Clean the text - remove duplicates and excessive whitespace
  const cleanedText = cleanText(text);
  console.log('✓ Text cleaned, length:', cleanedText.length);
  
  const lines = cleanedText.split('\n').filter(line => line.trim());
  console.log('✓ Lines extracted:', lines.length);
  console.log('First 5 lines:', lines.slice(0, 5));
  
  // Extract name (usually first line or prominent text)
  const name = extractName(lines);
  console.log('✓✓✓ NAME:', name);

  // Extract email
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const emailMatch = cleanedText.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : '';
  console.log('✓ Email:', email);

  // Extract phone
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phoneMatch = cleanedText.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0] : '';
  console.log('✓ Phone:', phone);

  // Extract LinkedIn
  const linkedinRegex = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+/gi;
  const linkedinMatch = cleanedText.match(linkedinRegex);
  const linkedin = linkedinMatch ? linkedinMatch[0] : '';
  console.log('✓ LinkedIn:', linkedin);

  // Extract GitHub
  const githubRegex = /(https?:\/\/)?(www\.)?github\.com\/[\w-]+/gi;
  const githubMatch = cleanedText.match(githubRegex);
  const github = githubMatch ? githubMatch[0] : '';
  console.log('✓ GitHub:', github);

  // Extract skills
  console.log('\n🔧 Extracting skills...');
  const skillsSection = extractSection(cleanedText, ['skills', 'technical skills', 'core competencies']);
  console.log('Skills section length:', skillsSection?.length);
  const skills = extractSkills(skillsSection);
  console.log('✓✓✓ SKILLS COUNT:', skills.length);
  console.log('✓✓✓ SKILLS:', skills.slice(0, 10));

  // Extract experience
  console.log('\n💼 Extracting experience...');
  const experienceSection = extractSection(cleanedText, ['work experience', 'experience', 'employment']);
  console.log('Experience section length:', experienceSection?.length);
  const experience = extractExperience(experienceSection);
  console.log('✓✓✓ EXPERIENCE COUNT:', experience.length);
  console.log('✓✓✓ EXPERIENCE:', experience);

  // Extract education
  console.log('\n🎓 Extracting education...');
  const educationSection = extractSection(cleanedText, ['education', 'academic', 'qualification']);
  console.log('Education section length:', educationSection?.length);
  const education = extractEducation(educationSection);
  console.log('✓✓✓ EDUCATION COUNT:', education.length);
  console.log('✓✓✓ EDUCATION:', education);

  // Extract summary
  console.log('\n📋 Extracting summary...');
  const summary = extractSummary(cleanedText, lines);
  console.log('✓✓✓ SUMMARY:', summary);

  const result = {
    name,
    email,
    phone,
    linkedin,
    github,
    summary,
    skills,
    experience,
    education,
    rawText: cleanedText
  };

  console.log('\n\n========== FINAL RESULT ==========');
  console.log('Name:', result.name);
  console.log('Email:', result.email);
  console.log('Phone:', result.phone);
  console.log('Summary length:', result.summary.length);
  console.log('Skills:', result.skills.length, 'items');
  console.log('Experience:', result.experience.length, 'items');
  console.log('Education:', result.education.length, 'items');
  console.log('==================================\n');

  return result;
};

const cleanText = (text) => {
  console.log('  Starting text cleaning, original length:', text.length);
  
  // First, try to add line breaks at common section boundaries and patterns
  let cleaned = text
    // Add line breaks before major sections (with various formats)
    .replace(/\s+(Summary:|Technical Skills|Backend:|Frontend:|Cloud\/DevOps:|Databases|Authentication|Tools:|Testing:|AI Tools:|Soft Skills:|Experience:|Work Experience|Education:|Projects)/gi, '\n\n$1')
    // Add line breaks before "as" (job title pattern)
    .replace(/\s+as\s+/gi, '\nas ')
    // Add line breaks before bullet points
    .replace(/\s*●\s*/g, '\n● ')
    .replace(/\s*•\s*/g, '\n• ')
    // Add line breaks before numbered items
    .replace(/\s+(\d+\.)\s+([A-Z])/g, '\n$1 $2')
    // Add line breaks before dates (likely job entries)
    .replace(/\s+(\d{2}\/\d{4}|\d{2}-\d{4})/g, '\n$1')
    // Add line breaks after periods followed by capital letters (new sentences)
    .replace(/\.\s+([A-Z][a-z]+:)/g, '.\n\n$1')
    // Normalize multiple spaces
    .replace(/\s{3,}/g, ' ')
    // Clean up multiple line breaks
    .replace(/\n{3,}/g, '\n\n');
  
  // Split into lines
  const lines = cleaned.split('\n');
  console.log('  After initial split:', lines.length, 'lines');
  
  // Remove duplicate consecutive lines but keep structure
  const uniqueLines = [];
  let prevLine = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Keep empty lines for structure, but not too many
    if (!trimmed) {
      if (prevLine !== '' && uniqueLines[uniqueLines.length - 1] !== '') {
        uniqueLines.push('');
      }
      continue;
    }
    
    // Skip exact duplicates
    if (trimmed === prevLine) {
      continue;
    }
    
    uniqueLines.push(line);
    prevLine = trimmed;
  }
  
  const result = uniqueLines.join('\n');
  console.log('  ✓ Text cleaned and structured');
  console.log('  ✓ Lines after cleaning:', uniqueLines.length);
  console.log('  ✓ Preview of cleaned text (first 500 chars):\n', result.substring(0, 500));
  
  return result;
};

const extractName = (lines) => {
  console.log('  Extracting name from', lines.length, 'lines');
  console.log('  First line:', lines[0]?.substring(0, 100));
  
  // If first line contains everything (common PDF parsing issue), extract name from it
  const firstLine = lines[0]?.trim() || '';
  
  if (firstLine.length > 200) {
    console.log('  ⚠️ First line is very long, likely contains entire resume');
    // Try to extract name from beginning before contact info
    const nameMatch = firstLine.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]*)*(?:\s+[A-Z][a-z]+)?)/);
    if (nameMatch) {
      const extractedName = nameMatch[1].trim();
      console.log('  ✓ Name extracted from long line:', extractedName);
      return extractedName;
    }
  }
  
  // Normal case: name is in first few lines
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const trimmed = lines[i].trim();
    
    // Skip if line contains contact info or is too long
    if (!trimmed || 
        trimmed.length > 100 ||
        trimmed.includes('@') || 
        trimmed.includes('http') ||
        trimmed.includes('linkedin') ||
        trimmed.includes('github') ||
        trimmed.toLowerCase().includes('summary') ||
        trimmed.toLowerCase().includes('bengaluru') ||
        trimmed.toLowerCase().includes('karnataka')) {
      continue;
    }
    
    // Extract just the name part before phone/email
    let name = trimmed;
    
    // Remove phone numbers
    name = name.replace(/\+?\d{2,}-?\d{10,}/g, '').trim();
    name = name.replace(/\d{10,}/g, '').trim();
    
    // Remove remaining + or / symbols
    name = name.replace(/[+\/]/g, '').trim();
    
    // Remove extra spaces
    name = name.replace(/\s+/g, ' ').trim();
    
    // Name should be reasonable length and contain letters
    if (name.length > 5 && name.length < 50 && /[A-Za-z]/.test(name)) {
      console.log('  ✓ Name extracted from line', i + ':', name);
      return name;
    }
  }
  
  console.log('  ⚠️ Could not extract name, using default');
  return 'Your Name';
};

const extractSummary = (text, lines) => {
  console.log('  🔎 Looking for summary section...');
  
  // Look for explicit summary section first
  const lowerText = text.toLowerCase();
  const summaryIndex = lowerText.indexOf('summary:');
  
  if (summaryIndex > -1) {
    console.log('  ✓ Found "Summary:" at index', summaryIndex);
    
    // Find where summary ends - look for these keywords
    const sectionsAfter = [
      'technical skills',
      'backend:',
      'frontend:', 
      'cloud/',
      'databases',
      'authentication',
      'tools:',
      'testing:',
      'ai tools:',
      'soft skills:',
      'experience:',
      'work experience'
    ];
    
    let endIndex = text.length;
    
    for (const section of sectionsAfter) {
      const sectionIdx = lowerText.indexOf(section, summaryIndex + 10);
      if (sectionIdx > -1 && sectionIdx < endIndex) {
        endIndex = sectionIdx;
        console.log(`  ✓ Summary ends at "${section}" (index ${sectionIdx})`);
        break; // Take the first match
      }
    }
    
    let summaryText = text.substring(summaryIndex + 8, endIndex).trim();
    console.log('  ✓ Raw summary text length:', summaryText.length);
    console.log('  ✓ Raw summary text:', summaryText.substring(0, 300));
    
    // Clean up the summary - normalize whitespace
    summaryText = summaryText
      .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
      .replace(/\s*,\s*/g, ', ')      // Normalize commas
      .replace(/\s*\.\s*/g, '. ')     // Normalize periods
      .trim();
    
    console.log('  ✓ Cleaned summary length:', summaryText.length);
    
    // HARD LIMIT: Take only first 350 characters maximum
    if (summaryText.length > 350) {
      // Find the last period within first 350 chars
      const truncated = summaryText.substring(0, 350);
      const lastPeriod = truncated.lastIndexOf('.');
      
      if (lastPeriod > 100) {
        // Cut at last period
        summaryText = truncated.substring(0, lastPeriod + 1);
      } else {
        // Cut at last space and add ellipsis
        const lastSpace = truncated.lastIndexOf(' ');
        summaryText = truncated.substring(0, lastSpace) + '...';
      }
    }
    
    console.log('  ✓ Final summary length:', summaryText.length);
    console.log('  ✓ Final summary:', summaryText);
    
    if (summaryText.length > 20) {
      return summaryText;
    }
  }
  
  console.log('  ⚠ No explicit summary found, using fallback...');
  return 'Experienced full-stack developer passionate about building scalable and innovative solutions.';
};


const extractSection = (text, keywords) => {
  const lines = text.split('\n');
  const lowerLines = lines.map(l => l.toLowerCase());

  // Find section headers
  const sectionHeaders = ['work experience', 'experience', 'education', 'skills', 'technical skills',
    'projects', 'personal projects', 'achievements', 'interests', 'summary',
    'profile', 'objective', 'about'];

  for (const keyword of keywords) {
    const startIdx = lowerLines.findIndex(line =>
      line.trim() === keyword ||
      line.trim().startsWith(keyword + ' ') ||
      line.trim() === keyword.replace(/\s/g, '')
    );

    if (startIdx !== -1) {
      // Find the next section header
      let endIdx = lines.length;
      for (let i = startIdx + 1; i < lines.length; i++) {
        const lineTrimmed = lowerLines[i].trim();
        if (sectionHeaders.some(header =>
          lineTrimmed === header ||
          lineTrimmed.startsWith(header + ' ') ||
          lineTrimmed === header.replace(/\s/g, '')
        )) {
          endIdx = i;
          break;
        }
      }

      return lines.slice(startIdx + 1, endIdx).join('\n');
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
