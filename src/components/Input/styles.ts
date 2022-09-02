import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;

  flex-direction: row;
`;

export const IconContainer = styled.View`
  width: 55px;
  justify-content: center;
  align-items: center;

  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled.TextInput`
  flex: 1;

  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;
`;
