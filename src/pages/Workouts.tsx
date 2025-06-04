import { useEffect, useState } from 'react';
import Page from '../components/Page';
import type { Workout } from '../types/exercises';
import workouts from '../utils/workouts';
import Search from '../components/Search';
import LevelSelect from '../components/LevelSelect';
import NavBar from '../components/NavBar';

const Workouts: React.FC = () => {
  const [list, setList] = useState<Workout[]>([]);
  const [params, setParams] = useState({
    search: '',
    level: '',
  });

  useEffect(() => {
    const list = workouts.getAll(
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
        <div></div>
      </div>
    </Page>
  );
};

export default Workouts;
