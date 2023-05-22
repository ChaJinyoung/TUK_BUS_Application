import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {StackProps} from '../../../../types/navigation/types';
import Loading from '../../UI/common/component/Loading';
import {styles} from './styles';

export const InitialScreen: React.FC<StackProps> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const storeData = async (number: Number) => {
    try {
      const data = {
        type: number,
      };
      setLoading(true);
      await AsyncStorage.setItem('initialData', JSON.stringify(data));
      console.log('등록 완료', data);
      setTimeout(() => {
        navigation.replace('Drawer');
      }, 500);
    } catch (error) {
      console.log('storeData error', error);
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('initialData');
      if (value) {
        navigation.replace('Drawer'); // asyncstorage에 설정 값 저장되어 있으면 해당 페이지 무시
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.Container}>
      <View style={styles.TopContainer}>
        <Text style={styles.font18}>안녕하세요</Text>
        <Text style={styles.font18}>어느 학교에 재학중이신가요?</Text>
      </View>
      <View style={styles.BottomContainer}>
        <View style={styles.SubContainer}>
          <TouchableOpacity
            style={styles.ImageCircle}
            onPress={() => {
              storeData(0);
            }}>
            <Image
              source={require('../../../assets/image/tukIcon.png')}
              resizeMode="stretch"
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.font24}>한국공학대학교</Text>
        </View>
        <View style={styles.SubContainer}>
          <TouchableOpacity
            style={styles.ImageCircle}
            onPress={() => {
              storeData(1);
            }}>
            <Image
              source={require('../../../assets/image/gtecIcon.png')}
              resizeMode="stretch"
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.font24}>경기과학기술대학교</Text>
        </View>
      </View>
    </View>
  );
};
