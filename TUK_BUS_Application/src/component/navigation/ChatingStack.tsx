import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {ChattingParamList} from '../../../types/navigation/types';
import ChattingRoom from '../pages/Chatting/ChattingRoom/ChattingRoomScreen';
import ChattingRoomList from '../pages/Chatting/ChattingRoomList/ChattingRoomListScreen';
const Stack = createNativeStackNavigator<ChattingParamList>();

const ChattingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'채팅목록'}>
      <Stack.Screen
        name="채팅목록"
        component={ChattingRoomList}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => (
            <Icons
              name="menu"
              style={{marginRight: 15}}
              onPress={() => navigation.openDrawer()}
              size={Dimensions.get('window').width / 17}
              color={'black'}
            />
          ),
        })}
        // options={({navigation, route}) => ({
        //   headerRight: () => (
        //     <TouchableOpacity>
        //       <MaterialCommunityIcons
        //         name="chat-plus-outline"
        //         size={30}
        //         color="black"
        //       />
        //     </TouchableOpacity>
        //   ),
        // })}
      />
      <Stack.Screen
        name="채팅방"
        component={ChattingRoom}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChattingNavigation;
