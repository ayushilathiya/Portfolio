export type ProjectDomain = 'EMBEDDED' | 'VLSI' | 'IoT' | 'SPACE' | 'HEALTH';
export type ProjectStatus = 'active' | 'verified' | 'archived';

export interface Project {
  title: string;
  domain: ProjectDomain;
  description: string;
  status: ProjectStatus;
  tech: string[];
  links?: { type: 'github' | 'demo'; url: string }[];
}

export const projects: Project[] = [
  {
    title: 'Gesture-Controlled Car',
    domain: 'IoT',
    description:
      "Developed a gesture-controlled system interpreting real-time hand gestures to wirelessly command the car's movements via ESP-NOW protocol, ensuring low-latency communication. Second phase of the Wi-Fi car series with enhanced gesture recognition.",
    status: 'verified',
    tech: ['IoT', 'Wireless Communication', 'Embedded Systems', 'ESP-NOW'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/Gesture_Controlled_Car' },
      { type: 'demo', url: 'https://youtu.be/n70FIHps4CA' },
    ],
  },
  {
    title: 'Live ECG Monitoring System',
    domain: 'HEALTH',
    description:
      'ESP-based IoT ECG monitoring system utilizing the ECG sensor for real-time cardiac signal acquisition and wireless transmission. Implements signal filtering for noise reduction and cloud integration for remote monitoring via ThingSpeak.',
    status: 'verified',
    tech: ['Real-time Data Acquisition', 'ThingSpeak API', 'MIT App Inventor', 'ESP32'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/ECG-Monitoring' },
      { type: 'demo', url: 'https://youtu.be/EAjrd2bCG9A' },
    ],
  },
  {
    title: 'WiFi-Controlled Car',
    domain: 'IoT',
    description:
      'Engineered a wireless-controlled vehicle using ESP8266 NodeMCU, featuring real-time control through a custom mobile interface. Implemented smooth motion control and responsive directional changes with L298N motor driver integration.',
    status: 'verified',
    tech: ['ESP8266', 'JavaScript', 'HTML', 'CSS', 'IoT'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/WiFi-Controlled-Car' },
      { type: 'demo', url: 'https://youtu.be/vaGgphrMhso' },
    ],
  },
  {
    title: 'Sensor-Driven 3D Visualization',
    domain: 'EMBEDDED',
    description:
      'Created an innovative system that transforms real-time sensor data into dynamic 3D visualizations. Integrated MPU6050 sensor data with WebGL rendering to achieve precise spatial mapping and interactive model manipulation.',
    status: 'verified',
    tech: ['MPU6050', 'WebGL', 'Three.js', 'Data Visualization'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/MPU6050-3D-Visualization' },
      { type: 'demo', url: 'https://ayushilathiya.hashnode.dev/3d-modeling-sensors' },
    ],
  },
  {
    title: 'ESP-NOW Protocol',
    domain: 'IoT',
    description:
      'Implemented a robust wireless communication system using ESP-NOW protocol, achieving low-latency data transfer between multiple ESP8266 modules. Optimized for reliable peer-to-peer communication with minimal power consumption.',
    status: 'verified',
    tech: ['C++', 'ESP-NOW', 'Wireless Communication', 'ESP8266'],
    links: [
      { type: 'github', url: 'https://github.com/ayushilathiya/ESP-NOW-Protocol' },
      { type: 'demo', url: 'https://youtu.be/NGjMKT3Scls' },
    ],
  },
];
