import React from 'react';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
}

export function Button({ title, color, onPress, ...rest }: Props): JSX.Element {
  const theme = useTheme();
  return (
    <Container onPress={onPress} color={color ?? theme.colors.main} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
