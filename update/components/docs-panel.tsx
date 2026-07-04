'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  title: string;
  subtitle: string;
  slug: string;
  dateAdded: string;
  tags: string[];
  body: string;
}

export default function DocsPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  if (loading) {
    return (
      <div className="panel-content">
        <h2 className="section-header">/docs</h2>
        <p className="font-mono text-xs text-text-muted">loading documentation index…</p>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="panel-content">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="font-mono text-xs text-text-muted hover:text-accent-amber mb-3 transition-colors duration-200 ease-out shrink-0"
        >
          ← back to index
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll font-mono text-xs">
          <pre className="whitespace-pre-wrap text-text-muted leading-relaxed">
{`${selected.title.toUpperCase()}(1)              Hashnode Docs              ${formatDate(selected.dateAdded)}

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
        </div>
      </div>
    );
  }

  return (
    <div className="panel-content">
      <h2 className="section-header">/docs</h2>

      <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll">
        <div className="panel p-3 font-mono text-[11px]">
          <div className="text-text-muted mb-2 pb-2 border-b border-border">
            total {posts.length} · documentation index (text-only)
          </div>

          {posts.length === 0 ? (
            <p className="text-text-muted">no posts found</p>
          ) : (
            <div className="space-y-0">
              {posts.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => setSelected(post)}
                  className="w-full text-left py-2 border-b border-border last:border-0 hover:bg-panel transition-colors duration-200 ease-out group"
                >
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                    <span className="text-text-muted w-24 shrink-0">{formatDate(post.dateAdded)}</span>
                    <span className="text-text-primary group-hover:text-accent-amber transition-colors duration-200 ease-out">
                      {post.slug}.md
                    </span>
                  </div>
                  <p className="text-text-secondary mt-0.5 pl-0 md:pl-[6.5rem] line-clamp-1">{post.title}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
