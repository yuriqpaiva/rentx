import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { CarDto } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
} from './styles';
import { useTheme } from 'styled-components';

export function Home(): JSX.Element {
  const theme = useTheme();

  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);

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
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
}
