import { getMe } from '@/api/me';
import { ACCESS_TOKEN } from '@/api/user/types';
import Content from '@/components/ui/Contents';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar/Sidebar';
import { getCookie } from '@/util/cookie';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const useCheckAuth = () => {
  const { isAuthenticated, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const { data: userData, error } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: isAuthenticated && !!getCookie(ACCESS_TOKEN),
    retry: false,
  });

  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    }
  }, [userData]);

  useEffect(() => {
    if (error instanceof AxiosError) {
      if (error.status === 403) {
        logout();
      }
    }
  }, [error]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', {
        replace: true,
      });
    }
  }, [isAuthenticated]);
};

export default function AuthLayout() {
  useCheckAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
        <Sidebar mode={'single'} />
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden', background: 'white' }}
        >
          <Header />
          <Content>
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  );
}
