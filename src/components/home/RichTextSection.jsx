'use client';

export default function RichTextSection({ title, content }) {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--color-gold)]/[0.03] blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--color-sky)]/[0.03] blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          {title && (
            <h2 className="section-heading text-center mb-8">
              {title}
            </h2>
          )}
          {content && (
            <div 
              className="text-slate-600 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: content || '<p>Start writing your content here...</p>' }} 
            />
          )}
        </div>
      </div>
    </section>
  );
}
