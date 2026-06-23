"use client";

import { useState, useEffect } from "react";
import { Check, X, User, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/admin/registrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data);
      } else {
        toast.error(data.message || "Failed to fetch registrations");
      }
    } catch (error) {
      toast.error("An error occurred while fetching registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleStatusUpdate = async (id, role, status) => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/admin/registrations/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, role }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setRegistrations(registrations.filter((r) => r.id !== id));
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-navy mb-8">Pending Registrations</h1>
      
      {registrations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700">No pending registrations</h3>
          <p className="text-slate-500 mt-2">All registrations have been processed.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-sm font-semibold text-slate-600">Name</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-600">Email</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-600">Role</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-600">Date</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-navy">{user.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-600">{user.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleStatusUpdate(user.id, user.role, 'active')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Check size={16} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(user.id, user.role, 'rejected')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          <X size={16} />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
