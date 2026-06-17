import { Award, GraduationCap } from 'lucide-react';

export default function FacultyCard({ faculty }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="h-64 bg-slate-100 overflow-hidden relative">
        <img 
          src={faculty.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&size=300&background=0B1D3A&color=F59E0B`}
          alt={`${faculty.name}, ${faculty.subject} Expert at Levora Academy`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/90 via-[var(--color-navy)]/20 to-transparent" />
        
        {/* Experience Badge */}
        {faculty.experience && (
          <div className="absolute top-4 left-4 bg-white/95 text-[var(--color-navy)] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
            {faculty.experience}+ Years Exp.
          </div>
        )}
        
        {/* Name at bottom of image */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-sm font-bold text-[var(--color-gold)] uppercase tracking-wider mb-1">{faculty.subject}</p>
          <h3 className="text-xl font-bold text-white mb-1">{faculty.name}</h3>
          {faculty.qualification && (
            <div className="flex items-center gap-1.5 text-slate-200 text-xs font-medium">
              <GraduationCap size={14} /> {faculty.qualification}
            </div>
          )}
        </div>
      </div>
      
      {faculty.shortIntro && (
        <div className="p-6">
          <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-navy)]/5 flex items-center justify-center flex-shrink-0">
              <Award size={16} className="text-[var(--color-navy)]" />
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{faculty.shortIntro}"</p>
          </div>
        </div>
      )}
    </div>
  );
}
