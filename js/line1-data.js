/*
 * METROTYPE SEOUL · 수도권 전철 1호선 데이터
 * 현재 1호선 102개 역을 네 개의 대표 주행 축으로 구성합니다.
 * 좌표는 WGS84 십진수 위·경도입니다.
 */
(() => {
  "use strict";

  const stations = {
    "연천": {
      "code": "100-3",
      "name": "연천",
      "en": "YEONCHEON",
      "lat": 38.1017,
      "lng": 127.074
    },
    "전곡": {
      "code": "100-2",
      "name": "전곡",
      "en": "JEONGOK",
      "lat": 38.024606,
      "lng": 127.071136
    },
    "청산": {
      "code": "100-1",
      "name": "청산",
      "en": "CHEONGSAN",
      "lat": 37.99528,
      "lng": 127.07444
    },
    "소요산": {
      "code": "100",
      "name": "소요산",
      "en": "SOYOSAN",
      "lat": 37.948898,
      "lng": 127.061129
    },
    "동두천": {
      "code": "101",
      "name": "동두천",
      "en": "DONGDUCHEON",
      "lat": 37.927613,
      "lng": 127.054928
    },
    "보산": {
      "code": "102",
      "name": "보산",
      "en": "BOSAN",
      "lat": 37.914145,
      "lng": 127.057179
    },
    "동두천중앙": {
      "code": "103",
      "name": "동두천중앙",
      "en": "DONGDUCHEON JUNGANG",
      "lat": 37.901781,
      "lng": 127.056423
    },
    "지행": {
      "code": "104",
      "name": "지행",
      "en": "JIHAENG",
      "lat": 37.892343,
      "lng": 127.055793
    },
    "덕정": {
      "code": "105",
      "name": "덕정",
      "en": "DEOKJEONG",
      "lat": 37.843188,
      "lng": 127.061559
    },
    "덕계": {
      "code": "106",
      "name": "덕계",
      "en": "DEOKGYE",
      "lat": 37.818753,
      "lng": 127.056692
    },
    "양주": {
      "code": "107",
      "name": "양주",
      "en": "YANGJU",
      "lat": 37.774142,
      "lng": 127.044721
    },
    "녹양": {
      "code": "108",
      "name": "녹양",
      "en": "NOGYANG",
      "lat": 37.759385,
      "lng": 127.042279
    },
    "가능": {
      "code": "109",
      "name": "가능",
      "en": "GANEUNG",
      "lat": 37.748396,
      "lng": 127.044288
    },
    "의정부": {
      "code": "110",
      "name": "의정부",
      "en": "UIJEONGBU",
      "lat": 37.738362,
      "lng": 127.045957
    },
    "회룡": {
      "code": "111",
      "name": "회룡",
      "en": "HOERYONG",
      "lat": 37.723806,
      "lng": 127.047295
    },
    "망월사": {
      "code": "112",
      "name": "망월사",
      "en": "MANGWOLSA",
      "lat": 37.710219,
      "lng": 127.047418
    },
    "도봉산": {
      "code": "113",
      "name": "도봉산",
      "en": "DOBONGSAN",
      "lat": 37.689512,
      "lng": 127.046063
    },
    "도봉": {
      "code": "114",
      "name": "도봉",
      "en": "DOBONG",
      "lat": 37.679212,
      "lng": 127.045535
    },
    "방학": {
      "code": "115",
      "name": "방학",
      "en": "BANGHAK",
      "lat": 37.667438,
      "lng": 127.044322
    },
    "창동": {
      "code": "116",
      "name": "창동",
      "en": "CHANG-DONG",
      "lat": 37.653339,
      "lng": 127.047645
    },
    "녹천": {
      "code": "117",
      "name": "녹천",
      "en": "NOKCHEON",
      "lat": 37.644633,
      "lng": 127.051383
    },
    "월계": {
      "code": "118",
      "name": "월계",
      "en": "WOLGYE",
      "lat": 37.633278,
      "lng": 127.058857
    },
    "광운대": {
      "code": "119",
      "name": "광운대",
      "en": "KWANGWOON UNIV.",
      "lat": 37.623837,
      "lng": 127.061695
    },
    "석계": {
      "code": "120",
      "name": "석계",
      "en": "SEOKGYE",
      "lat": 37.615006,
      "lng": 127.065688
    },
    "신이문": {
      "code": "121",
      "name": "신이문",
      "en": "SINIMUN",
      "lat": 37.601782,
      "lng": 127.067398
    },
    "외대앞": {
      "code": "122",
      "name": "외대앞",
      "en": "HANKUK UNIV. OF FOREIGN STUDIES",
      "lat": 37.596273,
      "lng": 127.063693
    },
    "회기": {
      "code": "123",
      "name": "회기",
      "en": "HOEGI",
      "lat": 37.589796,
      "lng": 127.058048
    },
    "청량리": {
      "code": "124",
      "name": "청량리",
      "en": "CHEONGNYANGNI",
      "lat": 37.580039,
      "lng": 127.044727
    },
    "제기동": {
      "code": "125",
      "name": "제기동",
      "en": "JEGI-DONG",
      "lat": 37.578175,
      "lng": 127.034949
    },
    "신설동": {
      "code": "126",
      "name": "신설동",
      "en": "SINSEOL-DONG",
      "lat": 37.57603,
      "lng": 127.024457
    },
    "동묘앞": {
      "code": "127",
      "name": "동묘앞",
      "en": "DONGMYO",
      "lat": 37.573217,
      "lng": 127.016364
    },
    "동대문": {
      "code": "128",
      "name": "동대문",
      "en": "DONGDAEMUN",
      "lat": 37.571668,
      "lng": 127.010632
    },
    "종로5가": {
      "code": "129",
      "name": "종로5가",
      "en": "JONGNO 5-GA",
      "lat": 37.570976,
      "lng": 127.001539
    },
    "종로3가": {
      "code": "130",
      "name": "종로3가",
      "en": "JONGNO 3-GA",
      "lat": 37.570421,
      "lng": 126.992153
    },
    "종각": {
      "code": "131",
      "name": "종각",
      "en": "JONGGAK",
      "lat": 37.570229,
      "lng": 126.983152
    },
    "시청": {
      "code": "132",
      "name": "시청",
      "en": "CITY HALL",
      "lat": 37.565344,
      "lng": 126.977199
    },
    "서울역": {
      "code": "133",
      "name": "서울역",
      "en": "SEOUL STATION",
      "lat": 37.55598,
      "lng": 126.972091
    },
    "남영": {
      "code": "134",
      "name": "남영",
      "en": "NAMYEONG",
      "lat": 37.540566,
      "lng": 126.971332
    },
    "용산": {
      "code": "135",
      "name": "용산",
      "en": "YONGSAN",
      "lat": 37.529774,
      "lng": 126.96463
    },
    "노량진": {
      "code": "136",
      "name": "노량진",
      "en": "NORYANGJIN",
      "lat": 37.514055,
      "lng": 126.94211
    },
    "대방": {
      "code": "137",
      "name": "대방",
      "en": "DAEBANG",
      "lat": 37.513354,
      "lng": 126.926497
    },
    "신길": {
      "code": "138",
      "name": "신길",
      "en": "SINGIL",
      "lat": 37.516787,
      "lng": 126.918367
    },
    "영등포": {
      "code": "139",
      "name": "영등포",
      "en": "YEONGDEUNGPO",
      "lat": 37.515673,
      "lng": 126.90755
    },
    "신도림": {
      "code": "140",
      "name": "신도림",
      "en": "SINDORIM",
      "lat": 37.508908,
      "lng": 126.891313
    },
    "구로": {
      "code": "141",
      "name": "구로",
      "en": "GURO",
      "lat": 37.503342,
      "lng": 126.882309
    },
    "구일": {
      "code": "142",
      "name": "구일",
      "en": "GUIL",
      "lat": 37.496255,
      "lng": 126.869691
    },
    "개봉": {
      "code": "143",
      "name": "개봉",
      "en": "GAEBONG",
      "lat": 37.494642,
      "lng": 126.858716
    },
    "오류동": {
      "code": "144",
      "name": "오류동",
      "en": "ORYU-DONG",
      "lat": 37.494397,
      "lng": 126.844807
    },
    "온수": {
      "code": "145",
      "name": "온수",
      "en": "ONSU",
      "lat": 37.4924,
      "lng": 126.823829
    },
    "역곡": {
      "code": "146",
      "name": "역곡",
      "en": "YEOKGOK",
      "lat": 37.485314,
      "lng": 126.812059
    },
    "소사": {
      "code": "147",
      "name": "소사",
      "en": "SOSA",
      "lat": 37.4828,
      "lng": 126.795644
    },
    "부천": {
      "code": "148",
      "name": "부천",
      "en": "BUCHEON",
      "lat": 37.483989,
      "lng": 126.783082
    },
    "중동": {
      "code": "149",
      "name": "중동",
      "en": "JUNGDONG",
      "lat": 37.486682,
      "lng": 126.764535
    },
    "송내": {
      "code": "150",
      "name": "송내",
      "en": "SONGNAE",
      "lat": 37.487642,
      "lng": 126.753162
    },
    "부개": {
      "code": "151",
      "name": "부개",
      "en": "BUGAE",
      "lat": 37.488477,
      "lng": 126.74073
    },
    "부평": {
      "code": "152",
      "name": "부평",
      "en": "BUPYEONG",
      "lat": 37.489449,
      "lng": 126.724331
    },
    "백운": {
      "code": "153",
      "name": "백운",
      "en": "BAEGUN",
      "lat": 37.483342,
      "lng": 126.707294
    },
    "동암": {
      "code": "154",
      "name": "동암",
      "en": "DONGAM",
      "lat": 37.470696,
      "lng": 126.70289
    },
    "간석": {
      "code": "155",
      "name": "간석",
      "en": "GANSEOK",
      "lat": 37.464707,
      "lng": 126.693518
    },
    "주안": {
      "code": "156",
      "name": "주안",
      "en": "JUAN",
      "lat": 37.465053,
      "lng": 126.67997
    },
    "도화": {
      "code": "157",
      "name": "도화",
      "en": "DOHWA",
      "lat": 37.466118,
      "lng": 126.668576
    },
    "제물포": {
      "code": "158",
      "name": "제물포",
      "en": "JEMULPO",
      "lat": 37.466821,
      "lng": 126.657495
    },
    "도원": {
      "code": "159",
      "name": "도원",
      "en": "DOWON",
      "lat": 37.468773,
      "lng": 126.642533
    },
    "동인천": {
      "code": "160",
      "name": "동인천",
      "en": "DONGINCHEON",
      "lat": 37.475403,
      "lng": 126.632616
    },
    "인천": {
      "code": "161",
      "name": "인천",
      "en": "INCHEON",
      "lat": 37.476168,
      "lng": 126.616821
    },
    "가산디지털단지": {
      "code": "P142",
      "name": "가산디지털단지",
      "en": "GASAN DIGITAL COMPLEX",
      "lat": 37.481531,
      "lng": 126.882615
    },
    "독산": {
      "code": "P143",
      "name": "독산",
      "en": "DOKSAN",
      "lat": 37.465976,
      "lng": 126.889476
    },
    "금천구청": {
      "code": "P144",
      "name": "금천구청",
      "en": "GEUMCHEON-GU OFFICE",
      "lat": 37.456194,
      "lng": 126.893609
    },
    "석수": {
      "code": "P145",
      "name": "석수",
      "en": "SEOKSU",
      "lat": 37.435093,
      "lng": 126.902321
    },
    "관악": {
      "code": "P146",
      "name": "관악",
      "en": "GWANAK",
      "lat": 37.419568,
      "lng": 126.9085
    },
    "안양": {
      "code": "P147",
      "name": "안양",
      "en": "ANYANG",
      "lat": 37.401684,
      "lng": 126.92273
    },
    "명학": {
      "code": "P148",
      "name": "명학",
      "en": "MYEONGHAK",
      "lat": 37.38446,
      "lng": 126.935593
    },
    "금정": {
      "code": "P149",
      "name": "금정",
      "en": "GEUMJEONG",
      "lat": 37.372337,
      "lng": 126.943271
    },
    "군포": {
      "code": "P150",
      "name": "군포",
      "en": "GUNPO",
      "lat": 37.354192,
      "lng": 126.948518
    },
    "당정": {
      "code": "P151",
      "name": "당정",
      "en": "DANGJEONG",
      "lat": 37.34369,
      "lng": 126.948371
    },
    "의왕": {
      "code": "P152",
      "name": "의왕",
      "en": "UIWANG",
      "lat": 37.320342,
      "lng": 126.947977
    },
    "성균관대": {
      "code": "P153",
      "name": "성균관대",
      "en": "SUNGKYUNKWAN UNIV.",
      "lat": 37.300329,
      "lng": 126.971022
    },
    "화서": {
      "code": "P154",
      "name": "화서",
      "en": "HWASEO",
      "lat": 37.284002,
      "lng": 126.989612
    },
    "수원": {
      "code": "P155",
      "name": "수원",
      "en": "SUWON",
      "lat": 37.265682,
      "lng": 127.00005
    },
    "세류": {
      "code": "P156",
      "name": "세류",
      "en": "SERYU",
      "lat": 37.243873,
      "lng": 127.0138
    },
    "병점": {
      "code": "P157",
      "name": "병점",
      "en": "BYEONGJEOM",
      "lat": 37.206753,
      "lng": 127.0332
    },
    "세마": {
      "code": "P158",
      "name": "세마",
      "en": "SEMA",
      "lat": 37.187135,
      "lng": 127.043427
    },
    "오산대": {
      "code": "P159",
      "name": "오산대",
      "en": "OSAN COLLEGE",
      "lat": 37.16935,
      "lng": 127.063076
    },
    "오산": {
      "code": "P160",
      "name": "오산",
      "en": "OSAN",
      "lat": 37.144717,
      "lng": 127.06663
    },
    "진위": {
      "code": "P161",
      "name": "진위",
      "en": "JINWI",
      "lat": 37.110079,
      "lng": 127.062356
    },
    "송탄": {
      "code": "P162",
      "name": "송탄",
      "en": "SONGTAN",
      "lat": 37.075713,
      "lng": 127.05428
    },
    "서정리": {
      "code": "P163",
      "name": "서정리",
      "en": "SEOJEONG-RI",
      "lat": 37.056564,
      "lng": 127.052882
    },
    "평택지제": {
      "code": "P164",
      "name": "평택지제",
      "en": "PYEONGTAEKJIJE",
      "lat": 37.0189,
      "lng": 127.070512
    },
    "평택": {
      "code": "P165",
      "name": "평택",
      "en": "PYEONGTAEK",
      "lat": 36.990849,
      "lng": 127.085273
    },
    "성환": {
      "code": "P166",
      "name": "성환",
      "en": "SEONGHWAN",
      "lat": 36.915953,
      "lng": 127.126837
    },
    "직산": {
      "code": "P167",
      "name": "직산",
      "en": "JIKSAN",
      "lat": 36.870933,
      "lng": 127.143824
    },
    "두정": {
      "code": "P168",
      "name": "두정",
      "en": "DUJEONG",
      "lat": 36.833599,
      "lng": 127.149081
    },
    "천안": {
      "code": "P169",
      "name": "천안",
      "en": "CHEONAN",
      "lat": 36.810523,
      "lng": 127.14649
    },
    "봉명": {
      "code": "P170",
      "name": "봉명",
      "en": "BONGMYEONG",
      "lat": 36.80142,
      "lng": 127.136038
    },
    "쌍용": {
      "code": "P171",
      "name": "쌍용",
      "en": "SSANGYONG",
      "lat": 36.793726,
      "lng": 127.121378
    },
    "아산": {
      "code": "P172",
      "name": "아산",
      "en": "ASAN",
      "lat": 36.792117,
      "lng": 127.104077
    },
    "탕정": {
      "code": "P173",
      "name": "탕정",
      "en": "TANGJEONG",
      "lat": 36.78825,
      "lng": 127.084417
    },
    "배방": {
      "code": "P174",
      "name": "배방",
      "en": "BAEBANG",
      "lat": 36.777697,
      "lng": 127.052788
    },
    "온양온천": {
      "code": "P176",
      "name": "온양온천",
      "en": "ONYANG ONCHEON",
      "lat": 36.780545,
      "lng": 127.003181
    },
    "신창": {
      "code": "P177",
      "name": "신창",
      "en": "SINCHANG",
      "lat": 36.769642,
      "lng": 126.951393
    },
    "서동탄": {
      "code": "P157-1",
      "name": "서동탄",
      "en": "SEODONGTAN",
      "lat": 37.195735,
      "lng": 127.051857
    },
    "광명": {
      "code": "P144-1",
      "name": "광명",
      "en": "GWANGMYEONG",
      "lat": 37.416736,
      "lng": 126.884962
    }
  };

  const route = (names) => names.map((name) => ({ ...stations[name] }));

  window.LINE_1_ROUTES = {
    gyeongin: route([
"연천",
"전곡",
"청산",
"소요산",
"동두천",
"보산",
"동두천중앙",
"지행",
"덕정",
"덕계",
"양주",
"녹양",
"가능",
"의정부",
"회룡",
"망월사",
"도봉산",
"도봉",
"방학",
"창동",
"녹천",
"월계",
"광운대",
"석계",
"신이문",
"외대앞",
"회기",
"청량리",
"제기동",
"신설동",
"동묘앞",
"동대문",
"종로5가",
"종로3가",
"종각",
"시청",
"서울역",
"남영",
"용산",
"노량진",
"대방",
"신길",
"영등포",
"신도림",
"구로",
"구일",
"개봉",
"오류동",
"온수",
"역곡",
"소사",
"부천",
"중동",
"송내",
"부개",
"부평",
"백운",
"동암",
"간석",
"주안",
"도화",
"제물포",
"도원",
"동인천",
"인천"
]),
    gyeongbu: route([
"광운대",
"석계",
"신이문",
"외대앞",
"회기",
"청량리",
"제기동",
"신설동",
"동묘앞",
"동대문",
"종로5가",
"종로3가",
"종각",
"시청",
"서울역",
"남영",
"용산",
"노량진",
"대방",
"신길",
"영등포",
"신도림",
"구로",
"가산디지털단지",
"독산",
"금천구청",
"석수",
"관악",
"안양",
"명학",
"금정",
"군포",
"당정",
"의왕",
"성균관대",
"화서",
"수원",
"세류",
"병점",
"세마",
"오산대",
"오산",
"진위",
"송탄",
"서정리",
"평택지제",
"평택",
"성환",
"직산",
"두정",
"천안",
"봉명",
"쌍용",
"아산",
"탕정",
"배방",
"온양온천",
"신창"
]),
    seodongtan: route([
"광운대",
"석계",
"신이문",
"외대앞",
"회기",
"청량리",
"제기동",
"신설동",
"동묘앞",
"동대문",
"종로5가",
"종로3가",
"종각",
"시청",
"서울역",
"남영",
"용산",
"노량진",
"대방",
"신길",
"영등포",
"신도림",
"구로",
"가산디지털단지",
"독산",
"금천구청",
"석수",
"관악",
"안양",
"명학",
"금정",
"군포",
"당정",
"의왕",
"성균관대",
"화서",
"수원",
"세류",
"병점",
"서동탄"
]),
    gwangmyeong: route([
"영등포",
"신도림",
"구로",
"가산디지털단지",
"독산",
"금천구청",
"광명"
]),
  };

  window.LINE_1_CONTEXTS = {
    "연천": {
      "title": "연천역 급수탑",
      "subtitle": "경원선 철도 유산과 차탄천 풍경이 남아 있는 1호선 북단 종점",
      "icon": "🏁",
      "badge": "BORDER RAIL",
      "area": "접경 철도 생활권",
      "keywords": "철도 유산 · 차탄천 · 종점"
    },
    "전곡": {
      "title": "전곡리 선사유적",
      "subtitle": "한탄강과 구석기 유적을 함께 만나는 연천의 역사 관광 거점",
      "icon": "🪨",
      "badge": "HERITAGE",
      "area": "선사·한탄강 생활권",
      "keywords": "구석기 · 한탄강 · 전통시장"
    },
    "청산": {
      "title": "청산면 들녘",
      "subtitle": "한탄강 북쪽의 농촌 풍경과 접경지역 일상이 이어지는 작은 역세권",
      "icon": "🌾",
      "badge": "RURAL STATION",
      "area": "접경 농촌 생활권",
      "keywords": "들녘 · 한탄강 · 마을"
    },
    "소요산": {
      "title": "소요산 관광지",
      "subtitle": "단풍과 계곡으로 유명한 소요산 산행이 시작되는 북부 관광 관문",
      "icon": "⛰️",
      "badge": "MOUNTAIN GATE",
      "area": "산림 관광권",
      "keywords": "등산 · 계곡 · 단풍"
    },
    "동두천": {
      "title": "동두천 북부 교통축",
      "subtitle": "경원선 철도와 동두천 북부 생활권이 만나는 지역 교통 거점",
      "icon": "🚉",
      "badge": "LOCAL HUB",
      "area": "동두천 생활권",
      "keywords": "철도 · 주거 · 지역 이동"
    },
    "보산": {
      "title": "보산동 관광특구",
      "subtitle": "외국 문화 거리와 공방, 다양한 음식점이 모인 이색적인 상권",
      "icon": "🎨",
      "badge": "CULTURE STREET",
      "area": "보산 문화 생활권",
      "keywords": "공방 · 세계음식 · 거리문화"
    },
    "동두천중앙": {
      "title": "동두천 중앙시장",
      "subtitle": "전통시장과 행정·상업 기능이 모여 있는 동두천 구도심의 중심",
      "icon": "🛍️",
      "badge": "CITY CENTER",
      "area": "동두천 도심권",
      "keywords": "전통시장 · 상업 · 행정"
    },
    "지행": {
      "title": "지행 신시가지",
      "subtitle": "아파트 단지와 생활 상권이 밀집한 동두천의 대표 주거 중심지",
      "icon": "🏘️",
      "badge": "NEW TOWN",
      "area": "지행 주거 생활권",
      "keywords": "주거 · 상권 · 신시가지"
    },
    "덕정": {
      "title": "덕정시장",
      "subtitle": "회천 생활권의 오래된 시장과 주거지가 함께 이어지는 양주 북부 중심",
      "icon": "🧺",
      "badge": "LOCAL DISTRICT",
      "area": "덕정 생활권",
      "keywords": "시장 · 주거 · 지역상권"
    },
    "덕계": {
      "title": "회천신도시",
      "subtitle": "새로운 아파트 단지와 기반시설이 빠르게 형성되는 양주의 신도시 구간",
      "icon": "🏗️",
      "badge": "NEW TOWN",
      "area": "회천 신도시권",
      "keywords": "신도시 · 주거 · 개발"
    },
    "양주": {
      "title": "양주시청·불곡산",
      "subtitle": "행정 중심지와 불곡산 산세가 가까이 맞닿은 양주의 관문",
      "icon": "🏛️",
      "badge": "REGIONAL HUB",
      "area": "양주 행정 생활권",
      "keywords": "행정 · 불곡산 · 환승"
    },
    "녹양": {
      "title": "녹양 생활권",
      "subtitle": "가능천과 주거단지, 체육시설이 이어지는 의정부 북부의 차분한 동네",
      "icon": "🌿",
      "badge": "RESIDENTIAL",
      "area": "녹양 주거권",
      "keywords": "하천 · 체육 · 주거"
    },
    "가능": {
      "title": "의정부 구도심",
      "subtitle": "학교와 주거 골목, 오래된 생활 상권이 이어지는 의정부 서부 지역",
      "icon": "🏡",
      "badge": "LOCAL DISTRICT",
      "area": "가능 생활권",
      "keywords": "주거 · 골목 · 생활상권"
    },
    "의정부": {
      "title": "의정부 부대찌개거리",
      "subtitle": "대형 상권과 중앙시장, 지역 대표 먹거리가 모인 경기 북부 중심지",
      "icon": "🍲",
      "badge": "REGIONAL HUB",
      "area": "의정부 도심권",
      "keywords": "시장 · 먹거리 · 광역교통"
    },
    "회룡": {
      "title": "사패산·회룡사",
      "subtitle": "의정부경전철 환승과 사패산 산행이 연결되는 교통·자연 거점",
      "icon": "🥾",
      "badge": "TRANSFER & GREEN",
      "area": "회룡 생활권",
      "keywords": "환승 · 산행 · 주거"
    },
    "망월사": {
      "title": "망월사·도봉산",
      "subtitle": "도봉산 북쪽 등산로와 사찰로 이어지는 서울 북부 산행 관문",
      "icon": "⛰️",
      "badge": "MOUNTAIN GATE",
      "area": "도봉산 북부권",
      "keywords": "등산 · 사찰 · 계곡"
    },
    "도봉산": {
      "title": "도봉산 국립공원",
      "subtitle": "웅장한 암봉과 둘레길, 7호선 환승이 만나는 서울 북쪽 관문",
      "icon": "🥾",
      "badge": "TRANSFER & GREEN",
      "area": "도봉산 생활권",
      "keywords": "국립공원 · 환승 · 등산"
    },
    "도봉": {
      "title": "도봉동 생활권",
      "subtitle": "서울북부지방법원과 주거지가 이어지는 도봉구 북부 생활 중심",
      "icon": "⚖️",
      "badge": "CIVIC DISTRICT",
      "area": "도봉 행정 생활권",
      "keywords": "법원 · 주거 · 중랑천"
    },
    "방학": {
      "title": "방학동 도깨비시장",
      "subtitle": "전통시장과 도봉구청 생활권이 가까운 도봉구의 지역 중심",
      "icon": "🧺",
      "badge": "LOCAL DISTRICT",
      "area": "방학 생활권",
      "keywords": "시장 · 행정 · 주거"
    },
    "창동": {
      "title": "창동역 복합환승권",
      "subtitle": "4호선과 광역교통, 서울아레나 개발축이 만나는 동북권 핵심 거점",
      "icon": "🎵",
      "badge": "METRO HUB",
      "area": "창동 광역생활권",
      "keywords": "환승 · 공연 · 상업"
    },
    "녹천": {
      "title": "초안산",
      "subtitle": "초안산 녹지와 저층 주거지가 이어지는 조용한 북서울 생활권",
      "icon": "🌳",
      "badge": "PARK & GREEN",
      "area": "녹천 주거권",
      "keywords": "초안산 · 산책 · 주거"
    },
    "월계": {
      "title": "중랑천·월계동",
      "subtitle": "중랑천 산책로와 대학가, 주거단지가 이어지는 동북권 생활 지역",
      "icon": "🚴",
      "badge": "RIVER DISTRICT",
      "area": "월계 생활권",
      "keywords": "중랑천 · 대학 · 주거"
    },
    "광운대": {
      "title": "광운대학교",
      "subtitle": "대학 캠퍼스와 철도 물류시설, 동북권 환승 기능이 모인 역세권",
      "icon": "🎓",
      "badge": "CAMPUS HUB",
      "area": "광운대 생활권",
      "keywords": "캠퍼스 · 철도 · 환승"
    },
    "석계": {
      "title": "석관동·중랑천",
      "subtitle": "6호선 환승과 중랑천 생활권이 만나는 서울 동북부 교통 거점",
      "icon": "🌉",
      "badge": "TRANSFER HUB",
      "area": "석계 생활권",
      "keywords": "환승 · 중랑천 · 주거"
    },
    "신이문": {
      "title": "이문동 골목",
      "subtitle": "철도변 주거 골목과 재정비 지역이 공존하는 동대문구 북부 생활권",
      "icon": "🏘️",
      "badge": "RESIDENTIAL",
      "area": "이문 생활권",
      "keywords": "철도마을 · 주거 · 재정비"
    },
    "외대앞": {
      "title": "한국외국어대학교",
      "subtitle": "다양한 언어와 세계 음식, 대학가 문화가 어우러진 캠퍼스 상권",
      "icon": "🌍",
      "badge": "CAMPUS AREA",
      "area": "외대 대학가",
      "keywords": "캠퍼스 · 세계문화 · 먹거리"
    },
    "회기": {
      "title": "동대문 대학가",
      "subtitle": "경희대·한국외대·서울시립대 생활권을 잇는 대표 청년 환승 거점",
      "icon": "🎓",
      "badge": "CAMPUS HUB",
      "area": "회기 대학가",
      "keywords": "캠퍼스 · 환승 · 청년문화"
    },
    "청량리": {
      "title": "청량리역·전통시장",
      "subtitle": "광역철도와 대형 시장, 동북권 상업 기능이 집중된 핵심 교통 중심",
      "icon": "🚄",
      "badge": "MEGA TRANSIT HUB",
      "area": "청량리 광역권",
      "keywords": "광역철도 · 시장 · 상업"
    },
    "제기동": {
      "title": "서울약령시장",
      "subtitle": "한약재 상점과 전통시장이 밀집한 서울의 대표 한방 산업 지역",
      "icon": "🌿",
      "badge": "HERITAGE MARKET",
      "area": "제기동 한방권",
      "keywords": "한약재 · 시장 · 전통산업"
    },
    "신설동": {
      "title": "서울풍물시장",
      "subtitle": "오래된 교차로와 풍물시장, 여러 교통축이 만나는 동북 도심 관문",
      "icon": "🧭",
      "badge": "TRANSFER HUB",
      "area": "신설동 생활권",
      "keywords": "시장 · 환승 · 구도심"
    },
    "동묘앞": {
      "title": "동묘 벼룩시장",
      "subtitle": "중고품과 빈티지 상점, 동묘공원이 어우러진 독특한 도심 골목",
      "icon": "🧥",
      "badge": "VINTAGE DISTRICT",
      "area": "동묘 문화권",
      "keywords": "벼룩시장 · 빈티지 · 역사"
    },
    "동대문": {
      "title": "흥인지문",
      "subtitle": "한양도성의 동쪽 문과 의류 상권이 만나는 서울의 대표 역사 관문",
      "icon": "🏯",
      "badge": "HERITAGE CORE",
      "area": "동대문 역사상권",
      "keywords": "성곽 · 시장 · 도심"
    },
    "종로5가": {
      "title": "광장시장",
      "subtitle": "먹거리와 한복·원단 상점이 밀집한 서울의 대표 전통시장 지역",
      "icon": "🥟",
      "badge": "HERITAGE MARKET",
      "area": "종로 전통시장권",
      "keywords": "시장 · 먹거리 · 원단"
    },
    "종로3가": {
      "title": "익선동·탑골공원",
      "subtitle": "전통 골목과 귀금속 거리, 오래된 도심 문화가 겹치는 서울의 중심",
      "icon": "🏮",
      "badge": "HERITAGE CORE",
      "area": "종로 구도심권",
      "keywords": "한옥골목 · 역사 · 상업"
    },
    "종각": {
      "title": "보신각",
      "subtitle": "종로 업무지구와 젊음의 거리, 보신각이 만나는 서울 도심의 중심점",
      "icon": "🔔",
      "badge": "CITY CORE",
      "area": "종각 도심권",
      "keywords": "업무 · 역사 · 상권"
    },
    "시청": {
      "title": "서울광장·덕수궁",
      "subtitle": "서울 행정의 중심과 근대 궁궐, 광장이 맞닿은 대표 도심 공간",
      "icon": "🏛️",
      "badge": "CITY CORE",
      "area": "시청 도심권",
      "keywords": "행정 · 광장 · 궁궐"
    },
    "서울역": {
      "title": "서울역·서울로7017",
      "subtitle": "전국 철도와 도심 보행길, 남대문 생활권을 잇는 국가 교통 관문",
      "icon": "🚄",
      "badge": "NATIONAL HUB",
      "area": "서울역 광역권",
      "keywords": "KTX · 환승 · 도심관문"
    },
    "남영": {
      "title": "숙대입구·용산 골목",
      "subtitle": "대학가와 오래된 상가, 해방촌 방면 주거지가 이어지는 도심 생활권",
      "icon": "🏙️",
      "badge": "LOCAL DISTRICT",
      "area": "남영 생활권",
      "keywords": "대학 · 골목 · 도심주거"
    },
    "용산": {
      "title": "용산역·용리단길",
      "subtitle": "광역철도와 전자상가, 새롭게 성장한 골목 상권이 공존하는 지역",
      "icon": "💻",
      "badge": "MEGA TRANSIT HUB",
      "area": "용산 광역권",
      "keywords": "철도 · 전자상가 · 골목상권"
    },
    "노량진": {
      "title": "노량진수산시장",
      "subtitle": "수산시장과 학원가, 한강 교통축이 겹치는 활기찬 서남 도심",
      "icon": "🐟",
      "badge": "MARKET & CAMPUS",
      "area": "노량진 생활권",
      "keywords": "수산시장 · 학원가 · 한강"
    },
    "대방": {
      "title": "여의도 샛강 방면",
      "subtitle": "주거지와 업무지구 배후 생활권, 샛강 녹지가 가까운 연결 구간",
      "icon": "🌿",
      "badge": "URBAN LINK",
      "area": "대방 생활권",
      "keywords": "주거 · 업무 · 샛강"
    },
    "신길": {
      "title": "신길 환승권",
      "subtitle": "영등포 주거지와 5호선 환승, 여의도 접근이 편리한 서남권 거점",
      "icon": "🚇",
      "badge": "TRANSFER HUB",
      "area": "신길 생활권",
      "keywords": "환승 · 주거 · 여의도"
    },
    "영등포": {
      "title": "타임스퀘어·영등포시장",
      "subtitle": "대형 상업시설과 전통시장, 철도 교통이 집중된 서남권 중심지",
      "icon": "🛍️",
      "badge": "REGIONAL HUB",
      "area": "영등포 도심권",
      "keywords": "쇼핑 · 시장 · 철도"
    },
    "신도림": {
      "title": "신도림 환승센터",
      "subtitle": "1·2호선과 대형 상업시설, 서남권 이동축이 만나는 대형 환승 거점",
      "icon": "🚆",
      "badge": "MEGA TRANSIT HUB",
      "area": "신도림 광역권",
      "keywords": "환승 · 상업 · 업무"
    },
    "구로": {
      "title": "구로 철도기지",
      "subtitle": "경인·경부축이 갈라지고 산업도시의 철도 역사가 남은 교통 결절점",
      "icon": "🛤️",
      "badge": "RAIL JUNCTION",
      "area": "구로 철도생활권",
      "keywords": "분기 · 차량기지 · 산업"
    },
    "구일": {
      "title": "고척스카이돔",
      "subtitle": "안양천과 야구장, 수변 산책길이 연결되는 구로 서부 생활권",
      "icon": "⚾",
      "badge": "SPORTS & RIVER",
      "area": "구일 생활권",
      "keywords": "야구장 · 안양천 · 산책"
    },
    "개봉": {
      "title": "개봉동 생활상권",
      "subtitle": "전통시장과 주거 골목이 밀집한 구로구 서부의 생활 중심지",
      "icon": "🏘️",
      "badge": "LOCAL DISTRICT",
      "area": "개봉 생활권",
      "keywords": "시장 · 주거 · 골목"
    },
    "오류동": {
      "title": "오류시장",
      "subtitle": "오래된 철도 마을과 전통시장, 주거지가 이어지는 서울 서쪽 관문",
      "icon": "🧺",
      "badge": "LOCAL DISTRICT",
      "area": "오류 생활권",
      "keywords": "시장 · 철도마을 · 주거"
    },
    "온수": {
      "title": "서울푸른수목원",
      "subtitle": "7호선 환승과 수목원, 성공회대 캠퍼스가 가까운 녹지 관문",
      "icon": "🌳",
      "badge": "TRANSFER & GREEN",
      "area": "온수 생활권",
      "keywords": "수목원 · 환승 · 캠퍼스"
    },
    "역곡": {
      "title": "역곡상상시장",
      "subtitle": "대학가와 전통시장, 부천 동부 주거지가 함께 모인 활기찬 상권",
      "icon": "🎓",
      "badge": "LOCAL DISTRICT",
      "area": "역곡 생활권",
      "keywords": "시장 · 대학 · 주거"
    },
    "소사": {
      "title": "소사역 환승권",
      "subtitle": "서해선과 1호선이 만나며 부천 남부 생활권을 연결하는 교통 중심",
      "icon": "🚉",
      "badge": "TRANSFER HUB",
      "area": "소사 생활권",
      "keywords": "환승 · 구도심 · 주거"
    },
    "부천": {
      "title": "부천역 자유시장",
      "subtitle": "부천 구도심의 대형 상권과 시장, 문화 공간이 밀집한 지역 중심",
      "icon": "🎭",
      "badge": "REGIONAL HUB",
      "area": "부천 도심권",
      "keywords": "시장 · 문화 · 상업"
    },
    "중동": {
      "title": "중동 주거생활권",
      "subtitle": "신도시 아파트와 생활 상권이 안정적으로 형성된 부천 중심 주거지",
      "icon": "🏢",
      "badge": "NEW TOWN",
      "area": "중동 생활권",
      "keywords": "신도시 · 주거 · 상권"
    },
    "송내": {
      "title": "상동신도시 관문",
      "subtitle": "광역버스 환승과 부천 서부 신도시 생활권이 만나는 교통 거점",
      "icon": "🚌",
      "badge": "TRANSFER HUB",
      "area": "송내 광역생활권",
      "keywords": "광역버스 · 신도시 · 환승"
    },
    "부개": {
      "title": "부개동 주거지",
      "subtitle": "학교와 아파트 단지가 밀집한 부평 동부의 차분한 주거 생활권",
      "icon": "🏫",
      "badge": "RESIDENTIAL",
      "area": "부개 생활권",
      "keywords": "학교 · 아파트 · 주거"
    },
    "부평": {
      "title": "부평 지하상가",
      "subtitle": "수도권 최대 규모의 지하상가와 문화의 거리, 환승 기능이 모인 중심지",
      "icon": "🛍️",
      "badge": "REGIONAL HUB",
      "area": "부평 도심권",
      "keywords": "지하상가 · 환승 · 문화"
    },
    "백운": {
      "title": "부평공원·원적산",
      "subtitle": "도심 공원과 산자락, 오래된 주거지가 이어지는 부평 서부 지역",
      "icon": "🌳",
      "badge": "PARK & GREEN",
      "area": "백운 생활권",
      "keywords": "공원 · 산자락 · 주거"
    },
    "동암": {
      "title": "동암역 상권",
      "subtitle": "간석오거리 생활권과 주거지, 지역 상점이 모인 인천 동부 중심",
      "icon": "🏙️",
      "badge": "LOCAL DISTRICT",
      "area": "동암 생활권",
      "keywords": "상권 · 주거 · 버스환승"
    },
    "간석": {
      "title": "간석동 생활권",
      "subtitle": "석바위시장 방면 주거 골목과 행정·생활시설이 이어지는 지역",
      "icon": "🏘️",
      "badge": "RESIDENTIAL",
      "area": "간석 생활권",
      "keywords": "시장 · 주거 · 생활시설"
    },
    "주안": {
      "title": "주안역 상권",
      "subtitle": "인천 구도심의 대형 상권과 시민공원 환승축이 만나는 지역 중심",
      "icon": "🚉",
      "badge": "REGIONAL HUB",
      "area": "주안 도심권",
      "keywords": "상업 · 환승 · 구도심"
    },
    "도화": {
      "title": "도화지구",
      "subtitle": "산업시설을 재생한 업무·주거 복합지와 대학가가 성장하는 지역",
      "icon": "🏗️",
      "badge": "URBAN REGENERATION",
      "area": "도화 생활권",
      "keywords": "재생 · 업무 · 주거"
    },
    "제물포": {
      "title": "수봉공원·제물포",
      "subtitle": "인천대학교 옛 캠퍼스와 수봉산, 오래된 주거지가 이어지는 구도심",
      "icon": "🌄",
      "badge": "HERITAGE DISTRICT",
      "area": "제물포 생활권",
      "keywords": "수봉공원 · 대학역사 · 주거"
    },
    "도원": {
      "title": "인천축구전용경기장",
      "subtitle": "프로축구 경기장과 인천 구도심 골목이 맞닿은 스포츠 거점",
      "icon": "⚽",
      "badge": "SPORTS DISTRICT",
      "area": "도원 생활권",
      "keywords": "축구장 · 구도심 · 시장"
    },
    "동인천": {
      "title": "신포시장·개항장",
      "subtitle": "개항기 건축과 전통시장, 자유공원으로 이어지는 인천 역사 중심",
      "icon": "⚓",
      "badge": "HARBOR HERITAGE",
      "area": "동인천 개항장권",
      "keywords": "개항장 · 시장 · 근대건축"
    },
    "인천": {
      "title": "차이나타운·월미도",
      "subtitle": "대한민국 철도의 시작점과 개항장, 항구 관광지가 만나는 종점",
      "icon": "🚢",
      "badge": "HARBOR TERMINUS",
      "area": "인천 개항장권",
      "keywords": "차이나타운 · 항구 · 종점"
    },
    "가산디지털단지": {
      "title": "G밸리",
      "subtitle": "대형 지식산업센터와 IT 기업, 7호선 환승이 집중된 산업 업무지구",
      "icon": "💻",
      "badge": "DIGITAL BUSINESS",
      "area": "가산 업무권",
      "keywords": "IT · 업무 · 환승"
    },
    "독산": {
      "title": "독산동 우시장",
      "subtitle": "오래된 음식 골목과 산업·주거 기능이 공존하는 금천 생활권",
      "icon": "🥩",
      "badge": "LOCAL DISTRICT",
      "area": "독산 생활권",
      "keywords": "먹거리 · 산업 · 주거"
    },
    "금천구청": {
      "title": "금천구청·안양천",
      "subtitle": "행정시설과 수변 산책로, 광명 방향 분기선이 만나는 교통 지점",
      "icon": "🏛️",
      "badge": "CIVIC & RIVER",
      "area": "금천 행정권",
      "keywords": "행정 · 안양천 · 분기"
    },
    "광명": {
      "title": "KTX광명역",
      "subtitle": "고속철도와 대형 상업시설, 광명동굴 관광축을 잇는 광역 종점",
      "icon": "🚄",
      "badge": "HIGH-SPEED HUB",
      "area": "광명 광역권",
      "keywords": "KTX · 쇼핑 · 종점"
    },
    "석수": {
      "title": "안양예술공원 관문",
      "subtitle": "삼성산과 예술공원, 안양천이 가까운 서울·안양 경계 지역",
      "icon": "🎨",
      "badge": "GREEN GATE",
      "area": "석수 생활권",
      "keywords": "예술공원 · 산행 · 안양천"
    },
    "관악": {
      "title": "안양예술공원",
      "subtitle": "삼성산 계곡과 공공예술 작품을 만나는 안양 북부의 문화·자연 관문",
      "icon": "🌳",
      "badge": "ART & GREEN",
      "area": "관악역 생활권",
      "keywords": "예술공원 · 계곡 · 산책"
    },
    "안양": {
      "title": "안양1번가·중앙시장",
      "subtitle": "전통시장과 대형 상권, 행정 기능이 모인 안양 구도심의 중심",
      "icon": "🛍️",
      "badge": "REGIONAL HUB",
      "area": "안양 도심권",
      "keywords": "시장 · 상업 · 교통"
    },
    "명학": {
      "title": "안양 산업생활권",
      "subtitle": "산업단지와 성결대, 주거지가 이어지는 안양 중부 생활 지역",
      "icon": "🏭",
      "badge": "INDUSTRIAL DISTRICT",
      "area": "명학 생활권",
      "keywords": "산업 · 캠퍼스 · 주거"
    },
    "금정": {
      "title": "금정 환승역",
      "subtitle": "1·4호선과 군포 산업지대, 여러 버스 노선이 모이는 남부권 환승 거점",
      "icon": "🚇",
      "badge": "TRANSFER HUB",
      "area": "금정 광역생활권",
      "keywords": "환승 · 산업 · 광역이동"
    },
    "군포": {
      "title": "군포역전시장",
      "subtitle": "오래된 역전 상권과 당동 주거지가 이어지는 군포의 전통 중심지",
      "icon": "🧺",
      "badge": "LOCAL DISTRICT",
      "area": "군포 생활권",
      "keywords": "시장 · 구도심 · 주거"
    },
    "당정": {
      "title": "한세대학교",
      "subtitle": "캠퍼스와 군포 첨단산업단지, 새로운 주거지가 연결되는 역세권",
      "icon": "🎓",
      "badge": "CAMPUS & INDUSTRY",
      "area": "당정 생활권",
      "keywords": "캠퍼스 · 산업 · 주거"
    },
    "의왕": {
      "title": "철도박물관·왕송호수",
      "subtitle": "대한민국 철도 역사와 생태 호수를 함께 만나는 의왕의 대표 공간",
      "icon": "🚂",
      "badge": "RAIL HERITAGE",
      "area": "의왕 철도생활권",
      "keywords": "철도박물관 · 호수 · 생태"
    },
    "성균관대": {
      "title": "성균관대 자연과학캠퍼스",
      "subtitle": "대학 캠퍼스와 연구시설, 주거 상권이 밀집한 수원 북부 대학가",
      "icon": "🔬",
      "badge": "CAMPUS AREA",
      "area": "성균관대 생활권",
      "keywords": "연구 · 캠퍼스 · 청년상권"
    },
    "화서": {
      "title": "화서시장·수원화성 서부",
      "subtitle": "전통시장과 대단지 주거, 수원화성 서쪽 생활권을 잇는 지역",
      "icon": "🏯",
      "badge": "HERITAGE DISTRICT",
      "area": "화서 생활권",
      "keywords": "시장 · 수원화성 · 주거"
    },
    "수원": {
      "title": "수원역·로데오거리",
      "subtitle": "KTX·일반철도·수인분당선과 대형 상권이 집중된 경기 남부 중심",
      "icon": "🚄",
      "badge": "MEGA TRANSIT HUB",
      "area": "수원 광역권",
      "keywords": "철도 · 쇼핑 · 광역교통"
    },
    "세류": {
      "title": "세류동 생활권",
      "subtitle": "수원비행장과 저층 주거지, 세류천 생활권이 이어지는 구간",
      "icon": "🏘️",
      "badge": "RESIDENTIAL",
      "area": "세류 생활권",
      "keywords": "주거 · 하천 · 공항인접"
    },
    "병점": {
      "title": "병점 중심상가",
      "subtitle": "화성 동부의 대형 주거지와 차량기지, 서동탄 지선이 갈라지는 분기점",
      "icon": "🛤️",
      "badge": "RAIL JUNCTION",
      "area": "병점 생활권",
      "keywords": "분기 · 주거 · 상업"
    },
    "서동탄": {
      "title": "동탄신도시 서부",
      "subtitle": "병점차량기지와 동탄 서부 주거지 사이에 자리한 1호선 지선 종점",
      "icon": "🏁",
      "badge": "BRANCH TERMINUS",
      "area": "서동탄 생활권",
      "keywords": "신도시 · 차량기지 · 종점"
    },
    "세마": {
      "title": "세마대·오산 북부",
      "subtitle": "독산성 역사와 새 주거단지, 산업시설이 공존하는 오산 북부 지역",
      "icon": "🏯",
      "badge": "LOCAL DISTRICT",
      "area": "세마 생활권",
      "keywords": "역사 · 주거 · 산업"
    },
    "오산대": {
      "title": "물향기수목원",
      "subtitle": "경기도립 수목원과 대학가, 오산천 녹지가 가까운 자연 생활권",
      "icon": "🌲",
      "badge": "PARK & CAMPUS",
      "area": "오산대 생활권",
      "keywords": "수목원 · 캠퍼스 · 산책"
    },
    "오산": {
      "title": "오산시장·오산천",
      "subtitle": "전통시장과 행정·상업 기능, 수변 산책로가 모인 오산의 중심",
      "icon": "🧺",
      "badge": "REGIONAL HUB",
      "area": "오산 도심권",
      "keywords": "시장 · 하천 · 행정"
    },
    "진위": {
      "title": "진위천",
      "subtitle": "넓은 들녘과 하천, 산업단지가 이어지는 평택 북부의 전원 구간",
      "icon": "🌾",
      "badge": "RURAL & INDUSTRY",
      "area": "진위 생활권",
      "keywords": "하천 · 들녘 · 산업"
    },
    "송탄": {
      "title": "송탄관광특구",
      "subtitle": "신장쇼핑몰과 국제 음식문화, 평택 북부 상권이 발달한 지역",
      "icon": "🌍",
      "badge": "CULTURE STREET",
      "area": "송탄 생활권",
      "keywords": "국제상권 · 먹거리 · 문화"
    },
    "서정리": {
      "title": "고덕신도시 관문",
      "subtitle": "국제중앙시장과 고덕산업단지 배후 신도시를 잇는 교통 거점",
      "icon": "🏗️",
      "badge": "NEW TOWN HUB",
      "area": "서정리·고덕권",
      "keywords": "신도시 · 시장 · 산업"
    },
    "평택지제": {
      "title": "SRT 평택지제역",
      "subtitle": "고속철도와 1호선, 고덕산업단지를 연결하는 평택의 새 광역 관문",
      "icon": "🚄",
      "badge": "HIGH-SPEED HUB",
      "area": "평택지제 광역권",
      "keywords": "SRT · 환승 · 산업"
    },
    "평택": {
      "title": "평택역·통복시장",
      "subtitle": "전통시장과 대형 상권, 경기 남부 철도 교통이 모인 평택 도심 중심",
      "icon": "🛍️",
      "badge": "REGIONAL HUB",
      "area": "평택 도심권",
      "keywords": "시장 · 상업 · 철도"
    },
    "성환": {
      "title": "성환이화시장",
      "subtitle": "배 농업으로 유명한 들녘과 전통시장이 이어지는 천안 북부 지역",
      "icon": "🍐",
      "badge": "RURAL TOWN",
      "area": "성환 생활권",
      "keywords": "배 농업 · 시장 · 지역상권"
    },
    "직산": {
      "title": "천안 북부 산업축",
      "subtitle": "산업단지와 농촌 마을, 신흥 주거지가 함께 성장하는 천안 북부 구간",
      "icon": "🏭",
      "badge": "INDUSTRIAL DISTRICT",
      "area": "직산 생활권",
      "keywords": "산업 · 농촌 · 주거"
    },
    "두정": {
      "title": "두정동 대학가",
      "subtitle": "대학과 음식점, 원룸촌이 밀집한 천안의 대표 청년 생활권",
      "icon": "🍜",
      "badge": "CAMPUS DISTRICT",
      "area": "두정 생활권",
      "keywords": "대학 · 먹거리 · 청년주거"
    },
    "천안": {
      "title": "천안역·중앙시장",
      "subtitle": "경부·장항선 철도와 전통시장, 천안 구도심이 만나는 충남 교통 중심",
      "icon": "🚉",
      "badge": "REGIONAL HUB",
      "area": "천안 도심권",
      "keywords": "철도 · 시장 · 구도심"
    },
    "봉명": {
      "title": "순천향대 천안병원",
      "subtitle": "의료시설과 주거지, 천안천 생활권이 이어지는 장항선 도심 구간",
      "icon": "🏥",
      "badge": "MEDICAL DISTRICT",
      "area": "봉명 생활권",
      "keywords": "병원 · 주거 · 하천"
    },
    "쌍용": {
      "title": "나사렛대학교",
      "subtitle": "대학 캠퍼스와 주거·생활 상권이 밀집한 천안 서남부 생활권",
      "icon": "🎓",
      "badge": "CAMPUS AREA",
      "area": "쌍용 생활권",
      "keywords": "캠퍼스 · 주거 · 상권"
    },
    "아산": {
      "title": "KTX 천안아산역",
      "subtitle": "고속철도 환승과 신도시 업무·상업 기능이 집중된 천안아산 광역 거점",
      "icon": "🚄",
      "badge": "HIGH-SPEED HUB",
      "area": "천안아산 광역권",
      "keywords": "KTX · 환승 · 신도시"
    },
    "탕정": {
      "title": "탕정신도시",
      "subtitle": "디스플레이 산업단지와 새 아파트 단지가 성장하는 아산 첨단 생활권",
      "icon": "💡",
      "badge": "TECH NEW TOWN",
      "area": "탕정 신도시권",
      "keywords": "첨단산업 · 신도시 · 주거"
    },
    "배방": {
      "title": "배방신도시",
      "subtitle": "아산 동부의 대단지 주거와 생활 상권이 안정적으로 형성된 신도시",
      "icon": "🏘️",
      "badge": "NEW TOWN",
      "area": "배방 생활권",
      "keywords": "신도시 · 주거 · 상권"
    },
    "온양온천": {
      "title": "온양온천·전통시장",
      "subtitle": "오랜 온천 문화와 전통시장, 아산 도심 상권이 모인 대표 관광 거점",
      "icon": "♨️",
      "badge": "HOT SPRING CITY",
      "area": "온양 도심권",
      "keywords": "온천 · 시장 · 관광"
    },
    "신창": {
      "title": "순천향대학교",
      "subtitle": "대학 캠퍼스와 농촌 풍경, 장항선 전철의 남서쪽 종점이 만나는 지역",
      "icon": "🏁",
      "badge": "CAMPUS TERMINUS",
      "area": "신창 생활권",
      "keywords": "캠퍼스 · 농촌 · 종점"
    }
  };
})();
