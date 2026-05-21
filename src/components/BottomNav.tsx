import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: 'Início', path: '/home', icon: 'home' },
    { name: 'Parcelas', path: '/parcelas', icon: 'calendar_month' },
    { name: 'Extrato', path: '/extrato', icon: 'receipt_long' },
    { name: 'Ajuda', path: '/ajuda', icon: 'help' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full h-20 flex justify-around items-center px-4 pb-2 pt-2 bg-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] border-t border-outline-variant z-50">
      {navItems.map(item => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center min-w-[64px] rounded-xl px-2 py-1 transition-all duration-200 active:scale-95 ${isActive ? 'bg-secondary-container text-on-secondary-container rounded-full px-4' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            <span 
              className="material-symbols-outlined mb-1 text-[24px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className={`text-[10px] leading-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.name}
            </span>
          </Link>
        )
      })}
    </nav>
  );
}
