'use client';

import { profile } from '@/data/profile';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <h2 className="section-header">
          0x00 // ABOUT
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Bio text */}
          <div className="panel p-6 md:p-8">
            <div className="mono-label mb-4">PROFILE</div>
            {profile.bio.map((paragraph, index) => (
              <p
                key={index}
                className={`font-mono leading-relaxed ${
                  index === profile.bio.length - 1
                    ? 'text-text-muted'
                    : 'text-text-primary mb-4'
                }`}
              >
                {paragraph}
              </p>
            ))}

            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-8 h-8">
              <svg viewBox="0 0 32 32" className="text-amber opacity-40">
                <path d="M32,0 L32,32 L0,32" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Spec table */}
          <div className="panel p-6 md:p-8 relative">
            <div className="mono-label mb-4">SPECIFICATIONS</div>
            <table className="w-full font-mono text-sm">
              <tbody>
                {profile.specs.map((spec, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="py-3 text-text-muted pr-4">{spec.field}</td>
                    <td className="py-3 text-amber">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pin decoration */}
            <div className="flex gap-1 mt-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-amber opacity-50"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
