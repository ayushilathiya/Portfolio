'use client';

import { profile } from '@/data/profile';

export default function About() {
  const registers = profile.registers.map((reg) => ({
    key: reg.field,
    addr: reg.addr,
    value: reg.value,
  }));

  return (
    <div className="panel-content">
      <h2 className="section-header">/proc</h2>

      <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-0">
        <div className="panel p-4 md:p-5 overflow-y-auto md:overflow-hidden">
          <div className="mono-label mb-3">register map</div>
          <div className="divide-y divide-border">
            {registers.map((reg) => (
              <div key={reg.key} className="register-row last:border-0">
                <span className="register-key">{reg.addr}</span>
                <span className="register-key">{reg.key}</span>
                <span className="register-val">{reg.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-4 md:p-5 relative overflow-hidden">
          <div className="mono-label mb-3">runtime status</div>

          <svg
            className="absolute top-3 right-3 w-24 h-24 opacity-15 pointer-events-none"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 4" />
            <circle cx="50" cy="12" r="2" fill="var(--accent)" />
          </svg>

          <table className="w-full font-mono text-xs relative z-10">
            <thead>
              <tr className="border-b border-border-strong text-left">
                <th className="py-1.5 text-text-muted font-normal">ADDR</th>
                <th className="py-1.5 text-text-muted font-normal">VALUE</th>
                <th className="py-1.5 text-text-muted font-normal">FLAGS</th>
              </tr>
            </thead>
            <tbody>
              {profile.registers.map((reg) => (
                <tr key={reg.field} className="border-b border-border">
                  <td className="py-2 text-text-muted">{reg.addr}</td>
                  <td className="py-2 text-accent">{reg.value}</td>
                  <td className="py-2 text-text-muted">rw</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
