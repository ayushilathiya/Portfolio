'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import PathLabel from '@/components/path-label';
import PostBody from '@/components/post-body';
import { formatPostDate, summaryToPost, type HashnodePost, type HashnodePostSummary } from '@/lib/hashnode';

export default function DocsPanel() {
  const [posts, setPosts] = useState<HashnodePost[]>([]);
  const [loadingIndex, setLoadingIndex] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [postBody, setPostBody] = useState('');
  const [loadingBody, setLoadingBody] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selected = posts.find((p) => p.slug === selectedSlug) ?? null;

  useEffect(() => {
    let cancelled = false;
    setLoadingIndex(true);

    fetch('/api/blogs')
      .then((r) => (r.ok ? r.json() : []))
      .then((summaries: HashnodePostSummary[]) => {
        if (cancelled) return;
        setPosts(summaries.map((s) => summaryToPost(s, '')));
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingIndex(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedSlug || !selected) {
      setPostBody('');
      setLoadingBody(false);
      return;
    }

    if (selected.body) {
      setPostBody(selected.body);
      setLoadingBody(false);
      return;
    }

    let cancelled = false;
    setLoadingBody(true);
    setPostBody('');

    fetch(`/api/blogs/${encodeURIComponent(selectedSlug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: HashnodePost | null) => {
        if (cancelled) return;
        setPostBody(data?.body ?? '');
      })
      .catch(() => {
        if (!cancelled) setPostBody('');
      })
      .finally(() => {
        if (!cancelled) setLoadingBody(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedSlug, selected]);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBackToIndex = useCallback(() => {
    setSelectedSlug(null);
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowScrollTop(el.scrollTop > 120);
  }, []);

  if (selected) {
    const dateLabel = formatPostDate(selected.publishedAt);

    return (
      <div className="panel-content relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll relative z-10"
        >
          <div className="docs-reader-nav sticky top-0 z-20 flex items-center justify-between gap-2 mb-3 py-1.5 bg-panel border-b border-border-strong">
            <button
              type="button"
              onClick={goBackToIndex}
              className="font-mono text-[11px] text-text-muted hover:text-accent-amber transition-colors duration-200 ease-out shrink-0"
            >
              {'< /docsindex'}
            </button>
            {showScrollTop && (
              <button
                type="button"
                onClick={scrollToTop}
                className="font-mono text-[11px] text-text-muted hover:text-accent-amber transition-colors duration-200 ease-out shrink-0"
              >
                ↑ top
              </button>
            )}
          </div>

          <div className="panel-box p-3 font-mono text-[11px]">
            <PathLabel name={selected.slug.replace(/-/g, '_')} />
            <div className="text-text-muted mb-4 pb-3 border-b border-border-strong -mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {dateLabel && <span>{dateLabel}</span>}
              {dateLabel && <span>·</span>}
              <span className="text-text-secondary">{selected.title}</span>
            </div>

            {loadingBody ? (
              <p className="text-text-muted animate-pulse">loading man page…</p>
            ) : postBody ? (
              <PostBody content={postBody} />
            ) : (
              <p className="text-text-muted">content unavailable</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-content relative">
      <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll relative z-10 docs-index-scroll">
        <div className="panel-box docs-index-panel p-3 font-mono text-[11px]">
          <PathLabel name="docs_index" />
          <div className="text-text-muted mb-3 pb-2 border-b border-border-strong flex flex-wrap gap-x-3 gap-y-1 -mt-1">
            <span>total {loadingIndex ? '…' : posts.length}</span>
            <span>·</span>
            <span>local index</span>
          </div>

          {loadingIndex ? (
            <p className="text-text-muted animate-pulse">indexing man pages…</p>
          ) : posts.length === 0 ? (
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
                  <span className="text-text-primary text-[11px] group-hover:text-accent-amber transition-colors duration-200 ease-out leading-snug">
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
