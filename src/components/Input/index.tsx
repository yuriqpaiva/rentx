import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Container, IconContainer, InputText } from './styles';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props): JSX.Element {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus(): void {
    setIsFocused(true);
  }

  function handleInputBlur(): void {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        placeholderTextColor={theme.colors.text_detail}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
}
