import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export const TabBarIcon = (focused: boolean, name: string): JSX.Element => {
  let iconName: string, iconSize: number;

  switch (name) {
    case '등교': {
      iconName = 'school';
      break;
    }
    case '하교': {
      iconName = 'home';
      break;
    }
    case '전체시간표': {
      iconName = 'schedule';
      break;
    }
    case '채팅': {
      iconName = 'chat';
      break;
    }
    case '타는위치': {
      iconName = 'place';
      break;
    }
    default: {
      iconName = 'school';
    }
  }

  iconSize = focused ? 35 : 25;
  return <Icon name={iconName} size={iconSize} color="black" />;
};
