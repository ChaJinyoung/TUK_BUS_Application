import React, {ReactElement} from 'react';
import {Text, View} from 'react-native';
import {
  flatlistParams,
  scheduleInfo,
  subwayParams,
} from '../../../../../types/navigation/types';
import {styles} from '../../../../style/stylesheet.css';

export function InfoContainer({item, toStation}: flatlistParams): ReactElement {
  return (
    <>
      <View style={styles.time_container}>
        <Text style={styles.time_text}>{item.time}</Text>
      </View>
      <View style={styles.infoText_container}>
        <View style={styles.calctime_container}>
          <Text style={styles.left_time_text}>{item.remain}분</Text>
          <Text style={styles.arrival_time_text}>{item.arrival}</Text>
        </View>
        <View style={styles.time_container}>
          <Text style={styles.remain_text}>남은시간</Text>
          <Text style={styles.arrival_text}>
            {toStation ? '역도착시간' : '학교도착시간'}
          </Text>
        </View>
      </View>
    </>
  );
}

const setNullData = (strarr: scheduleInfo[]) => {
  if (strarr.length === 0) {
    strarr.push({
      bstatnNm: '정보없음',
      arvlMsg: '정보없음',
    });
  }
};

export function SubwayContainer({data}: subwayParams): ReactElement {
  const fourthUp: scheduleInfo[] = [];
  const fourthDn: scheduleInfo[] = [];
  const suinUp: scheduleInfo[] = [];
  const suinDn: scheduleInfo[] = [];

  const setData = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].subwayId === '1004') {
        if (data[i].updnLine === '상행') {
          fourthUp.push({
            bstatnNm: data[i].bstatnNm,
            arvlMsg: data[i].arvlMsg2,
          });
        } else {
          fourthDn.push({
            bstatnNm: data[i].bstatnNm,
            arvlMsg: data[i].arvlMsg2,
          });
        }
        // case '당고개행': {
        //   danggogae.push(data[i].arvlMsg2);
        //   break;
        // }
        // case '오이도행': {
        //   oido.push(data[i].arvlMsg2);
        //   break;
        // }
        // case '왕십리행': {
        //   wangsimli.push(data[i].arvlMsg2);
        //   break;
        // }
        // case '인천행': {
        //   incheon.push(data[i].arvlMsg2);
        //   break;
        // }
        // case '청량리행': {
        //   wangsimli.push('(청량리행) ' + data[i].arvlMsg2);
        //   break;
        // }
      } else {
        if (data[i].updnLine === '상행') {
          suinUp.push({
            bstatnNm: data[i].bstatnNm,
            arvlMsg: data[i].arvlMsg2,
          });
        } else {
          suinDn.push({
            bstatnNm: data[i].bstatnNm,
            arvlMsg: data[i].arvlMsg2,
          });
        }
      }
    }

    setNullData(fourthUp);
    setNullData(fourthDn);
    setNullData(suinUp);
    setNullData(suinDn);
  };
  setData();
  return (
    <View style={styles.info_container}>
      <Text style={styles.sub_title_text}>
        지하철 실시간 위치 정보 (정왕역)
      </Text>
      <View>
        <View>
          <Text style={styles.line_4}>4호선</Text>
        </View>
        <View style={styles.sub_container}>
          <View style={styles.location_container}>
            <Text style={styles.sub_direction_text}>
              {fourthUp[0].bstatnNm}
            </Text>
          </View>
          <View style={styles.location_container}>
            <Text style={styles.sub_location_text}>{fourthUp[0].arvlMsg}</Text>
          </View>
        </View>
        <View style={styles.sub_container_border}>
          <View style={styles.location_container}>
            <Text style={styles.sub_direction_text}>
              {fourthDn[0].bstatnNm}
            </Text>
          </View>
          <View style={styles.location_container}>
            <Text style={styles.sub_location_text}>{fourthDn[0].arvlMsg}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.suin_bundang}>수인분당선</Text>
        </View>
        <View style={styles.sub_container}>
          <View style={styles.location_container}>
            <Text style={styles.sub_direction_text}>{suinUp[0].bstatnNm}</Text>
          </View>
          <View style={styles.location_container}>
            <Text style={styles.sub_location_text}>{suinUp[0].arvlMsg}</Text>
          </View>
        </View>
        <View style={styles.sub_container}>
          <View style={styles.location_container}>
            <Text style={styles.sub_direction_text}>{suinDn[0].bstatnNm}</Text>
          </View>
          <View style={styles.location_container}>
            <Text style={styles.sub_location_text}>{suinDn[0].arvlMsg}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
