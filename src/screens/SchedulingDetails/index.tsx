import React, { useEffect, useState } from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';
import { Alert } from 'react-native';
import {
  Container,
  Header,
  CardImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  REntalPriceTotal,
} from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../routes/app.stack.routes';
import { useNetInfo } from '@react-native-community/netinfo';
import { CarDto } from '../../dtos/CarDTO';

interface RentalPeriodData {
  start: string;
  end: string;
}

type NavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  'SchedulingDetails'
>;

export function SchedulingDetails(): JSX.Element {
  const theme = useTheme();

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<AppStackParamList, 'SchedulingDetails'>>();
  const { car, dates } = route.params;
  const netInfo = useNetInfo();

  const [carUpdated, setCarUpdated] = useState({} as CarDto);

  const [loading, setLoading] = useState(false);

  const rentTotal = Number(dates.length * car.price);

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodData>(
    {} as RentalPeriodData,
  );

  async function handleConfirm(): Promise<void> {
    setLoading(true);

    await api
      .post('rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() =>
        navigation.navigate('Confirmation', {
          title: 'Carro alugado!',
          message:
            'Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel',
          nextScreenRoute: 'Home',
        }),
      )
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));

        setLoading(false);
        Alert.alert('Não foi possível confirmar o agendamento');
      });
  }

  function handleBack(): void {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdated(): Promise<void> {
      // Get a car by ID
      const { data } = await api.get(`/cars/${car.id}`);
      setCarUpdated(data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CardImages>
        <ImageSlider
          imagesUrl={
            carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>
        </Details>

        {carUpdated?.accessories && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
                key={accessory.type}
              />
            ))}
          </Accessories>
        )}
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="calendar"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <REntalPriceTotal>R$ ${rentTotal}</REntalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirm}
          color={theme.colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
