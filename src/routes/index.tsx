import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.stack.routes';
import { useAuth } from '../hooks/auth';
import { LoadAnimation } from '../components/LoadAnimation';

export function Routes(): JSX.Element {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadAnimation />;
  }

  return (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
