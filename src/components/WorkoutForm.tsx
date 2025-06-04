import { useFieldArray, useForm } from 'react-hook-form';
import {
  type WorkoutExercise,
  type Workout,
  type Exercise,
} from '../types/exercises';
import { useEffect, useState } from 'react';
import exercises from '../utils/exercises';
import { FiChevronDown, FiPlus } from 'react-icons/fi';
import { levelColorMap, levelMap } from '../utils/maps';
import Tag from './Tag';
import { AiOutlineDelete } from 'react-icons/ai';

export interface WorkoutFormProps {
  onSubmit: (workout: Workout) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
  const [exercisesList, setExercisesList] = useState<Exercise[]>([]);

  useEffect(() => {
    const exercisesList = exercises.getAll();
    setExercisesList(exercisesList);
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Workout>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      level: 1,
      exercises: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const handleAddExercise = (exercise: Exercise) => {
    const newExercise: WorkoutExercise = {
      exercise,
      sets: 1,
      reps: 10,
      weight: null,
    };
    append(newExercise);
    const updatedExercises = exercisesList.filter(
      (ex) => ex.id !== exercise.id,
    );
    setExercisesList(updatedExercises);
  };

  const handleRemoveExercise = (index: number) => {
    const removedExercise = fields[index].exercise;
    remove(index);
    setExercisesList((prev) => [...prev, removedExercise]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-6 mt-6'
    >
      <div className='grid grid-cols-2 gap-x-3'>
        <div className='flex flex-col'>
          <label>
            <sup className='text-red-500'>*</sup>Workout name:
          </label>
          <input
            className={`mt-1.5 p-3 rounded-lg focus:outline-none invalid:text-red-500 shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 ${
              errors.title ? 'outline outline-red-500' : ''
            }`}
            {...register('title', {
              required: 'Workout title is required',
              minLength: {
                value: 3,
                message: 'Workout title must be at least 3 characters long',
              },
              maxLength: {
                value: 50,
                message: 'Workout title must be at most 50 characters long',
              },
            })}
            placeholder='Enter workout title...'
          />
          <div className='text-red-500 text-sm h-5'>
            {errors.title && errors.title.message}
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
          <div className='text-red-500 text-sm h-5'>
            {errors.level && errors.level.message}
          </div>
        </div>
        <div className='flex flex-col col-span-2'>
          {fields.length > 0 && <label>Exercises:</label>}
          <div className='mt-1.5 grid grid-cols-2 gap-3'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='p-3 flex flex-col gap-2 rounded-lg dark:bg-neutral-800 shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)]'
              >
                <div className='flex items-center gap-3'>
                  <span className='ml-2 text-sm font-medium'>
                    {field.exercise.name}{' '}
                    <span className='text-black/70 dark:text-white/70'>
                      ({field.exercise.muscle_group})
                    </span>
                  </span>
                  <Tag
                    className={`${
                      levelColorMap[field.exercise.level]
                    } text-black`}
                  >
                    {levelMap[field.exercise.level]}
                  </Tag>
                  <button
                    type='button'
                    onClick={() => handleRemoveExercise(index)}
                    className='cursor-pointer ml-auto p-1 rounded-md text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors duration-300'
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
                <div className='grid grid-cols-3 gap-x-3'>
                  <div className='w-full flex flex-col'>
                    <label className='text-sm'>
                      <sup className='text-red-500'>*</sup>Sets:
                    </label>
                    <input
                      type='number'
                      className='px-3 py-1.5 rounded-lg focus:outline-none shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-700 dark:text-white dark:placeholder:text-neutral-400'
                      {...register(`exercises.${index}.sets`, {
                        valueAsNumber: true,
                        required: 'Sets are required',
                        min: {
                          value: 1,
                          message: 'Sets must be at least 1',
                        },
                      })}
                      defaultValue={field.sets}
                      min={1}
                    />
                    <div className='text-red-500 text-sm h-5 overflow-ellipsis'>
                      {errors.exercises?.[index]?.sets &&
                        errors.exercises[index].sets.message}
                    </div>
                  </div>
                  <div className='w-full flex flex-col'>
                    <label className='text-sm'>
                      <sup className='text-red-500'>*</sup>Reps:
                    </label>
                    <input
                      type='number'
                      className='px-3 py-1.5 rounded-lg focus:outline-none shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-700 dark:text-white dark:placeholder:text-neutral-400'
                      {...register(`exercises.${index}.reps`, {
                        valueAsNumber: true,
                        required: 'Reps are required',
                        min: {
                          value: 1,
                          message: 'Reps must be at least 1',
                        },
                      })}
                      defaultValue={field.reps}
                      min={1}
                    />
                    <div className='text-red-500 text-xs h-4'>
                      {errors.exercises?.[index]?.reps &&
                        errors.exercises[index].reps.message}
                    </div>
                  </div>
                  <div className='w-full flex flex-col'>
                    <label className='text-sm'>Weight (kg):</label>
                    <input
                      type='number'
                      className='px-3 py-1.5 mb-4 rounded-lg focus:outline-none shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-700 dark:text-white dark:placeholder:text-neutral-400'
                      {...register(`exercises.${index}.weight`, {
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: 'Weight must be at least 0',
                        },
                      })}
                      min={0}
                      defaultValue={field.weight ?? ''}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {exercisesList.length > 0 && <label>Add Exercises</label>}
        <div className='grid grid-cols-2 gap-x-3 gap-y-1.5'>
          {exercisesList.map((exercise) => (
            <button
              key={exercise.id}
              type='button'
              className='cursor-pointer p-3 rounded-lg flex items-center gap-3 w-full dark:bg-neutral-800 shadow shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1) transition-colors duration-300'
              onClick={() => handleAddExercise(exercise)}
            >
              <FiPlus />
              <div>
                {exercise.name}{' '}
                <span className='text-black/70 dark:text-white/70'>
                  ({exercise.muscle_group})
                </span>
              </div>
              <Tag
                className={`${
                  levelColorMap[exercise.level]
                } text-black ml-auto`}
              >
                {levelMap[exercise.level]}
              </Tag>
            </button>
          ))}
        </div>
      </div>
      <button
        type='submit'
        className='cursor-pointer col-span-2 flex items-center justify-center gap-3 px-6 py-3 w-full font-medium rounded-full bg-violet-500 text-white hover:bg-violet-400 dark:bg-lime-400 dark:hover:bg-lime-300 dark:text-black transition-colors duration-300'
      >
        <FiPlus className='w-5 h-5' />
        <span>Add Exercise</span>
      </button>
    </form>
  );
};

export default WorkoutForm;
