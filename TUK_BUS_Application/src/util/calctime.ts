import moment from 'moment';

export const CalcRemainTime = (time: string): number => {
  const realTime: string = moment().format('HH:mm');
  const remainHour: number =
    parseInt(time.slice(0, 2), 10) - parseInt(realTime.slice(0, 2), 10);
  let remainMinutes: number =
    parseInt(time.slice(3, 5), 10) - parseInt(realTime.slice(3, 5), 10);
  const remain = remainHour * 60 + remainMinutes;
  return remain;
};

export const CalcArrivalTime = (time: string, remain: number): string => {
  const remain_minutes = remain / 60;
  console.log('remain', remain);
  let arrivalTime_minute =
    parseInt(time.slice(3, 5), 10) + Math.round(remain_minutes);
  let arrivalTime_Hour = parseInt(time.slice(0, 2), 10);
  if (arrivalTime_minute > 59) {
    arrivalTime_Hour += 1;
    arrivalTime_minute -= 60;
    if (arrivalTime_minute === 0) {
      return (
        arrivalTime_Hour.toString() + ':' + arrivalTime_minute.toString() + '0'
      );
    }
  }
  if (arrivalTime_minute < 10) {
    return (
      arrivalTime_Hour.toString() + ':' + '0' + arrivalTime_minute.toString()
    );
  }
  return arrivalTime_Hour.toString() + ':' + arrivalTime_minute.toString();
};

export const checkDest = (dest: '등교' | '하교'): 0 | 1 | 2 => {
  const day: string = moment().format('ddd');
  if (day === 'Sat' || 'Sun') {
    return 0;
  }

  switch (dest) {
    case '등교': {
      const flag = checkHour_Univ();
      return flag;
    }
    case '하교': {
      const flag = checkHour_Home();
      return flag;
    }
  }
};

/*
  flag = 0 정상운행/운행종료 (서버 api 값 확인)
  flag = 1 -> 상시운행
  flag = 2 -> 하교 버스 곧바로 타기
*/
const checkHour_Univ = () => {
  const hour: number = parseInt(moment().format('HH'), 10);

  switch (true) {
    case hour > 7 && hour < 10: {
      const flag = 1;
      return flag;
    }
    case hour === 10: {
      const flag = checkMinute(hour);
      return flag;
    }
    case hour === 16: {
      const flag = checkMinute(hour);
      return flag;
    }
    case hour > 17 && hour < 22: {
      const flag = 2;
      return flag;
    }
    case hour === 22: {
      const flag = checkMinute(hour);
      return flag;
    }
    default: {
      const flag = 0;
      return flag;
    }
  }
};
/*
  flag = 0 정상운행/운행종료 (서버 api 값 확인)
  flag = 1 -> 상시운행
*/
const checkHour_Home = () => {
  const hour: number = parseInt(moment().format('HH'), 10);

  switch (hour) {
    case 16: {
      const minute: number = parseInt(moment().format('mm'), 10);
      const flag = minute > 50 ? 1 : 0;
      return flag;
    }
    case 17: {
      const flag = 1;
      return flag;
    }
    case 18: {
      const flag = checkMinute(hour);
      return flag;
    }
    default: {
      const flag = 0;
      return flag;
    }
  }
};

const checkMinute = (hour: number) => {
  const minute: number = parseInt(moment().format('mm'), 10);

  switch (true) {
    case hour === 10 && minute < 20: {
      const flag = 1;
      return flag;
    }
    case hour === 22 && minute < 40: {
      const flag = 2;
      return flag;
    }
    case hour === 16 && minute > 50: {
      const flag = 2;
      return flag;
    }
    case hour === 18 && minute < 30: {
      const flag = 1;
      return flag;
    }
    default: {
      const flag = 0;
      return flag;
    }
  }
};
