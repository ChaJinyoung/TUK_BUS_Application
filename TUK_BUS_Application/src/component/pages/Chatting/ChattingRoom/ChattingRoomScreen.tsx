/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import io from 'socket.io-client';
import {socket_ip} from '../../../../../.env/auth';
import {
  blockUser,
  loadMessage,
  messageChattingRoom,
  outChattingRoom,
  reportUser,
} from '../../../../api/serverAPI';
import {PushModal} from '../../../modals/pushModal/PushModal';
import {ReportModal} from '../../../modals/reportModal/ReportModal';
import Loading from '../../../UI/common/component/Loading';
import {styles} from './styles';

// export type ChattingRoomProp = StackScreenProps<RootStackParam, 'ChattingRoom'>;

const ChattingRoom = ({navigation, route}: any) => {
  const [message, setMessage] = useState('');
  const [chatting, setChatting] = useState<object[]>([]);
  const scrollRef = useRef<any>();
  const socket = useRef<any>();
  const [userId, setUserId] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const [pushModalVisible, setPushModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [scrollToEnd, setScrollToEnd] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  var indexMessage: number = 0;

  useEffect(() => {
    setLoading(true);
    LoadData();
    postLoadMessage();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const LoadData = async () => {
    AsyncStorage.getItem('userInfo').then((response: any) => {
      const userInfo = JSON.parse(response);
      socket.current = io(socket_ip, {
        auth: {
          token: userInfo.token.accessToken,
          //roomID 서버에서 준거
          roomID: route.params.roomID,
        },
      }).connect();

      console.log(
        '~~~~socket io~~~~~',
        userInfo.token.accessToken,
        route.params.roomID,
      );
      // socket.current.on('callMsg', (e: object[]) => {
      //   setChatting([]);
      //   e.map(item => {
      //     chatting.push(item);
      //     console.log(item);
      //   });
      //   console.log('callMsg', e);
      //   console.log('callMsg chatting', chatting);
      // });
      socket.current.on('checkErr', (e: string) => {
        Alert.alert('', e, [
          {
            text: '확인',
          },
        ]);
        navigation.goBack();
      });

      socket.current.on('in', (e: string) => {
        setScrollToEnd(true);
        console.log('in', e);
        setChatting(prev => [...prev, {type: 'in', userID: e}]);
        console.log('in chatting', chatting);
      });

      socket.current.on('chat message', (e: object) => {
        setScrollToEnd(true);
        setChatting(prev => [...prev, e]);
        console.log('chat msg', e);
        console.log('chat msg chatting', chatting);
      });

      socket.current.on('out', (e: string) => {
        console.log('out', e);
        setScrollToEnd(true);
        setChatting(prev => [...prev, {type: 'out', userID: e}]);
        console.log('out chatting', chatting);
      });
    });

    return () => {
      socket.current.disconnect();
      setChatting([]);
    };
  };

  const onSubmit = async () => {
    if (message !== '') {
      try {
        const response: any = await messageChattingRoom({
          roomID: route.params.roomID,
          message: message,
          time: String(dayjs().format('HH:mm')),
        });
        console.log('~~~~~ success? ~~~~', response.success);
        if (response.success) {
          socket.current.emit('chat message', {
            userID: route.params.name,
            message: message,
            time: dayjs().format('HH:mm'),
          });
          console.log('chat: ', route.params.name, message);
          console.log('send chatting: ', chatting);
        }
      } catch (error) {
        console.error('~~~~ messageChatRoom ~~~~ error', error);
      }
    }
    setMessage('');
  };

  const renderItem = ({item}: any) => {
    return item.type ? (
      item.type === 'in' ? (
        <TouchableWithoutFeedback>
          <View style={styles.infoWrapper}>
            <Text style={styles.chattingText}>
              {item.userID}님이 입장했습니다.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback>
          <View style={styles.infoWrapper}>
            <Text style={styles.chattingText}>
              {item.userID}님이 퇴장했습니다.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    ) : item.userID === null ? (
      <TouchableWithoutFeedback>
        <View style={styles.infoWrapper}>
          <Text style={styles.chattingText}>{item.message}</Text>
        </View>
      </TouchableWithoutFeedback>
    ) : item.userID === route.params.name ? (
      <TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
          }}>
          <Text>{item.time}</Text>
          <View style={styles.myChatWrapper}>
            <Text style={styles.chattingText}>{item.message}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <View style={{marginLeft: 10, flexDirection: 'row'}}>
        <View>
          <Text style={{marginLeft: 5}}>{item.userID}</Text>
          <Pressable
            // 상대 메시지 pressable 적용 / longPress시 pushModal 활성화
            onLongPress={() => {
              setUserId(item.userID);
              setPushModalVisible(true);
              console.log('~~~long press~~~');
            }}>
            <View style={styles.otherChatWrapper}>
              <Text style={styles.chattingText}>{item.message}</Text>
            </View>
          </Pressable>
        </View>

        <Text style={{alignSelf: 'flex-end'}}>{item.time}</Text>
      </View>
    );
  };

  const postLoadMessage = async () => {
    // 메시지 불러오기
    try {
      const response: any = await loadMessage({
        roomID: route.params.roomID,
        indexMessage: indexMessage,
      });
      console.log('~~~~~ postLoadMessage success? ~~~~', response.success);
      if (response.success) {
        if (!chatting.length) {
          response.message.map((item: any) => {
            chatting.push(item);
            console.log(item);
          });
          setScrollToEnd(true);
        } else {
          response.message.map((item: any) => {
            chatting.unshift(item);
            console.log(item);
          });
          setScrollToEnd(false);
        }
        console.log(indexMessage);
        setChatting([...chatting]);
      }
    } catch (error) {
      console.error('~~~~ postLoadMessage ~~~~ error', error);
    }
  };

  const postBlockUser = async () => {
    // 사용자 차단 api 함수
    try {
      const response: any = await blockUser({
        blockedUserID: userId,
      });
      console.log('~~~~~ postBlockUser success? ~~~~', response.success);
      OutChatRoom();
    } catch (error) {
      console.error('~~~~ postBlockUser ~~~~ error', error);
    }
  };

  const BlockUserAlert = () => {
    // 사용자 차단 함수 (alert 및 선택 여부에 따라 api 함수 호츨)
    setPushModalVisible(false);
    Alert.alert(
      '',
      '차단하시겠습니까?\n차단 후 채팅방을 나가며 사용자가 이용중인 채팅방을 확인할 수 없습니다.',
      [
        {
          text: '확인',
          onPress: () => postBlockUser(),
        },
        {
          text: '취소',
        },
      ],
    );
  };

  const ReportModalOn = () => {
    // 사용자 신고 Modal
    setPushModalVisible(false);
    setReportModalVisible(true);
  };

  const postReportUser = async () => {
    // 사용자 신고 api 함수
    try {
      const response: any = await reportUser({
        reportedUserID: userId,
        reportedReason: reason,
      });
      console.log('report info', userId, reason);
      if (response.success) {
        Alert.alert('', '신고를 완료하였습니다.', [
          {
            text: '확인',
          },
        ]);
      }
      console.log('~~~~~ postReportUser success? ~~~~', response.success);
    } catch (error) {
      console.error('~~~~ postReportUser ~~~~ error', error);
    }
  };

  const OutChatRoom = async () => {
    try {
      const response: any = await outChattingRoom({
        roomID: route.params.roomID,
      });
      console.log('~~~~~ OutChatRoom success? ~~~~', response.success);
      if (response.success) {
        socket.current.disconnect();
        console.log('outChatRoom');
        navigation.goBack();
      }
    } catch (error) {
      console.error('~~~~ OutChatRoom ~~~~ error', error);
    }
  };

  const ExitRoomAlert = () => {
    console.log(indexMessage);
    Alert.alert(
      '',
      '채팅방을 나가시겠습니까?\n나가기를 하면 채팅내역이 모두 삭제됩니다.',
      [
        {
          text: '확인',
          onPress: OutChatRoom,
        },
        {
          text: '취소',
        },
      ],
    );
  };

  const scrollRefFunction = () => {
    if (scrollToEnd) {
      return scrollRef.current.scrollToEnd();
    }
    return scrollRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const onRefresh = React.useCallback(async () => {
    if (chatting.length) indexMessage = chatting[0].indexMessage;
    setRefreshing(true);
    await postLoadMessage();
    setTimeout(() => {
      setRefreshing(false);
    }, 300);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <PushModal
          modalVisible={pushModalVisible}
          setModalVisible={setPushModalVisible}
          firstFunction={BlockUserAlert}
          secondFunction={ReportModalOn}></PushModal>

        <ReportModal
          modalVisible={reportModalVisible}
          setModalVisible={setReportModalVisible}
          userName={userId}
          reason={reason}
          setReason={setReason}
          function={postReportUser}></ReportModal>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="arrow-back"
              size={Dimensions.get('window').height / 28}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{route.params.startingPoint} </Text>
            <AntDesign
              name="arrowright"
              size={Dimensions.get('window').height / 55}
              color="black"
            />
            <Text style={styles.title}> {route.params.arrivalPoint}</Text>
          </View>
          <TouchableOpacity style={styles.exitIcon} onPress={ExitRoomAlert}>
            <Icon
              name="exit-to-app"
              size={Dimensions.get('window').height / 28}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.listContainer}>
            <FlatList
              style={{flex: 1}}
              renderItem={renderItem}
              keyExtractor={(item, index) => '' + index}
              data={chatting}
              ref={scrollRef}
              onContentSizeChange={() => scrollRefFunction()}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={'black'}
                /> // refreshControl 적용
              }
            />
          </View>
          <View style={styles.sendContainer}>
            <TextInput
              placeholder="message"
              value={message}
              autoCapitalize="none"
              onChangeText={e => setMessage(e)}
              onSubmitEditing={onSubmit}
              style={styles.message}></TextInput>
            <TouchableOpacity style={styles.sendButton} onPress={onSubmit}>
              <Icon
                name="send"
                size={Dimensions.get('window').height / 28}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChattingRoom;
