import React, { useEffect, useState } from 'react';
import { CarDto } from '../../dtos/CarDTO';
import api from '../../services/api';
import { Container } from './styles';

export function MyCars(): JSX.Element {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars(): Promise<void> {
      try {
        const { data } = await api.get('/schedules_byuser?user_id=1');
        console.log(data);

        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return <Container></Container>;
}
