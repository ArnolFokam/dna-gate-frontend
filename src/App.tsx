import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from 'src/routes/main-routes';
import { useAppDispatch } from './config/store';
import { getSession } from './reducers/authentication.reducer';

const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '');

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getSession());
  }, [dispatch]);
  
  return (
    <Router basename={baseHref}>
      <AppRoutes />
    </Router>
  );
}

export default App;
