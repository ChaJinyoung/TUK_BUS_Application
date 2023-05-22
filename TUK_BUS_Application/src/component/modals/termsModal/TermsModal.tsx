/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Modal, Text, TouchableOpacity, View, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-webview';
import {styles} from './styles';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  IsTermsCheck: boolean;
  setIsTermsCheck: any;
  function: any;
}

export const TermsModal = (props: Props) => {
  const PressCheckButton = (check: boolean, setCheck: any) => {
    if (check) setCheck(false);
    else setCheck(true);
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
              style={styles.topContainer}
              onPress={() => {
                props.setModalVisible(false);
              }}>
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.font22}>이용 약관</Text>
            <View style={styles.textContainer}>
              <WebView
                source={{
                  uri:
                    Platform.OS === 'android'
                      ? 'file:///android_asset/Terms.html'
                      : '../../../assets/html/Terms.html',
                }}
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.font24}>약관에 동의합니다.</Text>
              <TouchableOpacity
                onPress={() =>
                  PressCheckButton(props.IsTermsCheck, props.setIsTermsCheck)
                }>
                {props.IsTermsCheck ? (
                  <MaterialIcons name="check-box" size={24} color="black" />
                ) : (
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={24}
                    color="black"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={props.function}>
              <Text style={styles.textStyle}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
