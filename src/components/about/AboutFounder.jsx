'use client';

export default function AboutFounder({ founder_title, founder_message, founder_name, founder_role, founder_image }) {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="md:w-2/5 relative min-h-[300px]">
            <img 
              src={founder_image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
              alt="Founder"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="md:w-3/5 p-12 md:p-16 flex flex-col justify-center text-white">
            <h2 className="text-3xl font-bold font-poppins mb-6 tracking-tight">
              {founder_title || 'Message from the Founder'}
            </h2>
            <div 
              className="text-slate-300 mb-8 text-lg leading-relaxed cms-content"
              dangerouslySetInnerHTML={{ __html: founder_message || '<p>"Education is not just about scoring marks; it\'s about building a foundation for a successful life."</p>' }}
            />
            <div className="pt-8 border-t border-slate-800">
              <h4 className="font-bold text-xl tracking-tight">{founder_name || 'Dr. Vikram Singhania'}</h4>
              <p className="text-gold font-medium text-sm tracking-wider uppercase mt-1">
                {founder_role || 'Founder & Director'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
