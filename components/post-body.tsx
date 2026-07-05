'use client';

interface PostBodyProps {
  content: string;
}

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; text: string };

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split('\n');
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let codeLines: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim();
    if (text) blocks.push({ type: 'paragraph', text });
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length) blocks.push({ type: 'list', items: [...listItems] });
    listItems = [];
  };

  const flushCode = () => {
    if (codeLines.length) blocks.push({ type: 'code', text: codeLines.join('\n') });
    codeLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    const listMatch = line.match(/^[-*+]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1].trim());
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushCode();

  return blocks;
}

export default function PostBody({ content }: PostBodyProps) {
  const blocks = parseBlocks(content);

  return (
    <div className="post-body space-y-3">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            if (block.level === 1) {
              return (
                <h2 key={i} className="font-mono text-sm text-text-primary pt-1">
                  {block.text}
                </h2>
              );
            }
            if (block.level === 2) {
              return (
                <h3 key={i} className="font-mono text-xs text-text-primary pt-0.5">
                  {block.text}
                </h3>
              );
            }
            return (
              <h4 key={i} className="font-mono text-[11px] text-text-secondary">
                {block.text}
              </h4>
            );
          case 'list':
            return (
              <ul key={i} className="list-none space-y-1 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="font-mono text-[11px] text-text-secondary leading-relaxed">
                    <span className="text-text-muted mr-2">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'code':
            return (
              <pre
                key={i}
                className="font-mono text-[10px] text-text-muted bg-base border border-border-strong rounded p-2 overflow-x-auto whitespace-pre-wrap leading-relaxed"
              >
                {block.text}
              </pre>
            );
          default:
            return (
              <p key={i} className="font-mono text-[11px] text-text-secondary leading-relaxed">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
