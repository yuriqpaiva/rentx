import React from 'react';
import { StyleSheet } from 'react-native';
import { Home } from './src/screens/Home';

export default function App(): JSX.Element {
  return <Home />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
