import { ChartBarIcon, CircleDollarSignIcon, ClipboardListIcon, UsersIcon } from 'lucide-react';
import React from 'react';


const stats = [
  { name: 'Total Revenue', value: '$23,456', icon: CircleDollarSignIcon },
  { name: 'Pending Orders', value: '12', icon: ClipboardListIcon },
  { name: 'Active Staff', value: '24', icon: UsersIcon },
  { name: 'Avg. Order Value', value: '$45', icon: ChartBarIcon },
];
export default function Dashboard() {
  return (
    (<div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gray-200 mr-4">
                <item.icon className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{item.name}</p>
                <p className="text-2xl font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>)
  );
}

