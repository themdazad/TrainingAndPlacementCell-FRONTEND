import { Bell } from 'lucide-react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Link } from 'react-router-dom';

const NotificationBell = ({ count = 5 }) => (
  <Dropdown placement="bottom-end">
    <DropdownTrigger>
      <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-200">
        <Bell className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Notifications" className="w-80" variant="flat">
      <DropdownItem key="header" className="h-10 gap-2" textValue="Notifications">
        <p className="font-semibold text-slate-900 dark:text-slate-100">Notifications</p>
      </DropdownItem>
      <DropdownItem key="notification-1" textValue="New placement drive">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">New placement drive added</p>
          <p className="text-xs text-slate-500">2 hours ago</p>
        </div>
      </DropdownItem>
      <DropdownItem key="notification-2" textValue="Application deadline">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Application deadline approaching</p>
          <p className="text-xs text-slate-500">5 hours ago</p>
        </div>
      </DropdownItem>
      <DropdownItem key="view-all" className="text-center" textValue="View all">
        <Link to="/notifications" className="text-blue-600 dark:text-blue-400 text-sm font-medium">
          View all notifications
        </Link>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);
export default NotificationBell;
