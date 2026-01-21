import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  count?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1
        ${active 
          ? 'bg-red-50 text-red-700' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }
      `}
    >
      <div className="flex items-center">
        <span className={`mr-3 ${active ? 'text-red-600' : 'text-slate-400'}`}>
          {React.isValidElement(icon) 
            ? React.cloneElement(icon as React.ReactElement<any>, { size: 20 })
            : icon}
        </span>
        {label}
      </div>
      {count !== undefined && (
        <span className={`px-2 py-0.5 text-xs rounded-full ${active ? 'bg-red-200 text-red-800' : 'bg-slate-100 text-slate-600'}`}>
          {count}
        </span>
      )}
    </button>
  );
};

export default NavItem;