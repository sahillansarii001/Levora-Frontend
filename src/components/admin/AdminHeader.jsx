'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminHeader({ onMenuClick }) {
  const pathname = usePathname();
  const [user, setUser] = useState({ role: '', email: '' });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Student Registration: John Doe', time: '5m ago', read: false },
    { id: 2, title: 'System backup completed successfully', time: '1h ago', read: false },
    { id: 3, title: 'New course "Advanced React" published', time: '2h ago', read: true },
    { id: 4, title: 'Settings updated by Super Admin', time: '5h ago', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  useEffect(() => {
    setUser({
      role: localStorage.getItem('role') || 'Admin',
      email: localStorage.getItem('email') || 'admin@levora.in',
    });
  }, []);

  // Don't show header on login page
  if (pathname === '/login') return null;

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-slate-500 hover:text-navy" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        
        <div className="relative hidden md:block w-96">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students, courses..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-slate-500 hover:text-navy transition-colors focus:outline-none"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>
          
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button className="text-xs text-navy font-semibold hover:text-gold" onClick={markAllRead}>Mark all read</button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">No new notifications</div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                            <div>
                              <p className={`text-sm ${!notif.read ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{notif.title}</p>
                              <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => deleteNotification(notif.id, e)} 
                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                            title="Delete notification"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50">
                  <Link href="/admin/activity" onClick={() => setShowNotifications(false)} className="text-sm font-semibold text-slate-500 hover:text-navy block w-full">View All Activity</Link>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none capitalize">
              {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
            </p>
            <p className="text-xs text-slate-500 mt-1">{user.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center font-bold">
            {user.role === 'superadmin' ? 'SA' : 'AD'}
          </div>
        </div>
      </div>
      
    </header>
  );
}
