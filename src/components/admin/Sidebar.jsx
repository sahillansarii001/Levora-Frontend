"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCog,
  FileEdit,
  LogOut,
  Settings,
  CalendarCheck,
  Banknote,
  CreditCard,
  X,
  Activity,
  BookOpen,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  TrendingUp,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { name: "Mega CMS", href: "/admin/cms", icon: <FileEdit size={20} /> },
  {
    name: "Activity Logs",
    href: "/admin/activity",
    icon: <Activity size={20} />,
  },
  {
    name: "Attendance",
    href: "/admin/attendance",
    icon: <CalendarCheck size={20} />,
  },
  {
    name: "Class Schedule",
    href: "/admin/schedule",
    icon: <CalendarCheck size={20} />,
  },
  {
    name: "Admissions",
    href: "/admin/admissions",
    icon: <Users size={20} />,
  },
  {
    name: "Manage Subjects",
    href: "/admin/subjects",
    icon: <BookOpen size={20} />,
  },
  {
    name: "Assignments",
    href: "/admin/assignments",
    icon: <ClipboardList size={20} />,
  },
  {
    name: "Exam Results",
    href: "/admin/results",
    icon: <TrendingUp size={20} />,
  },
  {
    name: "Registrations",
    href: "/admin/registrations",
    icon: <UserCog size={20} />,
  },
];

const superAdminItems = [
  {
    name: "User Management",
    icon: <Users size={20} />,
    subItems: [
      { name: "Students", href: "/admin/students" },
      { name: "Faculty", href: "/admin/faculty" },
      { name: "Parents", href: "/admin/parents" },
    ]
  },
  { name: "Student Fees", href: "/admin/fees", icon: <Banknote size={20} /> },
  {
    name: "Faculty Salary",
    href: "/admin/salary",
    icon: <CreditCard size={20} />,
  },
  {
    name: "Lecture Logs",
    href: "/admin/lecture-logs",
    icon: <FileEdit size={20} />,
  },
  { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);

  // Open the menu initially if a sub-item is active
  useEffect(() => {
    const isAnySubActive = superAdminItems.some(item => 
      item.subItems && item.subItems.some(sub => pathname === sub.href)
    );
    if (isAnySubActive) {
      setIsUsersMenuOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  // Don't render sidebar on login page
  if (pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`w-64 bg-navy text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <Image
            src="/Logo.png"
            alt="Levora Admin"
            width={220}
            height={60}
            className="h-16 w-auto filter brightness-0 invert"
          />
          <button
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">
            Menu
          </p>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen?.(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-gold text-navy font-bold"
                    : "text-slate-300 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}

          {role === "superadmin" && (
            <>
              {superAdminItems.map((item) => {
                if (item.subItems) {
                  const isAnySubActive = item.subItems.some(sub => pathname === sub.href);

                  return (
                    <div key={item.name} className="flex flex-col mb-1">
                      <button
                        onClick={() => setIsUsersMenuOpen(!isUsersMenuOpen)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors font-medium w-full ${isAnySubActive ? 'text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          {item.name}
                        </div>
                        {isUsersMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      
                      {isUsersMenuOpen && (
                        <div className="flex flex-col gap-1 pl-11 pr-2 py-1 mt-1 border-l border-white/10 ml-6">
                          {item.subItems.map(subItem => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setIsOpen?.(false)}
                                className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                  isSubActive
                                    ? "bg-gold text-navy font-bold shadow-sm"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen?.(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-gold text-navy font-bold"
                        : "text-slate-300 hover:bg-white/10 hover:text-white font-medium"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </>
          )}
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
