import Link from 'next/link';
import { Clock, Users, ChevronRight, BookOpen } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
      {/* Top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-7 pb-0 flex-grow flex flex-col relative">
        <div className="mb-5 flex justify-between items-start">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[var(--color-sky)]/10 to-[var(--color-emerald)]/10 text-[var(--color-sky)] text-xs font-bold rounded-full uppercase tracking-wider border border-[var(--color-sky)]/20">
            <BookOpen size={12} />
            {course.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-300">{course.title}</h3>
        <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase mb-1 flex items-center gap-1"><Clock size={11} /> Duration</span>
            <span className="text-sm font-bold text-slate-800">{course.duration}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase mb-1 flex items-center gap-1"><Users size={11} /> Faculty</span>
            <span className="text-sm font-bold text-slate-800">{course.faculty || 'Expert Staff'}</span>
          </div>
        </div>
      </div>
      
      <div className="px-7 py-5 bg-gradient-to-r from-slate-50 to-white border-t border-slate-100 flex items-center justify-between mt-auto group-hover:from-[var(--color-navy)] group-hover:to-[var(--color-navy-light)] transition-all duration-500">
        <span className="font-bold text-xl text-[var(--color-navy)] group-hover:text-white transition-colors duration-500">{course.fees || `₹${course.fee}`}</span>
        <Link prefetch={false}
          href={`/courses/${course.slug || course.courseCode || course.id}`} 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-500"
        >
          Details <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
