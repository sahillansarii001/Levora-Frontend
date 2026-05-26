import { Award } from 'lucide-react';

export default function FacultyCard({ faculty }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="h-60 bg-slate-100 overflow-hidden relative">
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&size=300&background=F1F5F9&color=0F172A`} 
          alt={faculty.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-navy text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          {faculty.experience}
        </div>
      </div>
      <div className="p-6">
        <p className="text-sky text-sm font-bold tracking-wider uppercase mb-1">{faculty.subject}</p>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{faculty.name}</h3>
        <div className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
          <Award size={18} className="text-gold mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 font-medium leading-tight">{faculty.specialization}</p>
        </div>
      </div>
    </div>
  );
}
