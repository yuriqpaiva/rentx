import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Container } from './styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export function Splash(): JSX.Element {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value * 100 }],
    };
  });

  function handleAnimationPosition(): void {
    animation.value = withSpring(Math.random());
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
