import { useEffect, useState } from 'react';
import LevelSelect from '../components/LevelSelect';
import Page from '../components/Page';
import Search from '../components/Search';
import exercises from '../utils/exercises';
import type { Exercise } from '../types/exercises';
import NavBar from '../components/NavBar';
import ExerciseCard from '../components/ExerciseCard';
import { LuDumbbell } from 'react-icons/lu';
import { MdAdd } from 'react-icons/md';

const Exercises: React.FC = () => {
  const [list, setList] = useState<Exercise[]>([]);
  const [params, setParams] = useState({
    search: '',
    level: '',
  });

  useEffect(() => {
    const list = exercises.getAll(
      params.search,
      params.level ? parseInt(params.level) : undefined,
    );
    setList(list);
  }, [params]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search.length > 2 || search.length === 0) {
      setParams((prev) => ({ ...prev, search }));
    }
  };

  const handleLevelChange = (level: string) => {
    setParams((prev) => ({ ...prev, level }));
  };

  return (
    <Page>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center gap-3'>
          <Search
            placeholder='Search exercises by name or muscle group...'
            onChange={handleSearchChange}
            className='w-full'
          />
          <LevelSelect onSelect={handleLevelChange} wrapperClassName='w-60' />
        </div>
        <NavBar />
        <div className='h-full p-6 rounded-lg shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-700'>
          <div className='flex items-center gap-4'>
            <LuDumbbell className='w-8 h-8 text-violet-500 dark:text-lime-400' />
            <h1 className='text-[32px]'>Exercise Library</h1>
            <button className='cursor-pointer flex items-center justify-center gap-3 px-6 py-3 ml-auto font-medium rounded-full bg-violet-500 text-white hover:bg-violet-400 dark:bg-lime-400 dark:hover:bg-lime-300 dark:text-black transition-colors duration-300'>
              <MdAdd className='w-5 h-5' />
              <span>Add Exercise</span>
            </button>
          </div>
          <div className='grid grid-cols-2 gap-3 mt-6'>
            {list.map((exercise) => (
              <ExerciseCard {...exercise} />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Exercises;
