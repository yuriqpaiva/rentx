import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.stack.routes';
import { useAuth } from '../hooks/auth';

export function Routes(): JSX.Element {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
