import { createBrowserRouter } from 'react-router';
import routes from './routes';

const router = createBrowserRouter(routes, {
  basename: '/fit-body/',
});

export default router;
