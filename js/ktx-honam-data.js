/*
 * RAILTYPE KOREA · KTX 호남고속선 대표 정차역 데이터 · v26.0
 * 용산–목포 간 KTX 호남축의 대표 정차 코스를 구성합니다.
 * 오송–광주송정은 호남고속선, 광주송정–목포는 현재 기존 호남선 연계 구간입니다.
 * 좌표는 WGS84 십진수 위·경도입니다.
 */
(() => {
  "use strict";

  const stations = [
  {
    "code": "KHN01",
    "name": "용산",
    "en": "YONGSAN",
    "lat": 37.5297056,
    "lng": 126.9647444
  },
  {
    "code": "KHN02",
    "name": "광명",
    "en": "GWANGMYEONG",
    "lat": 37.416451,
    "lng": 126.884804
  },
  {
    "code": "KHN03",
    "name": "천안아산",
    "en": "CHEONAN-ASAN",
    "lat": 36.7943833,
    "lng": 127.1045222
  },
  {
    "code": "KHN04",
    "name": "오송",
    "en": "OSONG",
    "lat": 36.6207917,
    "lng": 127.3278
  },
  {
    "code": "KHN05",
    "name": "공주",
    "en": "GONGJU",
    "lat": 36.33245306,
    "lng": 127.09685306
  },
  {
    "code": "KHN06",
    "name": "익산",
    "en": "IKSAN",
    "lat": 35.9416361,
    "lng": 126.9457972
  },
  {
    "code": "KHN07",
    "name": "정읍",
    "en": "JEONGEUP",
    "lat": 35.57556,
    "lng": 126.8425
  },
  {
    "code": "KHN08",
    "name": "광주송정",
    "en": "GWANGJU-SONGJEONG",
    "lat": 35.1378444,
    "lng": 126.7902333
  },
  {
    "code": "KHN09",
    "name": "나주",
    "en": "NAJU",
    "lat": 35.0142611,
    "lng": 126.7169944
  },
  {
    "code": "KHN10",
    "name": "목포",
    "en": "MOKPO",
    "lat": 34.79194,
    "lng": 126.38722
  }
];

  window.KTX_HONAM_STATIONS = stations;
  window.KTX_HONAM_ROUTES = {
    main: stations
  };
})();
