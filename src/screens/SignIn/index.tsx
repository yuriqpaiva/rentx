import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Container, Header, Subtitle, Title, Form, Footer } from './styles';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../routes/auth.stack.routes';
import { useAuth } from '../../hooks/auth';

type NavigationProps = NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;

export function SignIn(): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(): Promise<void> {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        return Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer o login, verifique as credenciais',
        );
      }
    }
  }

  function handleNewAccount(): void {
    navigation.navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <Subtitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
