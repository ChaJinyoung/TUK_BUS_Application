/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {schedule} from '../../../../types/api/awsapiType';
import {
  all_schedule,
  Props,
  timedata,
} from '../../../../types/navigation/types';
import {getEntireSchedule} from '../../../api/serverAPI';
import {styles} from '../../../style/stylesheet.css';

export const TimeTable = ({route}: Props): ReactElement => {
  const [totalSchedule] = useState<all_schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const {day} = route.params;
  const {univName} = route.params;

  const univContinuity: timedata[] = [];
  const homeContinuity: timedata[] = [];
  const univSchedule: timedata[] = [];
  const homeSchedule: timedata[] = [];

  const sortData = (data: schedule[]) => {
    for (let i = 0; i < data.length; i++) {
      switch (data[i].destination.includes('S')) {
        case true: {
          if (data[i].min < 10) {
            // 상시운행 추가
            if (data[i].continuity) {
              homeContinuity.push({
                hour: data[i].hour.toString(),
                min: '0' + data[i].min.toString(),
              });
            } else {
              homeSchedule.push({
                hour: data[i].hour.toString(),
                min: '0' + data[i].min.toString(),
              });
            }
            break;
          }
          if (data[i].continuity) {
            homeContinuity.push({
              hour: data[i].hour.toString(),
              min: data[i].min.toString(),
            });
          } else {
            homeSchedule.push({
              hour: data[i].hour.toString(),
              min: data[i].min.toString(),
            });
          }
          break;
        }
        case false: {
          if (data[i].min < 10) {
            if (data[i].continuity) {
              univContinuity.push({
                hour: data[i].hour.toString(),
                min: '0' + data[i].min.toString(),
              });
            } else {
              univSchedule.push({
                hour: data[i].hour.toString(),
                min: '0' + data[i].min.toString(),
              });
            }
            break;
          }
          if (data[i].continuity) {
            univContinuity.push({
              hour: data[i].hour.toString(),
              min: data[i].min.toString(),
            });
          } else {
            univSchedule.push({
              hour: data[i].hour.toString(),
              min: data[i].min.toString(),
            });
          }
          break;
        }
      }
    }
    setData(univContinuity, homeContinuity, univSchedule, homeSchedule, data);
  };

  const setData = (
    univC: timedata[],
    homeC: timedata[],
    univ: timedata[],
    home: timedata[],
    data: schedule[],
  ) => {
    for (
      let i = 0;
      i < (univC.length > homeC.length ? univC.length / 2 : homeC.length / 2);
      i++
    ) {
      if (homeC[i] === undefined && univC[i] === undefined) {
        break;
      }
      if (homeC[i] === undefined) {
        totalSchedule.push({
          station: '',
          university:
            univC[i].hour +
            ':' +
            univC[i].min +
            ' ~ ' +
            univC[i + 1].hour +
            ':' +
            univC[i + 1].min +
            ' 상시운행',
        });
      } else if (univC[i] === undefined) {
        totalSchedule.push({
          station:
            homeC[i].hour +
            ':' +
            homeC[i].min +
            ' ~ ' +
            homeC[i + 1].hour +
            ':' +
            homeC[i + 1].min +
            ' 상시운행',
          university: '',
        });
      } else {
        totalSchedule.push({
          station:
            homeC[i].hour +
            ':' +
            homeC[i].min +
            ' ~ ' +
            homeC[i + 1].hour +
            ':' +
            homeC[i + 1].min +
            ' 상시운행',
          university:
            univC[i].hour +
            ':' +
            univC[i].min +
            ' ~ ' +
            univC[i + 1].hour +
            ':' +
            univC[i + 1].min +
            ' 상시운행',
        });
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (home[i] === undefined && univ[i] === undefined) {
        break;
      }
      if (home[i] === undefined) {
        totalSchedule.push({
          station: '',
          university: univ[i].hour + ':' + univ[i].min,
        });
      } else if (univ[i] === undefined) {
        totalSchedule.push({
          station: home[i].hour + ':' + home[i].min,
          university: '',
        });
      } else {
        totalSchedule.push({
          station: home[i].hour + ':' + home[i].min,
          university: univ[i].hour + ':' + univ[i].min,
        });
      }
    }
    setLoading(true);
  };

  const getAllSchedule = async () => {
    // const {data} = await getEntireSchedule(day);
    const {data} = await getEntireSchedule(univName);

    return new Promise((resolve, reject) => {
      if (resolve) {
        resolve(sortData(data.Bus_schedule));
      } else {
        reject(console.error('error'));
      }
    });
  };

  useEffect(() => {
    getAllSchedule();
  }, []);

  if (loading === false) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      // 배경색, 폰트 사이즈, 굵기 조정
      <View style={styles.timetable_container}>
        <DataTable>
          <DataTable.Header
            style={{borderBottomWidth: 0.5, borderBottomColor: 'black'}}>
            <DataTable.Title textStyle={styles.fonts_2}>등교</DataTable.Title>
            {univName === 'TUKweekend' ? (
              <DataTable.Title textStyle={styles.fonts_2}>
                {'하교 (2캠퍼스 출발 시간)'}
              </DataTable.Title>
            ) : (
              <DataTable.Title textStyle={styles.fonts_2}>하교</DataTable.Title>
            )}
          </DataTable.Header>
          <FlatList
            data={totalSchedule}
            renderItem={({item}) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell
                    textStyle={[styles.fonts_2, {fontWeight: 'normal'}]}>
                    {item.university}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={[styles.fonts_2, {fontWeight: 'normal'}]}>
                    {item.station}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            }}
          />
        </DataTable>
      </View>
    );
  }
};
