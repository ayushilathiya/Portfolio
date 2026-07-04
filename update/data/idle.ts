export interface IdleEntry {
  timestamp: string;
  message: string;
  icon: 'crochet' | 'plant' | 'book' | 'coffee' | 'walk';
  perm: string;
  size: string;
}

export const idleEntries: IdleEntry[] = [
  {
    timestamp: '2026.03.22',
    message: 'finished a granny-square coaster — third one this month',
    icon: 'crochet',
    perm: '-rw-r--r--',
    size: '1.2k',
  },
  {
    timestamp: '2026.03.18',
    message: 'watered the monstera; two new leaves unfurling',
    icon: 'plant',
    perm: '-rw-r--r--',
    size: '892B',
  },
  {
    timestamp: '2026.03.10',
    message: 'read two chapters of an embedded systems deep-dive (for fun)',
    icon: 'book',
    perm: '-r--r--r--',
    size: '4.8k',
  },
  {
    timestamp: '2026.02.28',
    message: 'debugged life over chai — no JTAG required',
    icon: 'coffee',
    perm: '-rw-rw-r--',
    size: '256B',
  },
  {
    timestamp: '2026.02.14',
    message: 'evening walk; counted three satellites, zero bugs',
    icon: 'walk',
    perm: '-r--r--r--',
    size: '3.1k',
  },
  {
    timestamp: '2026.01.30',
    message: 'started a moss-stitch scarf — WIP, ETA unknown',
    icon: 'crochet',
    perm: '-rw-rw-r--',
    size: '2.4k',
  },
  {
    timestamp: '2026.01.12',
    message: 'repotted the pothos — root-bound but recovering fine',
    icon: 'plant',
    perm: '-rw-r--r--',
    size: '512B',
  },
  {
    timestamp: '2025.12.20',
    message: 'sketched a block diagram for a side project that may never leave the notebook',
    icon: 'book',
    perm: '-r--r--r--',
    size: '1.8k',
  },
];
