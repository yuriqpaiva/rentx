import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { CarDto } from '../dtos/CarDTO';
import { Splash } from '../screens/Splash';

export type AppStackParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: {
    car: CarDto;
  };
  Scheduling: {
    car: CarDto;
  };
  SchedulingDetails: {
    car: CarDto;
    dates: string[];
  };
  MyCars: undefined;
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: string;
  };
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppStackRoutes(): JSX.Element {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
