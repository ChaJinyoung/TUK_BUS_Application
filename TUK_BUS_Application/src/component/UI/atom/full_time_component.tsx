import React from 'react';
import {RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SubwayInfo} from '../../../../types/navigation/types';
import {SubwayContainer} from '../common/component/subway_container';
import ExclusiveComponent from '../common/component/exclusive_component';

interface IProps {
  subwayInfo: SubwayInfo[];
  text: string;
  refreshing: boolean;
  onRefresh: () => void;
}

const FullTime = ({subwayInfo, text, refreshing, onRefresh}: IProps) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'black'}
        />
      }>
      <ExclusiveComponent item1={text} />
      <SubwayContainer data={subwayInfo} />
    </ScrollView>
  );
};

export default FullTime;
