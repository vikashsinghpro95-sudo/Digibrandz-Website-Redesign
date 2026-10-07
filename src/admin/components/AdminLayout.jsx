import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LayoutDashboard, FileText, Settings, Briefcase, Users, LayoutTemplate, MessageSquare, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Blogs', to: '/admin/blogs', icon: FileText },
  { name: 'Services', to: '/admin/services', icon: Briefcase },
  { name: 'Hero Services', to: '/admin/hero-services', icon: Briefcase },
  { name: 'Portfolio (Case Studies)', to: '/admin/portfolio', icon: LayoutTemplate },
  { name: 'Industries', to: '/admin/industries', icon: Briefcase },
  { name: 'Team', to: '/admin/team', icon: Users },
  { name: 'Careers', to: '/admin/careers', icon: Briefcase },
  { name: 'Job Applications', to: '/admin/job-applications', icon: Briefcase },
  { name: 'Client Requests', to: '/admin/client-requests', icon: MessageSquare },
  { name: 'SEO Audits', to: '/admin/audits', icon: FileText },
  { name: 'AI Chats', to: '/admin/chats', icon: MessageSquare },
  { name: 'Settings', to: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-black">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 text-zinc-300 flex flex-col shadow-xl z-20">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <span className="text-xl font-bold text-[#C5FA01] tracking-tight">DigiBrandz CMS</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-zinc-800 text-black font-medium' : 'hover:bg-zinc-900 hover:text-black'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-black transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-zinc-800">Admin Panel</h1>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-zinc-600">
                Welcome, <span className="text-black font-bold">{user.username}</span>
              </span>
              <span className="w-8 h-8 rounded-full bg-[#C5FA01] text-black flex items-center justify-center font-bold text-sm">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </header>
        
        <div className="flex-1 overflow-auto p-8 bg-zinc-50/50" data-lenis-prevent>
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
