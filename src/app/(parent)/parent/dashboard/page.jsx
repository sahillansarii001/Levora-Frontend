import { TrendingUp, Calendar, CreditCard, AlertCircle } from 'lucide-react';

export const metadata = {
  title: "Parent Dashboard | Levora Academy",
};

export default function ParentDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Parent Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Viewing progress for: <strong>Rahul Deshmukh</strong> (Class 12th)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <TrendingUp className="text-blue-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">85%</h3>
          <p className="text-sm text-slate-500 font-medium">Average Score</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <Calendar className="text-green-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">92%</h3>
          <p className="text-sm text-slate-500 font-medium">Attendance</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <CreditCard className="text-red-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">₹5,000</h3>
          <p className="text-sm text-slate-500 font-medium">Upcoming Fee Due</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 text-orange-500 mb-4">
          <AlertCircle size={20} />
          <h3 className="font-bold">Recent Alerts</h3>
        </div>
        <p className="text-sm text-slate-600 font-medium">Rahul missed the Chemistry Mock Test on 12th May. Please contact the class teacher.</p>
      </div>

    </div>
  );
}
