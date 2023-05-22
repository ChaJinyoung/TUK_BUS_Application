/* eslint-disable react-hooks/exhaustive-deps */
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  userName: string;
  reason: string;
  setReason: any;
  function: any;
}

// 채팅방 내 상대 메시지를 longPress 할 경우 발생하는 modal(android에서 alert 3중 선택지가 잘 안되서 modal로 만듬)
export const ReportModal = (props: Props) => {
  const [topic, setTopic] = useState<string>('욕설, 비방, 차별, 혐오성 발언');
  const [detail, setDetail] = useState<string>('');

  useEffect(() => {
    if (props.modalVisible) {
      props.setReason(`${topic}/${detail}`);
      console.log('setReason', props.reason);
    }
  }, [topic, detail]);

  const ReportFunction = () => {
    props.function();
    props.setModalVisible(false);
  };

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
              onPress={() => {
                props.setModalVisible(false);
              }}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.font24}>사용자: {props.userName}</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.font24}>사유:</Text>
              <Picker
                style={styles.picker}
                mode="dropdown"
                selectedValue={topic}
                onValueChange={itemValue => {
                  setTopic(itemValue);
                }}>
                <Picker.Item
                  style={styles.font32}
                  label="욕설, 비방, 차별, 혐오성 발언"
                  value="욕설, 비방, 차별, 혐오성 발언"
                />
                <Picker.Item
                  style={styles.font32}
                  label="음란, 유해"
                  value="음란, 유해"
                />
                <Picker.Item
                  style={styles.font32}
                  label="광고, 스팸 메시지"
                  value="광고, 스팸 메시지"
                />
                <Picker.Item
                  style={styles.font32}
                  label="개인정보 노출, 유포"
                  value="개인정보 노출, 유포"
                />
                <Picker.Item
                  style={styles.font32}
                  label="기타 사유"
                  value="기타 사유"
                />
              </Picker>
            </View>
            <TextInput
              style={styles.textInputContainer}
              placeholder="상세한 내용을 입력해주세요. (최대 500자)"
              multiline={true}
              autoCapitalize="none"
              maxLength={500}
              onChangeText={setDetail}
              value={detail}></TextInput>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.Button} onPress={ReportFunction}>
              <Text style={styles.font24white}>제출</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
