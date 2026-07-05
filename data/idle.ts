export interface IdleEntry {
  timestamp: string;
  message: string;
  icon: 'crochet' | 'plant' | 'book' | 'coffee' | 'walk';
  perm: string;
  size: string;
}

export const idleEntries: IdleEntry[] = [
  {
    timestamp: '2026.06.22',
    message: 'finished a granny-square for my blanket; third one this month!',
    icon: 'crochet',
    perm: '-rw-r--r--',
    size: '1.2k',
  },
  {
    timestamp: '2026.05.18',
    message: 'watered the succulent; will have to order a new one soon :/',
    icon: 'plant',
    perm: '-rw-r--r--',
    size: '892B',
  },
  {
    timestamp: '2026.02.28',
    message: 'debugged life over chai; no JTAG required',
    icon: 'coffee',
    perm: '-rw-rw-r--',
    size: '256B',
  },
  /*{
    timestamp: '2026.02.14',
    message: 'evening walk; counted three satellites, zero bugs',
    icon: 'walk',
    perm: '-r--r--r--',
    size: '3.1k',
  },*/
  {
    timestamp: '2025.12.20',
    message: 'sketched a block diagram for a side project that may never leave the notebook',
    icon: 'book',
    perm: '-r--r--r--',
    size: '1.8k',
  },
];
