import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ShuttleLocation_Home,
  ShuttleLocation_Univ,
  ShuttleLocation_Univ_Night,
} from '../UI/molecule/Shuttle_Location';
import {MaterialTabParamList} from '../../../types/navigation/types';

const Tab = createMaterialTopTabNavigator<MaterialTabParamList>();

export const MaterialTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="등교">
      <Tab.Screen name="등교" component={ShuttleLocation_Univ} />
      <Tab.Screen name="등교(17:30~)" component={ShuttleLocation_Univ_Night} />
      <Tab.Screen name="하교" component={ShuttleLocation_Home} />
    </Tab.Navigator>
  );
};
