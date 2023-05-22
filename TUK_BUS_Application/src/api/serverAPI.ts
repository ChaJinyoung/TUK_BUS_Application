import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosResponse} from 'axios';
import {allSchedule, liveSchedule} from '../../types/api/awsapiType';
import {all_schedule_url, server_url} from './url';

export function getUnivSchedule(): Promise<AxiosResponse<liveSchedule>> {
  const baseurl: string = server_url.goUniv;
  return axios.get(baseurl);
}

export function getHomeSchedule(): Promise<AxiosResponse<liveSchedule>> {
  const baseurl: string = server_url.goHome;
  return axios.get(baseurl);
}

export function getGtecUnivSchedule(): Promise<AxiosResponse<liveSchedule>> {
  const baseurl: string = server_url.gtec_goUniv;
  return axios.get(baseurl);
}

export function getGtecHomeSchedule(): Promise<AxiosResponse<liveSchedule>> {
  const baseurl: string = server_url.gtec_goHome;
  return axios.get(baseurl);
}

export function getEntireSchedule(
  // day: string,
  univName: string,
): Promise<AxiosResponse<allSchedule>> {
  // const baseurl = all_schedule_url(day);
  const baseurl = all_schedule_url(univName);
  return axios.get(baseurl);
}

export const loginUser = async (reqData: loginBody) => {
  console.log('loginUser param: ', reqData);
  return await axios
    .post(server_url.login, reqData)
    .then(response => {
      console.log('loginUser response: ', response.data);
      return response;
    })
    .catch(error => {
      console.log('loginUser error: ', error);
    });
};

export const logoutUser = async () => {
  try {
    const baseurl = server_url.logout;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    console.log('token', userInfo.token.accessToken);
    const response = await axios.get(baseurl, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('serverAPI.ts ~ logoutUser ~ response~ ', response.data);
    return response.data;
  } catch (e) {
    console.log('serverAPI.ts ~ logoutUser ~ error~ ', e);
  }
};

type loginBody = {
  userID: string;
  userPW: string;
};

export const registerAuthMail = async (reqData: any) => {
  console.log('registerAuthMail ~ reqData ~ ', reqData);
  try {
    const baseurl = server_url.register_authMail;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~registerAuthMail ~ response ~', response.data);
    return response.data;
  } catch (e) {
    console.log('registerAuthmMail ~ error ~ ', e);
  }
};

export const registerAuthMailCheck = async (reqData: any) => {
  console.log('registerAuthMailCheck ~ reqData ~', reqData);
  try {
    const baseurl = server_url.authMail_check;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~registerAuthMailCheck ~ response ~', response.data);
    return response.data;
  } catch (e) {
    console.log('registerAuthMailCheck ~ error ~ ', e);
  }
};

export const findpwAuthMail = async (reqData: any) => {
  console.log('findpwAuthMail ~ reqData ~ ', reqData);
  try {
    const baseurl = server_url.findpw_authMail;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~findpwAuthMail ~ response ~', response.data);
    return response.data;
  } catch (e) {
    console.log('findpwAuthMail ~ error ~ ', e);
  }
};

export const findpwAuthMailCheck = async (reqData: any) => {
  console.log('findpwAuthMailCheck ~ reqData ~', reqData);
  try {
    const baseurl = server_url.findpw_authMail_check;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~findpwAuthMailCheck ~ response ~', response.data);
    return response.data;
  } catch (e) {
    console.log('findpwAuthMailCheck ~ error ~ ', e);
  }
};

export const registerCheck = async (reqData: any) => {
  console.log('registerCheck ~ reqData ~', reqData);
  try {
    const baseurl = server_url.authMail_check;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~registerAuthMailCheck ~ response ~', response.data);
    return response.data;
  } catch (e) {
    console.log('registerAuthMailCheck ~ error ~ ', e);
  }
};

export const registerUser = async (reqData: any) => {
  try {
    const baseurl = server_url.register;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~~registerUser response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~registerUser API error ~~~~~~~', e);
  } // 계정생성
};

export const checkId = async (reqData: any) => {
  try {
    const baseurl = server_url.idCheck;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~~checkId response', response.data.success);
    return response.data.success;
  } catch (e) {
    console.log('~~~~~~~~checkId API error ~~~~~~~', e);
  } // id 중복 여부 체크
};

export const getChattingRoom = async () => {
  try {
    const baseurl = server_url.getChattingRoom;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    console.log('token', userInfo.token.accessToken);
    const response = await axios.get(baseurl, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('serverAPI.ts ~ getChattingRoom ~ response~ ', response.data);
    return response.data;
  } catch (e) {
    console.log('serverAPI.ts ~ getChattingRoom ~ error~ ', e);
  }
};

export const createChattingRoom = async (reqData: any) => {
  try {
    const baseurl = server_url.createChattingRoom;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('serverAPI.ts ~ createChattingRoom', response.data);
    return response;
  } catch (e) {
    console.log('serverAPI.ts ~ createChattingRoom ~ error ', e);
  }
};

export const checkPassword = async (reqData: any) => {
  try {
    const baseurl = server_url.checkPw;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~checkPassword response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~checkPassword API error ~~~~~~~', e);
  } // 비밀번호 확인
};

export const findpwChangePassword = async (reqData: any) => {
  try {
    const baseurl = server_url.findpw_changePw;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~~findpwChangePassword response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~findpwChangePassword API error ~~~~~~~', e);
  } // 비밀번호 변경
};

export const changePassword = async (reqData: any) => {
  try {
    const baseurl = server_url.changePw;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~changePassword response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~changePassword API error ~~~~~~~', e);
  } // 비밀번호 변경
};

export const blockUser = async (reqData: any) => {
  try {
    const baseurl = server_url.block;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~blockUser response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~blockUser API error ~~~~~~~', e);
  } // 유저 차단
};

export const blockUserList = async () => {
  try {
    const baseurl = server_url.blockUserList;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.get(baseurl, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~blockUserList response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~blockUserList API error ~~~~~~~', e);
  } // 차단한 유저 리스트
};

export const unblockUser = async (reqData: any) => {
  try {
    const baseurl = server_url.unblock;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~unblockUser response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~unblockUser API error ~~~~~~~', e);
  } // 유저 차단 해제
};

export const submitData = async (reqData: any) => {
  try {
    const baseurl = server_url.submit;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~submitUser response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~submitUser API error ~~~~~~~', e);
  } // 유저 건의
};

export const reportUser = async (reqData: any) => {
  try {
    const baseurl = server_url.report;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~reportUser response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~reportUser API error ~~~~~~~', e);
  } // 유저 신고
};

export const outChattingRoom = async (reqData: any) => {
  try {
    const baseurl = server_url.outChattingRoom;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~outChattingRoom response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~outChattingRoom API error ~~~~~~~', e);
  } // 채팅방 나가기
};

export const loadMessage = async (reqData: any) => {
  try {
    const baseurl = server_url.loadMessage;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~loadMessage response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~loadMessage API error ~~~~~~~', e);
  } // 메시지 불러오기
};

export const messageChattingRoom = async (reqData: any) => {
  try {
    const baseurl = server_url.messageChattingRoom;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(baseurl, reqData, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~messageChattingRoom response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~messageChattingRoom API error ~~~~~~~', e);
  } // 메시지 전송
};

export const withdrawUser = async () => {
  try {
    const baseurl = server_url.withdraw;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.get(baseurl, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('~~~~withdrawUser response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~withdrawUser API error ~~~~~~~', e);
  } // 회원 탈퇴
};
