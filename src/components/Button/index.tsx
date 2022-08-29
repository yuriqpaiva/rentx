import React from 'react';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  ...rest
}: Props): JSX.Element {
  const theme = useTheme();
  return (
    <Container
      onPress={onPress}
      color={color ?? theme.colors.main}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
      {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
