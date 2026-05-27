'use client';

import { useState, useEffect } from 'react';
import { Save, Building2, Phone, Mail, Calendar, Settings as SettingsIcon, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    academyName: '',
    contactEmail: '',
    contactPhone: '',
    academicYear: '',
    admissionsOpen: true,
    maintenanceMode: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings({ ...settings, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        alert('Settings saved successfully!');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900 flex items-center">
            <SettingsIcon className="mr-3 text-navy" size={28} />
            System Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage global configuration for Levora Academy.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* General Information */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-bold text-slate-900 flex items-center text-lg">
              <Building2 size={18} className="mr-2 text-slate-500" /> General Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Academy Name</label>
              <input type="text" name="academyName" value={settings.academyName} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none transition-all" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center">
                <Mail size={14} className="mr-1.5 text-slate-400" /> Contact Email
              </label>
              <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none transition-all" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center">
                <Phone size={14} className="mr-1.5 text-slate-400" /> Contact Phone
              </label>
              <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none transition-all" />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center">
                <Calendar size={14} className="mr-1.5 text-slate-400" /> Academic Year
              </label>
              <input type="text" name="academicYear" value={settings.academicYear} onChange={handleChange} placeholder="e.g. 2024-2025" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* System Toggles */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-bold text-slate-900 flex items-center text-lg">
              <ShieldCheck size={18} className="mr-2 text-slate-500" /> System Toggles
            </h2>
          </div>
          <div className="p-6 space-y-6">
            
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-bold text-slate-900">Admissions Portal</h3>
                <p className="text-sm text-slate-500 mt-0.5">Allow new students to submit admission inquiries online.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="admissionsOpen" checked={settings.admissionsOpen} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-100 rounded-lg bg-red-50/30 hover:bg-red-50/50 transition-colors">
              <div>
                <h3 className="font-bold text-red-900 flex items-center">
                  <AlertTriangle size={16} className="mr-1.5 text-red-500" /> Maintenance Mode
                </h3>
                <p className="text-sm text-red-700/70 mt-0.5">Takes the entire student and parent portal offline.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="btn-primary px-8 py-3 flex items-center text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-70">
            {saving ? (
              <span className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Saving...</span>
            ) : (
              <><Save size={18} className="mr-2" /> Save Configuration</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
