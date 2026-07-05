export type ProjectDomain = 'EMBEDDED' | 'VLSI' | 'IoT' | 'SPACE' | 'HEALTH';
export type ProjectStatus = 'active' | 'built' | 'deployed' | 'live' | 'archived';

export interface Project {
  title: string;
  domain: ProjectDomain;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  tech: string[];
  links?: { type: 'github' | 'demo' | 'website' | 'youtube' | 'blog'; url: string }[];
}

export const projects: Project[] = [
  {
    title: 'HeartStream (Remote Cardiac Diagnostics)',
    domain: 'HEALTH',
    description:
      'Custom ECGNet model trained on MIT-BIH for cardiac anomaly detection (99% accuracy), with a real-time AD8232 + ESP8266 sensor pipeline streaming to ThingSpeak, and a Streamlit + Supabase app for live monitoring, ECG visualization, and PDF parsing.',
    status: 'live',
    statusLabel: 'LIVE',
    tech: ['Python', 'ECGNet', 'Supabase', 'Streamlit'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/HeartStream' },
      { type: 'website', url: 'https://heartstream.streamlit.app/' },
    ],
  },
  {
    title: 'Gesture-Controlled Car',
    domain: 'IoT',
    description:
      'Gesture-controlled system using ESP-NOW for low-latency wireless car control — phase two of the Wi-Fi car series.',
    status: 'built',
    statusLabel: 'BUILT',
    tech: ['IoT', 'ESP-NOW', 'Embedded Systems'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/Gesture_Controlled_Car' },
      { type: 'youtube', url: 'https://youtu.be/n70FIHps4CA' },
    ],
  },
  {
    title: 'Live ECG Monitoring System',
    domain: 'HEALTH',
    description:
      'ESP-based IoT ECG monitor with signal filtering and ThingSpeak cloud integration for remote cardiac monitoring.',
    status: 'deployed',
    statusLabel: 'DEPLOYED',
    tech: ['ESP32', 'ThingSpeak', 'MIT App Inventor'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/ECG-Monitoring' },
      { type: 'youtube', url: 'https://youtu.be/EAjrd2bCG9A' },
    ],
  },
  {
    title: 'Smart Water Level Controller (RTL Design & Verification)',
    domain: 'VLSI',
    description:
      'Designed an RTL-level water level controller using Verilog, modeling sensor inputs and motor control outputs via a FSM.',
    status: 'built',
    statusLabel: 'BUILT',
    tech: ['Verilog', 'Testbench', 'Xilinx'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/Water_Level_Controller-RTL-Design-Verification-' },
    ],
  },
  {
    title: 'WiFi-Controlled Car',
    domain: 'IoT',
    description:
      'ESP8266 wireless vehicle with custom mobile interface and L298N motor driver integration.',
    status: 'built',
    statusLabel: 'BUILT',
    tech: ['ESP8266', 'JavaScript', 'IoT'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/WiFi-Controlled-Car' },
      { type: 'youtube', url: 'https://youtu.be/vaGgphrMhso' },
    ],
  },
  {
    title: 'Sensor-Driven 3D Visualization',
    domain: 'EMBEDDED',
    description:
      'MPU6050 sensor data rendered as dynamic 3D visualizations using WebGL and Three.js.',
    status: 'active',
    statusLabel: 'ACTIVE',
    tech: ['MPU6050', 'WebGL', 'Three.js'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/MPU6050-3D-Visualization' },
      { type: 'blog', url: 'https://ayushilathiya.hashnode.dev/3d-modeling-sensors' },
    ],
  },
  {
    title: 'ESP-NOW Protocol',
    domain: 'IoT',
    description:
      'Peer-to-peer ESP8266 communication with optimized low-latency ESP-NOW protocol implementation.',
    status: 'built',
    statusLabel: 'TESTED',
    tech: ['C++', 'ESP-NOW', 'ESP8266'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/ESP-NOW-Protocol' },
      { type: 'youtube', url: 'https://youtu.be/NGjMKT3Scls' },
    ],
  },
];
