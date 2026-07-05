export const profile = {
  name: 'Ayushi Lathiya',
  roleTag: 'embedded / vlsi / iot',
  title: 'Electronics & Communication Engineer',
  intro:
    "I work at the intersection of hardware and software, focused on embedded firmware and VLSI design. I like poking around in IoT and health tech too, and that's honestly where I'm happiest.",
  registers: [
    { addr: '0x0B', field: 'BAUD_RATE', value: '115200 bps (fast learner)' },
    { addr: '0x13', field: 'CLK_FREQ', value: 'Deadline Driven' },
    { addr: '0x2A', field: 'LOCATION', value: 'India (UTC+5:30) — the answer, apparently' },
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
  footerNote: 'Open to opportunities in embedded systems, VLSI, IoT, and health tech',
  stats: [
    { label: 'BUILDS SHIPPED', value: 'N' },
    { label: 'FIRMWARE LOC', value: 'N' },
    { label: 'BOARDS BROUGHT UP', value: 'N' },
    { label: 'PROJECTS ACTIVE', value: 'N' },
  ],
};
