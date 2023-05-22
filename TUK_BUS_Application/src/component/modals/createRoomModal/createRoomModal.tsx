/* eslint-disable react-hooks/exhaustive-deps */
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {Modal, Platform, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  startingPoint: string;
  arrivalPoint: string;
  startingTime: string;
  setStartingPoint: any;
  setArrivalPoint: any;
  setStartingTime: any;
  function: any;
}

export const CreateRoomModal = (props: Props) => {
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const [index, setIndex] = useState<number>(0);

  const onPressNext = () => {
    setIndex(index + 1);
  };

  const onPressBefore = () => {
    setIndex(index - 1);
  };

  useEffect(() => {
    props.setStartingTime(`${hour}:${minute}`);
    console.log('time: ', props.startingTime);
  }, [hour, minute]);

  useEffect(() => {
    props.setStartingPoint('정왕역');
    props.setArrivalPoint('한국공학대');
    props.setStartingTime(`${hour}:${minute}`);
    setIndex(0);
    // default 값 적용(적용 안하면 picker item 선택 안할 시 공백 출력)
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.topContainer}
              onPress={() => {
                props.setModalVisible(false);
                setIndex(0);
              }}>
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.middleContainer}>
            {index === 0 && (
              <View style={styles.rowContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.font24}>출발지: </Text>
                </View>
                <Picker
                  style={
                    Platform.OS === 'ios'
                      ? styles.ios_picker
                      : styles.android_picker
                  }
                  mode="dropdown"
                  selectedValue={props.startingPoint}
                  onValueChange={itemValue => {
                    props.setStartingPoint(itemValue);
                  }}>
                  <Picker.Item
                    style={styles.font24}
                    label="정왕역"
                    value="정왕역"
                  />
                  <Picker.Item
                    style={styles.font24}
                    label="한국공학대"
                    value="한국공학대"
                  />
                  <Picker.Item
                    style={styles.font24}
                    label="경기과학기술대"
                    value="경기과학기술대"
                  />
                  <Picker.Item
                    style={styles.font24}
                    label="기타"
                    value="기타"
                  />
                </Picker>
              </View>
            )}
            {index === 1 && (
              <View style={styles.rowContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.font24}>목적지: </Text>
                </View>
                <Picker
                  style={
                    Platform.OS === 'ios'
                      ? styles.ios_picker
                      : styles.android_picker
                  }
                  mode="dropdown"
                  selectedValue={props.arrivalPoint}
                  onValueChange={itemValue => {
                    props.setArrivalPoint(itemValue);
                  }}>
                  <Picker.Item
                    style={styles.font24}
                    label="한국공학대"
                    value="한국공학대"
                  />
                  <Picker.Item
                    style={styles.font24}
                    label="경기과학기술대"
                    value="경기과학기술대"
                  />
                  <Picker.Item
                    style={styles.font24}
                    label="정왕역"
                    value="정왕역"
                  />
                  <Picker.Item
                    style={styles.font24}
                    label="기타"
                    value="기타"
                  />
                </Picker>
              </View>
            )}
            {index === 2 && (
              <View style={styles.rowContainer}>
                <View style={[styles.textContainer, {flex: 2}]}>
                  <Text style={styles.font24}>출발시간: </Text>
                </View>
                <Picker
                  style={
                    Platform.OS === 'ios'
                      ? styles.ios_picker
                      : styles.android_picker
                  }
                  mode="dropdown"
                  selectedValue={hour}
                  onValueChange={itemValue => {
                    setHour(itemValue);
                  }}>
                  {Array.from(Array(24).keys()).map(item => (
                    // 0부터 23까지의 숫자 picker item => 시간, 분
                    <Picker.Item
                      key={item}
                      label={item < 10 ? `0${item}` : `${item}`}
                      value={item < 10 ? `0${item}` : `${item}`}
                    />
                  ))}
                </Picker>
                <Text style={styles.font24}> : </Text>
                <Picker
                  style={
                    Platform.OS === 'ios'
                      ? styles.ios_picker
                      : styles.android_picker
                  }
                  mode="dropdown"
                  selectedValue={minute}
                  onValueChange={itemValue => {
                    setMinute(itemValue);
                  }}>
                  {Array.from(Array(60).keys()).map(item => (
                    <Picker.Item
                      key={item}
                      label={item < 10 ? `0${item}` : `${item}`}
                      value={item < 10 ? `0${item}` : `${item}`}
                    />
                  ))}
                </Picker>
              </View>
            )}
            <View style={styles.bottomContainer}>
              {index > 0 && (
                <TouchableOpacity style={styles.button} onPress={onPressBefore}>
                  <Text style={styles.textStyle}>이전</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={index === 2 ? props.function : onPressNext}>
                <Text style={styles.textStyle}>
                  {index === 2 ? '생성' : '다음'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* <TextInput
            placeholder="출발지"
            value={props.startingPoint}
            onChangeText={e => props.setStartingPoint(e)}></TextInput> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};
