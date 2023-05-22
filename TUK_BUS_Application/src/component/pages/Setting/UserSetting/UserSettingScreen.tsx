import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackProps} from '../../../../../types/navigation/types';
import {
  changePassword,
  checkPassword,
  withdrawUser,
} from '../../../../api/serverAPI';
import {WithDrawModal} from '../../../modals/withdrawModal/WithDrawModal';
import styles from './styles';

const UserSettingScreen: React.FC<StackProps> = ({navigation}) => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [checkedPassword, setCheckedPassword] = useState<string>('');
  const [userId, setUserId] = useState<string>('name');
  const [pw, setPw] = useState<string>('');
  const [pwConfirm, setPwConfirm] = useState<string>('');
  const [isSecurePw, setIsSecurePw] = useState<boolean>(true);
  const [isSecurePwConfirm, setIsSecurePwConfirm] = useState<boolean>(true);
  const [pwIconName, setPwIconName] = useState<string>('eye');
  const [pwConfirmIconName, setPwConfirmIconName] = useState<string>('eye');
  const [isButton, setIsButton] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (pw.length > 4 && pwConfirm.length > 4) {
      setIsButton(true);
    } else setIsButton(false);
  }, [pw, pwConfirm]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        setUserId(userInfo.userID);
        console.log('userId:' + userInfo.userID);
      }
    } catch (error) {
      console.log('~~~~ LoginScreen ~ AsyncStorage ~ error', error);
    }
  };

  const CheckPassword = async () => {
    try {
      const response: any = await checkPassword({
        userPW: checkedPassword,
      });
      console.log('~~~~~ success? ~~~~', response.success);
      if (response.success) {
        setIsCheck(true);
        Alert.alert('', '인증을 성공하였습니다.', [
          {
            text: '확인',
          },
        ]);
      } else {
        Alert.alert('', '비밀번호가 일치하지 않습니다.', [
          {
            text: '확인',
          },
        ]);
        setIsCheck(false);
      }
    } catch (error) {
      console.error('~~~~ CheckPassword ~~~~ error', error);
    }
  };

  const ChangePassword = async () => {
    if (isButton) {
      try {
        if (pw === pwConfirm) {
          const response: any = await changePassword({
            userPW: pw,
          });
          console.log('~~~~~ ChangePassword success? ~~~~', response.success);
          if (response.success) {
            navigation.goBack();
            Alert.alert('', '비밀번호를 성공적으로 변경하였습니다.', [
              {
                text: '확인',
              },
            ]);
          }
        } else {
          Alert.alert('', '비밀번호가 일치하지 않습니다.', [
            {
              text: '확인',
            },
          ]);
        }
      } catch (error) {
        console.error('~~~~ ChangePassword ~~~~ error', error);
      }
    }
  };

  const getWithDrawUser = async () => {
    try {
      const response = await withdrawUser();
      console.log('getWithDrawUser response', response);
      if (response.success) {
        AsyncStorage.removeItem('userInfo');
        navigation.replace('Drawer');
        Alert.alert('', '회원 탈퇴가 완료되었습니다.', [
          {
            text: '확인',
          },
        ]);
      }
    } catch (e) {
      console.log('~ getWithDrawUser ~ error ~', e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.Container}>
        {isCheck ? (
          <View style={styles.mainContainer}>
            <View style={styles.TopContainer}>
              <View style={styles.SideContainer}>
                <Text style={styles.font20}>비밀번호 재설정</Text>
                <View style={styles.RowContainer}>
                  <Ionicons
                    name={'person-circle'}
                    size={Dimensions.get('window').width / 14}
                    color={'black'}></Ionicons>
                  <Text style={styles.font20}> {userId}</Text>
                </View>
                <View style={styles.TextInputView}>
                  <Ionicons
                    name={'lock-closed'}
                    size={Dimensions.get('window').width / 14}
                    color={'black'}></Ionicons>
                  <TextInput
                    style={[styles.TextInput, {marginRight: '3%'}]}
                    placeholder="영문, 숫자 포함(6~12자)"
                    onChangeText={setPw}
                    autoCapitalize="none"
                    value={pw}
                    secureTextEntry={isSecurePw}
                    maxLength={12}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (isSecurePw) {
                        setIsSecurePw(false);
                        setPwIconName('eye-off');
                      } else {
                        setIsSecurePw(true);
                        setPwIconName('eye');
                      }
                    }}>
                    <Ionicons
                      name={pwIconName}
                      size={Dimensions.get('window').width / 14}
                      color={'black'}></Ionicons>
                  </TouchableOpacity>
                </View>
                <View style={styles.TextInputView}>
                  <Ionicons
                    name={'lock-open'}
                    size={Dimensions.get('window').width / 14}
                    color={'black'}></Ionicons>
                  <TextInput
                    style={[styles.TextInput, {marginRight: '3%'}]}
                    placeholder="비밀번호 확인"
                    onChangeText={setPwConfirm}
                    autoCapitalize="none"
                    value={pwConfirm}
                    secureTextEntry={isSecurePwConfirm}
                    maxLength={12}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (isSecurePwConfirm) {
                        setIsSecurePwConfirm(false);
                        setPwConfirmIconName('eye-off');
                      } else {
                        setIsSecurePwConfirm(true);
                        setPwConfirmIconName('eye');
                      }
                    }}>
                    <Ionicons
                      name={pwConfirmIconName}
                      size={Dimensions.get('window').width / 14}
                      color={'black'}></Ionicons>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  onPress={ChangePassword}
                  style={[
                    styles.Button,
                    {backgroundColor: isButton ? 'black' : 'grey'},
                  ]}>
                  <Text style={styles.font18white}>저장</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Text style={[styles.font28, {color: 'red'}]}>회원탈퇴</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.TopContainer}>
              <Text style={styles.font20}>비밀번호를 확인합니다.</Text>
              <TextInput
                style={[styles.TextInput, {width: '60%'}]}
                placeholder="password 입력"
                onChangeText={setCheckedPassword}
                autoCapitalize="none"
                value={checkedPassword}
                autoFocus
                secureTextEntry></TextInput>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={CheckPassword} style={styles.Button}>
                <Text style={styles.font18white}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <WithDrawModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          function={getWithDrawUser}></WithDrawModal>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default UserSettingScreen;
