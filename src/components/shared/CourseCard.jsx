import Link from 'next/link';
import { Clock, Users, ChevronRight } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-navy/30 hover:shadow-lg transition-all duration-300">
      <div className="p-6 pb-0 flex-grow flex flex-col">
        <div className="mb-4 flex justify-between items-start">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
            {course.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-navy transition-colors">{course.title}</h3>
        <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col border-l-2 border-slate-100 pl-3">
            <span className="text-xs text-slate-400 font-medium uppercase mb-1 flex items-center"><Clock size={12} className="mr-1"/> Duration</span>
            <span className="text-sm font-semibold text-slate-700">{course.duration}</span>
          </div>
          <div className="flex flex-col border-l-2 border-slate-100 pl-3">
            <span className="text-xs text-slate-400 font-medium uppercase mb-1 flex items-center"><Users size={12} className="mr-1"/> Faculty</span>
            <span className="text-sm font-semibold text-slate-700">{course.faculty || 'Expert Staff'}</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto group-hover:bg-navy transition-colors duration-300">
        <span className="font-bold text-lg text-slate-900 group-hover:text-white transition-colors">{course.fees || `₹${course.fee}`}</span>
        <Link href={`/courses/${course.slug || course.courseCode || course._id}`} className="flex items-center text-sm font-semibold text-navy group-hover:text-white transition-colors">
          Details <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}
