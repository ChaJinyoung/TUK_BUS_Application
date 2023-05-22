import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StatusBar, Text, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackTabs} from './src/component/navigation/StackTabs';
import {RootStackParamList2} from './types/navigation/types';
import SplashScreen from 'react-native-splash-screen';
const Stack = createNativeStackNavigator<RootStackParamList2>();

//* 디바이스 Default 폰트 크기 무시. 앱내 정의된 폰트 크기 적용
interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;

function App() {
  const loadInitialData = async () => {
    const value: any = await AsyncStorage.getItem('initialData');
    console.log(value);
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            //바꿨음
            name="StackTabs"
            component={StackTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
