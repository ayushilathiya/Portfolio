export type ExperienceType = 'work' | 'education' | 'project';

export interface ExperienceEntry {
  timestamp: string;
  title: string;
  organization: string;
  description: string;
  type: ExperienceType;
  link?: string;
}

export const experienceEntries: ExperienceEntry[] = [
  {
    timestamp: '2025.02',
    title: "Healthathon'25 | Digital Health for Transplant Survivors",
    organization: 'IAmAPatient.org × MSBC Group',
    description:
      'Recognized among the top solutions at Healthathon 2025. Contributed to a multidisciplinary team developing an AI-powered platform to support post-transplant patient care, combining clinical insight with intelligent automation.',
    type: 'project',
    link: 'https://www.linkedin.com/posts/ayushilathiya_healthathon25-msbcgroup-iamapatient-activity-7311730105838440448-xLfs',
  },
  {
    timestamp: '2024.06',
    title: 'SSIP 2.0 Innovator',
    organization: 'Student Startup and Innovation Policy',
    description:
      'Received financial support under SSIP 2.0 for innovation recognized at the Proof of Concept stage, acknowledging the potential and real-world feasibility of the proposed solution.',
    type: 'project',
    link: 'https://www.linkedin.com/posts/ayushilathiya_infinityai-artificialintelligence-aicommunity-activity-7281526689388466176-MBuq',
  },
  {
    timestamp: '2023.11',
    title: 'Google Developer Student Club - LDCE',
    organization: 'Team Member',
    description:
      'Curated technical content for GDSC events and gained hands-on experience with Android Studio, open source contributions, and machine learning through TensorFlow events and the Google Cloud campaign. Organized and hosted tech workshops for peers.',
    type: 'work',
    link: 'https://in.linkedin.com/company/gdsc-ldce',
  },
  {
    timestamp: '2023.08',
    title: 'Semiconductor Manufacturing Workshop',
    organization: 'IIT Gandhinagar',
    description:
      'Participated in an advanced workshop hosted by SEMI, ESSCI, and IESA focused on semiconductor packaging, vacuum systems, and display technology with sessions from STMicroelectronics, IIT Guwahati, and IESA.',
    type: 'project',
  },
  {
    timestamp: '2022.08',
    title: 'Bachelor of Engineering in Electronics & Communications',
    organization: 'Lalbhai Dalpatbhai College of Engineering',
    description:
      'Specialized in VLSI design, digital electronics, embedded systems, IoT, computer networks, microcontrollers, machine learning, and signal processing.',
    type: 'education',
    link: 'https://ldce.ac.in',
  },
];
