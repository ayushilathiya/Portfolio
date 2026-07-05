export const profile = {
  name: 'Ayushi Lathiya',
  roleTag: 'embedded / vlsi / iot',
  title: 'Electronics & Communication Engineer',
  intro:
    "I work at the intersection of hardware and software, focused on embedded firmware and VLSI design. I like poking around in IoT and health tech and that's honestly where I'm happiest.",
  registers: [
    { addr: '0x0B', field: 'BAUD_RATE', value: '115200 bps (fast, basically.)' },
    { addr: '0x13', field: 'CLK_FREQ', value: 'Deadline Driven + Maximum Efficiency' },
    { addr: '0x2A', field: 'LOCATION', value: 'India (UTC+5:30); the answer, apparently(42, get it?)' },
  ],
  devices: [
    { id: 'dev0', label: 'github', addr: 'github.com/ayushilathiya', href: 'https://github.com/ayushilathiya' },
    { id: 'dev1', label: 'linkedin', addr: 'linkedin.com/in/ayushilathiya', href: 'https://www.linkedin.com/in/ayushilathiya/' },
  ],
  social: {
    github: 'https://github.com/ayushilathiya',
    linkedin: 'https://www.linkedin.com/in/ayushilathiya/',
    hashnode: 'https://ayushilathiya.hashnode.dev',
  },
};
