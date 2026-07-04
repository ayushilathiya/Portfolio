'use client';

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import SectionVisual from '@/components/section-visual';
import PathLabel from '@/components/path-label';
import { profile } from '@/data/profile';

interface BlogPost {
  title: string;
  subtitle: string;
  slug: string;
  dateAdded: string;
  views: number;
  coverImage?: string;
  tags: string[];
  body: string;
}

export default function DocsPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
          if (data.length === 0) setFetchError(true);
        } else {
          setFetchError(true);
        }
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  if (loading) {
    return (
      <div className="panel-content relative">
        <SectionVisual tab="docs" />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-mono text-xs text-text-muted animate-pulse">mounting /docs index…</p>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="panel-content relative">
        <SectionVisual tab="docs" />
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="font-mono text-xs text-text-muted hover:text-accent-amber mb-3 transition-colors duration-200 ease-out shrink-0 relative z-10"
        >
          ← back to index
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll relative z-10">
          <div className="panel-box p-4 font-mono text-xs">
            <pre className="whitespace-pre-wrap text-text-muted leading-relaxed">
{`${selected.title.toUpperCase()}(1)              portfolio.sys docs              ${formatDate(selected.dateAdded)}

NAME
       ${selected.title} — ${selected.subtitle || 'technical note'}

SYNOPSIS
       ${selected.subtitle || selected.title}

DESCRIPTION
${selected.body.split('\n').map((line) => `       ${line}`).join('\n')}

TAGS
       ${selected.tags.length ? selected.tags.join(', ') : 'none'}

SEE ALSO
       ayushilathiya.hashnode.dev/${selected.slug}`}
            </pre>
            <a
              href={`${profile.social.hashnode}/${selected.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-text-secondary hover:text-accent-amber text-[11px] transition-colors"
            >
              read on hashnode
              <ExternalLink className="w-3 h-3" />
            </a>
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
          <div className="text-text-muted mb-3 pb-2 border-b border-border flex flex-wrap gap-x-3 gap-y-1 -mt-1">
            <span>total {posts.length}</span>
            <span>·</span>
            <span>hashnode feed</span>
          </div>

          {posts.length === 0 ? (
            <div className="space-y-2">
              <p className="text-text-muted">
                {fetchError ? 'feed unreachable — check HASHNODE_TOKEN or try again later' : 'no posts found'}
              </p>
              <a
                href={profile.social.hashnode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-accent-amber transition-colors"
              >
                open ayushilathiya.hashnode.dev
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => setSelected(post)}
                  className="w-full text-left p-2 rounded border border-transparent hover:border-border-strong transition-colors duration-200 ease-out group flex gap-3"
                >
                  {post.coverImage ? (
                    <div className="shrink-0 w-16 h-12 md:w-20 md:h-14 rounded overflow-hidden border border-border bg-base">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ) : (
                    <div className="shrink-0 w-16 h-12 md:w-20 md:h-14 rounded border border-border bg-base flex items-center justify-center text-[9px] text-text-muted">
                      .md
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      <span className="text-text-muted shrink-0">{formatDate(post.dateAdded)}</span>
                      <span className="text-text-primary group-hover:text-accent-amber transition-colors duration-200 ease-out truncate">
                        {post.slug}.md
                      </span>
                    </div>
                    <p className="text-text-secondary mt-0.5 line-clamp-1">{post.title}</p>
                    {post.subtitle && (
                      <p className="text-text-muted text-[10px] mt-0.5 line-clamp-1">{post.subtitle}</p>
                    )}
                    {post.views > 0 && (
                      <p className="text-text-muted text-[10px] mt-0.5">{post.views} views</p>
                    )}
                  </div>
                </button>
              ))}

              <a
                href={profile.social.hashnode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-border text-text-secondary hover:text-accent-amber transition-colors"
              >
                view all on hashnode
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
