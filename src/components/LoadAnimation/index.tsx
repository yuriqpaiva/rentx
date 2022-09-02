import React from 'react';
import { Container } from './styles';
import LottieView from 'lottie-react-native';
import loadingCar from '../../assets/loadingCar.json';

export function LoadAnimation(): JSX.Element {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
