import { BookOpen, Users, Upload, CheckCircle } from 'lucide-react';

export const metadata = {
  title: "Faculty Dashboard | Levora Academy",
};

export default function FacultyDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Faculty Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, Dr. Sharma.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <BookOpen className="text-blue-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">4</h3>
          <p className="text-sm text-slate-500 font-medium">Classes Today</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <Users className="text-purple-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">150</h3>
          <p className="text-sm text-slate-500 font-medium">Total Students</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <CheckCircle className="text-green-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">12</h3>
          <p className="text-sm text-slate-500 font-medium">Assignments to Grade</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center cursor-pointer hover:border-navy hover:text-navy transition-colors">
          <Upload size={32} className="mb-2 text-slate-400" />
          <p className="text-sm font-bold">Upload Notes</p>
        </div>
      </div>

    </div>
  );
}
