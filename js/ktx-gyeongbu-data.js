/*
 * RAILTYPE KOREA · KTX 경부고속선 대표 정차역 데이터 · v25.0
 * 서울–부산 간 경부고속철도의 대표 고속선 정차축을 구성합니다.
 * 좌표는 WGS84 십진수 위·경도입니다.
 */
(() => {
  "use strict";

  const stations = [
  {
    "code": "KTX01",
    "name": "서울",
    "en": "SEOUL",
    "lat": 37.554648,
    "lng": 126.972559
  },
  {
    "code": "KTX02",
    "name": "광명",
    "en": "GWANGMYEONG",
    "lat": 37.416451,
    "lng": 126.884804
  },
  {
    "code": "KTX03",
    "name": "천안아산",
    "en": "CHEONAN-ASAN",
    "lat": 36.794383,
    "lng": 127.104522
  },
  {
    "code": "KTX04",
    "name": "오송",
    "en": "OSONG",
    "lat": 36.620159,
    "lng": 127.327532
  },
  {
    "code": "KTX05",
    "name": "대전",
    "en": "DAEJEON",
    "lat": 36.332116,
    "lng": 127.434136
  },
  {
    "code": "KTX06",
    "name": "김천구미",
    "en": "GIMCHEON-GUMI",
    "lat": 36.113742,
    "lng": 128.180983
  },
  {
    "code": "KTX07",
    "name": "서대구",
    "en": "SEODAEGU",
    "lat": 35.881667,
    "lng": 128.539167
  },
  {
    "code": "KTX08",
    "name": "동대구",
    "en": "DONGDAEGU",
    "lat": 35.879436,
    "lng": 128.628889
  },
  {
    "code": "KTX09",
    "name": "경주",
    "en": "GYEONGJU",
    "lat": 35.798386,
    "lng": 129.138325
  },
  {
    "code": "KTX10",
    "name": "울산",
    "en": "ULSAN",
    "lat": 35.551329,
    "lng": 129.138742
  },
  {
    "code": "KTX11",
    "name": "부산",
    "en": "BUSAN",
    "lat": 35.115109,
    "lng": 129.041419
  }
];

  window.KTX_GYEONGBU_STATIONS = stations;
  window.KTX_GYEONGBU_ROUTES = {
    main: stations
  };
})();
