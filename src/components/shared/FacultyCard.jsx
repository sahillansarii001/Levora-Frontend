import { Award, GraduationCap } from 'lucide-react';

export default function FacultyCard({ faculty }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
      <div className="h-64 bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] overflow-hidden relative">
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&size=300&background=0B1D3A&color=F59E0B`}
          alt={faculty.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent" />
        
        {/* Experience Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[var(--color-navy)] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
          {faculty.experience}
        </div>
        
        {/* Name at bottom of image */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-sm font-bold text-[var(--color-gold)] uppercase tracking-wider mb-1">{faculty.subject}</p>
          <h3 className="text-xl font-bold text-white">{faculty.name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start gap-3 bg-gradient-to-r from-[var(--color-gold)]/5 to-transparent p-4 rounded-xl border border-[var(--color-gold)]/10">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center flex-shrink-0">
            <Award size={16} className="text-white" />
          </div>
          <p className="text-sm text-slate-600 font-medium leading-snug">{faculty.specialization}</p>
        </div>
      </div>
    </div>
  );
}
