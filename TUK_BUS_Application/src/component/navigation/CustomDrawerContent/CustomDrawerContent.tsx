/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {logoutUser} from '../../../api/serverAPI';
import styles from './styles';

export const CustomDrawerContent = (props: any) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [type, setType] = useState<number>(-1);
  const [uri, setUri] = useState<any>('');

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (type == 1) setUri(require('../../../assets/image/gtecIcon.png'));
    else if (type == 0) setUri(require('../../../assets/image/tukIcon.png'));
  }, [type]);

  const onLoad = () => {
    props.navigation.addListener('focus', () => {
      checkLoginStatus();
      checkTypeStatus();
      console.log('open');
    });
  };

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        setIsLogin(true);
        setUserId(userInfo.userID);
        // 로그인 성공 시 async storage에 저장된 토큰의 userId 불러옴
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const getLogoutUser = async () => {
    try {
      const response = await logoutUser();
      console.log('getLogoutUser response', response);
    } catch (e) {
      console.log('~ getLogoutUser ~ error ~', e);
    }
  };

  const checkTypeStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('initialData');
      if (value) {
        const initialData = JSON.parse(value);
        setType(initialData.type);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  return (
    /*loading ? <Loading/> :*/ <DrawerContentScrollView {...props}>
      <View style={styles.TopContainer}>
        <View style={styles.TextContainer}>
          {isLogin ? ( // 로그인 상태일경우 닉네임, 아닐경우 Not Login
            <Text style={styles.font20}>{userId}</Text>
          ) : (
            <Text style={[styles.font20, {color: '#dddddd'}]}>비회원</Text>
          )}
          {type == 0 ? ( // 로그인 상태일경우 닉네임, 아닐경우 Not Login
            <Text style={[styles.font26, {color: '#000888'}]}>
              한국공학대학교
            </Text>
          ) : (
            <Text style={[styles.font26, {color: '#005500'}]}>
              경기과학기술대학교
            </Text>
          )}
        </View>
        <View style={styles.Profile}>
          <Image source={uri} resizeMode="stretch" style={styles.Image} />
        </View>
      </View>
      <View style={styles.MiddleContainer}>
        <DrawerItem
          label="제 1캠퍼스"
          icon={() => (
            <Icons
              name={'school'}
              size={Dimensions.get('window').width / 20}
              color={'black'}></Icons>
          )}
          labelStyle={styles.font28}
          style={styles.drawerWrapper}
          onPress={() => {
            props.navigation.navigate('제1캠퍼스');
          }}
        />
        <DrawerItem
          label="전체 시간표"
          icon={() => (
            <Icons
              name={'time'}
              size={Dimensions.get('window').width / 20}
              color={'black'}></Icons>
          )}
          labelStyle={styles.font28}
          style={styles.drawerWrapper}
          onPress={() => {
            props.navigation.navigate('전체시간표');
          }}
        />
        <DrawerItem
          label="설정"
          icon={() => (
            <Icons
              name={'settings'}
              size={Dimensions.get('window').width / 20}
              color={'black'}></Icons>
          )}
          labelStyle={styles.font28}
          style={styles.drawerWrapper}
          onPress={() => {
            props.navigation.navigate('설정');
          }}
        />
      </View>
      <View style={styles.BottomContainer}>
        {isLogin ? (
          <TouchableOpacity
            style={styles.loginWrapper}
            onPress={() => {
              // 로그인 상태가 아닐경우 로그아웃 버튼 X
              getLogoutUser();
              AsyncStorage.removeItem('userInfo');
              props.navigation.navigate('로그인');
            }}>
            <Icons
              name={'log-out-outline'}
              size={Dimensions.get('window').width / 18}
              color={'black'}></Icons>
            <Text style={[styles.font22, {marginLeft: '3%'}]}>로그아웃</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginWrapper}
            onPress={() => {
              props.navigation.navigate('로그인');
            }}>
            <Icons
              name={'log-in-outline'}
              size={Dimensions.get('window').width / 18}
              color={'black'}></Icons>
            <Text style={[styles.font22, {marginLeft: '3%'}]}>로그인</Text>
          </TouchableOpacity>
        )}
      </View>
    </DrawerContentScrollView>
  );
};
