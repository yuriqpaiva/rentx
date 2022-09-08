import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';
import { AppStackParamList } from '../../routes/app.stack.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { Car as CarModel } from '../../database/model/Car';
import { useNetInfo } from '@react-native-community/netinfo';

type NavigationProps = NativeStackNavigationProp<AppStackParamList, 'Home'>;

export function Home(): JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();

  function handleCarDetails(car: CarModel): void {
    navigation.navigate('CarDetails', { car });
  }

  async function offlineSynchronize(): Promise<void> {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt ?? 0}`,
        );

        const { changes, latestVersion } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('users/sync', user).catch(console.log);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars(): Promise<void> {
      try {
        const carCollection = database.get<CarModel>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
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
    if (netInfo.isConnected === true) {
      offlineSynchronize();
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
