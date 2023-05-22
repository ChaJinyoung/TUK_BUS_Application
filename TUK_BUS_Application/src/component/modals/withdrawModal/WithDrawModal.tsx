import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  function: any;
}

export const WithDrawModal = (props: Props) => {
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
            <Text style={styles.font24}>
              회원 탈퇴를 진행하시겠습니까?{'\n\n'}
              회원 탈퇴 이후 계정 정보 복구가 불가능합니다.
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.Button} onPress={props.function}>
              <Text style={styles.font24white}>회원탈퇴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
