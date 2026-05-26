import React from 'react';

export default function SectionHeading({ title, subtitle, centered = false, dark = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold font-poppins mb-4 text-slate-900 tracking-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-slate-600 max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
