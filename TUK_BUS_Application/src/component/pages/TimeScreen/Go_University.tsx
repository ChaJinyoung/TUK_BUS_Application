/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, useEffect, useState} from 'react';
import {SubwayInfo, TimeInfo} from '../../../../types/navigation/types';
import {CalcRemainTime} from '../../../util/calctime';
import {getGtecUnivSchedule, getUnivSchedule} from '../../../api/serverAPI';
import {liveSchedule} from '../../../../types/api/awsapiType';
import LiveSchedule from '../../UI/molecule/live_schedule';
import Loading from '../../UI/common/component/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function GoUniversity(): ReactElement {
  const [timeInfo, setTimeInfo] = useState<TimeInfo[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [subwayInfo, setSubwayInfo] = useState<SubwayInfo[]>([]);
  const [endOfService, setEndOfService] = useState<boolean>(false);
  const [alwaysOn, setAlwaysOn] = useState<boolean>(false);
  const [infoText, setInfoText] = useState<string>('');

  //* FlatList refresh 함수. 초기화 진행 및 api호출
  const onRefresh = async () => {
    try {
      setTimeInfo([]);
      setSubwayInfo([]);
      setAlwaysOn(false);
      setRefreshing(true);
      await getLiveBusSchedule();
    } catch (e) {
      console.error('onRefresh error ', e);
    }
  };

  //* 버스 시간표 setState 하는 함수
  const setBusTime = (schedule: liveSchedule) => {
    if (schedule.Bus_schedule.length === 0) {
      setEndOfService(true);
      return;
    }
    setInfoText('08:40~10:00 까지\n상시운행 입니다.');
    schedule.Bus_schedule.forEach(item => {
      if (item.destination === 'Station' || item.destination === 'after17') {
        setAlwaysOn(true);
        setTimeInfo(prev => [
          ...prev,
          {
            time: '',
            remain: 0,
            arrival: '',
          },
        ]);
        setInfoText(
          '17시 이후부턴 하교 도착 지점에서 곧바로 탑니다.\n정확한 시간표가 아니니 하교시간표 참고바랍니다.',
        );
      }
      if (item.continuity === 1) {
        setAlwaysOn(true);
        setTimeInfo(prev => [
          ...prev,
          {
            time: '',
            remain: 0,
            arrival: '',
          },
        ]);
      } else {
        setTimeInfo(prev => [
          ...prev,
          {
            time: item.time,
            remain: CalcRemainTime(item.time),
            arrival: item.duration,
          },
        ]);
      }
    });
  };

  //* 지하철 시간표 setState 하는 함수
  const setupSubwayInfo = (data: liveSchedule) => {
    data.Subway_schedule.forEach(item => {
      if (item) {
        setSubwayInfo(prev => [
          ...prev,
          {
            subwayId: item.subwayId,
            updnLine: item.updnLine,
            bstatnNm: item.bstatnNm,
            arvlMsg2: item.arvlMsg2,
            arvlMsg3: item.arvlMsg3,
          },
        ]);
      }
    });
  };

  //* 버스 시간표 가져오는 함수
  const getLiveBusSchedule = async () => {
    try {
      let returnData;
      const univType = await AsyncStorage.getItem('initialData');
      if (univType) {
        if (JSON.parse(univType).type === 0) {
          const {data} = await getUnivSchedule();
          returnData = data;
        } else {
          const {data} = await getGtecUnivSchedule();
          returnData = data;
        }
        console.log('!!!!return data_toTUK!!!', returnData);
        setBusTime(returnData);
        setupSubwayInfo(returnData);
      }
    } catch (error) {
      console.log('getLiveBusSchedule ~ line 138 ~ error ~ ', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getLiveBusSchedule();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <LiveSchedule
      timeInfo={timeInfo}
      refreshing={refreshing}
      onRefresh={onRefresh}
      setVisible={setVisible}
      isVisible={isVisible}
      subwayInfo={subwayInfo}
      endOfService={endOfService}
      alwaysOn={alwaysOn}
      text={infoText}
      toStation={false}
    />
  );
}

//* 테스트 데이터
// const testData = {
//   Bus_schedule: [
//     {destination: 'TUK', time: '08:40', duration: '08:50', continuity: true},
//     {destination: 'TUK', time: '09:59', duration: '10:10', continuity: true},
//     {destination: 'TUK', time: '10:00', duration: '10:10', continuity: false},
//     {destination: 'TUK', time: '10:10', duration: '10:15', continuity: false},
//   ],
// };
