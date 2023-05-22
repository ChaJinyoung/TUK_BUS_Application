import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';

import LoginScreen from '../pages/Login/LoginScreen';
import RegisterScreen from '../pages/Register/RegisterScreen';
import {DrawerNavigation} from './Drawer';

import {StackParamList} from '../../../types/navigation/types';
import {InitialScreen} from '../pages/initialScreen/InitialScreen';
import UnivSettingScreen from '../pages/Setting/UnivSetting/UnivSettingScreen';
import UserSettingScreen from '../pages/Setting/UserSetting/UserSettingScreen';
import FindPasswordScreen from '../pages/FindPassword/FindPasswordScreen';
// import TestPage02 from '../pages/testpages/TestPage02';

const Stack = createNativeStackNavigator<StackParamList>();

export const StackTabs = (): ReactElement => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="초기화면" component={InitialScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
      <Stack.Screen
        options={{headerShown: true}}
        name="로그인"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="계정생성"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="비밀번호찾기"
        component={FindPasswordScreen}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="사용자설정"
        component={UserSettingScreen}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="학교설정"
        component={UnivSettingScreen}
      />
    </Stack.Navigator>
  );
}; // Drawer(기존 본캠퍼스 screen + 테스트용 2개) + 로그인 화면
