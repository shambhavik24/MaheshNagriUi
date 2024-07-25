import { useLocation } from 'react-router-dom';

const useIsLoginPage = () => {
  const location = useLocation();
  return location.pathname === '/login';
};

export default useIsLoginPage;
