'use client';
import { ClipboardList, Clock, CheckCircle2 } from 'lucide-react';

export default function AssignmentsPage() {
  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">Assignments</h1>
          <p className="text-sm text-slate-500 mt-1">View your pending and completed assignments.</p>
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="text-sky" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No pending assignments</h2>
          <p className="text-slate-500">You're all caught up! Check back later for new assignments.</p>
        </div>
      </div>
    </div>
  );
}
