import React from 'react';
import {Modal, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  firstFunction: any;
  secondFunction: any;
}

export const PushModal = (props: Props) => {
  return (
    <Modal transparent={true} visible={props.modalVisible}>
      <SafeAreaView style={styles.Container}>
        <View style={styles.ModalView}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={props.firstFunction}>
            <Text style={styles.font26}>차단하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={props.secondFunction}>
            <Text style={styles.font26}>신고하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.itemContainer, {borderBottomWidth: 0}]}
            onPress={props.setModalVisible}>
            <Text style={styles.font26}>취소</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
