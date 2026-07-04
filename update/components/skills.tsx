'use client';

import { useState } from 'react';
import { skills } from '@/data/skills';

const domainColors = {
  embedded: 'border-amber text-amber',
  vlsi: 'border-blue-400 text-blue-400',
  iot: 'border-green-400 text-green-400',
  software: 'border-purple-400 text-purple-400',
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-header">0x01 // STACK</h2>

        {/* Domain legend */}
        <div className="flex flex-wrap gap-4 mb-8 font-mono text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-amber rounded-sm" />
            <span className="text-text-muted">EMBEDDED</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-blue-400 rounded-sm" />
            <span className="text-text-muted">VLSI/HW</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-green-400 rounded-sm" />
            <span className="text-text-muted">IoT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-purple-400 rounded-sm" />
            <span className="text-text-muted">SOFTWARE</span>
          </div>
        </div>

        {/* Skills node map */}
        <div className="relative grid-bg p-8 rounded border border-border">
          {/* Background trace lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
            <line x1="10%" y1="30%" x2="50%" y2="20%" stroke="#ffb020" strokeWidth="0.5" />
            <line x1="30%" y1="70%" x2="70%" y2="50%" stroke="#ffb020" strokeWidth="0.5" />
            <line x1="50%" y1="40%" x2="90%" y2="60%" stroke="#ffb020" strokeWidth="0.5" />
            <line x1="20%" y1="50%" x2="40%" y2="80%" stroke="#ffb020" strokeWidth="0.5" />
          </svg>

          {/* Skills grid */}
          <div className="flex flex-wrap gap-3 md:gap-4 relative z-10">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`
                  relative px-4 py-2 border rounded-sm font-mono text-sm
                  cursor-pointer transition-all duration-200
                  ${domainColors[skill.domain]}
                  ${hoveredSkill === skill.name ? 'shadow-amber-glow-sm bg-amber/10' : 'bg-base/50'}
                `}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Connection dot */}
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-current opacity-50" />
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
