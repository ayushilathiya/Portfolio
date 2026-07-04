'use client';

/** Section heading styled as a lowercase path, e.g. `/register_map` */
import { cn } from '@/lib/utils';

export default function PathLabel({ name, className }: { name: string; className?: string }) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_');

  return (
    <p className={cn('path-label', className)}>{`/${slug}`}</p>
  );
}
