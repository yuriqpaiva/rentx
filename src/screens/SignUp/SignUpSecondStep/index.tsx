import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/stack.routes';
import api from '../../../services/api';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'SignUpSecondStep'
>;

export function SignUpSecondStep(): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'SignUpSecondStep'>>();
  const { user } = route.params;

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleBack(): void {
    navigation.goBack();
  }

  async function handleRegister(): Promise<void> {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação dela.');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais');
    }

    // Send to API and Register
    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta Criada!',
          message: 'Agora é só fazer login\ne aproveitar',
          nextScreenRoute: 'SignIn',
        });
      })
      .catch(() => Alert.alert('Opa', 'Não foi possível cadastrar'));
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

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
