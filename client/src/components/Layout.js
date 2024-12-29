import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ClipboardListIcon, MenuIcon, UsersIcon, ChartBarIcon, CogIcon } from '@heroicons/react/outline';

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Orders', icon: ClipboardListIcon, path: '/orders' },
  { name: 'Menu', icon: MenuIcon, path: '/menu' },
  { name: 'Staff', icon: UsersIcon, path: '/staff' },
  { name: 'Analytics', icon: ChartBarIcon, path: '/analytics' },
  { name: 'Settings', icon: CogIcon, path: '/settings' },
];

function Layout({ children }) {
  const location = useLocation();

  return (
    (<div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Restaurant Admin</h1>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-2 text-gray-700 ${
                location.pathname === item.path ? 'bg-gray-200' : ''
              }`}>
              <item.icon className="w-5 h-5 mr-2" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>)
  );
}

export default Layout;

