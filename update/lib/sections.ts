export const sections = [
  { id: 'boot', label: '/boot' },
  { id: 'proc', label: '/proc' },
  { id: 'dev', label: '/dev' },
  { id: 'modules', label: '/modules' },
  { id: 'dmesg', label: 'dmesg' },
  { id: 'uart', label: '/uart' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

/** Legacy section ids → new anchor targets (for redirects / old bookmarks) */
export const legacySectionMap: Record<string, SectionId> = {
  about: 'proc',
  skills: 'dev',
  projects: 'modules',
  experience: 'dmesg',
  contact: 'uart',
  home: 'boot',
  hero: 'boot',
};
