import { FaRunning } from 'react-icons/fa';
import type { Exercise } from '../types/exercises';
import Tag from './Tag';
import { levelColorMap, levelMap } from '../utils/maps';
import { AiOutlineDelete } from 'react-icons/ai';

const ExerciseCard: React.FC<Exercise> = ({
  name,
  description,
  muscle_group,
  level,
  is_default,
}) => {
  return (
    <div className='flex flex-col gap-3 px-6 py-5 rounded-xl shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-800'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-3'>
          <FaRunning className='w-5 h-5 text-violet-500 dark:text-lime-400' />
          <span className='flex items-center gap-1 font-medium'>
            <h3 className='text-xl'>{name}</h3>
            <span className='text-black/70 dark:text-white/70'>
              ({muscle_group})
            </span>
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <Tag className={`${levelColorMap[level]} text-black`}>
            {levelMap[level]}
          </Tag>
          {is_default && (
            <Tag className='bg-violet-500 text-white dark:bg-lime-400 dark:text-black'>
              Default
            </Tag>
          )}
        </div>
        <button className='cursor-pointer ml-auto p-1 rounded-md text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors duration-300'>
          <AiOutlineDelete />
        </button>
      </div>
      <p className='text-sm text-black/70 dark:text-white/70 line-clamp-3'>
        {description}
      </p>
    </div>
  );
};

export default ExerciseCard;
