/*
 * METROTYPE SEOUL 노선 데이터
 * 좌표계: WGS84 위도·경도
 * 수도권 전철 1–9호선과 KTX 경부·호남고속선의 대표 주행축을 구성합니다.
 */
window.METRO_LINES = {
  1: {
    number: 1,
    name: "1호선",
    color: "#0052A4",
    darkColor: "#003F7F",
    softColor: "rgba(0,82,164,.16)",
    areaLabel: "CAPITAL REGION",
    heroRegion: "수도권 위에",
    train: {
      src: "./assets/trains/line1.jpg",
      alt: "수도권 전철 1호선 코레일 전동차가 신길역을 통과하는 모습",
      caption: "코레일 311000호대 전동차 · 신길",
      credit: "Mtattrain · Wikimedia Commons",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Korail_Line_1_train_at_Singil.JPG"
    },
    history: {
      period: "1961 — 2023",
      summary: "서울 지하철 1호선은 1960년대 도시철도 구상에서 출발해 1971년 착공했습니다. 1974년 서울역–청량리 지하 구간 개통과 동시에 국철 경원·경부·경인선과 직결 운행을 시작했고, 이후 수원·천안·신창·소요산·연천 방향과 광명·서동탄 지선으로 확장되어 수도권 남북을 잇는 광역 철도축이 되었습니다.",
      events: [
        { year: "1961–1970", label: "노선 구상·공식화", detail: "1961년 서울 도시철도 계획에 처음 포함된 뒤 1970년 10월 서울역–청량리 종로선 건설 계획이 공식화되었습니다." },
        { year: "1971.04.12", label: "종로선 착공", detail: "서울시청 앞에서 대한민국 최초의 지하철 건설 공사가 시작되었습니다." },
        { year: "1974.08.15", label: "첫 개통·직결 운행", detail: "서울역–청량리 7.8km, 9개 역이 개통하고 경원·경부·경인선 전철과 직결 운행을 시작했습니다." },
        { year: "2003–2005", label: "경부·장항축 남부 연장", detail: "수원에서 병점, 천안 방향으로 단계적으로 연장되고 2005년에는 동묘앞역이 문을 열었습니다." },
        { year: "2006", label: "소요산·광명 확장", detail: "의정부–소요산 전철화 구간과 KTX 광명역 셔틀 운행이 개통해 북부·서남부 운행망이 넓어졌습니다." },
        { year: "2008–2010", label: "신창·서동탄 확장", detail: "장항선 전철이 신창까지 이어졌고 2010년 병점기지선 서동탄역이 개통했습니다." },
        { year: "2021.10.30", label: "탕정역 신설", detail: "아산역과 배방역 사이에 탕정역이 새로 문을 열어 아산신도시 접근성이 높아졌습니다." },
        { year: "2023.12.16", label: "연천 연장", detail: "소요산–연천 17.8km 구간과 청산·전곡·연천 3개 역이 개통해 1호선이 연천까지 연장되었습니다." }
      ],
      sources: [
        { name: "서울시 · 지하철 1호선의 역사", url: "https://mediahub.seoul.go.kr/archives/1292714" },
        { name: "한국철도공사 · 철도 연혁", url: "https://info.korail.com/info/contents.do?key=717" },
        { name: "국가철도공단 · 1호선 역위치", url: "https://www.data.go.kr/data/15041300/fileData.do" },
        { name: "국가철도공단 · 탕정역 개통", url: "https://www.kr.or.kr/boardCnts/view.do?boardID=52&boardSeq=1115715&page=31" }
      ]
    },
    courses: {
      gyeongin: {
        id: "gyeongin",
        name: "경원·경인축",
        subtitle: "연천에서 서울 도심을 지나 인천 개항장까지",
        start: "연천",
        end: "인천",
        mapBounds: { minLng: 126.56, maxLng: 127.14, minLat: 37.39, maxLat: 38.16 },
        cornerLabels: { northWest: "YEONCHEON", southEast: "INCHEON" },
        mapLabels: [
          { text: "YEONCHEON", lng: 127.015, lat: 38.095, muted: true },
          { text: "SEOUL", lng: 126.985, lat: 37.615 },
          { text: "INCHEON", lng: 126.63, lat: 37.445, muted: true }
        ],
        directions: [
          { id: "incheon", name: "인천행", destination: "인천", subtitle: "연천 출발 · 인천 종착", mode: "forward" },
          { id: "yeoncheon", name: "연천행", destination: "연천", subtitle: "인천 출발 · 연천 종착", mode: "reverse" }
        ],
        stations: window.LINE_1_ROUTES.gyeongin
      },
      gyeongbu: {
        id: "gyeongbu",
        name: "경부·장항축",
        subtitle: "광운대에서 수원·천안을 지나 신창까지",
        start: "광운대",
        end: "신창",
        mapBounds: { minLng: 126.84, maxLng: 127.20, minLat: 36.70, maxLat: 37.68 },
        cornerLabels: { northWest: "SEOUL", southEast: "ASAN" },
        mapLabels: [
          { text: "SEOUL", lng: 126.98, lat: 37.61 },
          { text: "SUWON", lng: 127.00, lat: 37.31, muted: true },
          { text: "CHEONAN · ASAN", lng: 127.10, lat: 36.83, muted: true }
        ],
        directions: [
          { id: "sinchang", name: "신창행", destination: "신창", subtitle: "광운대 출발 · 신창 종착", mode: "forward" },
          { id: "gwangwoon", name: "광운대행", destination: "광운대", subtitle: "신창 출발 · 광운대 종착", mode: "reverse" }
        ],
        stations: window.LINE_1_ROUTES.gyeongbu
      },
      seodongtan: {
        id: "seodongtan",
        name: "서동탄 지선",
        subtitle: "광운대에서 서울 도심과 수원을 지나 서동탄까지",
        start: "광운대",
        end: "서동탄",
        mapBounds: { minLng: 126.84, maxLng: 127.13, minLat: 37.14, maxLat: 37.68 },
        cornerLabels: { northWest: "SEOUL", southEast: "HWASEONG" },
        mapLabels: [
          { text: "SEOUL", lng: 126.98, lat: 37.61 },
          { text: "SUWON", lng: 127.00, lat: 37.30, muted: true },
          { text: "SEODONGTAN", lng: 127.055, lat: 37.175, muted: true }
        ],
        directions: [
          { id: "seodongtan", name: "서동탄행", destination: "서동탄", subtitle: "광운대 출발 · 서동탄 종착", mode: "forward" },
          { id: "gwangwoon", name: "광운대행", destination: "광운대", subtitle: "서동탄 출발 · 광운대 종착", mode: "reverse" }
        ],
        stations: window.LINE_1_ROUTES.seodongtan
      },
      gwangmyeong: {
        id: "gwangmyeong",
        name: "광명 셔틀",
        subtitle: "영등포에서 KTX 광명역까지 이어지는 짧은 지선",
        start: "영등포",
        end: "광명",
        mapBounds: { minLng: 126.82, maxLng: 126.94, minLat: 37.38, maxLat: 37.55 },
        cornerLabels: { northWest: "SEOUL", southEast: "GWANGMYEONG" },
        mapLabels: [
          { text: "SEOUL", lng: 126.895, lat: 37.525 },
          { text: "GWANGMYEONG", lng: 126.875, lat: 37.405, muted: true }
        ],
        directions: [
          { id: "gwangmyeong", name: "광명행", destination: "광명", subtitle: "영등포 출발 · 광명 종착", mode: "forward" },
          { id: "yeongdeungpo", name: "영등포행", destination: "영등포", subtitle: "광명 출발 · 영등포 종착", mode: "reverse" }
        ],
        stations: window.LINE_1_ROUTES.gwangmyeong
      }
    },
    majorStations: [
      "연천", "소요산", "의정부", "도봉산", "창동", "광운대", "회기", "청량리",
      "동대문", "종로3가", "시청", "서울역", "용산", "노량진", "영등포", "신도림",
      "구로", "부천", "부평", "주안", "동인천", "인천", "가산디지털단지", "금정",
      "수원", "병점", "평택지제", "평택", "천안", "아산", "온양온천", "신창", "광명", "서동탄"
    ]
  },
  2: {
    number: 2,
    name: "2호선",
    color: "#00A84D",
    darkColor: "#007F3A",
    softColor: "rgba(0,168,77,.16)",
    areaLabel: "SEOUL LOOP",
    train: {
      src: "./assets/trains/line2.jpg",
      alt: "서울 지하철 2호선 전동차가 건대입구역을 출발하는 모습",
      caption: "서울메트로 2000호대 전동차 · 건대입구",
      credit: "Mtattrain · Wikimedia Commons",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Seoul_Metro_Line_2_train_(GEC)_leaving_Konkuk_Univ.jpg"
    },
    history: {
      period: "1975 — 1996",
      summary: "현재의 거대 순환선 구상은 1975년에 정립되었고, 1978년 3월 공사를 시작했습니다. 1980년 첫 구간 개통 뒤 단계적으로 노선을 이어 1984년 5월 22일 순환 본선을 완성했으며, 1990년대에는 신정지선이 까치산까지 연장되었습니다.",
      events: [
        { year: "1975", label: "순환선 구상", detail: "기존 방사형 계획을 대신해 강북·영등포·영동의 세 도심 축을 연결하는 현재 형태의 순환선 구상이 정립되었습니다." },
        { year: "1978.03", label: "본선 착공", detail: "강남 구간을 중심으로 서울 지하철 2호선 건설 공사가 시작되었습니다." },
        { year: "1980.10.31", label: "첫 개통", detail: "신설동–종합운동장 1단계 구간이 개통해 2호선 운행을 시작했습니다." },
        { year: "1982.12.23", label: "강남 연장", detail: "종합운동장–교대 구간이 개통해 강남 업무지구를 따라 노선이 확장되었습니다." },
        { year: "1983.09.16", label: "도심 연결", detail: "성수–을지로입구 구간이 개통하고 성수–신설동 구간은 지선 운행 체계가 되었습니다." },
        { year: "1984.05.22", label: "순환선 완성", detail: "서울대입구–을지로입구 구간이 열리면서 서울 도심을 한 바퀴 잇는 순환 운행이 완성되었습니다." },
        { year: "1992–1996", label: "신정지선 연장", detail: "1992년 양천구청까지 개통한 뒤 1996년 신정네거리와 까치산까지 단계적으로 연장되었습니다." }
      ],
      sources: [
        { name: "서울시 · 1975년 2호선 구상", url: "https://mediahub.seoul.go.kr/archives/845277" },
        { name: "서울기록원 · 2호선 기공식", url: "https://archives.seoul.go.kr/item/0000000000002130" },
        { name: "e영상역사관 · 2호선 완전 개통", url: "https://www.ehistory.go.kr/view/movie?mediadtl=8479&mediagbn=MH&mediaid=1693&mediasrcgbn=KV" },
        { name: "서울시 · 서울 지하철 50년사", url: "https://mediahub.seoul.go.kr/archives/2012200" }
      ]
    },
    courses: {
      loop: {
        id: "loop",
        name: "순환 본선",
        subtitle: "시청에서 출발해 서울 도심을 한 바퀴 돌아 다시 시청으로",
        start: "시청",
        end: "시청",
        closed: true,
        directions: [
          { id: "inner", name: "내선순환", destination: "내선순환", subtitle: "시청에서 을지로·왕십리·잠실·강남 방향", mode: "forward" },
          { id: "outer", name: "외선순환", destination: "외선순환", subtitle: "시청에서 충정로·홍대입구·신도림·강남 방향", mode: "loopReverse" }
        ],
        stations: [
          { code: "201", name: "시청", en: "CITY HALL", lat: 37.563534, lng: 126.975271 },
          { code: "202", name: "을지로입구", en: "EULJIRO 1-GA", lat: 37.565998, lng: 126.982569 },
          { code: "203", name: "을지로3가", en: "EULJIRO 3-GA", lat: 37.566292, lng: 126.991773 },
          { code: "204", name: "을지로4가", en: "EULJIRO 4-GA", lat: 37.566611, lng: 126.998122 },
          { code: "205", name: "동대문역사문화공원", en: "DONGDAEMUN HISTORY & CULTURE PARK", lat: 37.565597, lng: 127.009113 },
          { code: "206", name: "신당", en: "SINDANG", lat: 37.565681, lng: 127.019488 },
          { code: "207", name: "상왕십리", en: "SANGWANGSIMNI", lat: 37.564504, lng: 127.028872 },
          { code: "208", name: "왕십리", en: "WANGSIMNI", lat: 37.561159, lng: 127.035505 },
          { code: "209", name: "한양대", en: "HANYANG UNIV.", lat: 37.556580, lng: 127.043504 },
          { code: "210", name: "뚝섬", en: "TTUKSEOM", lat: 37.547180, lng: 127.047413 },
          { code: "211", name: "성수", en: "SEONGSU", lat: 37.544628, lng: 127.055983 },
          { code: "212", name: "건대입구", en: "KONKUK UNIV.", lat: 37.540408, lng: 127.069231 },
          { code: "213", name: "구의", en: "GUI", lat: 37.536857, lng: 127.085024 },
          { code: "214", name: "강변", en: "GANGBYEON", lat: 37.535161, lng: 127.094684 },
          { code: "215", name: "잠실나루", en: "JAMSILLARU", lat: 37.520688, lng: 127.103836 },
          { code: "216", name: "잠실", en: "JAMSIL", lat: 37.513305, lng: 127.100129 },
          { code: "217", name: "잠실새내", en: "JAMSILSAENAE", lat: 37.511687, lng: 127.086162 },
          { code: "218", name: "종합운동장", en: "SPORTS COMPLEX", lat: 37.511008, lng: 127.073641 },
          { code: "219", name: "삼성", en: "SAMSEONG", lat: 37.508827, lng: 127.063203 },
          { code: "220", name: "선릉", en: "SEOLLEUNG", lat: 37.504257, lng: 127.048174 },
          { code: "221", name: "역삼", en: "YEOKSAM", lat: 37.500658, lng: 127.036430 },
          { code: "222", name: "강남", en: "GANGNAM", lat: 37.497958, lng: 127.027539 },
          { code: "223", name: "교대", en: "SEOUL NAT'L UNIV. OF EDUCATION", lat: 37.493957, lng: 127.014631 },
          { code: "224", name: "서초", en: "SEOCHO", lat: 37.491910, lng: 127.007945 },
          { code: "225", name: "방배", en: "BANGBAE", lat: 37.481469, lng: 126.997627 },
          { code: "226", name: "사당", en: "SADANG", lat: 37.476536, lng: 126.981631 },
          { code: "227", name: "낙성대", en: "NAKSEONGDAE", lat: 37.476930, lng: 126.963783 },
          { code: "228", name: "서울대입구", en: "SEOUL NAT'L UNIV.", lat: 37.481233, lng: 126.952745 },
          { code: "229", name: "봉천", en: "BONGCHEON", lat: 37.482416, lng: 126.941896 },
          { code: "230", name: "신림", en: "SILLIM", lat: 37.484216, lng: 126.929573 },
          { code: "231", name: "신대방", en: "SINDAEBANG", lat: 37.487534, lng: 126.913279 },
          { code: "232", name: "구로디지털단지", en: "GURO DIGITAL COMPLEX", lat: 37.485005, lng: 126.902626 },
          { code: "233", name: "대림", en: "DAERIM", lat: 37.492426, lng: 126.895293 },
          { code: "234", name: "신도림", en: "SINDORIM", lat: 37.508815, lng: 126.891222 },
          { code: "235", name: "문래", en: "MULLAE", lat: 37.517993, lng: 126.894766 },
          { code: "236", name: "영등포구청", en: "YEONGDEUNGPO-GU OFFICE", lat: 37.525766, lng: 126.896627 },
          { code: "237", name: "당산", en: "DANGSAN", lat: 37.533877, lng: 126.902011 },
          { code: "238", name: "합정", en: "HAPJEONG", lat: 37.550025, lng: 126.914557 },
          { code: "239", name: "홍대입구", en: "HONGIK UNIV.", lat: 37.556748, lng: 126.923643 },
          { code: "240", name: "신촌", en: "SINCHON", lat: 37.555153, lng: 126.936890 },
          { code: "241", name: "이대", en: "EWHA WOMANS UNIV.", lat: 37.556734, lng: 126.945897 },
          { code: "242", name: "아현", en: "AHYEON", lat: 37.557407, lng: 126.956079 },
          { code: "243", name: "충정로", en: "CHUNGJEONGNO", lat: 37.559742, lng: 126.964455 },
          { code: "201R", name: "시청", en: "CITY HALL · LOOP COMPLETE", lat: 37.563534, lng: 126.975271, isReturn: true }
        ]
      },
      seongsu: {
        id: "seongsu",
        name: "성수지선",
        subtitle: "성수에서 신설동까지 이어지는 동북 지선",
        start: "성수",
        end: "신설동",
        directions: [
          { id: "sinseol", name: "신설동행", destination: "신설동", subtitle: "성수 출발 · 신설동 종착", mode: "forward" },
          { id: "seongsu", name: "성수행", destination: "성수", subtitle: "신설동 출발 · 성수 종착", mode: "reverse" }
        ],
        stations: [
          { code: "211", name: "성수", en: "SEONGSU", lat: 37.544628, lng: 127.055983 },
          { code: "211-1", name: "용답", en: "YONGDAP", lat: 37.561904, lng: 127.050899 },
          { code: "211-2", name: "신답", en: "SINDAP", lat: 37.570040, lng: 127.046481 },
          { code: "211-3", name: "용두", en: "YONGDU", lat: 37.574012, lng: 127.038110 },
          { code: "211-4", name: "신설동", en: "SINSEOL-DONG", lat: 37.574653, lng: 127.025158 }
        ]
      },
      sinjeong: {
        id: "sinjeong",
        name: "신정지선",
        subtitle: "신도림에서 까치산까지 이어지는 서남 지선",
        start: "신도림",
        end: "까치산",
        directions: [
          { id: "kkachisan", name: "까치산행", destination: "까치산", subtitle: "신도림 출발 · 까치산 종착", mode: "forward" },
          { id: "sindorim", name: "신도림행", destination: "신도림", subtitle: "까치산 출발 · 신도림 종착", mode: "reverse" }
        ],
        stations: [
          { code: "234", name: "신도림", en: "SINDORIM", lat: 37.508815, lng: 126.891222 },
          { code: "234-1", name: "도림천", en: "DORIMCHEON", lat: 37.514759, lng: 126.882586 },
          { code: "234-2", name: "양천구청", en: "YANGCHEON-GU OFFICE", lat: 37.512194, lng: 126.865193 },
          { code: "234-3", name: "신정네거리", en: "SINJEONGNEGEORI", lat: 37.520218, lng: 126.852849 },
          { code: "234-4", name: "까치산", en: "KKACHISAN", lat: 37.531810, lng: 126.846706 }
        ]
      }
    },
    majorStations: [
      "시청", "동대문역사문화공원", "왕십리", "성수", "건대입구", "잠실", "종합운동장",
      "삼성", "강남", "교대", "사당", "서울대입구", "신림", "구로디지털단지", "신도림",
      "당산", "합정", "홍대입구", "신촌", "충정로", "신설동", "까치산"
    ]
  },
  3: {
    number: 3,
    name: "3호선",
    color: "#EF7C1C",
    darkColor: "#D96208",
    softColor: "rgba(239,124,28,.16)",
    areaLabel: "SEOUL · GOYANG",
    train: {
      src: "./assets/trains/line3.jpg",
      alt: "서울 지하철 3호선 오금행 전동차가 옥수역으로 진입하는 모습",
      caption: "서울메트로 3000호대 전동차 · 옥수",
      credit: "Mtattrain · Wikimedia Commons",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Seoul_Metro_Line_3_train_(GEC)_arriving_at_Oksu.jpg"
    },
    history: {
      period: "1980 — 2010",
      summary: "서울 도심을 X자 축으로 관통하는 3·4호선 계획은 1980년 2월 착공으로 구체화되었습니다. 1985년 구파발–양재 구간을 단계적으로 개통한 뒤 지축·수서·일산 방향으로 확장했고, 2010년 오금까지 연장되어 현재의 운행 축을 갖췄습니다.",
      events: [
        { year: "1980.02", label: "계획 확정·착공", detail: "3·4호선을 서울 도심에서 X자 형태로 교차시키는 1기 지하철 건설 사업이 착공되었습니다." },
        { year: "1985.07.12", label: "첫 개통", detail: "구파발–독립문 8km 서북 구간이 먼저 개통해 3호선 운행을 시작했습니다." },
        { year: "1985.10.18", label: "1기 구간 완공", detail: "독립문–양재 구간이 개통하면서 구파발–양재 전 구간이 연결되었습니다." },
        { year: "1990.07.13", label: "지축 연장", detail: "지축–구파발 구간이 개통해 북서쪽 차량기지와 본선이 연결되었습니다." },
        { year: "1993.10.30", label: "수서 연장", detail: "양재–수서 구간이 개통해 강남 남동부까지 노선이 확장되었습니다." },
        { year: "1996.01.30", label: "일산선 직결", detail: "지축–대화 일산선이 개통하면서 3호선 열차가 대화역까지 직결 운행하기 시작했습니다." },
        { year: "2010.02.18", label: "오금 연장", detail: "수서–가락시장–경찰병원–오금 구간이 개통해 현재의 남동쪽 종점이 완성되었습니다." }
      ],
      sources: [
        { name: "e영상역사관 · 3·4호선 착공", url: "https://www.ehistory.go.kr/view/movie?mediadtl=7955&mediagbn=MH&mediaid=1413&mediasrcgbn=KV" },
        { name: "e영상역사관 · 3호선 첫 개통", url: "https://www.ehistory.go.kr/view/movie?mediadtl=23089&mediaid=10783&mediasrcgbn=KV" },
        { name: "e영상역사관 · 3·4호선 전 구간 개통", url: "https://www.ehistory.go.kr/view/movie?mediadtl=23516&mediagbn=DH&mediaid=10873&mediasrcgbn=KV" },
        { name: "한국철도공사 · 일산선 개통", url: "https://info.korail.com/info/contents.do?key=861" },
        { name: "서울시 · 서울 지하철 50년사", url: "https://mediahub.seoul.go.kr/archives/2012200" }
      ]
    },
    courses: {
      main: {
        id: "main",
        name: "본선",
        subtitle: "대화에서 오금까지 서울을 관통하는 3호선",
        start: "대화",
        end: "오금",
        directions: [
          { id: "ogeum", name: "오금행", destination: "오금", subtitle: "대화 출발 · 오금 종착", mode: "range", from: "대화", to: "오금" },
          { id: "suseo", name: "수서행", destination: "수서", subtitle: "대화 출발 · 수서 종착", mode: "range", from: "대화", to: "수서" },
          { id: "gupabal", name: "구파발행", destination: "구파발", subtitle: "오금 출발 · 구파발 종착", mode: "range", from: "오금", to: "구파발" },
          { id: "daehwa", name: "대화행", destination: "대화", subtitle: "오금 출발 · 대화 종착", mode: "range", from: "오금", to: "대화" }
        ],
        stations: window.LINE_3_STATIONS
      }
    },
    majorStations: [
      "대화", "대곡", "연신내", "불광", "경복궁", "종로3가", "충무로",
      "옥수", "고속터미널", "교대", "양재", "도곡", "수서", "오금"
    ]
  },
  4: {
    number: 4,
    name: "4호선",
    color: "#00A5DE",
    darkColor: "#007CA8",
    softColor: "rgba(0,165,222,.16)",
    areaLabel: "NAMYANGJU · SEOUL · GWACHEON · ANSAN",
    heroRegion: "수도권 남북축 위에",
    train: {
      src: "./assets/trains/line4.jpg",
      alt: "서울 지하철 4호선 전동차가 동작역으로 진입하는 모습",
      caption: "서울교통공사 4000호대 전동차 · 동작",
      credit: "Mtattrain · Wikimedia Commons",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Seoul_Metro_Line_4_train_arriving_at_Dongjak.JPG"
    },
    history: {
      period: "1975 — 2025",
      summary: "4호선은 서울 동북부와 도심, 과천·안양·군포·안산·시흥을 잇는 수도권 남북 간선입니다. 1970년대 계획을 바탕으로 1980년 3·4호선 공사가 시작됐고, 1985년 상계–사당 구간을 완성했습니다. 이후 안산선·과천선 직결, 오이도 및 진접 연장을 거쳐 현재의 광역 운행축이 형성되었습니다.",
      events: [
        { year: "1975", label: "남북 간선 구상", detail: "서울 동북부에서 도심을 지나 남부로 이어지는 4호선 기본 구상이 정립되었습니다." },
        { year: "1980.02", label: "3·4호선 착공", detail: "서울 1기 지하철 확장 사업으로 3호선과 4호선 건설 공사가 본격 시작되었습니다." },
        { year: "1985.04.20", label: "첫 개통", detail: "상계–한성대입구 구간이 먼저 개통해 4호선 운행을 시작했습니다." },
        { year: "1985.10.18", label: "서울 구간 완공", detail: "한성대입구–사당 구간이 개통하면서 서울 도심 남북축이 연결되었습니다." },
        { year: "1988.10.25", label: "안산선 개통", detail: "금정–안산 구간이 개통해 경기 서남부 철도축이 형성되었습니다." },
        { year: "1993–1994", label: "불암산·과천선 연결", detail: "상계–불암산 연장과 과천선 단계 개통으로 서울 4호선과 안산선의 직결 운행이 완성되었습니다." },
        { year: "2000.07.28", label: "오이도 연장", detail: "안산–오이도 구간이 개통해 서해안과 시화지구까지 노선이 확장되었습니다." },
        { year: "2022.03.19", label: "진접선 개통", detail: "불암산–별내별가람–오남–진접 14.9km 구간이 개통해 남양주까지 4호선이 연장되었습니다." },
        { year: "2025.05", label: "불암산역 명칭 적용", detail: "기존 당고개역의 명칭이 지역의 대표 산 이름을 반영한 불암산역으로 변경되었습니다." }
      ],
      sources: [
        { name: "국가철도공단 · 수도권 4호선 역위치", url: "https://www.data.go.kr/data/15041303/fileData.do" },
        { name: "서울시 · 진접선 개통 안내", url: "https://mediahub.seoul.go.kr/archives/2004078" },
        { name: "대한민국 정책브리핑 · 진접선 개통", url: "https://www.korea.kr/briefing/policyBriefingView.do?newsId=148899977" },
        { name: "안산시 · 안산선 역사", url: "https://www.ansan.go.kr/ansanline/introduction/what-is-ansan-line" },
        { name: "e영상역사관 · 3·4호선 전 구간 개통", url: "https://www.youtube.com/watch?v=plALKfAp02M" }
      ]
    },
    courses: {
      jinjeopSadang: {
        id: "jinjeopSadang",
        name: "진접·서울 도심축",
        subtitle: "진접에서 서울 동북부와 도심을 지나 사당까지",
        start: "진접",
        end: "사당",
        cornerLabels: { northWest: "NAMYANGJU", southEast: "SEOUL" },
        directions: [
          { id: "sadang", name: "사당행", destination: "사당", subtitle: "진접 출발 · 사당 종착", mode: "forward" },
          { id: "jinjeop", name: "진접행", destination: "진접", subtitle: "사당 출발 · 진접 종착", mode: "reverse" }
        ],
        stations: window.LINE_4_ROUTES.jinjeopSadang
      },
      buramsanOido: {
        id: "buramsanOido",
        name: "수도권 남북축",
        subtitle: "불암산에서 서울·과천·안산을 지나 오이도까지",
        start: "불암산",
        end: "오이도",
        cornerLabels: { northWest: "SEOUL", southEast: "SIHEUNG" },
        directions: [
          { id: "oido", name: "오이도행", destination: "오이도", subtitle: "불암산 출발 · 오이도 종착", mode: "forward" },
          { id: "buramsan", name: "불암산행", destination: "불암산", subtitle: "오이도 출발 · 불암산 종착", mode: "reverse" }
        ],
        stations: window.LINE_4_ROUTES.buramsanOido
      },
      buramsanAnsan: {
        id: "buramsanAnsan",
        name: "안산 종착축",
        subtitle: "불암산에서 서울 도심과 과천을 지나 안산까지",
        start: "불암산",
        end: "안산",
        cornerLabels: { northWest: "SEOUL", southEast: "ANSAN" },
        directions: [
          { id: "ansan", name: "안산행", destination: "안산", subtitle: "불암산 출발 · 안산 종착", mode: "forward" },
          { id: "buramsan", name: "불암산행", destination: "불암산", subtitle: "안산 출발 · 불암산 종착", mode: "reverse" }
        ],
        stations: window.LINE_4_ROUTES.buramsanAnsan
      }
    },
    majorStations: [
      "진접", "별내별가람", "불암산", "노원", "창동", "수유", "성신여대입구",
      "동대문", "동대문역사문화공원", "충무로", "서울역", "삼각지", "이촌", "동작",
      "총신대입구(이수)", "사당", "대공원", "정부과천청사", "인덕원", "범계", "금정",
      "산본", "상록수", "한대앞", "중앙", "초지", "안산", "오이도"
    ]
  },
  5: {
    number: 5,
    name: "5호선",
    color: "#996CAC",
    darkColor: "#744B87",
    softColor: "rgba(153,108,172,.16)",
    areaLabel: "SEOUL EAST–WEST · HANAM",
    heroRegion: "서울 동서축 위에",
    train: {
      src: "./assets/trains/line5.jpg",
      alt: "서울 지하철 5호선 5000호대 전동차가 왕십리역으로 진입하는 모습",
      caption: "서울교통공사 5000호대 전동차 · 왕십리",
      credit: "Mtattrain · Wikimedia Commons",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Seoul_Metro_Line_5_train_arriving_at_Wangsimni.jpg"
    },
    history: {
      period: "1990 — 2021",
      summary: "5호선은 강서구 방화에서 도심과 강동을 가로질러 하남검단산 및 마천으로 갈라지는 서울의 동서 간선입니다. 1990년 착공해 1995년 왕십리–상일동 구간부터 단계적으로 개통했고, 1996년 서울 구간과 마천지선을 완성했습니다. 이후 2020~2021년 하남선이 개통해 서울 밖 하남까지 직결 운행하게 되었습니다.",
      events: [
        { year: "1990.06.27", label: "5호선 착공", detail: "강서·도심·강동을 잇는 2기 지하철의 첫 노선으로 공사가 시작되었습니다." },
        { year: "1995.11.15", label: "첫 개통", detail: "왕십리–상일동 구간이 문을 열며 5호선 운행을 시작했습니다." },
        { year: "1996.03.20", label: "강서 구간 개통", detail: "방화–까치산 구간이 개통해 김포공항과 강서 생활권이 지하철로 연결되었습니다." },
        { year: "1996.03.30", label: "마천지선 개통", detail: "강동 분기에서 둔촌동·올림픽공원·오금·거여를 지나 마천까지 이어지는 지선이 개통했습니다." },
        { year: "1996.08–12", label: "서울 동서축 완성", detail: "까치산–여의도와 여의도–왕십리 구간이 차례로 열리며 서울 구간 전 노선이 연결되었습니다." },
        { year: "2008.06.20", label: "마곡역 개통", detail: "개발 유보로 통과하던 마곡역이 영업을 시작해 마곡지구 성장의 철도 기반이 되었습니다." },
        { year: "2020.08.08", label: "하남선 1단계", detail: "상일동에서 미사와 하남풍산까지 연장되어 5호선이 처음으로 서울 밖 하남에 진입했습니다." },
        { year: "2021.03.27", label: "하남선 전 구간 개통", detail: "강일·하남시청·하남검단산역이 개통하면서 현재의 동쪽 종착축이 완성되었습니다." }
      ],
      sources: [
        { name: "서울시 · 서울 지하철 50년사", url: "https://mediahub.seoul.go.kr/archives/2012200" },
        { name: "서울시 · 하남선 전 구간 개통", url: "https://mediahub.seoul.go.kr/archives/2001039" },
        { name: "서울시 · 5호선과 하남선의 역사", url: "https://mediahub.seoul.go.kr/archives/2000913" },
        { name: "국가철도공단 · 수도권 5호선 역위치", url: "https://www.data.go.kr/data/15041304/fileData.do" }
      ]
    },
    courses: {
      banghwaSangil: {
        id: "banghwaSangil",
        name: "서울 본선",
        subtitle: "방화에서 도심을 관통해 상일동까지 이어지는 서울 구간",
        start: "방화",
        end: "상일동",
        mapBounds: { minLng: 126.78, maxLng: 127.18, minLat: 37.49, maxLat: 37.59 },
        cornerLabels: { northWest: "GANGSEO", southEast: "GANGDONG" },
        mapLabels: [
          { text: "GANGSEO", lng: 126.825, lat: 37.575, muted: true },
          { text: "SEOUL", lng: 126.985, lat: 37.575 },
          { text: "GANGDONG", lng: 127.145, lat: 37.565, muted: true }
        ],
        directions: [
          { id: "sangil", name: "상일동행", destination: "상일동", subtitle: "방화 출발 · 상일동 종착", mode: "forward" },
          { id: "banghwa", name: "방화행", destination: "방화", subtitle: "상일동 출발 · 방화 종착", mode: "reverse" }
        ],
        stations: window.LINE_5_ROUTES.banghwaSangil
      },
      banghwaHanam: {
        id: "banghwaHanam",
        name: "하남선 직결",
        subtitle: "방화에서 서울 도심과 강동을 지나 하남검단산까지",
        start: "방화",
        end: "하남검단산",
        mapBounds: { minLng: 126.78, maxLng: 127.245, minLat: 37.49, maxLat: 37.59 },
        cornerLabels: { northWest: "SEOUL", southEast: "HANAM" },
        mapLabels: [
          { text: "SEOUL", lng: 126.985, lat: 37.575 },
          { text: "HANAM", lng: 127.205, lat: 37.555, muted: true }
        ],
        directions: [
          { id: "hanam", name: "하남검단산행", destination: "하남검단산", subtitle: "방화 출발 · 하남검단산 종착", mode: "forward" },
          { id: "banghwa", name: "방화행", destination: "방화", subtitle: "하남검단산 출발 · 방화 종착", mode: "reverse" }
        ],
        stations: window.LINE_5_ROUTES.banghwaHanam
      },
      banghwaMacheon: {
        id: "banghwaMacheon",
        name: "마천지선 직결",
        subtitle: "방화에서 강동 분기를 지나 올림픽공원과 마천까지",
        start: "방화",
        end: "마천",
        mapBounds: { minLng: 126.78, maxLng: 127.175, minLat: 37.47, maxLat: 37.59 },
        cornerLabels: { northWest: "GANGSEO", southEast: "SONGPA" },
        mapLabels: [
          { text: "SEOUL", lng: 126.985, lat: 37.575 },
          { text: "SONGPA", lng: 127.145, lat: 37.495, muted: true }
        ],
        directions: [
          { id: "macheon", name: "마천행", destination: "마천", subtitle: "방화 출발 · 마천 종착", mode: "forward" },
          { id: "banghwa", name: "방화행", destination: "방화", subtitle: "마천 출발 · 방화 종착", mode: "reverse" }
        ],
        stations: window.LINE_5_ROUTES.banghwaMacheon
      }
    },
    majorStations: [
      "방화", "김포공항", "마곡", "까치산", "목동", "영등포구청", "신길",
      "여의도", "공덕", "충정로", "광화문", "종로3가", "동대문역사문화공원",
      "왕십리", "군자", "천호", "강동", "상일동", "미사", "하남시청", "하남검단산",
      "올림픽공원", "오금", "마천"
    ]
  },
  6: {
    number: 6,
    name: "6호선",
    color: "#CD7C2F",
    darkColor: "#9B5820",
    softColor: "rgba(205,124,47,.16)",
    areaLabel: "SEOUL NORTH ARC · EUNGAM LOOP",
    heroRegion: "서울 한강 북쪽 위에",
    train: {
      src: "./assets/trains/line6.jpg",
      alt: "서울 지하철 6호선 6000호대 전동차가 신내차량기지로 입고하는 모습",
      caption: "서울교통공사 6000호대 621편성 · 신내",
      credit: "신헤림 · Wikimedia Commons",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:%EC%9A%B4%ED%96%89%EC%A2%85%EB%A3%8C_%ED%9B%84_%EA%B8%B0%EC%A7%80%EB%A1%9C_%EC%9E%85%EA%B3%A0%EB%90%98%EB%8A%94_%EC%84%9C%EC%9A%B8%EB%8F%84%EC%8B%9C%EC%B2%A0%EB%8F%84_6%ED%98%B8%EC%84%A0_6000%ED%98%B8%EB%8C%80_621%ED%8E%B8%EC%84%B1.JPG"
    },
    history: {
      period: "1994 — 2019",
      summary: "6호선은 은평구 응암순환 구간에서 마포·용산·도심 북부·성북을 거쳐 중랑구 신내까지 이어지는 한강 북쪽의 U자형 간선입니다. 1994년 착공해 2000~2001년 단계적으로 개통했으며, 역촌→불광→독바위→연신내→구산 방향으로만 달리는 국내 도시철도의 대표적인 일방통행 루프를 갖습니다. 2019년 봉화산에서 신내까지 연장되어 경춘선 환승이 가능해졌습니다.",
      events: [
        { year: "1994.01.08", label: "6호선 착공", detail: "서울 2기 지하철 사업의 하나로 은평·마포·용산·성북·중랑을 잇는 공사가 시작되었습니다." },
        { year: "2000.08.07", label: "첫 개통", detail: "봉화산–상월곡 구간이 먼저 문을 열며 6호선 운행이 시작되었습니다." },
        { year: "2000.12.15", label: "응암순환 연결", detail: "상월곡–응암순환 구간이 개통했습니다. 공사가 남아 있던 이태원·한강진·버티고개·약수는 당시 무정차 통과했습니다." },
        { year: "2001.03.09", label: "전 역 영업 완성", detail: "이태원·한강진·버티고개·약수역이 영업을 시작해 응암–봉화산 전 구간이 완성되었습니다." },
        { year: "2005.12.21", label: "동묘앞 환승 확대", detail: "동묘앞역의 1호선 환승 통로가 열려 도심 동부 환승망이 강화되었습니다." },
        { year: "2009–2012", label: "서부 광역환승 확장", detail: "디지털미디어시티와 공덕에서 경의선·공항철도 환승이 차례로 연결되었습니다." },
        { year: "2016.04.30", label: "효창공원앞 환승", detail: "경의중앙선 효창공원앞역이 개통해 용산 서부의 환승 기능이 확대되었습니다." },
        { year: "2019.12.21", label: "신내 연장", detail: "봉화산–신내 1.3km 구간이 개통해 6호선과 경춘선이 직접 연결되었습니다." }
      ],
      sources: [
        { name: "서울시 · 6호선 신내역 개통", url: "https://mediahub.seoul.go.kr/archives/1261413" },
        { name: "서울시 · 서울 지하철 50년사", url: "https://mediahub.seoul.go.kr/archives/2012200" },
        { name: "서울교통공사 · 1–8호선 역사 좌표", url: "https://www.data.go.kr/data/15099316/fileData.do" },
        { name: "Wikimedia Commons · 6000호대 전동차", url: "https://commons.wikimedia.org/wiki/File:%EC%9A%B4%ED%96%89%EC%A2%85%EB%A3%8C_%ED%9B%84_%EA%B8%B0%EC%A7%80%EB%A1%9C_%EC%9E%85%EA%B3%A0%EB%90%98%EB%8A%94_%EC%84%9C%EC%9A%B8%EB%8F%84%EC%8B%9C%EC%B2%A0%EB%8F%84_6%ED%98%B8%EC%84%A0_6000%ED%98%B8%EB%8C%80_621%ED%8E%B8%EC%84%B1.JPG" }
      ]
    },
    courses: {
      eungamSinnae: {
        id: "eungamSinnae",
        name: "응암순환 · 신내",
        subtitle: "응암 일방통행 루프와 서울 북부를 지나 신내까지",
        start: "응암",
        end: "신내",
        mapBounds: { minLng: 126.885, maxLng: 127.118, minLat: 37.520, maxLat: 37.635 },
        cornerLabels: { northWest: "EUNPYEONG", southEast: "JUNGNANG" },
        mapLabels: [
          { text: "EUNPYEONG", lng: 126.922, lat: 37.625, muted: true },
          { text: "MAPO", lng: 126.920, lat: 37.558, muted: true },
          { text: "SEOUL NORTH", lng: 127.005, lat: 37.575 },
          { text: "JUNGNANG", lng: 127.090, lat: 37.625, muted: true }
        ],
        directions: [
          { id: "sinnae", name: "신내행", destination: "신내", subtitle: "응암순환 출발 · 신내 종착", mode: "custom", stationNames: window.LINE_6_DIRECTION_ORDERS.sinnae.eastbound },
          { id: "eungamLoop", name: "응암순환행", destination: "응암순환", subtitle: "신내 출발 · 응암순환 완료", mode: "custom", stationNames: window.LINE_6_DIRECTION_ORDERS.sinnae.loopbound }
        ],
        stations: window.LINE_6_ROUTES.sinnae
      },
      eungamBonghwasan: {
        id: "eungamBonghwasan",
        name: "응암순환 · 봉화산",
        subtitle: "신내 연장 전통의 봉화산 종착 운행 계통",
        start: "응암",
        end: "봉화산",
        mapBounds: { minLng: 126.885, maxLng: 127.104, minLat: 37.520, maxLat: 37.635 },
        cornerLabels: { northWest: "EUNPYEONG", southEast: "BONGHWASAN" },
        mapLabels: [
          { text: "EUNPYEONG", lng: 126.922, lat: 37.625, muted: true },
          { text: "YONGSAN", lng: 126.985, lat: 37.535, muted: true },
          { text: "SEONGBUK", lng: 127.040, lat: 37.605, muted: true },
          { text: "BONGHWASAN", lng: 127.088, lat: 37.625, muted: true }
        ],
        directions: [
          { id: "bonghwasan", name: "봉화산행", destination: "봉화산", subtitle: "응암순환 출발 · 봉화산 종착", mode: "custom", stationNames: window.LINE_6_DIRECTION_ORDERS.bonghwasan.eastbound },
          { id: "eungamLoop", name: "응암순환행", destination: "응암순환", subtitle: "봉화산 출발 · 응암순환 완료", mode: "custom", stationNames: window.LINE_6_DIRECTION_ORDERS.bonghwasan.loopbound }
        ],
        stations: window.LINE_6_ROUTES.bonghwasan
      }
    },
    majorStations: [
      "응암", "불광", "연신내", "디지털미디어시티", "월드컵경기장", "합정",
      "공덕", "효창공원앞", "삼각지", "이태원", "약수", "신당", "동묘앞",
      "보문", "고려대", "석계", "태릉입구", "봉화산", "신내"
    ]
  },
  7: {
    number: 7,
    name: "7호선",
    color: "#747F00",
    darkColor: "#566000",
    softColor: "rgba(116,127,0,.16)",
    areaLabel: "NORTHEAST · GANGNAM · WESTERN METRO",
    heroRegion: "의정부·서울·부천·인천 위에",
    train: {
      src: "./assets/trains/line7.jpg",
      alt: "서울 도시철도 7호선 7000호대 전동차",
      caption: "서울도시철도 7000호대 전동차",
      credit: "LERK · Wikimedia Commons",
      license: "CC BY 2.5",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Seoul-Metropolitan-Rapid-Transit-7010-20070721.jpg"
    },
    history: {
      period: "1990 — 2024",
      summary: "7호선은 의정부 장암에서 서울 동북부와 강남·서남권을 관통해 부천과 인천 석남까지 이어지는 광역 남북 간선입니다. 1996년 장암–건대입구가 먼저 개통했고, 2000년 온수까지 연결되며 서울 구간이 완성되었습니다. 이후 2012년 부평구청, 2021년 석남까지 단계적으로 연장됐으며, 2024년 뚝섬유원지역은 자양(뚝섬한강공원)역으로 이름이 바뀌었습니다.",
      events: [
        { year: "1990", label: "2기 지하철 건설", detail: "서울 동북부와 강남·서남부를 잇는 7호선 건설 사업이 본격화되었습니다." },
        { year: "1996.10.11", label: "강북 구간 첫 개통", detail: "장암–건대입구 구간이 개통해 7호선 운행을 시작했습니다." },
        { year: "2000.02.29", label: "신풍까지 연장", detail: "온수 방향 남부 구간 중 건대입구–신풍이 먼저 개통했습니다." },
        { year: "2000.08.01", label: "서울 구간 완성", detail: "신풍–온수 구간이 개통하면서 장암–온수 전 구간이 연결되었습니다." },
        { year: "2012.10.27", label: "부천·부평 연장", detail: "온수–부평구청 10.2km, 9개 역이 개통해 부천 신도시와 인천 1호선이 연결되었습니다." },
        { year: "2021.05.22", label: "석남 연장", detail: "부평구청–산곡–석남 4.2km 구간이 개통해 인천 2호선 환승이 가능해졌습니다." },
        { year: "2024.02.29", label: "자양역으로 변경", detail: "뚝섬유원지역의 역명이 자양(뚝섬한강공원)역으로 변경되었습니다." }
      ],
      sources: [
        { name: "서울시 · 7호선 개통·연장 연혁", url: "https://news.seoul.go.kr/citybuild/archives/tag/%EC%A7%80%ED%95%98%EC%B2%A0-7%ED%98%B8%EC%84%A0" },
        { name: "서울시 · 석남연장선 개통", url: "https://mediahub.seoul.go.kr/archives/2001577" },
        { name: "서울교통공사 · 1–8호선 역사 좌표", url: "https://www.data.go.kr/data/15099316/fileData.do" },
        { name: "인천교통공사 · 7호선 역정보", url: "https://www.ictr.or.kr/main/subway/subwayStation.do?line_no=807&station_no=761" },
        { name: "Wikimedia Commons · 7000호대 전동차", url: "https://commons.wikimedia.org/wiki/File:Seoul-Metropolitan-Rapid-Transit-7010-20070721.jpg" }
      ]
    },
    courses: {
      jangamSeongnam: {
        id: "jangamSeongnam",
        name: "장암 · 석남 전 구간",
        subtitle: "의정부 장암에서 서울을 관통해 인천 석남까지",
        start: "장암",
        end: "석남",
        mapBounds: { minLng: 126.64, maxLng: 127.095, minLat: 37.455, maxLat: 37.720 },
        cornerLabels: { northWest: "UIJEONGBU", southEast: "INCHEON" },
        mapLabels: [
          { text: "UIJEONGBU", lng: 127.035, lat: 37.705, muted: true },
          { text: "SEOUL", lng: 126.990, lat: 37.590 },
          { text: "GWANGMYEONG · BUCHEON", lng: 126.820, lat: 37.475, muted: true },
          { text: "INCHEON", lng: 126.700, lat: 37.530, muted: true }
        ],
        directions: [
          { id: "seongnam", name: "석남행", destination: "석남", subtitle: "장암 출발 · 석남 종착", mode: "forward" },
          { id: "jangam", name: "장암행", destination: "장암", subtitle: "석남 출발 · 장암 종착", mode: "reverse" }
        ],
        stations: window.LINE_7_ROUTES.full
      },
      dobongsanSeongnam: {
        id: "dobongsanSeongnam",
        name: "도봉산 · 석남",
        subtitle: "운행 빈도가 높은 도봉산 종착 계통을 포함한 광역축",
        start: "도봉산",
        end: "석남",
        mapBounds: { minLng: 126.64, maxLng: 127.095, minLat: 37.455, maxLat: 37.705 },
        cornerLabels: { northWest: "DOBONGSAN", southEast: "INCHEON" },
        mapLabels: [
          { text: "DOBONGSAN", lng: 127.045, lat: 37.690, muted: true },
          { text: "SEOUL", lng: 126.990, lat: 37.590 },
          { text: "BUCHEON", lng: 126.780, lat: 37.500, muted: true },
          { text: "INCHEON", lng: 126.700, lat: 37.530, muted: true }
        ],
        directions: [
          { id: "seongnam", name: "석남행", destination: "석남", subtitle: "도봉산 출발 · 석남 종착", mode: "forward" },
          { id: "dobongsan", name: "도봉산행", destination: "도봉산", subtitle: "석남 출발 · 도봉산 종착", mode: "reverse" }
        ],
        stations: window.LINE_7_ROUTES.dobongsan
      }
    },
    majorStations: [
      "장암", "도봉산", "노원", "태릉입구", "상봉", "군자", "건대입구", "자양",
      "강남구청", "논현", "고속터미널", "이수", "보라매", "대림", "가산디지털단지",
      "광명사거리", "온수", "부천종합운동장", "부천시청", "부평구청", "석남"
    ]
  },
  8: {
    number: 8,
    name: "8호선",
    color: "#E6186C",
    darkColor: "#B20F50",
    softColor: "rgba(230,24,108,.16)",
    areaLabel: "NAMYANGJU · GURI · SEOUL · SEONGNAM",
    heroRegion: "남양주·구리·서울·성남 위에",
    train: {
      src: "./assets/trains/line8.jpg",
      alt: "서울 도시철도 8호선 8000호대 전동차가 암사역에 정차한 모습",
      caption: "서울도시철도 8000호대 전동차 · 암사",
      credit: "익명 · S.I.H. upload · Wikimedia Commons",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Seoul-Metropolitan-Rapid-Transit-8021-20081004.jpg"
    },
    history: {
      period: "1990 — 2024",
      summary: "8호선은 성남 모란에서 서울 송파·강동을 거쳐 구리와 남양주 별내까지 이어지는 수도권 동남–동북 간선입니다. 1996년 모란–잠실 구간에서 운행을 시작하고 1999년 암사까지 연장됐으며, 2021년 남위례역이 추가되었습니다. 2024년 암사–별내 12.9km 별내선이 개통하면서 현재 30.6km, 24개 역의 광역 노선으로 완성되었습니다.",
      events: [
        { year: "1990", label: "2기 지하철 건설", detail: "잠실과 성남을 연결하는 8호선 본선 건설 사업이 본격적으로 추진되었습니다." },
        { year: "1996.11.23", label: "모란–잠실 첫 개통", detail: "모란에서 잠실까지 13.1km, 14개 역이 개통하며 8호선 운행을 시작했습니다." },
        { year: "1999.07", label: "잠실–암사 연장", detail: "잠실에서 암사까지 4.6km, 4개 역이 추가되어 강동구까지 노선이 이어졌습니다." },
        { year: "2021.12.18", label: "남위례역 개통", detail: "복정과 산성 사이에 남위례역이 문을 열어 위례신도시의 철도 접근성이 높아졌습니다." },
        { year: "2024.08.10", label: "별내선 개통", detail: "암사역사공원·장자호수공원·구리·동구릉·다산·별내 6개 역이 개통해 남양주까지 연장되었습니다." }
      ],
      sources: [
        { name: "서울시 · 8호선 별내선 개통", url: "https://news.seoul.go.kr/citybuild/archives/524420" },
        { name: "서울시 · 남위례역 개통", url: "https://mediahub.seoul.go.kr/newsletter/newsletterDetail.do?newsltrNo=2000249" },
        { name: "국가철도공단 · 수도권 8호선 역 위치", url: "https://www.data.go.kr/data/15041334/fileData.do" },
        { name: "서울교통공사 · 1–8호선 역사 좌표", url: "https://www.data.go.kr/data/15099316/fileData.do" },
        { name: "Wikimedia Commons · 8000호대 전동차", url: "https://commons.wikimedia.org/wiki/File:Seoul-Metropolitan-Rapid-Transit-8021-20081004.jpg" }
      ]
    },
    courses: {
      byeollaeMoran: {
        id: "byeollaeMoran",
        name: "별내 · 모란 전 구간",
        subtitle: "남양주 별내에서 구리·잠실을 지나 성남 모란까지",
        start: "별내",
        end: "모란",
        mapBounds: { minLng: 127.085, maxLng: 127.175, minLat: 37.415, maxLat: 37.655 },
        cornerLabels: { northWest: "BYEOLLAE", southEast: "MORAN" },
        mapLabels: [
          { text: "NAMYANGJU", lng: 127.135, lat: 37.645, muted: true },
          { text: "GURI", lng: 127.148, lat: 37.600, muted: true },
          { text: "SEOUL", lng: 127.110, lat: 37.520 },
          { text: "SEONGNAM", lng: 127.150, lat: 37.445, muted: true }
        ],
        directions: [
          { id: "moran", name: "모란행", destination: "모란", subtitle: "별내 출발 · 모란 종착", mode: "forward" },
          { id: "byeollae", name: "별내행", destination: "별내", subtitle: "모란 출발 · 별내 종착", mode: "reverse" }
        ],
        stations: window.LINE_8_ROUTES.full
      }
    },
    majorStations: [
      "별내", "다산", "동구릉", "구리", "장자호수공원", "암사역사공원",
      "암사", "천호", "몽촌토성", "잠실", "석촌", "가락시장", "문정",
      "복정", "남위례", "산성", "남한산성입구", "모란"
    ]
  },
  9: {
    number: 9,
    name: "9호선",
    color: "#BDB092",
    darkColor: "#8A7E68",
    softColor: "rgba(189,176,146,.18)",
    areaLabel: "SEOUL EAST–WEST EXPRESS",
    heroRegion: "서울의 한강 남쪽 동서축 위에",
    train: {
      src: "./assets/trains/line9.jpg",
      alt: "서울 지하철 9호선 9000호대 전동차 9502편성",
      caption: "서울 지하철 9호선 9000호대 전동차 · 9502편성",
      credit: "IRTC1015 · Wikimedia Commons",
      license: "Public domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:SeoulMetro9_Train_9502.JPG"
    },
    history: {
      period: "1994 — 2028",
      summary: "9호선은 김포공항과 여의도·강남·송파·강동을 한강 남쪽에서 동서로 연결하는 도시철도입니다. 2009년 개화–신논현 1단계가 개통하면서 서울 지하철 최초의 본격적인 일반·급행 혼합운행을 시작했고, 2015년 종합운동장, 2018년 중앙보훈병원까지 연장되었습니다. 현재는 중앙보훈병원에서 고덕강일 방향으로 이어지는 4단계 사업이 진행 중입니다.",
      events: [
        { year: "1994", label: "3기 지하철 계획", detail: "김포공항에서 여의도와 강남을 지나 동남권으로 이어지는 9호선 계획이 서울 도시철도망에 포함되었습니다." },
        { year: "2001", label: "1단계 착공", detail: "김포공항–논현동 25.5km 구간의 건설이 시작되어 민간투자 방식의 도시철도 사업이 본격화되었습니다." },
        { year: "2009.07.24", label: "개화–신논현 개통", detail: "1단계 25개 역이 문을 열고 일반열차와 급행열차가 같은 선로를 이용하는 혼합운행을 시작했습니다." },
        { year: "2015.03.28", label: "신논현–종합운동장 연장", detail: "언주·선정릉·삼성중앙·봉은사·종합운동장 5개 역이 추가되어 강남 동부까지 노선이 이어졌습니다." },
        { year: "2018.12.01", label: "중앙보훈병원 연장", detail: "삼전에서 중앙보훈병원까지 8개 역이 개통해 송파·강동 지역까지 일반·급행 운행 범위가 확장되었습니다." },
        { year: "2021–2028", label: "4단계 연장 공사", detail: "중앙보훈병원에서 고덕강일 방향으로 이어지는 4단계 연장 사업이 공사 중이며 추가 역 개통이 추진되고 있습니다." }
      ],
      sources: [
        { name: "국가철도공단 · 수도권 9호선 역 위치", url: "https://www.data.go.kr/data/15041335/fileData.do" },
        { name: "서울교통공사 · 9호선 2·3단계 역사 좌표", url: "https://www.data.go.kr/data/15099317/fileData.do" },
        { name: "서울시 · 9호선 1단계 건설·개통", url: "https://news.seoul.go.kr/citybuild/archives/200261" },
        { name: "서울시 · 9호선 2단계 개통", url: "https://news.seoul.go.kr/citybuild/archives/229728" },
        { name: "서울시 · 9호선 3단계 개통", url: "https://news.seoul.go.kr/citybuild/archives/235894" },
        { name: "Wikimedia Commons · 9000호대 전동차", url: "https://commons.wikimedia.org/wiki/File:SeoulMetro9_Train_9502.JPG" }
      ]
    },
    courses: {
      local: {
        id: "local",
        name: "일반 전 구간",
        subtitle: "개화에서 중앙보훈병원까지 모든 38개 역 정차",
        start: "개화",
        end: "중앙보훈병원",
        mapBounds: { minLng: 126.785, maxLng: 127.160, minLat: 37.488, maxLat: 37.590 },
        cornerLabels: { northWest: "GAEHWA", southEast: "VHS MEDICAL CENTER" },
        mapLabels: [
          { text: "GANGSEO", lng: 126.835, lat: 37.575, muted: true },
          { text: "YEOUIDO", lng: 126.925, lat: 37.535, muted: true },
          { text: "GANGNAM", lng: 127.030, lat: 37.520 },
          { text: "SONGPA · GANGDONG", lng: 127.125, lat: 37.535, muted: true }
        ],
        directions: [
          { id: "vhs", name: "중앙보훈병원행", destination: "중앙보훈병원", subtitle: "개화 출발 · 중앙보훈병원 종착 · 일반", mode: "forward" },
          { id: "gaehwa", name: "개화행", destination: "개화", subtitle: "중앙보훈병원 출발 · 개화 종착 · 일반", mode: "reverse" }
        ],
        stations: window.LINE_9_ROUTES.local
      },
      express: {
        id: "express",
        name: "급행 전 구간",
        subtitle: "김포공항에서 중앙보훈병원까지 주요 16개 역 정차",
        start: "김포공항",
        end: "중앙보훈병원",
        mapBounds: { minLng: 126.790, maxLng: 127.160, minLat: 37.488, maxLat: 37.575 },
        cornerLabels: { northWest: "GIMPO AIRPORT", southEast: "VHS MEDICAL CENTER" },
        mapLabels: [
          { text: "EXPRESS", lng: 126.880, lat: 37.558, muted: true },
          { text: "YEOUIDO", lng: 126.925, lat: 37.535, muted: true },
          { text: "GANGNAM", lng: 127.030, lat: 37.520 },
          { text: "SONGPA · GANGDONG", lng: 127.125, lat: 37.535, muted: true }
        ],
        directions: [
          { id: "vhsExpress", name: "중앙보훈병원 급행", destination: "중앙보훈병원", subtitle: "김포공항 출발 · 중앙보훈병원 종착 · 급행", mode: "forward" },
          { id: "gimpoExpress", name: "김포공항 급행", destination: "김포공항", subtitle: "중앙보훈병원 출발 · 김포공항 종착 · 급행", mode: "reverse" }
        ],
        stations: window.LINE_9_ROUTES.express
      }
    },
    majorStations: [
      "개화", "김포공항", "마곡나루", "가양", "염창", "당산", "국회의사당",
      "여의도", "노량진", "동작", "고속터미널", "신논현", "선정릉",
      "봉은사", "종합운동장", "석촌", "올림픽공원", "중앙보훈병원"
    ]
  },
  10: {
    number: "K",
    code: "KTX",
    name: "KTX 경부고속선",
    color: "#1B5EAA",
    darkColor: "#0B3F78",
    softColor: "rgba(27,94,170,.16)",
    areaLabel: "NATIONAL HIGH-SPEED RAIL",
    heroRegion: "대한민국 위에",
    train: {
      src: "./assets/trains/ktx-gyeongbu.jpg",
      alt: "KTX-I 고속열차가 고속철도 선로를 주행하는 모습",
      caption: "KTX-I 고속열차",
      credit: "Subway06 · Wikimedia Commons",
      license: "CC BY 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:KTX_(Korea_Train_eXpress).jpg"
    },
    history: {
      period: "1989 — 2022",
      summary: "경부고속철도는 서울과 부산을 고속철도로 연결하기 위해 추진된 대한민국의 핵심 철도 인프라입니다. 1992년 공사를 시작해 2004년 서울–동대구 1단계와 기존 경부선 연계 구간을 개통했고, 2010년 동대구–부산 2단계 개통으로 전 구간 고속선 운행 체계를 완성했습니다. 이후 대전·대구 도심 구간과 서대구역이 차례로 문을 열며 현재의 경부고속축이 형성되었습니다.",
      events: [
        { year: "1989.05", label: "고속철도 추진 방침", detail: "정부가 서울–부산 간 고속철도 건설 추진 방침을 결정하며 국가 고속철도 사업이 본격화되었습니다." },
        { year: "1990.06", label: "기본계획 확정", detail: "경부고속철도 노선과 단계별 건설 방향을 담은 기본계획이 확정되었습니다." },
        { year: "1992.06", label: "경부고속철도 착공", detail: "천안아산 시험선 구간을 시작으로 경부고속철도 건설 공사가 시작되었습니다." },
        { year: "2004.04.01", label: "KTX 상업 운행 시작", detail: "서울–동대구 고속선 1단계와 동대구–부산 기존선 연계 운행이 개통하며 KTX 상업 운행이 시작되었습니다." },
        { year: "2010.11.01", label: "동대구–부산 2단계 개통", detail: "동대구에서 경주·울산을 거쳐 부산까지 이어지는 고속선이 개통해 경부고속철도 2단계가 완성되었습니다." },
        { year: "2015.08.01", label: "대전·대구 도심 구간 개통", detail: "대전과 대구 도심 통과 구간이 고속선으로 연결되어 운행 동선과 선로 용량이 개선되었습니다." },
        { year: "2022.03.31", label: "서대구역 개통", detail: "대구 서부권의 고속철도 접근성을 높이는 서대구역이 개통했습니다." }
      ],
      sources: [
        { name: "국가철도공단 · 경부고속철도 건설 연혁", url: "https://www.kr.or.kr/sub/info.do?m=05010201" },
        { name: "한국철도공사 · 철도 노선도", url: "https://info.korail.com/info/contents.do?key=1005" },
        { name: "공공데이터포털 · 국가철도공단 역사정보", url: "https://www.data.go.kr/data/15093755/fileData.do" },
        { name: "Wikimedia Commons · KTX-I 사진", url: "https://commons.wikimedia.org/wiki/File:KTX_(Korea_Train_eXpress).jpg" }
      ]
    },
    courses: {
      main: {
        id: "main",
        name: "경부고속선 대표 정차축",
        subtitle: "서울에서 대전·대구·경주·울산을 지나 부산까지",
        start: "서울",
        end: "부산",
        mapBounds: { minLng: 125.9, maxLng: 129.6, minLat: 33.0, maxLat: 38.7 },
        cornerLabels: { northWest: "SEOUL", southEast: "BUSAN" },
        mapLabels: [
          { text: "SEOUL", lng: 126.78, lat: 37.70 },
          { text: "DAEJEON", lng: 127.18, lat: 36.25, muted: true },
          { text: "DAEGU", lng: 128.36, lat: 35.95, muted: true },
          { text: "GYEONGJU · ULSAN", lng: 129.34, lat: 35.70, muted: true },
          { text: "BUSAN", lng: 129.22, lat: 35.02 }
        ],
        directions: [
          { id: "busan", name: "부산행", destination: "부산", subtitle: "서울 출발 · 부산 종착", mode: "forward" },
          { id: "seoul", name: "서울행", destination: "서울", subtitle: "부산 출발 · 서울 종착", mode: "reverse" }
        ],
        stations: window.KTX_GYEONGBU_ROUTES.main
      }
    },
    majorStations: ["서울", "광명", "천안아산", "오송", "대전", "김천구미", "서대구", "동대구", "경주", "울산", "부산"]
  },
  11: {
    number: "K",
    code: "KTX-HN",
    name: "KTX 호남고속선",
    color: "#2D68B2",
    darkColor: "#163E70",
    softColor: "rgba(45,104,178,.16)",
    areaLabel: "HONAM HIGH-SPEED RAIL",
    heroRegion: "대한민국 서남축 위에",
    train: {
      src: "./assets/trains/ktx-honam.jpg",
      alt: "KTX-I 고속열차가 고속철도 선로를 주행하는 모습",
      caption: "KTX-I 고속열차",
      credit: "Subway06 · Wikimedia Commons",
      license: "CC BY 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:KTX_(Korea_Train_eXpress).jpg"
    },
    history: {
      period: "2006 — 현재",
      summary: "호남고속철도는 수도권과 충청·호남권을 빠르게 연결하는 대한민국의 두 번째 고속철도 축입니다. 2006년 기본계획이 확정되고 2009년 오송–광주송정 구간 공사가 시작되어 2015년 1단계가 개통했습니다. 현재 KTX는 광주송정 이후 기존 호남선을 따라 나주와 목포까지 운행하며, 고막원–목포 구간을 포함한 2단계 사업이 진행 중입니다.",
      events: [
        { year: "2006.08.28", label: "건설기본계획 확정", detail: "오송에서 광주송정과 목포 방향으로 이어지는 호남고속철도 건설기본계획이 확정·고시되었습니다." },
        { year: "2009.05.22", label: "오송–광주송정 착공", detail: "오송–광주송정 구간의 노반 공사가 시작되며 호남고속철도 1단계 건설이 본격화되었습니다." },
        { year: "2015.04.02", label: "1단계 개통", detail: "오송–공주–익산–정읍–광주송정을 잇는 호남고속철도 1단계가 개통해 수도권과 광주 사이 이동 시간이 크게 단축되었습니다." },
        { year: "2019.06", label: "광주송정–고막원 고속화", detail: "광주송정–고막원 기존선 고속화 구간이 사용을 시작해 나주·목포 방향 운행 기반이 개선되었습니다." },
        { year: "2020.12", label: "고막원–목포 공사 착수", detail: "호남고속철도 2단계의 고막원–목포 구간 공사가 시작되었습니다." },
        { year: "2026.03", label: "2단계 사업 진행", detail: "국가철도공단 공개 현황 기준 호남고속철도 사업이 계속 진행 중이며, 향후 무안국제공항을 경유해 목포까지 고속철도 축을 확장할 예정입니다." }
      ],
      sources: [
        { name: "국가철도공단 · 호남고속철도 사업현황", url: "https://www.kr.or.kr/sub/info.do?m=05010202" },
        { name: "한국철도공사 · 열차시간표·노선도", url: "https://info.korail.com/info/contents.do?key=857" },
        { name: "공공데이터포털 · 국가철도공단 철도역 정보", url: "https://www.data.go.kr/data/15067652/fileData.do" },
        { name: "Wikimedia Commons · KTX-I 사진", url: "https://commons.wikimedia.org/wiki/File:KTX_(Korea_Train_eXpress).jpg" }
      ]
    },
    courses: {
      main: {
        id: "main",
        name: "호남고속축 대표 정차 코스",
        subtitle: "용산에서 공주·익산·광주송정을 지나 목포까지",
        start: "용산",
        end: "목포",
        mapBounds: { minLng: 125.9, maxLng: 129.6, minLat: 33.0, maxLat: 38.7 },
        cornerLabels: { northWest: "YONGSAN", southEast: "MOKPO" },
        mapLabels: [
          { text: "YONGSAN", lng: 126.75, lat: 37.70 },
          { text: "OSONG", lng: 127.48, lat: 36.72, muted: true },
          { text: "GONGJU", lng: 126.85, lat: 36.28, muted: true },
          { text: "IKSAN · JEONGEUP", lng: 126.55, lat: 35.72, muted: true },
          { text: "GWANGJU · NAJU", lng: 126.55, lat: 35.12, muted: true },
          { text: "MOKPO", lng: 126.18, lat: 34.68 }
        ],
        directions: [
          { id: "mokpo", name: "목포행", destination: "목포", subtitle: "용산 출발 · 목포 종착", mode: "forward" },
          { id: "yongsan", name: "용산행", destination: "용산", subtitle: "목포 출발 · 용산 종착", mode: "reverse" }
        ],
        stations: window.KTX_HONAM_ROUTES.main
      }
    },
    majorStations: ["용산", "광명", "천안아산", "오송", "공주", "익산", "정읍", "광주송정", "나주", "목포"]
  }

};