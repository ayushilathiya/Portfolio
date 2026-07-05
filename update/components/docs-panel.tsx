'use client';

import { useState } from 'react';
import SectionVisual from '@/components/section-visual';
import PathLabel from '@/components/path-label';
import PostBody from '@/components/post-body';
import { formatPostDate, type HashnodePost } from '@/lib/hashnode';

interface DocsPanelProps {
  posts: HashnodePost[];
}

export default function DocsPanel({ posts }: DocsPanelProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = posts.find((p) => p.slug === selectedSlug) ?? null;

  if (selected) {
    const dateLabel = formatPostDate(selected.publishedAt);

    return (
      <div className="panel-content relative">
        <SectionVisual tab="docs" />

        <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll relative z-10">
          <button
            type="button"
            onClick={() => setSelectedSlug(null)}
            className="font-mono text-xs text-text-muted hover:text-accent-amber mb-3 transition-colors duration-200 ease-out shrink-0"
          >
            {'< /docsindex'}
          </button>

          <div className="panel-box p-4 md:p-5 font-mono text-xs">
            <PathLabel name={selected.slug.replace(/-/g, '_')} />
            <div className="text-text-muted mb-4 pb-3 border-b border-border-strong -mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {dateLabel && <span>{dateLabel}</span>}
              {dateLabel && <span>·</span>}
              <span className="text-text-secondary">{selected.title}</span>
            </div>

            <PostBody content={selected.body} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-content relative">
      <SectionVisual tab="docs" />

      <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll relative z-10">
        <div className="panel-box p-3 font-mono text-[11px]">
          <PathLabel name="docs_index" />
          <div className="text-text-muted mb-3 pb-2 border-b border-border-strong flex flex-wrap gap-x-3 gap-y-1 -mt-1">
            <span>total {posts.length}</span>
            <span>·</span>
            <span>local index</span>
          </div>

          {posts.length === 0 ? (
            <p className="text-text-muted">no posts found</p>
          ) : (
            <div className="space-y-0">
              {posts.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => setSelectedSlug(post.slug)}
                  className="block w-full text-left p-2 border-b border-border-strong last:border-b-0 hover:bg-panel transition-colors duration-200 ease-out group"
                >
                  <span className="text-text-primary group-hover:text-accent-amber transition-colors duration-200 ease-out leading-snug">
                    {post.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
