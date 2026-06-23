'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Calendar as CalendarIcon, Clock, MapPin, Video, User, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

export default function AdminSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    className: '',
    date: '',
    startTime: '',
    endTime: '',
    subject: '',
    instructor: '',
    color: 'blue'
  });

  const fetchSchedule = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/schedule?date=${currentDate}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSchedule(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch schedule', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaculties = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/faculty`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setFaculties(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch faculties', err);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [currentDate]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const uniqueSubjects = Array.from(new Set(faculties.map(f => f.subject).filter(Boolean)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/schedule/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/schedule`;
        
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ className: '', date: '', startTime: '', endTime: '', subject: '', instructor: '', color: 'blue' });
        fetchSchedule();
      } else {
        toast.error(data.message || 'Error saving schedule');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/schedule/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchSchedule();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (session) => {
    setEditingId(session.id);
    setFormData({
      className: session.className,
      date: new Date(session.date).toISOString().split('T')[0],
      startTime: session.startTime,
      endTime: session.endTime,
      subject: session.subject,
      instructor: session.instructor,
      color: session.color
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">Manage Schedule</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage class schedules for all grades.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ className: '', date: currentDate, startTime: '', endTime: '', subject: '', instructor: '', color: 'blue' });
            setIsModalOpen(true);
          }}
          className="bg-navy text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-navy/90 transition-colors"
        >
          <Plus size={20} />
          <span>Add Class</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <label className="text-sm font-bold text-slate-700">Filter by Date:</label>
          <input 
            type="date" 
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-navy"
          />
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading schedule...</div>
        ) : schedule.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No classes scheduled for this date.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 font-semibold px-4">Time</th>
                  <th className="pb-3 font-semibold px-4">Class & Subject</th>
                  <th className="pb-3 font-semibold px-4">Instructor</th>
                  <th className="pb-3 font-semibold px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {schedule.map((session) => (
                  <tr key={session.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{session.startTime}</div>
                      <div className="text-slate-400 text-xs">{session.endTime}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{session.subject} <span className="text-slate-400 font-normal">({session.className})</span></div>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium">{session.instructor}</td>
                    <td className="py-4 px-4 text-right">
                      <button onClick={() => handleEdit(session)} className="text-slate-400 hover:text-navy mr-3"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(session.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && typeof document !== 'undefined' && document.body ? (
        createPortal(
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Class' : 'Schedule New Class'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Class / Grade *</label>
                    <select required value={formData.className} onChange={e=>setFormData({...formData, className: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-navy bg-white">
                      <option value="">Select Class</option>
                      {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', 'Other'].map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                    <input required type="date" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Time *</label>
                    <input required type="time" value={formData.startTime} onChange={e=>setFormData({...formData, startTime: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Time *</label>
                    <input required type="time" value={formData.endTime} onChange={e=>setFormData({...formData, endTime: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
                    <select required value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-navy bg-white">
                      <option value="">Select Subject</option>
                      {uniqueSubjects.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Instructor *</label>
                    <select required value={formData.instructor} onChange={e=>setFormData({...formData, instructor: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-navy bg-white">
                      <option value="">Select Instructor</option>
                      {faculties.filter(f => !formData.subject || f.subject === formData.subject).map(fac => (
                        <option key={fac.id} value={fac.name}>{fac.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy/90 transition-colors">
                    {editingId ? 'Save Changes' : 'Schedule Class'}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )
      ) : null}
    </div>
  );
}
