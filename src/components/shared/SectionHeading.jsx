export default function SectionHeading({ title, subtitle, centered = false, dark = false }) {
  return (
    <div className={`mb-14 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      <div className={`flex items-center gap-4 mb-5 ${centered ? 'justify-center' : ''}`}>
        <div className={`h-px w-8 ${dark ? 'bg-slate-700' : 'bg-[var(--color-gold)]/30'}`} />
        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? 'text-slate-400' : 'text-[var(--color-gold)]'}`}>
          Premium Education
        </span>
        <div className={`h-px w-8 ${dark ? 'bg-slate-700' : 'bg-[var(--color-gold)]/30'}`} />
      </div>
      <h2 className={`section-heading ${dark ? '!text-white' : ''} ${centered ? 'text-center' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${dark ? '!text-slate-400' : ''} ${centered ? 'mx-auto text-center' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
