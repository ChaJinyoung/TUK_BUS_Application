// import {futureRouteSearch} from '../../types/api/kakaoapiType';
// import moment from 'moment';
import {server_ip} from '../../.env/auth';

// export function FutureRouteSearchURL(params: futureRouteSearch): string {
//   const baseurl = `https://apis-navi.kakaomobility.com/v1/future/directions?origin=${params.origin}&destination=${params.destination}&departure_time=${params.departure_time}`;

//   return baseurl;
// }

// export function setFutureRouteSearchParams(
//   time: string,
//   direction: string,
// ): futureRouteSearch {
//   const currentDate =
//     moment().format('YYYYMMDD') + time.slice(0, 2) + time.slice(3, 5);

//   const params_goUniversity = {
//     origin: '126.74163070227455,37.351855271129445',
//     destination: '126.7325489990025,37.33957210855494',
//     departure_time: currentDate,
//   };

//   const params_goHome = {
//     origin: '126.7325489990025,37.33957210855494',
//     destination: '126.74190162742117,37.35101790800419',
//     departure_time: currentDate,
//   };

//   const params = direction === '등교' ? params_goUniversity : params_goHome;

//   return params;
// }

export const server_url = {
  goUniv: `https://${server_ip}/api/getSchedule/toTuk`,
  goHome: `https://${server_ip}/api/getSchedule/toStation`,
  entire_schedule: `https://${server_ip}/api/getSchedule/all`,
  login: `https://${server_ip}/api/user/login`,
  register: `https://${server_ip}/api/user/register`,
  register_authMail: `https://${server_ip}/api/user/register/authmail`,
  authMail_check: `https://${server_ip}/api/user/register/authmail/check`,
  findpw_authMail: `https://${server_ip}/api/user/findpw/authmail`,
  findpw_authMail_check: `https://${server_ip}/api/user/findpw/authmail/check`,
  findpw_changePw: `https://${server_ip}/api/user/findpw/changingpw`,
  idCheck: `https://${server_ip}/api/user/register/idCheck`,
  getChattingRoom: `https://${server_ip}/api/chatting/getchatlist`,
  createChattingRoom: `https://${server_ip}/api/chatting/createchatroom`,
  checkPw: `https://${server_ip}/api/user/settings/checkpw`,
  changePw: `https://${server_ip}/api/user/settings/changingpw`,
  block: `https://${server_ip}/api/user/settings/block`,
  blockUserList: `https://${server_ip}/api/user/settings/block/getlist`,
  unblock: `https://${server_ip}/api/user/settings/block/delete`,
  report: `https://${server_ip}/api/user/settings/report`,
  submit: `https://${server_ip}/api/user/settings/submit`,
  logout: `https://${server_ip}/api/user/logout`,
  outChattingRoom: 'https://tukbus.co.kr/api/chatting/chatroom/out',
  messageChattingRoom: 'https://tukbus.co.kr/api/chatting/chatroom/message',
  loadMessage: 'https://tukbus.co.kr/api/chatting/chatroom/loadMessage',
  gtec_goUniv: `https://${server_ip}/api/getSchedule/toGtec`,
  gtec_goHome: `https://${server_ip}/api/getSchedule/fromGtecToStation`,
  withdraw: `https://${server_ip}/api/user/settings/withdraw`,
};

export const all_schedule_url = (/*day: string*/ univName: string): string => {
  //const url = `https://${server_ip}/api/getSchedule/all?day=${day}`;
  const url = `https://${server_ip}/api/getSchedule/all?univNAME=${univName}`;
  return url;
};
