"use client";

import React from "react";
import {
  ChartBarIcon,
  ClipboardListIcon,
  CogIcon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";


const navItems = [
  { name: "Dashboard", icon: HomeIcon, path: "/" },
  { name: "Orders", icon: ClipboardListIcon, path: "/orders" },
  { name: "Menu", icon: MenuIcon, path: "/menu" },
  { name: "Staff", icon: UsersIcon, path: "/staff" },
  { name: "Analytics", icon: ChartBarIcon, path: "/analytics" },
  { name: "Settings", icon: CogIcon, path: "/settings" },
];

export default function Sidebar() {
  // const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Restaurant Admin
        </h1>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center px-4 py-2 text-gray-700
     
               `}
          >
            {/* ${pathname === item.path ? "bg-gray-200" : ""} */}
            <item.icon className="w-5 h-5 mr-2" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
