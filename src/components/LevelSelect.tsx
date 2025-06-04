import { FiChevronDown, FiFilter } from 'react-icons/fi';
import { levelMap } from '../utils/maps';

export interface LevelSelectProps {
  onSelect: (level: string) => void;
  className?: string;
  wrapperClassName?: string;
}

const LevelSelect: React.FC<LevelSelectProps> = ({
  onSelect,
  className,
  wrapperClassName,
}) => {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <select
        className={`appearance-none w-full dark:bg-neutral-700 rounded-xl shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] py-3 px-10 focus:outline-0 ${className}`}
        defaultValue=''
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value=''>All Levels</option>
        {Object.entries(levelMap).map(([level, label]) => (
          <option key={level} value={level}>
            {label}
          </option>
        ))}
      </select>
      <FiFilter className='absolute inset-y-0 left-3 translate-y-full pointer-events-none' />
      <FiChevronDown className='absolute inset-y-0 right-3 translate-y-full pointer-events-none' />
    </div>
  );
};

export default LevelSelect;
