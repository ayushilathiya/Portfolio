export type ExperienceType = 'work' | 'beacon';

export type BeaconKind = 'achievement' | 'contribution';

export interface ExperienceEntry {
  timestamp: string;
  title: string;
  organization: string;
  location?: string;
  description?: string;
  bullets?: string[];
  type: ExperienceType;
  link?: string;
  beaconKind?: BeaconKind;
}

/** `/runtime` — professional experience, most recent first */
export const runtimeEntries: ExperienceEntry[] = [
  {
    timestamp: '2026.05 – Present',
    title: 'Embedded Software Engineer',
    organization: 'Battery Ok Technologies',
    location: 'Ahmedabad, IN',
    bullets: [
      'Resolved firmware calibration mismatch in EV Doctor™ via post-rail stabilization, reducing mismatch by 60%.',
      'Built an open-source ML model for State of Charge estimation, achieving 80% SoC prediction accuracy.',
    ],
    type: 'work',
  },
  {
    timestamp: '2026.01 – 2026.05',
    title: 'Research Intern (ML & RF)',
    organization: 'ISRO, SAC',
    location: 'Ahmedabad, IN',
    bullets: [
      'Designed a cosine-profile hybrid coupler for satellite payload systems; findings submitted to IEEE 2026.',
      'Built a GPR + RF Regressor ensemble model to optimize coupler parameters, cutting optimization time by 45%.',
      'Designed/simulated a 1:9 RF power combiner/divider with Verilog-based ASIC implementation and UVM verification.',
    ],
    type: 'work',
  },
  {
    timestamp: '2025.07 – 2025.08',
    title: 'Embedded Developer Intern',
    organization: 'Swasau Technologies',
    location: 'Ahmedabad, IN',
    bullets: [
      'Developed I2C master-slave firmware on CH32 (RISC-V) and ESP32 using ESP-IDF and MounRiver Studio.',
      'Built ThingSpeak cloud-syncing pattern storage via IR presence detection and TTP223 touch sensing.',
      'Researched capacitive sensing pad area effects on sensitivity for a custom design.',
      'Designed and fabricated a 2-layer custom PCB for a capacitive touch panel switch using EasyEDA and KiCad.',
    ],
    type: 'work',
  },
];

/** `/beacon` — achievements & contributions */
export const beaconEntries: ExperienceEntry[] = [
  {
    timestamp: '2025.02',
    title: 'Healthathon 2025 — HeartStream',
    organization: 'Hardware-dependent AI-powered remote ECG diagnosis',
    description:
      'Won Healthathon 2025 for HeartStream, a hardware-dependent AI-powered remote ECG diagnosis system.',
    type: 'beacon',
    beaconKind: 'achievement',
  },
  {
    timestamp: '2024.06',
    title: 'SSIP 2.0 Funding',
    organization: 'Student Startup and Innovation Policy',
    description:
      'Secured state government funding under SSIP 2.0 for an actuator-based warehouse automation system.',
    type: 'beacon',
    beaconKind: 'achievement',
    link: 'https://www.linkedin.com/posts/ayushilathiya_infinityai-artificialintelligence-aicommunity-activity-7281526689388466176-MBuq',
  },
  {
    timestamp: '2024.03',
    title: "Smart India Hackathon 2024 — Internal Qualifier",
    organization: 'SIH\'24',
    description:
      'Qualified in the Smart India Hackathon 2024 (SIH\'24) Internal Hackathon for a platform giving farmers direct market access.',
    type: 'beacon',
    beaconKind: 'achievement',
  },
  {
    timestamp: '2023.11',
    title: 'Google Developer Student Club — LDCE',
    organization: 'Team Member',
    description:
      'Team Member, Google Developer Student Club — LDCE (Nov 2023–present). Curated technical content, hosted workshops, and contributed to Android Studio, open source, and ML community events.',
    type: 'beacon',
    beaconKind: 'contribution',
    link: 'https://in.linkedin.com/company/gdsc-ldce',
  },
];

/** Combined export for legacy `/syslog` view */
export const experienceEntries: ExperienceEntry[] = [...runtimeEntries, ...beaconEntries];
