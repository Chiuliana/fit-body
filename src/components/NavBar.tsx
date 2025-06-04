import { FaPersonRunning } from 'react-icons/fa6';
import { LuDumbbell } from 'react-icons/lu';
import { Link, useLocation } from 'react-router';

const NavBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/exercises',
      label: 'Exercises',
      icon: <LuDumbbell />,
      isActive: location.pathname.includes('/exercises'),
    },
    {
      path: '/workouts',
      label: 'Workouts',
      icon: <FaPersonRunning />,
      isActive: location.pathname.includes('/workouts'),
    },
  ];

  return (
    <nav>
      <ul className='flex text-black/50 dark:text-white/50 dark:bg-neutral-700 rounded-lg shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)]'>
        {navItems.map((item) => (
          <li key={item.path} className='w-full'>
            <Link
              to={item.path}
              className={`flex items-center justify-center gap-3 px-6 py-3 rounded-lg transition-colors duration-200 ${
                item.isActive
                  ? 'bg-violet-50 text-violet-500 border border-violet-500/25 dark:bg-neutral-600 dark:text-lime-500 dark:border-lime-500/25 shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)]'
                  : ''
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
