import React from 'react';
import {FlatList, RefreshControl, View, TouchableOpacity} from 'react-native';
import {TimeInfo, SubwayInfo} from '../../../../types/navigation/types';
import {styles} from '../../../style/stylesheet.css';
import ExclusiveComponent from '../common/component/exclusive_component';
import {
  InfoContainer,
  SubwayContainer,
} from '../common/component/subway_container';

interface IProps {
  timeInfo: TimeInfo[];
  refreshing: boolean;
  onRefresh: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  subwayInfo: SubwayInfo[];
  toStation: boolean;
  alwaysOn: boolean;
  text: string;
}

const FlatlistComponent = ({
  timeInfo,
  refreshing,
  onRefresh,
  setVisible,
  isVisible,
  subwayInfo,
  toStation,
  alwaysOn,
  text,
}: IProps) => {
  return (
    <FlatList
      data={timeInfo}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'black'}
        />
      }
      renderItem={({item, index}) => {
        if (index === 0) {
          return alwaysOn ? (
            <>
              <TouchableOpacity onPress={() => setVisible(!isVisible)}>
                <ExclusiveComponent item1={text} />
              </TouchableOpacity>
              {!isVisible && <SubwayContainer data={subwayInfo} />}
            </>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.arrival_container}
                onPress={() => setVisible(!isVisible)}>
                <InfoContainer item={item} toStation={toStation} />
              </TouchableOpacity>
              {!isVisible && <SubwayContainer data={subwayInfo} />}
            </View>
          );
        }
        if (item.time === '') {
          return null;
        }
        return (
          <View style={styles.arrival_container}>
            <InfoContainer item={item} toStation={toStation} />
          </View>
        );
      }}
    />
  );
};

export default FlatlistComponent;
