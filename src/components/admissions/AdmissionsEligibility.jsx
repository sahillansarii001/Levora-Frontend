'use client';

export default function AdmissionsEligibility({ title }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-6">{title || "Programs & Eligibility"}</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 font-bold text-slate-700">Program</th>
              <th className="py-4 px-6 font-bold text-slate-700">Eligible Classes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 text-slate-600">School Foundation</td>
              <td className="py-4 px-6 text-slate-600 font-medium">Class 6th to 10th</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-600">JEE / NEET Coaching</td>
              <td className="py-4 px-6 text-slate-600 font-medium">Class 11th, 12th & Droppers</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-600">Coding & Tech</td>
              <td className="py-4 px-6 text-slate-600 font-medium">Class 8th and above</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
