import React from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';
import { Container } from './styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;

export function Splash(): JSX.Element {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }],
    };
  });

  function handleAnimationPosition(): void {
    animation.value = withTiming(Math.random() * (WIDTH - 100), {
      duration: 500,
      easing: Easing.bezier(0, 0.67, 0.83, 0.66),
    });
  }

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
