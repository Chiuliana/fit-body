import { FaRunning } from 'react-icons/fa';
import type { Workout } from '../types/exercises';
import { AiOutlineDelete } from 'react-icons/ai';
import Tag from './Tag';
import { levelColorMap, levelMap } from '../utils/maps';
// import { IoPlaySkipForwardCircleOutline } from 'react-icons/io5';

export interface WorkoutCardProps extends Workout {
  onDelete: (id: number) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  id,
  title,
  level,
  exercises,
  onDelete,
}) => {
  return (
    <div className='flex flex-col gap-6 px-6 py-5 rounded-xl shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-800'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3'>
            <FaRunning className='w-5 h-5 text-violet-500 dark:text-lime-400' />
            <h3 className='text-xl font-medium'>{title}</h3>
          </div>
          <button
            className='cursor-pointer ml-auto p-1 rounded-md text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors duration-300'
            onClick={() => id && onDelete(id)}
          >
            <AiOutlineDelete />
          </button>
        </div>
        <div className='flex items-center gap-3 text-black/70 dark:text-white/70 text-sm'>
          <Tag className={`${levelColorMap[level]} text-black`}>
            {levelMap[level]}
          </Tag>
          <span>{exercises.length} exercise</span>
          <span className='text-4xl mb-1'>&bull;</span>
          <span>
            {exercises.reduce((total, exercise) => total + exercise.sets, 0)}
            sets
          </span>
        </div>
      </div>
      <div>
        <ul className='flex flex-col gap-3 text-sm'>
          {exercises.map((exercise, index) => (
            <li key={index} className='flex items-center justify-between gap-3'>
              <span>
                {exercise.exercise.name}{' '}
                <span className='text-black/70 dark:text-white/70'>
                  ({exercise.exercise.muscle_group})
                </span>
              </span>
              <span>
                {exercise.sets} x {exercise.reps}{' '}
                <span className='text-black/70 dark:text-white/70'>
                  {exercise.weight ? `(${exercise.weight} kg)` : ''}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* <button className='cursor-pointer w-full flex items-center justify-center gap-3 px-8 py-4 font-medium rounded-full bg-violet-500 text-white hover:bg-violet-400 dark:bg-lime-400 dark:hover:bg-lime-300 dark:text-black transition-colors duration-300'>
        <IoPlaySkipForwardCircleOutline className='w-5 h-5' />
        <span className='ml-2'>Start Workout</span>
      </button> */}
    </div>
  );
};

export default WorkoutCard;
