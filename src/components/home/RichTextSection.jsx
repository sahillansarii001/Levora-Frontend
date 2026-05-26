'use client';

export default function RichTextSection({ title, content }) {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-100 opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
          {title && (
            <h2 className="text-4xl font-extrabold text-slate-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              {title}
            </h2>
          )}
          {content && (
            <div 
              className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content || '<p>Start writing your content here...</p>' }} 
            />
          )}
        </div>
      </div>
    </section>
  );
}
