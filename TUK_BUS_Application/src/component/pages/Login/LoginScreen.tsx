import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackProps} from '../../../../types/navigation/types';
import {loginUser} from '../../../api/serverAPI';
import {styles} from './styles';

const LoginScreen: React.FC<StackProps> = ({navigation}) => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [isButton, setIsButton] = useState<boolean>(false);

  useEffect(() => {
    if (id.length > 4 && pw.length > 4) {
      setIsButton(true);
    } else setIsButton(false);
  }, [id, pw]); // id, password 글자 수로 버튼 활성화

  const getLoginData = async () => {
    try {
      const response: any = await loginUser({
        userID: id,
        userPW: pw,
      });
      console.log('~~~~~ success? ~~~~', response.data.success);
      return response;
    } catch (error) {
      console.error('~~~~ LoginScreen ~~~~ error', error);
    }
  }; // axios 통신

  const storeData = async (data: object) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
      console.log('등록 완료');
    } catch (error) {
      console.log('storeData error', error);
    }
  }; // asyncstorage에 JSON데이터 저장

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        console.log('id:' + userInfo.userID);
        console.log('pw:' + userInfo.userPW);
        console.log('token:' + userInfo.token.accessToken);
      }
    } catch (error) {
      console.log('~~~~ LoginScreen ~ AsyncStorage ~ error', error);
    }
  }; // asyncstorage에 저장된 데이터 확인(확인용)

  const onPressLoginButton = async () => {
    const loginResponse: any = await getLoginData();
    if (isButton && loginResponse.data.success) {
      const data = {
        userID: id,
        userPW: pw,
        token: loginResponse.data.token, // token = access + refresh token
      };
      storeData(data);
      loadData();
      navigation.goBack();
    } else {
      Alert.alert('', '로그인 정보가 잘못되었습니다.', [
        {
          text: '확인',
        },
      ]);
      console.log('onPressLoginButton ~~~ error');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.Container}>
        <View style={styles.TopContainer}>
          <Image
            source={require('../../../assets/image/appIcon.png')}
            resizeMode="stretch"
            style={styles.ImageWrapper}
          />
        </View>
        <KeyboardAvoidingView
          style={styles.MiddleContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput
            style={styles.TextInput}
            placeholder="사용자 ID 입력"
            autoCapitalize="none"
            autoFocus
            onChangeText={setId}
            value={id}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="password 입력"
            autoCapitalize="none"
            onChangeText={setPw}
            value={pw}
            autoFocus
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <View style={styles.BottomContainer}>
          <TouchableOpacity
            style={[
              styles.Button,
              {backgroundColor: isButton ? 'black' : 'grey'},
            ]}
            onPress={onPressLoginButton}>
            <Text style={styles.fonts8}>로그인</Text>
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.InvisibleView}
              onPress={() => {
                navigation.navigate('계정생성');
              }}>
              <Text style={styles.fonts0}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.InvisibleView}
              onPress={() => {
                navigation.navigate('비밀번호찾기');
              }}>
              <Text style={styles.fonts0}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
