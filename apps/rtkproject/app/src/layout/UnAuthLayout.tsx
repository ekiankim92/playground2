import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function UnAuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
}
