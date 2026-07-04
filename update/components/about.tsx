'use client';

import { profile } from '@/data/profile';

export default function About() {
  const registers = [
    ...profile.specs.map((spec) => ({
      key: spec.field,
      value: spec.value,
    })),
    {
      key: 'DESCRIPTION',
      value: profile.bio.join(' '),
    },
  ];

  return (
    <section id="proc" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-header">/proc</h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Register / spec sheet */}
          <div className="panel p-6 md:p-8 relative">
            <div className="mono-label mb-4">register map</div>
            <div className="divide-y divide-border">
              {registers.map((reg) => (
                <div key={reg.key} className="register-row last:border-0">
                  <span className="register-key">{reg.key}</span>
                  <span
                    className={`register-val ${
                      reg.key === 'DESCRIPTION' ? 'text-text-primary text-sm leading-relaxed' : ''
                    }`}
                  >
                    {reg.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status panel with orbital accent */}
          <div className="panel p-6 md:p-8 relative overflow-hidden">
            <div className="mono-label mb-4">runtime status</div>

            {/* Subtle orbital dotted line — space-tech accent */}
            <svg
              className="absolute top-4 right-4 w-28 h-28 opacity-20 pointer-events-none"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
              <circle cx="50" cy="12" r="2" fill="var(--accent)" />
              <circle cx="88" cy="50" r="1.5" fill="var(--accent-dim)" />
            </svg>

            <table className="w-full font-mono text-sm relative z-10">
              <thead>
                <tr className="border-b border-border-strong text-left">
                  <th className="py-2 text-text-muted font-normal text-xs tracking-wider">ADDR</th>
                  <th className="py-2 text-text-muted font-normal text-xs tracking-wider">VALUE</th>
                  <th className="py-2 text-text-muted font-normal text-xs tracking-wider">FLAGS</th>
                </tr>
              </thead>
              <tbody>
                {profile.specs.map((spec, index) => (
                  <tr key={spec.field} className="border-b border-border/50 last:border-0">
                    <td className="py-3 text-text-muted pr-2 text-xs">
                      0x{String(index).padStart(2, '0')}
                    </td>
                    <td className="py-3 text-accent pr-2">{spec.value}</td>
                    <td className="py-3 text-text-muted text-xs">rw</td>
                  </tr>
                ))}
                <tr className="border-b border-border/50">
                  <td className="py-3 text-text-muted text-xs">0x04</td>
                  <td className="py-3 text-text-primary text-xs">locked</td>
                  <td className="py-3">
                    <div className="status-led status-led-verified inline-block" aria-label="verified" />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex gap-1 mt-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-accent/30 rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
