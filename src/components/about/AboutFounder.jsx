'use client';

export default function AboutFounder({ founder_title, founder_message, founder_name, founder_role, founder_image }) {
  return (
    <section className="py-10 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-gold)]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="md:w-2/5 relative min-h-[350px] overflow-hidden">
            <img 
              src={founder_image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
              alt={`${founder_name || 'Dr. Vikram Singhania'}, Founder of Levora Academy`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-[var(--color-navy)]/40 md:via-transparent md:to-transparent" />
          </div>
          <div className="md:w-3/5 p-12 md:p-16 flex flex-col justify-center text-white relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold text-[var(--color-gold)] border border-white/10 mb-6 w-fit">
              <span>Leadership</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6 tracking-tight">
              {founder_title || 'Message from the Founder'}
            </h2>
            <div 
              className="text-slate-300 mb-8 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: founder_message || '<p>"Education is not just about scoring marks; it\'s about building a foundation for a successful life."</p>' }}
            />
            <div className="pt-8 border-t border-white/10">
              <h3 className="font-bold text-xl tracking-tight">{founder_name || 'Dr. Vikram Singhania'}</h3>
              <p className="text-[var(--color-gold)] font-medium text-sm tracking-wider uppercase mt-1">
                {founder_role || 'Founder & Director'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
