import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Briefcase, Users, LayoutTemplate } from 'lucide-react';

export default function Dashboard() {
  const cards = [
    { title: 'Manage Blogs', desc: 'Write and edit blog posts', icon: FileText, to: '/admin/blogs', color: 'bg-blue-500' },
    { title: 'Manage Services', desc: 'Update service offerings', icon: Briefcase, to: '/admin/services', color: 'bg-purple-500' },
    { title: 'Case Studies', desc: 'Showcase your best work', icon: LayoutTemplate, to: '/admin/portfolio', color: 'bg-emerald-500' },
    { title: 'Team Members', desc: 'Update team roster', icon: Users, to: '/admin/team', color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">Welcome Back!</h1>
      <p className="text-zinc-500 mb-8">What would you like to update today?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <NavLink key={c.title} to={c.to} className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow group flex flex-col">
            <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center mb-4 ${c.color}`}>
              <c.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-brand-plum transition-colors">{c.title}</h3>
            <p className="text-zinc-500 text-sm mt-1">{c.desc}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
