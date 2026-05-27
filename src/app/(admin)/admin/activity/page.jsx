'use client';

import { useState, useEffect } from 'react';
import { Activity, UserPlus, Server, BookOpen, Settings, Filter, Download, Trash2 } from 'lucide-react';

export default function ActivityLog() {
  const [filter, setFilter] = useState('all');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/activity`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setLogs(json.data.map(log => {
          let icon = <Activity size={20} className="text-slate-500" />;
          let color = 'bg-slate-100';
          if(log.type === 'user') { icon = <UserPlus size={20} className="text-blue-500"/>; color = 'bg-blue-50'; }
          if(log.type === 'system') { icon = <Server size={20} className="text-green-500"/>; color = 'bg-green-50'; }
          if(log.type === 'content') { icon = <BookOpen size={20} className="text-purple-500"/>; color = 'bg-purple-50'; }
          if(log.type === 'admin') { icon = <Settings size={20} className="text-orange-500"/>; color = 'bg-orange-50'; }
          
          const d = new Date(log.createdAt);
          return {
            id: log._id,
            type: log.type,
            title: log.title,
            desc: log.desc,
            time: d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            date: d.toLocaleDateString(),
            icon, color
          };
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // Polling every 5s for real-time updates
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if(confirm('Are you sure you want to delete this activity log?')) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/activity/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if(res.ok) {
          setLogs(logs.filter(l => l.id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredLogs = filter === 'all' ? logs : logs.filter(l => l.type === filter);

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-slate-900">System Activity Log</h1>
          <p className="text-slate-500 mt-1">Track all administrative actions, system alerts, and user activities.</p>
        </div>
        <button className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors shadow-sm inline-flex items-center bg-white">
          <Download size={18} className="mr-2" /> Export Logs
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
            {['all', 'user', 'system', 'content', 'admin'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${filter === f ? 'bg-navy text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="hidden sm:flex items-center text-slate-400 hover:text-navy text-sm font-medium transition-colors">
            <Filter size={16} className="mr-1" /> Filters
          </button>
        </div>

        <div className="p-0">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading activities...</div>
          ) : filteredLogs.map((log, index) => (
            <div key={log.id} className="group flex items-start p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <div className="w-32 shrink-0 pt-1 hidden sm:block">
                <p className="text-sm font-bold text-slate-700">{log.time}</p>
                <p className="text-xs text-slate-400">{log.date}</p>
              </div>
              
              <div className="relative flex flex-col items-center mr-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm ${log.color}`}>
                  {log.icon}
                </div>
                {index !== filteredLogs.length - 1 && (
                  <div className="absolute top-10 w-0.5 h-full bg-slate-100 -bottom-6"></div>
                )}
              </div>
              
              <div className="flex-1 pb-2 flex justify-between items-start gap-4">
                <div>
                  <div className="sm:hidden mb-2">
                    <span className="text-xs font-bold text-navy bg-slate-100 px-2 py-1 rounded-md">{log.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-navy transition-colors">{log.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{log.desc}</p>
                </div>
                <button onClick={() => handleDelete(log.id)} className="text-slate-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete log">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          
          {filteredLogs.length === 0 && (
            <div className="p-12 text-center">
              <Activity className="mx-auto text-slate-300 mb-3" size={48} />
              <h3 className="text-lg font-bold text-slate-700">No activities found</h3>
              <p className="text-slate-500">There are no logs matching the selected filter.</p>
            </div>
          )}
        </div>
        
        {filteredLogs.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
            <button className="text-sm font-bold text-navy hover:text-gold transition-colors">Load Older Activity</button>
          </div>
        )}
      </div>
    </div>
  );
}
