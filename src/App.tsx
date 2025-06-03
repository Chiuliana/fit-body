import { RouterProvider } from 'react-router';
import router from './router/router';
import './styles.css';
import ThemeProvider from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
