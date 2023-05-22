/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  checkId,
  loginUser,
  registerAuthMail,
  registerAuthMailCheck,
  registerUser,
} from '../../../api/serverAPI';
import {TermsModal} from '../../modals/termsModal/TermsModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const RegisterScreen: React.FC<StackProps> = ({navigation}) => {
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
  const [isCheck, setIsCheck] = useState<boolean>(false); // 계정 생성 조건이 맞으면 true
  const [isIdcheck, setIsIdcheck] = useState<boolean>(false); // id 중복 여부
  const [buttonUseable, setButtonUseable] = useState<boolean>(true); // 메일버튼 활성화

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isTermsCheck, setIsTermsCheck] = useState<boolean>(false); // 약관 동의 여부

  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (
      id.length > 5 &&
      pw.length > 5 &&
      isIdcheck // 글자 수, 중복 체크 확인 후 버튼 활성화
    ) {
      setIsButton(true);
    } else setIsButton(false);
  }, [id, pw, univName, isIdcheck]);

  useEffect(() => {
    if (id.length > 5) {
      // id 길이 조건에 맞았을 때부터 중복확인
      getidCheck();
    } else {
      setIsIdcheck(false);
    }
  }, [id]);

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
    if (buttonUseable && !isConfirm) {
      getRegisterAuthMail();
      setButtonUseable(false);
    }
  };

  const AuthCheck = () => {
    if (isConfirm && isTermsCheck) setIsAuth(true);
    else {
      setIsAuth(false);
      Alert.alert('', '메일 인증 또는 약관에 동의해주세요.', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const getRegisterAuthMail = async () => {
    try {
      const response = await registerAuthMail({
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
      } else {
        Alert.alert('', '이미 가입된 메일입니다.', [
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
      const response = await registerAuthMailCheck({
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

  const getRegisterUser = async () => {
    try {
      const response: any = await registerUser({
        userID: id,
        userPW: pw,
        univNAME: univName,
        userEmail:
          email + (univName === 'TUK' ? '@tukorea.ac.kr' : '@gtec.ac.kr'),
      });
      if (response.success) {
        setIsCheck(true);
        RegisterLogin();
      }
    } catch (error) {
      console.error('~~~~ RegisterUser ~~~~ error', error);
    }
  }; // axios 통신

  const getidCheck = async () => {
    try {
      const response: any = await checkId({
        userID: id,
      });
      setIsIdcheck(response);
      return response;
    } catch (error) {
      console.error('~~~~ IdCheck ~~~~ error', error);
    }
  };

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
  };

  const storeData = async (data: object) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
      console.log('등록 완료');
    } catch (error) {
      console.log('storeData error', error);
    }
  };

  const checkRegister = async () => {
    try {
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
          await getRegisterUser(); // 성공 후 api 전송
        }
      }
    } catch (error) {
      console.error('checkRegister ~ error ~ line 190 ~ ', error);
    }
  };

  const RegisterLogin = async () => {
    const loginResponse = await getLoginData();
    if (loginResponse.data.success) {
      const data = {
        userID: id,
        userPW: pw,
        token: loginResponse.data.token, // token {univName, access, refresh token}
      };
      storeData(data);
      console.log('register OK');
      Alert.alert('', '가입에 성공하였습니다.', [
        {
          text: '확인',
        },
      ]);
      navigation.replace('Drawer');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.Container}>
        {isAuth ? ( // 인증여부에 따른 내용 변화
          <View style={styles.TopContainer}>
            <View style={styles.RowContainer}>
              <Icons
                name={'checkmark'}
                size={Dimensions.get('window').width / 14}
                color={'black'}
              />
              <Text style={styles.font18}>이메일 인증이 완료되었습니다.</Text>
            </View>
            <Text style={[styles.font24, {marginLeft: '12%'}]}>
              생성할 계정 정보를 입력해주세요.
            </Text>
          </View>
        ) : (
          <View style={styles.TopContainer}>
            <Text style={styles.font18}>이메일 인증이 필요합니다.</Text>
            <Text style={styles.font24}>채팅 기능은 계정이 필요합니다.</Text>
          </View>
        )}
        {isAuth ? (
          <View style={styles.BottomContainer}>
            <KeyboardAvoidingView
              style={styles.InfoContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.TextInputView}>
                <Icons
                  name={'at-circle'}
                  size={Dimensions.get('window').width / 14}
                  color={'black'}
                />
                <TextInput
                  style={[styles.TextInput, {width: '30%'}]}
                  placeholder="TUK mail"
                  onChangeText={setEmail}
                  value={email}
                  autoCapitalize="none"
                  editable={!isConfirm}
                />
                {univName === 'TUK' ? (
                  <Text style={styles.font24}>@ tukorea.ac.kr</Text>
                ) : (
                  <Text style={styles.font24}>@ gtec.ac.kr</Text>
                )}
              </View>
              <View style={styles.TextInputView}>
                <Icons
                  name={'person'}
                  size={Dimensions.get('window').width / 14}
                  color={'black'}
                />
                <TextInput
                  style={[styles.TextInput, {marginRight: 5}]}
                  placeholder="ID (6~12자)"
                  autoCapitalize="none"
                  onChangeText={setId}
                  value={id}
                  maxLength={12}
                />
                {isIdcheck ? (
                  <Text style={[styles.font24, {color: 'blue'}]}>
                    사용 가능한 ID.
                  </Text>
                ) : (
                  <Text style={[styles.font24, {color: 'red'}]}>
                    사용할 수 없는 ID.
                  </Text>
                )}
              </View>
              <View style={styles.TextInputView}>
                <Icons
                  name={'lock-closed'}
                  size={Dimensions.get('window').width / 14}
                  color={'black'}
                />
                <TextInput
                  style={[styles.TextInput, {marginRight: '3%'}]}
                  placeholder="영문, 숫자 포함(6~12자)"
                  autoCapitalize="none"
                  onChangeText={setPw}
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
                    color={'black'}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.TextInputView}>
                <Icons
                  name={'lock-open'}
                  size={Dimensions.get('window').width / 14}
                  color={'black'}
                />
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
                    color={'black'}
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <View style={{flex: 3}} />
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
                onPress={checkRegister}>
                <Text style={styles.font20white}>계정 생성</Text>
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
                  color={'black'}
                />
                <TextInput
                  style={[styles.TextInput, {width: '25%'}]}
                  placeholder="Email"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                  editable={!isConfirm}
                />
                <Picker
                  style={
                    Platform.OS === 'ios'
                      ? styles.ios_picker
                      : styles.android_picker
                  }
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
                  color={'black'}
                />
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
              <View style={styles.rowContainer}>
                <Text style={styles.font24}>약관을 읽고 동의합니다.</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!isTermsCheck) setModalVisible(true);
                  }}>
                  {isTermsCheck ? (
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
              </View>
            </View>
            <View style={{flex: 2}} />
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.Button,
                  {
                    flex: 1,
                    padding: '2%',
                  },
                ]}
                onPress={AuthCheck}>
                <Text style={styles.font20white}>다음</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TermsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          IsTermsCheck={isTermsCheck}
          setIsTermsCheck={setIsTermsCheck}
          function={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
