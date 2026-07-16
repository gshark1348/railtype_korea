/*
 * RAILTYPE KOREA · KTX 호남고속선 대표 정차역 데이터 · v26.1
 * 용산–목포 간 KTX 호남축의 대표 정차 코스를 구성합니다.
 * 오송–광주송정은 호남고속선, 광주송정–목포는 현재 기존 호남선 연계 구간입니다.
 * 좌표는 WGS84 십진수 위·경도이며, 한국철도공사 역 위치 공개자료를 기준으로
 * 정밀 좌표를 교차 검수해 정규화했습니다.
 */
(() => {
  "use strict";

  const stations = [
  {
    "code": "KHN01",
    "name": "용산",
    "en": "YONGSAN",
    "lat": 37.52991,
    "lng": 126.9648
  },
  {
    "code": "KHN02",
    "name": "광명",
    "en": "GWANGMYEONG",
    "lat": 37.416196,
    "lng": 126.884818
  },
  {
    "code": "KHN03",
    "name": "천안아산",
    "en": "CHEONAN-ASAN",
    "lat": 36.79391,
    "lng": 127.10445
  },
  {
    "code": "KHN04",
    "name": "오송",
    "en": "OSONG",
    "lat": 36.620557,
    "lng": 127.327377
  },
  {
    "code": "KHN05",
    "name": "공주",
    "en": "GONGJU",
    "lat": 36.332361,
    "lng": 127.096778
  },
  {
    "code": "KHN06",
    "name": "익산",
    "en": "IKSAN",
    "lat": 35.941636,
    "lng": 126.945797
  },
  {
    "code": "KHN07",
    "name": "정읍",
    "en": "JEONGEUP",
    "lat": 35.575556,
    "lng": 126.8425
  },
  {
    "code": "KHN08",
    "name": "광주송정",
    "en": "GWANGJU-SONGJEONG",
    "lat": 35.1374,
    "lng": 126.791
  },
  {
    "code": "KHN09",
    "name": "나주",
    "en": "NAJU",
    "lat": 35.014261,
    "lng": 126.716994
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
