/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createChattingRoom, getChattingRoom} from '../../../../api/serverAPI';
import {CreateRoomModal} from '../../../modals/createRoomModal/createRoomModal';
import Loading from '../../../UI/common/component/Loading';
import {styles} from './style';

// export type ChattingRoomListProp = StackScreenProps<
//   RootStackParam,
//   'ChattingRoomList'
// >;

type CreateRoom = {
  startingPoint: string;
  arrivalPoint: string;
  startingTime: string;
  roomID: string;
  userCount: number;
};

const ChattingRoomList = ({navigation}: any) => {
  const [roomList, setRoomList] = useState([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [startingPoint, setStartingPoint] = useState<string>('정왕역');
  const [arrivalPoint, setArrivalPoint] = useState<string>('한국공학대');
  const [startingTime, setStartingTime] = useState<string>('00:00');

  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [isUsing, setIsUsing] = useState<boolean>(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getChattingRooms();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    setLoading(true);
    onLoad();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return setRoomList([]);
  }, []);

  const onLoad = () => {
    navigation.addListener('focus', () => {
      getChattingRooms();
      LoadData();
      console.log('open');
    });
  };

  const LoadData = async () => {
    setCreateModalVisible(false);
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        setIsLogin(true);
        const userInfo = JSON.parse(value);
        console.log('~~~~~AsyncData', userInfo.token);
        setUserId(userInfo.userID);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.log('~~~~ LoginScreen ~ AsyncStorage ~ error', error);
    }
  };

  const getChattingRooms = async () => {
    try {
      const response = await getChattingRoom();
      console.log('getChattingRoom response', response);
      if (response.message) {
        setRoomList(response.message);
        setIsUsing(response.isIng);
      } else {
        setRoomList([]);
        setIsUsing(false);
      }
    } catch (e) {
      console.log('ChattingRoomListScreen ~ getChattingRooms ~ error ~', e);
    }
  };

  const createRoom = async () => {
    try {
      const data: any = {
        startingPoint: startingPoint,
        arrivalPoint: arrivalPoint,
        startingTime: startingTime,
        userID: userId,
      };
      console.log('data: ', data);
      const response: any = await createChattingRoom(data);
      setCreateModalVisible(false);
      navigation.navigate('채팅방', {
        name: userId,
        roomID: response.data.message.roomID,
        startingPoint: startingPoint,
        arrivalPoint: arrivalPoint,
      });
    } catch (e) {
      console.log('ChattingRoomListScreen ~ createRoom ~ error ~ ', e);
    }
  };

  const enterRoom = (room: any) => {
    console.log('~~~~~~~~~~~이게 이름', userId);
    if (isUsing || room.userCount < 3) {
      navigation.navigate('채팅방', {
        roomID: room.roomID,
        startingPoint: room.startingPoint,
        arrivalPoint: room.arrivalPoint,
        name: userId,
      });
    } else {
      Alert.alert('', '인원초과', [
        {
          text: '확인',
        },
      ]);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'black'}
          /> // refreshControl 적용
        }>
        {isLogin ? (
          roomList.length ? (
            // roomList에 데이터 있을 경우 탐색, 없을 경우 특정 문구 표시
            roomList.map((room: CreateRoom) => (
              <View style={styles.boxContainer} key={room.roomID}>
                <TouchableOpacity onPress={() => enterRoom(room)}>
                  <View>
                    <View style={[styles.roomContent]}>
                      <Text style={[styles.font24, {fontWeight: 'bold'}]}>
                        {room.startingPoint}
                      </Text>
                      <AntDesign name="arrowright" size={20} color="black" />
                      <Text style={[styles.font24, {fontWeight: 'bold'}]}>
                        {room.arrivalPoint}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.roomContent,
                        {justifyContent: 'space-between'},
                      ]}>
                      <Text style={styles.font24}>
                        출발시간: {room.startingTime}
                      </Text>
                      {isUsing ? (
                        <Text style={[styles.font24, {color: 'blue'}]}>
                          사용 중
                        </Text>
                      ) : room.userCount >= 3 ? (
                        <Text style={[styles.font24, {color: 'red'}]}>
                          {room.userCount} / 3
                        </Text>
                      ) : (
                        <Text style={styles.font24}>{room.userCount} / 3</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.noRoomContainer}>
              <Text style={styles.font16}>생성된 채팅방이 없습니다</Text>
            </View>
          )
        ) : (
          <View style={styles.noRoomContainer}>
            <Text style={styles.font16}>로그인이 필요한 기능입니다.</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('로그인')}>
              <Text style={styles.font20}>로그인</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <CreateRoomModal
        modalVisible={createModalVisible}
        setModalVisible={setCreateModalVisible}
        startingPoint={startingPoint}
        arrivalPoint={arrivalPoint}
        startingTime={startingTime}
        setStartingPoint={setStartingPoint}
        setArrivalPoint={setArrivalPoint}
        setStartingTime={setStartingTime}
        function={createRoom}
      />
      {isLogin && !isUsing ? (
        <TouchableOpacity
          style={styles.chevronBtn}
          onPress={() => {
            setCreateModalVisible(true);
          }}>
          <MaterialCommunityIcons
            name="chat-plus-outline"
            size={40}
            color="white"
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default ChattingRoomList;
