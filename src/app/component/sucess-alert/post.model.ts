export interface Weather {

  dt: number;
  dt_txt: string;
  main: Main;
  cityName: string;
  formatedDate: string;
  formatedTime: string;
}

export interface Main {
  feels_like: number;
  grnd_level: number;
  temp: number
}