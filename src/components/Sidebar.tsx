import { List, LayoutDashboard, type LucideIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import { NavLink } from 'react-router';

interface menuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  // reference : https://github.com/lucide-icons/lucide/discussions/1869
  path: string;
}
const menuItems: menuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '' },
  { id: 'todos', label: 'Todos', icon: List, path: 'todo' },
];

const Sidebar = () => {
  return (
    <div className="h-screen flex flex-col overflow-auto w-[350px] bg-white shadow-md py-6">
      <div className="px-6">
        <div className="text-2xl font-semibold">
          <span>dev</span>
          <span className="text-blue-600">Balane</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-3.5">Productivity made simple</p>
      </div>
      <Separator />
      <div className="flex-1">
        <nav className="mt-6 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={`/${item.path}`}
                end
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mb-2 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="px-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
          <p className="text-sm font-medium">Stay productive!</p>
          <p className="text-xs opacity-90 mt-1">Balance your dev life easily</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
