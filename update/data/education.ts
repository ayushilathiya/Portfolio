export interface EducationRecord {
  institution: string;
  degree: string;
  period: string;
  website?: string;
  location?: string;
  skills: string[];
  modulesLabel?: string;
}

export const education: EducationRecord[] = [
  {
    institution: 'Lalbhai Dalpatbhai College of Engineering',
    degree: 'Bachelor of Engineering in Electronics & Communications',
    period: '2022–Present',
    website: 'https://ldce.ac.in',
    skills: [
      'VLSI Design',
      'Digital Electronics',
      'Embedded Systems',
      'Circuit Theory',
      'Internet of Things',
      'Computer Networks',
      'Microcontrollers',
      'Machine Learning',
      'Signal Processing',
    ],
    modulesLabel: 'course modules',
  },
  {
    institution: 'The H. B. Kapadia New High School',
    degree: 'Higher Secondary Education (XII) — Science',
    period: '2021–2022',
    location: 'Ahmedabad, Gujarat, India',
    skills: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    modulesLabel: 'Installed Modules',
  },
];
