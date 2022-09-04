import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { CarDto } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';
import { useTheme } from 'styled-components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RootStackParamList } from '../../routes/stack.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function Home(): JSX.Element {
  const theme = useTheme();

  const navigation = useNavigation<NavigationProps>();
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = Number(ctx.positionX) + event.translationX;
      positionY.value = Number(ctx.positionY) + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  useEffect(() => {
    async function fetchCars(): Promise<void> {
      try {
        const { data } = await api.get('/cars');
        setCars(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  function handleCarDetails(car: CarDto): void {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars(): void {
    navigation.navigate('MyCars');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: 'absolute', bottom: getBottomSpace() + 13, right: 22 },
          ]}>
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.main,
              },
            ]}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
