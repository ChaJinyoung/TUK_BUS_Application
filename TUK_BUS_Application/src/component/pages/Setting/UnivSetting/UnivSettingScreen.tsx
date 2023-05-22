import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SettingStackProps} from '../../../../../types/navigation/types';
import styles from './styles';
import {CommonActions, StackActions} from '@react-navigation/native';

const UnivSettingScreen: React.FC<SettingStackProps> = ({navigation}) => {
  const [id, setId] = useState<number>(-1);
  const [isSelect, setIsSelect] = useState<boolean>(false);

  const storeData = async (univId: Number) => {
    try {
      const data = {
        type: univId,
      };
      AsyncStorage.removeItem('initialData');
      await AsyncStorage.setItem('initialData', JSON.stringify(data));
      console.log('등록 완료', data);
      navigation.dispatch(
        CommonActions.reset({
          routes: [{name: '제1캠퍼스'}],
        }),
      );
      navigation.navigate('설정메뉴');
    } catch (error) {
      console.log('storeData error', error);
    }
  };

  const PressButton = (univId: number) => {
    setId(univId);
    setIsSelect(true);
  };

  const SaveInfo = () => {
    if (isSelect) {
      storeData(id);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.TopContainer}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => {
              PressButton(0);
            }}
            style={[
              styles.ImageCircle,
              {
                borderColor: id === 0 ? '#0055ff' : '#000000',
                borderWidth: id === 0 ? 2 : 1,
              },
            ]}>
            <Image
              source={require('../../../../assets/image/tukIcon.png')}
              resizeMode="stretch"
              style={styles.image}
            />
          </TouchableOpacity>
          <Text
            style={[styles.font28, {color: id == 0 ? '#0055ff' : '#000000'}]}>
            한국공학대학교
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => {
              PressButton(1);
            }}
            style={[
              styles.ImageCircle,
              {
                borderColor: id === 1 ? '#0055ff' : '#000000',
                borderWidth: id === 1 ? 2 : 1,
              },
            ]}>
            <Image
              source={require('../../../../assets/image/gtecIcon.png')}
              resizeMode="stretch"
              style={styles.image}
            />
          </TouchableOpacity>
          <Text
            style={[styles.font28, {color: id == 1 ? '#0055ff' : '#000000'}]}>
            경기과학기술대학교
          </Text>
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <TouchableOpacity onPress={SaveInfo} style={styles.Button}>
          <Text style={styles.font16white}>저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UnivSettingScreen;
