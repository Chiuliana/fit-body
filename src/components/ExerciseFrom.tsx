import { useForm } from 'react-hook-form';
import type { Exercise } from '../types/exercises';
import { levelMap } from '../utils/maps';
import { FiChevronDown, FiPlus } from 'react-icons/fi';

export interface ExerciseFormProps {
  onSubmit: (data: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      description: '',
      muscle_group: '',
      level: 1,
    },
  });

  return (
    <form
      className='grid grid-cols-2 gap-x-3 mt-6'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col'>
        <label>
          <sup className='text-red-500'>*</sup>Exercise name:
        </label>
        <input
          className={`mt-1.5 p-3 rounded-lg focus:outline-none invalid:text-red-500 shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 ${
            errors.name ? 'outline outline-red-500' : ''
          }`}
          {...register('name', {
            required: 'Exercise name is required',
            minLength: {
              value: 3,
              message: 'Exercise name must be at least 3 characters long',
            },
            maxLength: {
              value: 50,
              message: 'Exercise name must be at most 50 characters long',
            },
          })}
          placeholder='Enter exercise name...'
        />
        <div className='text-red-500 text-sm h-5'>
          {errors.name && errors.name.message}
        </div>
      </div>
      <div className='flex flex-col'>
        <label>
          <sup className='text-red-500'>*</sup>Dificulty level:
        </label>
        <div className='mt-1.5 relative'>
          <select
            className='appearance-none w-full dark:bg-neutral-800 rounded-xl shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] py-3 pl-3 pr-10 focus:outline-0'
            {...register('level', { required: true, valueAsNumber: true })}
          >
            {Object.entries(levelMap).map(([level, label]) => (
              <option key={level} value={level}>
                {label}
              </option>
            ))}
          </select>
          <FiChevronDown className='absolute inset-y-0 right-3 translate-y-full pointer-events-none' />
        </div>
      </div>
      <div className='flex flex-col col-span-2'>
        <label>
          <sup className='text-red-500'>*</sup>Muscle group:
        </label>
        <input
          className={`mt-1.5 p-3 rounded-lg focus:outline-none invalid:text-red-500 shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 ${
            errors.muscle_group ? 'outline outline-red-500' : ''
          }`}
          {...register('muscle_group', {
            required: 'Muscle group is required',
            minLength: {
              value: 3,
              message: 'Muscle group must be at least 3 characters long',
            },
            maxLength: {
              value: 50,
              message: 'Muscle group must be at most 50 characters long',
            },
          })}
        />
        <div className='text-red-500 text-sm h-5'>
          {errors.name && errors.name.message}
        </div>
      </div>
      <div className='flex flex-col col-span-2'>
        <label>Describtion:</label>
        <textarea
          rows={3}
          className={`mt-1.5 p-3 rounded-lg focus:outline-none invalid:text-red-500 shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 ${
            errors.description ? 'outline outline-red-500' : ''
          }`}
          {...register('description', {
            maxLength: {
              value: 255,
              message: 'Description must be at most 200 characters long',
            },
          })}
        />
        <div className='text-red-500 text-sm h-5'>
          {errors.description && errors.description.message}
        </div>
      </div>
      <button
        type='submit'
        className='cursor-pointer col-span-2 flex items-center justify-center gap-3 px-6 py-3 font-medium rounded-full bg-violet-500 text-white hover:bg-violet-400 dark:bg-lime-400 dark:hover:bg-lime-300 dark:text-black transition-colors duration-300'
      >
        <FiPlus className='w-5 h-5' />
        <span>Add Exercise</span>
      </button>
    </form>
  );
};

export default ExerciseForm;
