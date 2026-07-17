/*
 * RAILTYPE KOREA GTX-A·B·C 노선 데이터
 * 좌표계: WGS84 위도·경도
 *
 * A노선은 2026년 7월 기준 개통역과 계획역을 함께 표시합니다.
 * B·C노선은 아직 건설·계획 단계이므로 게임에서도 계획 노선으로 안내합니다.
 * 계획역 좌표는 노선 학습용 기준점이며 측량·공사용 좌표가 아닙니다.
 */
(() => {
  const station = (code, name, en, lat, lng, status = "planned") => ({
    code,
    name,
    en,
    lat,
    lng,
    status
  });

  const gtxA = [
    station("A01", "운정중앙", "Unjeong Jungang", 37.716670, 126.728330, "open"),
    station("A02", "킨텍스", "KINTEX", 37.665000, 126.748060, "open"),
    station("A03", "대곡", "Daegok", 37.631626, 126.811024, "open"),
    station("A04", "창릉", "Changneung", 37.622000, 126.880000, "planned"),
    station("A05", "연신내", "Yeonsinnae", 37.618855, 126.920859, "open"),
    station("A06", "서울역", "Seoul Station", 37.555980, 126.972091, "open"),
    station("A07", "삼성", "Samseong", 37.508827, 127.063203, "passThrough"),
    station("A08", "수서", "Suseo", 37.487507, 127.101324, "open"),
    station("A09", "성남", "Seongnam", 37.394720, 127.119440, "open"),
    station("A10", "구성", "Guseong", 37.298977, 127.105696, "open"),
    station("A11", "동탄", "Dongtan", 37.199300, 127.097040, "open")
  ];

  const gtxB = [
    station("B01", "인천대입구", "Incheon National University", 37.385900, 126.639000),
    station("B02", "인천시청", "Incheon City Hall", 37.457611, 126.700016),
    station("B03", "부평", "Bupyeong", 37.489449, 126.724331),
    station("B04", "부천종합운동장", "Bucheon Stadium", 37.505380, 126.797350),
    station("B05", "신도림", "Sindorim", 37.508908, 126.891313),
    station("B06", "여의도", "Yeouido", 37.521578, 126.924318),
    station("B07", "용산", "Yongsan", 37.529774, 126.964630),
    station("B08", "서울역", "Seoul Station", 37.555980, 126.972091),
    station("B09", "청량리", "Cheongnyangni", 37.580039, 127.044727),
    station("B10", "상봉", "Sangbong", 37.595673, 127.085708),
    station("B11", "별내", "Byeollae", 37.642320, 127.127600),
    station("B12", "왕숙", "Wangsuk", 37.650000, 127.166000),
    station("B13", "평내호평", "Pyeongnae Hopyeong", 37.653330, 127.243610),
    station("B14", "마석", "Maseok", 37.652220, 127.312220)
  ];

  const gtxCTrunk = [
    station("C01", "덕정", "Deokjeong", 37.843188, 127.061559),
    station("C02", "의정부", "Uijeongbu", 37.738362, 127.045957),
    station("C03", "창동", "Chang-dong", 37.653339, 127.047645),
    station("C04", "광운대", "Kwangwoon University", 37.623837, 127.061695),
    station("C05", "청량리", "Cheongnyangni", 37.580039, 127.044727),
    station("C06", "왕십리", "Wangsimni", 37.561159, 127.035505),
    station("C07", "삼성", "Samseong", 37.508827, 127.063203),
    station("C08", "양재", "Yangjae", 37.484660, 127.035130),
    station("C09", "정부과천청사", "Government Complex Gwacheon", 37.426513, 126.989780),
    station("C10", "인덕원", "Indeogwon", 37.401901, 126.976708),
    station("C11", "금정", "Geumjeong", 37.372337, 126.943271)
  ];
  const gtxCMain = [
    ...gtxCTrunk,
    station("C12", "의왕", "Uiwang", 37.320342, 126.947977),
    station("C13", "수원", "Suwon", 37.265682, 127.000050)
  ];
  const gtxCBranch = [
    ...gtxCTrunk,
    station("C14", "상록수", "Sangnoksu", 37.302802, 126.866178)
  ];

  window.GTX_ROUTES = {
    a: { full: gtxA },
    b: { full: gtxB },
    c: { main: gtxCMain, sangnoksu: gtxCBranch }
  };

  const statusLabel = (status) => {
    if (status === "open") return "개통역";
    if (status === "passThrough") return "무정차 통과·향후 개통역";
    return "계획역";
  };
  const makeContexts = (lineName, stations, phase) => Object.fromEntries(stations.map((item) => [
    item.name,
    {
      title: item.en,
      subtitle: `${lineName} ${statusLabel(item.status)}으로, ${phase} 노선의 위치와 환승축을 익히는 지점`,
      icon: item.status === "open" ? "🚄" : item.status === "passThrough" ? "↪️" : "🏗️",
      badge: item.status === "open" ? "GTX OPEN" : item.status === "passThrough" ? "PASS-THROUGH" : "PLANNED GTX",
      area: `${lineName} ${statusLabel(item.status)}`,
      keywords: item.status === "open" ? "광역급행 · 개통 구간 · 환승" : "계획 노선 · 예정역 · 노선 학습"
    }
  ]));

  window.GTX_CONTEXTS = {
    13: makeContexts("GTX-A", gtxA, "운정중앙–동탄"),
    14: makeContexts("GTX-B", gtxB, "인천대입구–마석"),
    15: makeContexts("GTX-C", [...gtxCMain, gtxCBranch[gtxCBranch.length - 1]], "덕정–수원·상록수")
  };

  window.GTX_DATA_META = {
    asOf: "2026-07-16",
    coordinateSystem: "WGS84",
    disclaimer: "계획역 좌표와 일정은 학습용 기준이며 사업 변경에 따라 달라질 수 있습니다.",
    sources: [
      { name: "GTX-A 공식 홈페이지", url: "https://www.gtx-a.com/" },
      { name: "경기도 GTX 추진 현황", url: "https://www.gg.go.kr/contents/contents.do?ciIdx=497&menuId=1850" },
      { name: "국토교통부 GTX 정책자료", url: "https://www.molit.go.kr/" }
    ]
  };
})();
