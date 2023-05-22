import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../../../style/stylesheet.css';

interface IProps {
  item1: string;
}

const ExclusiveComponent = ({item1}: IProps) => {
  return (
    <View style={styles.endofSerivce_container}>
      <Text style={styles.endofService_font}>{item1}</Text>
    </View>
  );
};

export default ExclusiveComponent;
