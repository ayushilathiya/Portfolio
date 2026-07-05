import { ExternalLink } from 'lucide-react';
import SectionVisual from '@/components/section-visual';
import PathLabel from '@/components/path-label';
import { profile } from '@/data/profile';
import { postUrl, type HashnodePost } from '@/lib/hashnode';

interface DocsPanelProps {
  posts: HashnodePost[];
}

export default function DocsPanel({ posts }: DocsPanelProps) {
  return (
    <div className="panel-content relative">
      <SectionVisual tab="docs" />

      <div className="flex-1 min-h-0 overflow-y-auto panel-inner-scroll relative z-10">
        <div className="panel-box p-3 font-mono text-[11px]">
          <PathLabel name="docs_index" />
          <div className="text-text-muted mb-3 pb-2 border-b border-border-strong flex flex-wrap gap-x-3 gap-y-1 -mt-1">
            <span>total {posts.length}</span>
            <span>·</span>
            <span>hashnode feed</span>
          </div>

          {posts.length === 0 ? (
            <div className="space-y-2">
              <p className="text-text-muted">no posts found</p>
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
            <div className="space-y-0">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={postUrl(post.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left p-2 border-b border-border-strong last:border-b-0 hover:bg-panel transition-colors duration-200 ease-out group"
                >
                  <span className="text-text-primary group-hover:text-accent-amber transition-colors duration-200 ease-out leading-snug">
                    {post.title}
                  </span>
                </a>
              ))}

              <a
                href={profile.social.hashnode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-border-strong text-text-secondary hover:text-accent-amber transition-colors"
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
