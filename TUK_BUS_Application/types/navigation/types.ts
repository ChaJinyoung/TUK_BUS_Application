import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  TabScreen: undefined;
};

export type TabParamList = {
  등교: undefined;
  하교: undefined;
  채팅: undefined;
  타는위치: undefined;
};

export type MaterialTabParamList = {
  등교: undefined;
  '등교(17:30~)': undefined;
  하교: undefined;
};

export type AllScheduleTabParamList = {
  // 평일: {day: string};
  // 토요일: {day: string};
  // 일요일: {day: string};
  '한국공학대(평일)': {univName: string};
  '한국공학대(주말)': {univName: string};
  경기과학기술대: {univName: string};
};

export type Props = MaterialTopTabScreenProps<AllScheduleTabParamList>;

export type TimeInfo = {
  time: string;
  remain: number;
  arrival: string;
};

export type flatlistParams = {
  item: TimeInfo;
  toStation: boolean;
};

export type subwayParams = {
  data: SubwayInfo[];
};

export type SubwayInfo = {
  subwayId: string;
  updnLine: string;
  bstatnNm: string;
  arvlMsg2: string;
  arvlMsg3: string;
};

export type scheduleInfo = {
  bstatnNm: string;
  arvlMsg: string;
};

export type all_schedule = {
  station: string;
  university: string;
};

export type timedata = {
  hour: string;
  min: string;
};

export type RootStackParamList2 = {
  StackTabs: undefined;
}; // 나중에 RootStackParamList로 변경 예정

// 추가된 type 변수들
export type StackParamList = {
  초기화면: undefined;
  로그인: undefined;
  비밀번호찾기: undefined;
  사용자설정: undefined;
  학교설정: undefined;
  Drawer: undefined;
  계정생성: undefined;
}; //StackTabs

// 설정 부분
export type SettingStackParamList = {
  설정메뉴: undefined;
  사용자설정: undefined;
  차단목록: undefined;
  학교설정: undefined;
  건의: undefined;
}; //SettingStack

export type StackProps = {
  navigation: NativeStackNavigationProp<StackParamList>;
}; //LoginScreen

export type SettingStackProps = {
  navigation: NativeStackNavigationProp<SettingStackParamList>;
};

export type DrawerParamList = {
  제1캠퍼스: undefined;
  제2캠퍼스: undefined;
  전체시간표: undefined;
  설정: undefined;
};

export type ChattingParamList = {
  채팅목록: undefined;
  채팅방: undefined;
};

export type DrawerProps = {
  props: DrawerNavigationProp<DrawerParamList>;
};
