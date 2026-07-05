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
  { name: 'Proteus', domain: 'embedded', url: 'https://www.labcenter.com/documentation/' },
  { name: 'STM32CubeIDE', domain: 'embedded', url: 'https://www.st.com/en/development-tools/stm32cubeide.html' },
  { name: 'Arduino IDE', domain: 'embedded', url: 'https://docs.arduino.cc/software/ide/' },
  { name: 'CCStudio', domain: 'embedded', url: 'https://www.ti.com/tool/CCSTUDIO' },
  { name: 'EasyEDA', domain: 'embedded', url: 'https://docs.easyeda.com/en/' },
  { name: 'Verilog', domain: 'vlsi', url: 'https://www.chipverify.com/verilog/verilog-tutorial' },
  { name: 'Xilinx', domain: 'vlsi', url: 'https://www.xilinx.com/products/design-tools/vivado.html' },
  { name: 'FPGA', domain: 'vlsi', url: 'https://www.intel.com/content/www/us/en/products/details/fpga/development-tools.html' },
  { name: 'SystemVerilog', domain: 'vlsi', url: 'https://www.chipverify.com/systemverilog/systemverilog-tutorial' },
  { name: 'VHDL', domain: 'vlsi', url: 'https://www.chipverify.com/vhdl/vhdl-tutorial' },
  { name: 'Virtuoso Studio', domain: 'vlsi', url: 'https://www.cadence.com/en_US/home/tools/custom-ic-analog-rf-design/circuit-design/virtuoso-studio.html' },
  { name: 'Altium', domain: 'vlsi', url: 'https://www.altium.com/documentation' },
  { name: 'Microwind', domain: 'vlsi', url: 'http://www.microwind.net/' },
  { name: 'IoT', domain: 'iot', url: 'https://www.arduino.cc/education/courses/learning-iot' },
  { name: 'Raspberry Pi', domain: 'iot', url: 'https://www.raspberrypi.com/documentation/' },
  { name: 'ESP-IDF', domain: 'iot', url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/' },
  { name: 'Firebase', domain: 'iot', url: 'https://firebase.google.com/docs' },
  { name: 'ThingSpeak', domain: 'iot', url: 'https://www.mathworks.com/help/thingspeak/' },
  { name: 'GCP', domain: 'iot', url: 'https://cloud.google.com/docs' },
  { name: 'Supabase', domain: 'iot', url: 'https://supabase.com/docs' },
  { name: 'Render', domain: 'iot', url: 'https://render.com/docs' },
  { name: 'Streamlit', domain: 'iot', url: 'https://docs.streamlit.io' },
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
  { name: 'Git', domain: 'software', url: 'https://git-scm.com/doc' },
  { name: 'GitHub', domain: 'software', url: 'https://docs.github.com' },
  { name: 'Cursor', domain: 'software', url: 'https://docs.cursor.com' },
  { name: 'MATLAB', domain: 'software', url: 'https://www.mathworks.com/help/matlab/' },
];
