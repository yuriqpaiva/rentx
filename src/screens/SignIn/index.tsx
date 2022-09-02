import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Container, Header, Subtitle, Title, Footer } from './styles';

export function SignIn(): JSX.Element {
  const theme = useTheme();

  return (
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

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          enabled={false}
          loading={false}
          color={theme.colors.background_secondary}
          light
        />
      </Footer>
    </Container>
  );
}
