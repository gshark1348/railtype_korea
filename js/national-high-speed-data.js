/*
 * RAILTYPE KOREA · 전국 KTX·KTX-이음·SRT 확장 데이터 · v30.0
 * 기준일: 2026-07-16 · 좌표계: WGS84
 *
 * 모든 열차가 매번 전 역에 정차한다는 뜻이 아니라, 각 운행계통에서 선택 가능한
 * 정차역을 한 번에 학습할 수 있도록 구성한 대표 정차 코스입니다.
 */
(() => {
  "use strict";

  const stationData = {
    서울: ["SEOUL", 37.554648, 126.972559], 용산: ["YONGSAN", 37.529910, 126.964800],
    광명: ["GWANGMYEONG", 37.416451, 126.884804], 수서: ["SUSEO", 37.487507, 127.101324],
    동탄: ["DONGTAN", 37.199300, 127.097040], 평택지제: ["PYEONGTAEK JIJE", 37.018795, 127.070437],
    천안아산: ["CHEONAN-ASAN", 36.794383, 127.104522], 오송: ["OSONG", 36.620159, 127.327532],
    대전: ["DAEJEON", 36.332116, 127.434136], 김천구미: ["GIMCHEON-GUMI", 36.113742, 128.180983],
    서대구: ["SEODAEGU", 35.881667, 128.539167], 동대구: ["DONGDAEGU", 35.879436, 128.628889],
    경주: ["GYEONGJU", 35.798386, 129.138325], 울산: ["ULSAN", 35.551329, 129.138742],
    부산: ["BUSAN", 35.115109, 129.041419], 공주: ["GONGJU", 36.332361, 127.096778],
    익산: ["IKSAN", 35.941636, 126.945797], 정읍: ["JEONGEUP", 35.575556, 126.842500],
    광주송정: ["GWANGJU-SONGJEONG", 35.137400, 126.791000], 나주: ["NAJU", 35.014261, 126.716994],
    목포: ["MOKPO", 34.791940, 126.387220], 전주: ["JEONJU", 35.849800, 127.161900],
    남원: ["NAMWON", 35.411400, 127.378900], 곡성: ["GOKSEONG", 35.283700, 127.303700],
    구례구: ["GURYEGU", 35.163600, 127.451800], 순천: ["SUNCHEON", 34.945900, 127.503300],
    여천: ["YEOCHEON", 34.777100, 127.664200], 여수엑스포: ["YEOSU EXPO", 34.753100, 127.748900],
    밀양: ["MIRYANG", 35.474500, 128.771000], 진영: ["JINYEONG", 35.307700, 128.732100],
    창원중앙: ["CHANGWON JUNGANG", 35.243000, 128.681000], 창원: ["CHANGWON", 35.257600, 128.607000],
    마산: ["MASAN", 35.236100, 128.577100], 진주: ["JINJU", 35.150200, 128.118700],
    포항: ["POHANG", 36.071700, 129.341700], 청량리: ["CHEONGNYANGNI", 37.580039, 127.044727],
    상봉: ["SANGBONG", 37.595673, 127.085708], 양평: ["YANGPYEONG", 37.492800, 127.491900],
    만종: ["MANJONG", 37.351300, 127.839600], 횡성: ["HOENGSEONG", 37.490000, 127.985100],
    둔내: ["DUNNAE", 37.510200, 128.219600], 평창: ["PYEONGCHANG", 37.562800, 128.429200],
    진부: ["JINBU (ODAESAN)", 37.642900, 128.574000], 강릉: ["GANGNEUNG", 37.763600, 128.899600],
    정동진: ["JEONGDONGJIN", 37.691400, 129.032800], 묵호: ["MUKHO", 37.547100, 129.107700],
    동해: ["DONGHAE", 37.498300, 129.123800], 서원주: ["SEOWONJU", 37.427400, 127.763000],
    원주: ["WONJU", 37.357400, 127.947100], 제천: ["JECHEON", 37.128100, 128.205400],
    단양: ["DANYANG", 36.979500, 128.365800], 풍기: ["PUNGGI", 36.872700, 128.524400],
    영주: ["YEONGJU", 36.811200, 128.624000], 안동: ["ANDONG", 36.575900, 128.699600],
    의성: ["UISEONG", 36.352700, 128.697000], 영천: ["YEONGCHEON", 35.964400, 128.938800],
    태화강: ["TAEHWAGANG", 35.538900, 129.349000], 부전: ["BUJEON", 35.162000, 129.060000],
    판교: ["PANGYO", 37.394800, 127.111100], 부발: ["BUBAL", 37.260400, 127.490400],
    가남: ["GANAM", 37.202500, 127.545200], 감곡장호원: ["GAMGOK JANGHOWON", 37.128900, 127.546500],
    앙성온천: ["ANGSEONG ONSEN", 37.081300, 127.757700], 충주: ["CHUNGJU", 36.975100, 127.909000],
    살미: ["SALMI", 36.905000, 127.966000], 수안보온천: ["SUANBO ONSEN", 36.846000, 127.993000],
    연풍: ["YEONPUNG", 36.742000, 128.006000], 문경: ["MUNGYEONG", 36.729000, 128.108000],
    삼척: ["SAMCHEOK", 37.448400, 129.165700], 울진: ["ULJIN", 36.984000, 129.394000],
    영덕: ["YEONGDEOK", 36.415800, 129.373700]
  };

  let stationSequence = 0;
  const route = (names, prefix) => names.map((name) => {
    const value = stationData[name];
    if (!value) throw new Error(`Missing national rail station: ${name}`);
    stationSequence += 1;
    return { code: `${prefix}${String(stationSequence).padStart(3, "0")}`, name, en: value[0], lat: value[1], lng: value[2] };
  });

  const names = {
    gangneung: ["서울", "청량리", "상봉", "양평", "만종", "횡성", "둔내", "평창", "진부", "강릉"],
    gangneungDonghae: ["서울", "청량리", "상봉", "양평", "만종", "횡성", "둔내", "평창", "진부", "정동진", "묵호", "동해"],
    jungang: ["청량리", "상봉", "양평", "서원주", "원주", "제천", "단양", "풍기", "영주", "안동", "의성", "영천", "경주", "태화강", "부전"],
    jungbunaeryuk: ["판교", "부발", "가남", "감곡장호원", "앙성온천", "충주", "살미", "수안보온천", "연풍", "문경"],
    jeolla: ["용산", "광명", "천안아산", "오송", "공주", "익산", "전주", "남원", "곡성", "구례구", "순천", "여천", "여수엑스포"],
    gyeongjeon: ["서울", "광명", "천안아산", "오송", "대전", "김천구미", "서대구", "동대구", "밀양", "진영", "창원중앙", "창원", "마산", "진주"],
    pohang: ["서울", "광명", "천안아산", "오송", "대전", "김천구미", "서대구", "동대구", "포항"],
    eastCoast: ["강릉", "정동진", "묵호", "동해", "삼척", "울진", "영덕", "포항", "경주", "태화강", "부전"],
    srtGyeongbu: ["수서", "동탄", "평택지제", "천안아산", "오송", "대전", "김천구미", "서대구", "동대구", "경주", "울산", "부산"],
    srtHonam: ["수서", "동탄", "평택지제", "천안아산", "오송", "공주", "익산", "정읍", "광주송정", "나주", "목포"],
    srtJeolla: ["수서", "동탄", "평택지제", "천안아산", "오송", "공주", "익산", "전주", "남원", "곡성", "구례구", "순천", "여천", "여수엑스포"],
    srtGyeongjeon: ["수서", "동탄", "평택지제", "천안아산", "오송", "대전", "김천구미", "서대구", "동대구", "밀양", "진영", "창원중앙", "창원", "마산", "진주"],
    srtDonghae: ["수서", "동탄", "평택지제", "천안아산", "오송", "대전", "김천구미", "서대구", "동대구", "포항"]
  };

  const routes = Object.fromEntries(Object.entries(names).map(([key, value]) => [key, route(value, key.slice(0, 3).toUpperCase())]));
  const nationwideBounds = { minLng: 125.9, maxLng: 129.6, minLat: 33.0, maxLat: 38.7 };
  const korailSources = [
    { name: "한국철도공사 · KTX 운행노선 현황", url: "https://info.korail.com/info/selectBbsNttView.do?bbsNo=199&integrDeptCode=&key=911&nttNo=24441" },
    { name: "한국철도공사 · 철도 연혁", url: "https://info.korail.com/info/contents.do?key=717" },
    { name: "공공데이터포털 · 한국철도공사 역 위치 정보", url: "https://www.data.go.kr/data/15127532/fileData.do" }
  ];
  const srSources = [
    { name: "SR · SRT 운행구간", url: "https://www.srail.or.kr/cms/archive.do?pageId=KR0405000000" },
    { name: "SR · 전라·경전·동해선 운행 확대", url: "https://www.srail.or.kr/cms/article/view.do?pageId=KR0502000000&postNo=1009" },
    { name: "공공데이터포털 · 한국철도공사 역 위치 정보", url: "https://www.data.go.kr/data/15127532/fileData.do" }
  ];

  const makeCourse = (id, title, stations, start, end, subtitle) => ({
    id, name: title, subtitle, start, end,
    mapBounds: { ...nationwideBounds },
    cornerLabels: { northWest: start.toUpperCase(), southEast: end.toUpperCase() },
    mapLabels: [
      { text: start.toUpperCase(), lng: stations[0].lng, lat: stations[0].lat },
      { text: "NATIONAL RAIL", lng: 127.8, lat: 36.3, muted: true },
      { text: end.toUpperCase(), lng: stations[stations.length - 1].lng, lat: stations[stations.length - 1].lat }
    ],
    directions: [
      { id: `to-${end}`, name: `${end}행`, destination: end, subtitle: `${start} 출발 · ${end} 종착`, mode: "forward" },
      { id: `to-${start}`, name: `${start}행`, destination: start, subtitle: `${end} 출발 · ${start} 종착`, mode: "reverse" }
    ],
    stations
  });

  const makeHistory = (summary, launch, sources, extraEvent) => ({
    period: `${launch} — 현재`, summary,
    events: [
      { year: launch, label: "운행 시작", detail: summary },
      ...(extraEvent ? [extraEvent] : []),
      { year: "2026.07", label: "학습 코스 기준", detail: "현재 공개된 운행계통과 정차역 정보를 바탕으로 대표 정차 코스를 구성했습니다. 실제 열차별 정차역은 시간표에 따라 다릅니다." }
    ],
    sources
  });

  const train = (kind, name) => kind === "srt" ? {
    src: "./assets/trains/srt.jpg", alt: `${name}에 투입되는 SRT 130000호대 실제 열차 사진`, caption: "SRT 130000호대 · 수서역",
    credit: "jmk2765 · Wikimedia Commons", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:SRT_train_130000_Series.jpg"
  } : kind === "eum" ? {
    src: "./assets/trains/ktx-eum.jpg", alt: `${name}에 투입되는 KTX-이음 실제 열차 사진`, caption: "KTX-이음 · 용산",
    credit: "Takeshi Aida · Wikimedia Commons", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Korail_KTX-Eum,_Yongsan_(20240404)_(54220932565).jpg"
  } : {
    src: "./assets/trains/ktx-gyeongbu.jpg", alt: `${name} KTX 고속열차`, caption: "KTX-I 고속열차",
    credit: "Subway06 · Wikimedia Commons", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:KTX_(Korea_Train_eXpress).jpg"
  };

  const makeLine = ({ id, symbol, code, name, color, darkColor, kind, hero, summary, launch, courses, extraEvent }) => ({
    number: symbol, code, name, color, darkColor, softColor: `${color}29`,
    areaLabel: kind === "srt" ? "SRT NATIONAL EXPRESS" : "KTX NATIONAL NETWORK",
    heroRegion: hero,
    train: train(kind, name),
    history: makeHistory(summary, launch, kind === "srt" ? srSources : korailSources, extraEvent),
    courses,
    majorStations: [...new Set(Object.values(courses).flatMap((course) => course.stations.map((item) => item.name)))]
  });

  const lineDefinitions = {
    16: makeLine({ symbol: "K", code: "KTX-GN", name: "KTX 강릉선", color: "#2878C8", darkColor: "#15508B", kind: "ktx", hero: "서울에서 강릉·동해까지", launch: "2017.12", summary: "서울·청량리와 강릉을 잇고 일부 열차가 정동진·묵호·동해까지 운행하는 KTX 강릉선입니다.", courses: {
      gangneung: makeCourse("gangneung", "서울 · 강릉", routes.gangneung, "서울", "강릉", "청량리와 평창을 지나 강릉까지"),
      donghae: makeCourse("donghae", "서울 · 동해", routes.gangneungDonghae, "서울", "동해", "평창을 지나 정동진·묵호·동해까지")
    }}),
    17: makeLine({ symbol: "이", code: "KTX-EUM-JA", name: "KTX-이음 중앙선", color: "#178A8A", darkColor: "#0B5C5C", kind: "eum", hero: "청량리에서 안동을 지나 부전까지", launch: "2021.01", summary: "청량리에서 원주·제천·영주·안동을 지나 경주·태화강·부전까지 이어지는 중앙선 KTX-이음입니다.", courses: { main: makeCourse("main", "중앙선 전 구간", routes.jungang, "청량리", "부전", "원주·안동·경주·태화강을 잇는 중앙선") }, extraEvent: { year: "2024.12", label: "부전 연장", detail: "중앙선 복선전철화와 함께 KTX-이음 운행이 안동에서 부전까지 연장되었습니다." } }),
    18: makeLine({ symbol: "이", code: "KTX-EUM-JN", name: "KTX-이음 중부내륙선", color: "#2F8F6B", darkColor: "#1E624A", kind: "eum", hero: "판교에서 충주를 지나 문경까지", launch: "2021.12", summary: "수도권 판교에서 이천·충주·수안보를 지나 문경까지 이어지는 중부내륙선 KTX-이음입니다.", courses: { main: makeCourse("main", "판교 · 문경", routes.jungbunaeryuk, "판교", "문경", "부발·충주·수안보를 잇는 중부내륙축") }, extraEvent: { year: "2024.11", label: "판교–문경 전 구간 개통", detail: "충주–문경 구간과 판교 연계 운행이 시작되어 현재의 전 구간 운행축이 완성되었습니다." } }),
    19: makeLine({ symbol: "K", code: "KTX-JL", name: "KTX 전라선", color: "#436FB3", darkColor: "#294A7A", kind: "ktx", hero: "용산에서 전주·순천·여수까지", launch: "2011.10", summary: "용산에서 호남고속축을 거쳐 익산에서 전라선으로 분기해 전주·남원·순천·여수엑스포를 잇는 KTX입니다.", courses: { main: makeCourse("main", "용산 · 여수엑스포", routes.jeolla, "용산", "여수엑스포", "전주·남원·순천을 잇는 전라선") } }),
    20: makeLine({ symbol: "K", code: "KTX-GJ", name: "KTX 경전선", color: "#3F72A8", darkColor: "#285078", kind: "ktx", hero: "서울에서 창원·진주까지", launch: "2010.12", summary: "서울에서 경부고속축을 달린 뒤 밀양에서 경전선으로 분기해 창원·마산·진주를 잇는 KTX입니다.", courses: { main: makeCourse("main", "서울 · 진주", routes.gyeongjeon, "서울", "진주", "밀양·창원·마산을 잇는 경전선") } }),
    21: makeLine({ symbol: "K", code: "KTX-DH", name: "KTX 동해선(포항)", color: "#346C9E", darkColor: "#244B6D", kind: "ktx", hero: "서울에서 포항까지", launch: "2015.04", summary: "서울에서 경부고속축을 달린 뒤 동대구에서 포항 방향 동해선으로 분기하는 KTX입니다.", courses: { main: makeCourse("main", "서울 · 포항", routes.pohang, "서울", "포항", "대전·동대구를 지나 포항까지") } }),
    22: makeLine({ symbol: "이", code: "KTX-EUM-EC", name: "KTX-이음 동해선(강릉–부전)", color: "#0D7C9E", darkColor: "#07536A", kind: "eum", hero: "동해안을 따라 강릉에서 부전까지", launch: "2025.12", summary: "강릉에서 정동진·동해·삼척·울진·영덕·포항을 거쳐 경주·태화강·부전까지 잇는 동해선 KTX-이음입니다.", courses: { main: makeCourse("main", "강릉 · 부전", routes.eastCoast, "강릉", "부전", "동해안 11개 역을 잇는 남북 고속축") } }),
    23: makeLine({ symbol: "S", code: "SRT-GB", name: "SRT 경부선", color: "#8A1733", darkColor: "#5B0D21", kind: "srt", hero: "수서에서 부산까지", launch: "2016.12", summary: "수서에서 동탄·평택지제를 거쳐 경부고속철도 축을 따라 부산까지 운행하는 SRT입니다.", courses: { main: makeCourse("main", "수서 · 부산", routes.srtGyeongbu, "수서", "부산", "대전·동대구·경주·울산을 잇는 SRT") } }),
    24: makeLine({ symbol: "S", code: "SRT-HN", name: "SRT 호남선", color: "#7A1838", darkColor: "#501027", kind: "srt", hero: "수서에서 목포까지", launch: "2016.12", summary: "수서에서 오송·공주·익산·광주송정을 거쳐 목포까지 운행하는 SRT 호남선입니다.", courses: { main: makeCourse("main", "수서 · 목포", routes.srtHonam, "수서", "목포", "익산·광주송정·나주를 잇는 SRT") } }),
    25: makeLine({ symbol: "S", code: "SRT-JL", name: "SRT 전라선", color: "#992447", darkColor: "#65172F", kind: "srt", hero: "수서에서 여수엑스포까지", launch: "2023.09", summary: "수서에서 익산을 거쳐 전주·남원·순천·여수엑스포까지 운행하는 SRT 전라선입니다.", courses: { main: makeCourse("main", "수서 · 여수엑스포", routes.srtJeolla, "수서", "여수엑스포", "전주·남원·순천을 잇는 SRT") } }),
    26: makeLine({ symbol: "S", code: "SRT-GJ", name: "SRT 경전선", color: "#861B3A", darkColor: "#571226", kind: "srt", hero: "수서에서 진주까지", launch: "2023.09", summary: "수서에서 경부고속축과 밀양을 거쳐 창원·마산·진주까지 운행하는 SRT 경전선입니다.", courses: { main: makeCourse("main", "수서 · 진주", routes.srtGyeongjeon, "수서", "진주", "밀양·창원·마산을 잇는 SRT") } }),
    27: makeLine({ symbol: "S", code: "SRT-DH", name: "SRT 동해선", color: "#75152F", darkColor: "#4A0D1E", kind: "srt", hero: "수서에서 포항까지", launch: "2023.09", summary: "수서에서 경부고속축을 달린 뒤 동대구에서 포항 방향으로 분기하는 SRT 동해선입니다.", courses: { main: makeCourse("main", "수서 · 포항", routes.srtDonghae, "수서", "포항", "대전·동대구를 지나 포항까지") } })
  };

  Object.assign(window.METRO_LINES, lineDefinitions);

  const makeContexts = (lineNumber, line) => Object.fromEntries(line.majorStations.map((name) => {
    const station = Object.values(line.courses).flatMap((course) => course.stations).find((item) => item.name === name);
    return [name, {
      title: station?.en || name,
      subtitle: `${line.name} 대표 정차 코스의 ${name}역입니다. 실제 열차별 정차 여부는 시간표에 따라 다릅니다.`,
      icon: line.code.startsWith("SRT") ? "🚅" : "🚄",
      badge: line.code.startsWith("SRT") ? "SRT STATION" : "KTX STATION",
      area: line.areaLabel,
      keywords: "고속철도 · 전국 연결 · 환승"
    }];
  }));

  window.NATIONAL_HIGH_SPEED_CONTEXTS = Object.fromEntries(Object.entries(lineDefinitions).map(([lineNumber, line]) => [lineNumber, makeContexts(lineNumber, line)]));
  window.NATIONAL_HIGH_SPEED_META = {
    asOf: "2026-07-16", coordinateSystem: "WGS84", newLineNumbers: Object.keys(lineDefinitions).map(Number),
    note: "대표 정차 코스이며 실제 열차별 정차역은 운행일과 시간표에 따라 다릅니다.", sources: [...korailSources, ...srSources]
  };
})();
