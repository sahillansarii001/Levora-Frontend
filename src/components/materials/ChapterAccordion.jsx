import { useState } from 'react';
import { ChevronDown, Download, FileText, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChapterAccordion({ chapterName, materials }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 transition-colors duration-300"
      >
        <h3 className="font-bold text-[var(--color-navy)] text-lg">{chapterName}</h3>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-slate-100 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map(item => (
                  <div key={item.id} className="group relative bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start justify-between hover:border-[var(--color-gold)]/30 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${item.isPremium ? 'bg-amber-50' : 'bg-red-50'}`}>
                        {item.isPremium ? (
                          <Lock size={18} className="text-amber-500" />
                        ) : (
                          <FileText size={18} className="text-red-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--color-navy)] text-sm mb-1">{item.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="font-medium px-2 py-0.5 rounded bg-slate-200/50 capitalize">{item.category || item.type || 'Note'}</span>
                          {item.isPremium && (
                            <span className="font-bold text-amber-500 text-[10px] uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">Premium</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (item.isPremium) {
                          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                          let studentData = {};
                          try {
                            const dataStr = localStorage.getItem('user');
                            if (dataStr) studentData = JSON.parse(dataStr);
                          } catch (e) {}
                          
                          if (!token) {
                            alert("This is a premium resource. Please login to access.");
                            window.location.href = '/login';
                            return;
                          }
                          
                          if (!studentData.isSubscribed && localStorage.getItem('role') !== 'admin' && localStorage.getItem('role') !== 'superadmin') {
                            alert("You need a premium subscription to access this material. Please contact administration.");
                            return;
                          }
                          
                          window.open(item.fileUrl, '_blank');
                        } else {
                          window.open(item.fileUrl, '_blank');
                        }
                      }}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-3 ${
                        item.isPremium 
                          ? 'bg-amber-100 text-amber-600 hover:bg-amber-500 hover:text-white'
                          : 'bg-[var(--color-sky)]/10 text-[var(--color-sky)] hover:bg-[var(--color-sky)] hover:text-white'
                      }`}
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
