/* eslint-disable react-hooks/exhaustive-deps */
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
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
import Icons from 'react-native-vector-icons/Ionicons';
import {StackProps} from '../../../../types/navigation/types';
import {
  findpwAuthMail,
  findpwAuthMailCheck,
  findpwChangePassword,
} from '../../../api/serverAPI';
import styles from './styles';

const FindPasswordScreen: React.FC<StackProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [checkNum, setCheckNum] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwConfirm, setPwConfirm] = useState<string>('');
  const [isSecurePw, setIsSecurePw] = useState<boolean>(true);
  const [isSecurePwConfirm, setIsSecurePwConfirm] = useState<boolean>(true);
  const [pwIconName, setPwIconName] = useState<string>('eye');
  const [pwConfirmIconName, setPwConfirmIconName] = useState<string>('eye');
  const [univName, setUnivName] = useState<string>('TUK');
  const [id, setId] = useState<string>('');
  const [isConfirm, setIsConfirm] = useState<boolean>(false); // 메일 인증 여부
  const [isButton, setIsButton] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false); // 변경 조건이 맞으면 true
  const [buttonUseable, setButtonUseable] = useState<boolean>(true); // 메일버튼 활성화

  useEffect(() => {
    if (pw.length > 5) {
      setIsButton(true);
    } else setIsButton(false);
  }, [pw, pwConfirm]);

  useEffect(() => {
    if (email.length > 2) setButtonUseable(true);
    else setButtonUseable(false);
  }, [email]);

  useEffect(() => {
    if (email.length > 2) {
      setTimeout(() => {
        setButtonUseable(true);
      }, 10000);
    }
  }, [buttonUseable]); // 인증번호 전송 버튼 누르면 10초 비활성화

  const PressMailButton = () => {
    if (buttonUseable) {
      getFindpwAuthMail();
      setButtonUseable(false);
    }
  };

  const getFindpwAuthMail = async () => {
    try {
      const response = await findpwAuthMail({
        userEmail:
          email + (univName === 'TUK' ? '@tukorea.ac.kr' : '@gtec.ac.kr'),
      });
      console.log('Register.tsx ~ line 31 ~ response ', response);
      if (response.success) {
        Alert.alert('', '인증번호를 전송하였습니다.', [
          {
            text: '확인',
          },
        ]);
      }
    } catch (e) {
      console.log('Register.tsx ~ line 33 ~ error ', e);
    }
  };

  const getAuthNumCheck = async () => {
    try {
      const response = await findpwAuthMailCheck({
        userEmail:
          email + (univName === 'TUK' ? '@tukorea.ac.kr' : '@gtec.ac.kr'),
        mail_authNum: checkNum,
      });
      if (!response.success) {
        Alert.alert('', '인증번호가 일치하지 않습니다.', [
          {
            text: '확인',
          },
        ]);
      } else {
        setIsConfirm(true);
        setId(response.message.userID);
        console.log('isCheck: ' + isCheck);
        Alert.alert('', '이메일 인증에 성공하였습니다.', [
          {
            text: '확인',
          },
        ]);
      }
    } catch (e) {
      Alert.alert('', '인증번호가 일치하지 않습니다.', [
        {
          text: '확인',
        },
      ]);
      console.log('getAuthNumCheck ~ line 52 ~ error', e);
    }
  };

  const ChangePassword = async () => {
    if (isButton) {
      try {
        if (pw === pwConfirm) {
          const response: any = await findpwChangePassword({
            userID: id,
            userPW: pw,
            userEmail:
              email + (univName === 'TUK' ? '@tukorea.ac.kr' : '@gtec.ac.kr'),
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

  const checkChangePassword = async () => {
    if (isButton) {
      if (pw !== pwConfirm) {
        setIsCheck(false);
        Alert.alert('', '비밀번호가 일치하지 않습니다.', [
          {
            text: '확인',
          },
        ]);
        console.log('failed_1');
      } else {
        console.log('change');
        await ChangePassword(); // 성공 후 api 전송
        setIsCheck(true);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.Container}>
        {isConfirm ? ( // 인증여부에 따른 내용 변화
          <View style={styles.TopContainer}>
            <View style={styles.RowContainer}>
              <Icons
                name={'checkmark'}
                size={Dimensions.get('window').width / 14}
                color={'black'}></Icons>
              <Text style={styles.font18}>생성한 id는 {id}입니다.</Text>
            </View>
            <Text style={[styles.font24, {marginLeft: '12%'}]}>
              비밀번호를 변경하세요.
            </Text>
          </View>
        ) : (
          <View style={styles.TopContainer}>
            <Text style={styles.font18}>이메일 인증이 필요합니다.</Text>
          </View>
        )}
        {isConfirm ? (
          <View style={styles.BottomContainer}>
            <KeyboardAvoidingView
              style={styles.InfoContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.TextInputView}>
                <Icons
                  name={'lock-closed'}
                  size={Dimensions.get('window').width / 14}
                  color={'black'}></Icons>
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
                  <Icons
                    name={pwIconName}
                    size={Dimensions.get('window').width / 14}
                    color={'black'}></Icons>
                </TouchableOpacity>
              </View>
              <View style={styles.TextInputView}>
                <Icons
                  name={'lock-open'}
                  size={Dimensions.get('window').width / 14}
                  color={'black'}></Icons>
                <TextInput
                  style={[styles.TextInput, {marginRight: '3%'}]}
                  placeholder="비밀번호 확인"
                  autoCapitalize="none"
                  onChangeText={setPwConfirm}
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
                  <Icons
                    name={pwConfirmIconName}
                    size={Dimensions.get('window').width / 14}
                    color={'black'}></Icons>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <View style={{flex: 4}}></View>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.Button,
                  {
                    backgroundColor: isButton ? 'black' : 'grey',
                    flex: 1,
                    padding: '2%',
                  },
                ]}
                onPress={checkChangePassword}>
                <Text style={styles.font20white}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.BottomContainer}>
            <View style={styles.CheckContainer}>
              <Text style={styles.font24}>이메일 인증</Text>
              <View style={styles.TextInputView}>
                <Icons
                  name={'at-circle'}
                  size={Dimensions.get('window').width / 14}
                  color={'black'}></Icons>
                <TextInput
                  style={[styles.TextInput, {width: '25%'}]}
                  placeholder="Email"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                  editable={!isConfirm}
                />
                <Picker
                  style={styles.picker}
                  mode="dropdown"
                  selectedValue={univName}
                  onValueChange={itemValue => {
                    setUnivName(itemValue);
                  }}>
                  <Picker.Item
                    style={styles.font32}
                    label="tukorea.ac.kr"
                    value="TUK"
                  />
                  <Picker.Item
                    style={styles.font32}
                    label="gtec.ac.kr"
                    value="GTEC"
                  />
                </Picker>
                <TouchableOpacity
                  style={[
                    styles.Button,
                    {backgroundColor: buttonUseable ? 'black' : 'grey'},
                  ]}
                  onPress={PressMailButton}>
                  <Text style={styles.font24white}>전송</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.TextInputView}>
                <Icons
                  name={'checkmark-circle'}
                  size={Dimensions.get('window').width / 14}
                  color={'black'}></Icons>
                <TextInput
                  style={[styles.TextInput, {width: '20%'}]}
                  onChangeText={setCheckNum}
                  placeholder="인증번호"
                  autoCapitalize="none"
                  value={checkNum}
                  maxLength={4}
                  keyboardType="number-pad"
                />
                <TouchableOpacity
                  style={styles.Button}
                  onPress={getAuthNumCheck}>
                  <Text style={styles.font24white}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FindPasswordScreen;
