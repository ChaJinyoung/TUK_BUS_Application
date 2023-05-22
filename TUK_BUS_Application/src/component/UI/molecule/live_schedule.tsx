import React from 'react';
import {View} from 'react-native';
import {SubwayInfo, TimeInfo} from '../../../../types/navigation/types';
import {styles} from '../../../style/stylesheet.css';
import ExclusiveComponent from '../common/component/exclusive_component';
import FlatlistComponent from '../atom/flatlist_container';

interface IProps {
  timeInfo: TimeInfo[];
  refreshing: boolean;
  onRefresh: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  subwayInfo: SubwayInfo[];
  endOfService: boolean;
  alwaysOn: boolean;
  text: string;
  toStation: boolean;
}

const LiveSchedule = ({
  timeInfo,
  refreshing,
  onRefresh,
  setVisible,
  isVisible,
  subwayInfo,
  endOfService,
  alwaysOn,
  text,
  toStation,
}: IProps) => {
  return (
    <View style={styles.container}>
      {endOfService ? (
        <ExclusiveComponent item1="운행종료" />
      ) : (
        <FlatlistComponent
          timeInfo={timeInfo}
          refreshing={refreshing}
          onRefresh={onRefresh}
          setVisible={setVisible}
          isVisible={isVisible}
          subwayInfo={subwayInfo}
          toStation={toStation}
          alwaysOn={alwaysOn}
          text={text}
        />
      )}
    </View>
  );
};

export default LiveSchedule;
