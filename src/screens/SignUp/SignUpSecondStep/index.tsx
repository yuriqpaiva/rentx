import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { useTheme } from 'styled-components';
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

export function SignUpSecondStep(): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleBack(): void {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de {'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput iconName="lock" placeholder="Senha" />
            <PasswordInput iconName="lock" placeholder="Repetir senha" />
          </Form>

          <Button title="Cadastrar" color={theme.colors.success} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
