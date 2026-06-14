'use client';

export default function ContactForm({ form_title }) {
  return (
    <section className="pb-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-navy)]/[0.03] to-transparent rounded-bl-[200px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[var(--color-gold)]/[0.03] to-transparent rounded-tr-[200px] pointer-events-none" />
          
          <h3 className="text-3xl font-bold font-poppins text-[var(--color-navy)] mb-10 relative z-10 text-center">
            {form_title || 'Send us a Message'}
          </h3>
          
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="+91 816 997 6265" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Interested Course</label>
                <select className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white appearance-none">
                  <option>General Enquiry</option>
                  <option>Admissions</option>
                  <option>Career Guidance</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Message</label>
              <textarea rows="5" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white resize-y" placeholder="How can we help you?"></textarea>
            </div>
            
            <div className="text-center pt-4">
              <button type="button" className="btn-primary px-12 py-4 text-base w-full md:w-auto shadow-lg hover:shadow-xl">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
