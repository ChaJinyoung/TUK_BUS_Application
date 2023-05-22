import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';

import Icons from 'react-native-vector-icons/MaterialIcons';
import {SettingStackParamList} from '../../../types/navigation/types';
import SubmitScreen from '../pages/Setting/Submit/SubmitScreen';
import SettingMenuScreen from '../pages/Setting/SettingMenu/SettingMenuScreen';
import BlockListScreen from '../pages/Setting/BlockList/BlockListScreen';

const Stack = createNativeStackNavigator<SettingStackParamList>();

// 설정 부분
export const SettingStack = (): ReactElement => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="설정메뉴"
        component={SettingMenuScreen}
        options={({navigation}) => ({
          headerLeft: () => (
            <Icons
              name="menu"
              style={{marginRight: 15}}
              onPress={() => navigation.openDrawer()}
              size={24}
              color={'black'}
            />
          ),
        })}
      />
      <Stack.Screen name="건의" component={SubmitScreen} />
      <Stack.Screen name="차단목록" component={BlockListScreen} />
    </Stack.Navigator>
  );
}; // Drawer(기존 본캠퍼스 screen + 테스트용 2개) + 로그인 화면
