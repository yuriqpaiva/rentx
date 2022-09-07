import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { CarDto } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';
import { AppStackParamList } from '../../routes/app.stack.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';

type NavigationProps = NativeStackNavigationProp<AppStackParamList, 'Home'>;

export function Home(): JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();

  function handleCarDetails(car: CarDto): void {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars(): Promise<void> {
      try {
        const { data } = await api.get('/cars');
        if (isMounted) {
          setCars(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    // Executed before every useEffect after first useEffect.
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert('Você está on-line');
    } else {
      Alert.alert('Você está off-line');
    }
  }, [netInfo.isConnected]);

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
    </Container>
  );
}
