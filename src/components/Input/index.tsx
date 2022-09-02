import React from 'react';
import { useTheme } from 'styled-components';
import { Container, IconContainer, InputText } from './styles';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function Input({ iconName, ...rest }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>
      <InputText {...rest} placeholderTextColor={theme.colors.text_detail} />
    </Container>
  );
}
