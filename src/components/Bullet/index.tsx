import React from 'react';
import { Container } from './styles';

interface Props {
  active?: boolean;
}

export function Bullet({ active = false }: Props): JSX.Element {
  return <Container active={active} />;
}
