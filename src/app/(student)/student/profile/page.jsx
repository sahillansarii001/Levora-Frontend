"use client";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userStr = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (userStr) {
        const parsedUser = JSON.parse(userStr);
        setStudent(parsedUser); // Show cached data immediately

        // Fetch full profile from API
        try {
          const id = parsedUser.id || parsedUser.id;
          if (id) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/student/profile`,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
            const data = await res.json();
            if (data.success) {
              setStudent(data.data);
              // Optionally update localStorage with fresh data
              localStorage.setItem("user", JSON.stringify(data.data));
            } else {
              setError(data.message || "API returned false success");
            }
          } else {
            setError(
              "You are not logged in as a student. Please log in with a student account to view your profile.",
            );
          }
        } catch (err) {
          console.error("Failed to fetch profile", err);
          setError(err.message || "Network error fetching profile");
        }
      } else {
        setError("User session not found. Please log in.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your personal information and account settings.
          </p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 font-semibold">
              {error}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="h-32 bg-gradient-to-r from-sky to-navy relative"></div>

          <div className="px-8 pb-8 relative">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center absolute -top-12 text-3xl font-bold text-navy">
              {student?.name?.substring(0, 2).toUpperCase() || "ST"}
            </div>

            <div className="flex justify-end mt-4 mb-4">
              <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 flex items-center gap-2 transition-colors">
                <Edit size={16} /> Edit Profile
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Personal Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Full Name
                    </p>
                    <p className="text-sm font-medium text-slate-900">
                      {student?.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Email Address
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-slate-400" />
                      <p className="text-sm font-medium text-slate-900">
                        {student?.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Student ID
                    </p>
                    <p className="text-sm font-medium text-slate-900">
                      {student?.studentId || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Academic Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Class / Grade
                    </p>
                    <p className="text-sm font-medium text-slate-900">
                      {student?.className || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      School / College
                    </p>
                    <p className="text-sm font-medium text-slate-900">
                      {student?.schoolName ||
                        student?.collegeName ||
                        "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
