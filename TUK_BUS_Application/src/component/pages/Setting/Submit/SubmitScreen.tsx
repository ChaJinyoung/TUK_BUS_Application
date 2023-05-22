/* eslint-disable prettier/prettier */
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {SettingStackProps} from '../../../../../types/navigation/types';
import {submitData} from '../../../../api/serverAPI';
import styles from './styles';

const SubmitScreen: React.FC<SettingStackProps> = ({navigation}) => {
  const [topic, setTopic] = useState<string>('개선 요청');
  const [detail, setDetail] = useState<string>('');

  const SubmitData = async () => {
    try {
      const response: any = await submitData({
        detail: `${topic}/${detail}`,
      });
      console.log('~~~~~ success? ~~~~', response.success);
      console.log('submit', topic, detail);
      if (response.success) {
        Alert.alert('', '요청하신 건의사항을 접수하였습니다.', [
          {
            text: '확인',
          },
        ]);
        navigation.goBack();
      }
    } catch (error) {
      console.error('~~~~ submitData ~~~~ error', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.font24}>사유: </Text>
            <Picker
              style={styles.picker}
              mode="dropdown"
              selectedValue={topic}
              onValueChange={itemValue => {
                setTopic(itemValue);
              }}>
              <Picker.Item
                style={styles.font24}
                label="개선 요청"
                value="개선 요청"
              />
              <Picker.Item
                style={styles.font24}
                label="버그 제보"
                value="버그 제보"
              />
              <Picker.Item
                style={styles.font24}
                label="기타 사유"
                value="기타 사유"
              />
            </Picker>
          </View>
          <View style={styles.middleContainer}>
            <TextInput
              style={styles.textInputContainer}
              placeholder="상세한 내용을 입력해주세요. (최대 500자)"
              multiline={true}
              maxLength={500}
              autoCapitalize="none"
              onChangeText={setDetail}
              value={detail}></TextInput>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.Button} onPress={SubmitData}>
              <Text style={styles.font20}>제출</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default SubmitScreen;
