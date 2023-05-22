import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerParamList} from '../../../types/navigation/types';
import AllSchedule from './AllScheduleTabScreen';
import {CustomDrawerContent} from './CustomDrawerContent/CustomDrawerContent';
import {SettingStack} from './SettingStack';
import {TabScreen} from './TabScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // drawer 헤더를 각 navigation의 헤더에서 적용
      }}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="제1캠퍼스"
        component={TabScreen}
      />
      {/* <Drawer.Screen
        options={{headerShown: false}}
        name="제2캠퍼스"
        component={TabScreen}
      /> */}
      <Drawer.Screen
        options={{headerShown: true}}
        name="전체시간표"
        component={AllSchedule}
      />
      <Drawer.Screen name="설정" component={SettingStack} />
    </Drawer.Navigator>
  );
}; // Drawer(TabScreen + 테스트페이지 2)
