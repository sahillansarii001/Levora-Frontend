import { Shield, ShieldAlert, Plus } from 'lucide-react';

export const metadata = {
  title: "Manage Staff | Super Admin",
};

export default function StaffPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Manage Staff</h1>
          <p className="text-slate-500 text-sm mt-1">Super Admin controls for adding teachers and sub-admins.</p>
        </div>
        <button className="btn-primary inline-flex items-center text-sm px-4 py-2">
          <Plus size={18} className="mr-2" /> Add Staff Member
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                <ShieldAlert size={16} className="text-red-500" />
                Vikram Singhania
              </td>
              <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Super Admin</span></td>
              <td className="px-6 py-4 text-slate-500">vikram@levora.com</td>
              <td className="px-6 py-4 text-slate-500">Just now</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                <Shield size={16} className="text-blue-500" />
                A. Sharma
              </td>
              <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Faculty Head</span></td>
              <td className="px-6 py-4 text-slate-500">asharma@levora.com</td>
              <td className="px-6 py-4 text-slate-500">2 hours ago</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
