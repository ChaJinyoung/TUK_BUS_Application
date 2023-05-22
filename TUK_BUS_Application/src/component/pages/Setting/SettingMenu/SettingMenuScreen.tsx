import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SettingStackProps} from '../../../../../types/navigation/types';
import styles from './styles';

const SettingMenuScreen: React.FC<SettingStackProps> = ({navigation}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    onLoad();
  });

  const onLoad = () => {
    navigation.addListener('focus', () => {
      checkLoginStatus();
      console.log('open');
    });
  };

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        setIsLogin(true);
        // 로그인 성공 시 async storage에 저장된 토큰의 userName 불러옴
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.SelectBox}
        onPress={() => {
          if (isLogin)
            navigation.navigate('사용자설정'); // drawer 외부의 stack 사용
          else {
            Alert.alert('', '로그인이 필요한 기능입니다.', [
              {
                text: '확인',
              },
            ]);
          }
        }}>
        <Text style={styles.font20}>사용자 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.SelectBox}
        onPress={() => {
          if (isLogin)
            navigation.navigate('차단목록'); // drawer 외부의 stack 사용
          else {
            Alert.alert('', '로그인이 필요한 기능입니다.', [
              {
                text: '확인',
              },
            ]);
          }
        }}>
        <Text style={styles.font20}>사용자 차단 목록</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.SelectBox}
        onPress={() => {
          navigation.navigate('학교설정'); // drawer 외부의 stack 사용
        }}>
        <Text style={styles.font20}>학교 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.SelectBox}
        onPress={() => {
          if (isLogin) navigation.navigate('건의');
          else {
            Alert.alert('', '로그인이 필요한 기능입니다.', [
              {
                text: '확인',
              },
            ]);
          }
        }}>
        <Text style={styles.font20}>건의하기</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.SelectBox}
        onPress={() => {
          AsyncStorage.clear(); // 데이터 삭제 누르면 async 전체 삭제(로그인 + 학교 정보) => 테스트용
        }}>
        <Text style={styles.font20}>데이터 삭제</Text>
      </TouchableOpacity> */}
    </View>
  );
};
export default SettingMenuScreen;
