'use client';

export default function ContactForm({ form_title }) {
  return (
    <section className="pb-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-navy/5 rounded-bl-[100px] z-0"></div>
          <h3 className="text-3xl font-bold text-navy mb-10 relative z-10 text-center">
            {form_title || 'Send us a Message'}
          </h3>
          
          <form className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="+91 98765 43210" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Interested Course</label>
                <select className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all bg-gray-50 focus:bg-white appearance-none">
                  <option>General Enquiry</option>
                  <option>Admissions</option>
                  <option>Career Guidance</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
              <textarea rows="5" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all bg-gray-50 focus:bg-white resize-y" placeholder="How can we help you?"></textarea>
            </div>
            
            <div className="text-center">
              <button type="button" className="bg-navy hover:bg-slate-800 text-white font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 w-full md:w-auto">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
