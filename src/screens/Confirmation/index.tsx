import React from 'react';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { StatusBar, useWindowDimensions } from 'react-native';
import { Container, Content, Title, Message, Footer } from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stack.routes';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

interface Params {
  title: string;
  message: string;
  nextScreenRoute: any;
}

export function Confirmation(): JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;
  const { width } = useWindowDimensions();

  function handleConfirm(): void {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
