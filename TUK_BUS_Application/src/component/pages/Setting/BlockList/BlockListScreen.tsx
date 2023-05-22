/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {SettingStackProps} from '../../../../../types/navigation/types';
import {blockUserList, unblockUser} from '../../../../api/serverAPI';
import Loading from '../../../UI/common/component/Loading';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BlockListScreen: React.FC<SettingStackProps> = ({navigation}) => {
  const [blockList, setBlockList] = useState<string[]>([]);
  const [id, setId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getBlockUserList();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      setBlockList([]);
      setId(-1);
    };
  }, []);

  const postUnblockUser = async () => {
    console.log('userID', blockList[id]);
    if (id !== -1) {
      try {
        const response: any = await unblockUser({
          blockedUserID: blockList[id],
        });
        if (response.success) {
          Alert.alert('', '해당 사용자의 차단을 해제하였습니다.', [
            {
              text: '확인',
            },
          ]);
          navigation.goBack();
        }
      } catch (error) {
        console.error('~~~~ postUnblockUser ~~~~ error', error);
      }
    }
  }; // 차단해제

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => setId(index)}>
          {index === id ? (
            <MaterialIcons
              name="check-box"
              size={Dimensions.get('window').width / 16}
              color="black"
            />
          ) : (
            <MaterialIcons
              name="check-box-outline-blank"
              size={Dimensions.get('window').width / 16}
              color="black"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.info}>{item}</Text>
      </View>
    );
  };

  const getBlockUserList = async () => {
    try {
      const response = await blockUserList();
      console.log('getChattingRoom response', response);
      if (response.message) {
        response.message.blockUserList.map((item: string) => {
          blockList.push(item.blockedUserID);
        });
      } else {
        setBlockList([]);
      }
      console.log(blockList);
    } catch (e) {
      console.log('ChattingRoomListScreen ~ getChattingRooms ~ error ~', e);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <FlatList
            renderItem={renderItem}
            keyExtractor={(item, index) => '' + index}
            data={blockList}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.Button} onPress={postUnblockUser}>
            <Text style={styles.font20}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default BlockListScreen;
