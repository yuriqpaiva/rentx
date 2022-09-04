import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

export function SignUpFirstStep(): JSX.Element {
  const navigation = useNavigation<any>();

  function handleBack(): void {
    navigation.goBack();
  }

  return (
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
        <FormTitle>1. Dados</FormTitle>
      </Form>
    </Container>
  );
}
