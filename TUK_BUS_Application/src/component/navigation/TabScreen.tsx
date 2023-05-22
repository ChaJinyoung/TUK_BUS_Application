import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactElement, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {TabParamList} from '../../../types/navigation/types';
import {GoHome} from '../pages/TimeScreen/Go_Home';
import {GoUniversity} from '../pages/TimeScreen/Go_University';
import {TabBarIcon} from '../UI/atom/barIcon';
import ChattingNavigation from './ChatingStack';
import {MaterialTabScreen} from './MaterialTabScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabScreen = (): ReactElement => {
  const [isGtec, setIsGtec] = useState(false);

  const getUnivType = async () => {
    const univType = await AsyncStorage.getItem('initialData');
    if (univType) {
      if (JSON.parse(univType).type !== 0) {
        setIsGtec(true);
      }
    }
  };

  useEffect(() => {
    getUnivType();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="등교"
      screenOptions={({navigation, route}) => ({
        headerShown: true,
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        headerLeft: () => (
          <Icons
            name="menu"
            style={{marginLeft: 16}}
            onPress={() => navigation.openDrawer()}
            size={Dimensions.get('window').width / 17}
            color={'black'}
          />
        ),
      })}>
      <Tab.Screen
        name="등교"
        component={GoUniversity}
        options={{title: '실시간 등교'}}
      />
      <Tab.Screen
        name="하교"
        component={GoHome}
        options={{title: '실시간 하교'}}
      />
      <Tab.Screen
        name="채팅"
        component={ChattingNavigation}
        options={{
          headerShown: false,
          title: '채팅방',
        }}
      />
      {!isGtec && (
        <Tab.Screen
          name="타는위치"
          component={MaterialTabScreen}
          options={{title: '타는위치 (제1캠퍼스)'}}
        />
      )}
    </Tab.Navigator>
  );
};
