export const sections = [
  { id: 'proc', label: '/proc' },
  { id: 'modules', label: '/modules' },
  { id: 'docs', label: '/docs' },
  { id: 'uart', label: '/uart' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export const procTabs = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'study', label: 'Study' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'skills', label: 'Skills' },
  { id: 'idle', label: 'Idle' },
] as const;

export type ProcTabId = (typeof procTabs)[number]['id'];

export const SECTION_STORAGE_KEY = 'kernel-active-section';
export const PROC_TAB_STORAGE_KEY = 'kernel-proc-tab';

export const legacySectionMap: Record<string, SectionId> = {
  about: 'proc',
  skills: 'proc',
  projects: 'modules',
  modules: 'modules',
  experience: 'proc',
  syslog: 'proc',
  dmesg: 'proc',
  blog: 'docs',
  docs: 'docs',
  contact: 'uart',
  boot: 'proc',
  home: 'proc',
  hero: 'proc',
  dev: 'proc',
  idle: 'proc',
};

export const legacyProcTabMap: Record<string, ProcTabId> = {
  about: 'about',
  education: 'education',
  study: 'study',
  experience: 'experience',
  work: 'experience',
  achievements: 'achievements',
  contributions: 'contributions',
  skills: 'skills',
  idle: 'idle',
};

export function isSectionId(value: string): value is SectionId {
  return sections.some((s) => s.id === value);
}

export function resolveSectionId(value: string): SectionId | null {
  if (isSectionId(value)) return value;
  return legacySectionMap[value] ?? null;
}

export function isProcTabId(value: string): value is ProcTabId {
  return procTabs.some((t) => t.id === value);
}

export function resolveProcTabId(value: string): ProcTabId | null {
  if (isProcTabId(value)) return value;
  return legacyProcTabMap[value] ?? null;
}
