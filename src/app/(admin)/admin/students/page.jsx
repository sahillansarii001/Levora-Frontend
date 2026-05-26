import { Search, Filter, Download, Plus, MoreHorizontal } from 'lucide-react';

export const metadata = {
  title: "Manage Students | Admin",
};

const students = [
  { id: "STU-1001", name: 'Rahul Deshmukh', course: 'JEE Advanced Prep', batch: '2024-A', status: 'Active', joinDate: '12 Jan 2023' },
  { id: "STU-1002", name: 'Priya Sharma', course: 'NEET UG Foundation', batch: '2024-B', status: 'Active', joinDate: '15 Feb 2023' },
  { id: "STU-1003", name: 'Amit Patel', course: 'Python Programming', batch: '2023-C', status: 'Inactive', joinDate: '01 Mar 2023' },
  { id: "STU-1004", name: 'Sneha Reddy', course: 'Web Development', batch: '2024-W', status: 'Active', joinDate: '10 Apr 2023' },
  { id: "STU-1005", name: 'Kunal Singh', course: 'JEE Main Crash', batch: '2023-Crash', status: 'Completed', joinDate: '20 May 2023' },
  { id: "STU-1006", name: 'Aditi Rao', course: 'Class 10th Board', batch: '2024-10A', status: 'Active', joinDate: '05 Jun 2023' },
];

export default function StudentsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Manage Students</h1>
          <p className="text-slate-500 text-sm mt-1">View, edit, and manage all enrolled students.</p>
        </div>
        <button className="btn-primary inline-flex items-center text-sm px-4 py-2">
          <Plus size={18} className="mr-2" /> Add Student
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 inline-flex items-center">
              <Filter size={16} className="mr-2" /> Filter
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 inline-flex items-center">
              <Download size={16} className="mr-2" /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Course & Batch</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student, i) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-500">{student.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{student.name}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-700">{student.course}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{student.batch}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{student.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md inline-block ${
                      student.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      student.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-navy transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <p>Showing 1 to 6 of 4,250 entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 bg-white rounded-md hover:bg-slate-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-navy bg-navy text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-slate-200 bg-white rounded-md hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 bg-white rounded-md hover:bg-slate-50">3</button>
            <button className="px-3 py-1 border border-slate-200 bg-white rounded-md hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}
