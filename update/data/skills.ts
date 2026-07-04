export type SkillDomain = 'embedded' | 'vlsi' | 'iot' | 'software';

export interface Skill {
  name: string;
  domain: SkillDomain;
  url?: string;
}

export const skills: Skill[] = [
  { name: 'C', domain: 'embedded', url: 'https://devdocs.io/c/' },
  { name: 'C++', domain: 'embedded', url: 'https://cplusplus.com/doc/tutorial/' },
  { name: 'Embedded C', domain: 'embedded', url: 'https://www.embedded.com/collection/programming-languages/' },
  { name: 'MicroPython', domain: 'embedded', url: 'https://micropython.org/documentation' },
  { name: 'MOSFETs', domain: 'embedded', url: 'https://learn.sparkfun.com/tutorials/transistors/all' },
  { name: 'Proteus', domain: 'embedded', url: 'https://www.labcenter.com/documentation/' },
  { name: 'LTSpice', domain: 'embedded', url: 'https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html' },
  { name: 'Signal Processing', domain: 'embedded', url: 'https://www.analog.com/en/design-center/landing-pages/001/beginners-guide-to-dsp.html' },
  { name: 'Verilog', domain: 'vlsi', url: 'https://www.chipverify.com/verilog/verilog-tutorial' },
  { name: 'Xilinx', domain: 'vlsi', url: 'https://www.xilinx.com/products/design-tools/vivado.html' },
  { name: 'FPGA', domain: 'vlsi', url: 'https://www.intel.com/content/www/us/en/products/details/fpga/development-tools.html' },
  { name: 'IoT', domain: 'iot', url: 'https://www.arduino.cc/education/courses/learning-iot' },
  { name: 'Raspberry Pi', domain: 'iot', url: 'https://www.raspberrypi.com/documentation/' },
  { name: 'Firebase', domain: 'iot', url: 'https://firebase.google.com/docs' },
  { name: 'Computer Networks', domain: 'iot', url: 'https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-computer-networking.html' },
  { name: 'Python', domain: 'software', url: 'https://www.python.org/doc/' },
  { name: 'JavaScript', domain: 'software', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', domain: 'software', url: 'https://www.typescriptlang.org/docs/' },
  { name: 'HTML', domain: 'software', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', domain: 'software', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'Tailwind CSS', domain: 'software', url: 'https://tailwindcss.com/docs' },
  { name: 'Machine Learning', domain: 'software', url: 'https://developers.google.com/machine-learning' },
  { name: 'TensorFlow', domain: 'software', url: 'https://www.tensorflow.org/learn' },
  { name: 'NumPy', domain: 'software', url: 'https://numpy.org/doc/stable/' },
  { name: 'Matplotlib', domain: 'software', url: 'https://matplotlib.org/stable/tutorials/index.html' },
  { name: 'Vercel', domain: 'software', url: 'https://vercel.com/docs' },
];
