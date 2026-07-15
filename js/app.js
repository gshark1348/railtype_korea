(() => {
  "use strict";

  let ACTIVE_LINE_NUMBER = 3;
  let ACTIVE_COURSE_ID = "main";
  let LINE_CONFIG = window.METRO_LINES[ACTIVE_LINE_NUMBER];
  let COURSE = LINE_CONFIG.courses[ACTIVE_COURSE_ID];
  let ACTIVE_DIRECTION_ID = COURSE.directions?.[0]?.id || "forward";
  let DIRECTION = COURSE.directions?.find((item) => item.id === ACTIVE_DIRECTION_ID) || { id: "forward", name: `${COURSE.end}행`, mode: "forward" };
  let STATIONS = createJourneyStations(COURSE, DIRECTION);
  let LINE_COLOR = LINE_CONFIG.color;
  let MAJOR_STATION_NAMES = new Set(LINE_CONFIG.majorStations || []);
  // 플레이 중 오래 전에 통과한 역은 노선별 주요 역만 라벨을 유지합니다.
  // 직전 역과 현재 입력 대상 역은 이 목록과 관계없이 항상 표시됩니다.
  const STATION_CONTEXTS = {
    "대화": { title: "KINTEX", subtitle: "전시장과 넓은 하늘이 펼쳐지는 3호선의 시작점", icon: "🏙️" },
    "주엽": { title: "주엽 생활권", subtitle: "호수공원과 주거지가 이어지는 여유로운 거리", icon: "🌿" },
    "정발산": { title: "일산호수공원", subtitle: "문화공원과 산책로가 가까운 대표 공원권", icon: "🌳" },
    "마두": { title: "라페스타", subtitle: "쇼핑과 상업시설이 모여 있는 일산 중심지", icon: "🛍️" },
    "백석": { title: "고양아람누리", subtitle: "공연과 문화 공간이 살아 있는 예술 거점", icon: "🎭" },
    "대곡": { title: "환승 결절점", subtitle: "여러 노선이 만나는 서북권 철도 허브", icon: "🚉" },
    "화정": { title: "화정광장", subtitle: "광장형 상권과 주거지가 어우러진 지역 중심", icon: "🏘️" },
    "원당": { title: "서삼릉", subtitle: "왕릉과 녹지가 가까운 역사적 분위기의 지역", icon: "🏛️" },
    "원흥": { title: "창릉 신도시", subtitle: "새로운 주거지와 수변 공간이 넓게 펼쳐진 곳", icon: "🌱" },
    "삼송": { title: "스타필드", subtitle: "대형 복합 상업시설과 신도시가 만나는 구간", icon: "✨" },
    "지축": { title: "북한산 자락", subtitle: "도심과 산세가 맞닿는 외곽 진입 구간", icon: "⛰️" },
    "구파발": { title: "은평 한옥마을", subtitle: "한옥 지붕과 산세가 함께 보이는 북서 관문", icon: "🏠" },
    "연신내": { title: "연신내 로데오", subtitle: "먹거리와 쇼핑이 밀집한 활기찬 상권", icon: "🍜" },
    "불광": { title: "북한산 입구", subtitle: "도심 속 산행의 시작점이 되는 지역", icon: "🥾" },
    "녹번": { title: "언덕 주거지", subtitle: "골목과 주거지가 이어지는 서북권 생활권", icon: "🏡" },
    "홍제": { title: "홍제천", subtitle: "수변 산책로와 생활권이 어우러진 역세권", icon: "💧" },
    "무악재": { title: "무악 고개", subtitle: "도심 진입 전의 굴곡진 고개 지형을 품은 역", icon: "🛣️" },
    "독립문": { title: "독립문", subtitle: "근대사의 상징물이 우뚝 선 역사 공간", icon: "🗽" },
    "경복궁": { title: "경복궁", subtitle: "궁궐 전각과 광장이 펼쳐지는 서울의 중심", icon: "👑" },
    "안국": { title: "북촌 한옥", subtitle: "전통 한옥 골목의 분위기가 깊게 남은 지역", icon: "🏮" },
    "종로3가": { title: "익선동", subtitle: "전통 골목과 상업이 공존하는 서울의 오래된 심장", icon: "🏮" },
    "을지로3가": { title: "을지로 공구거리", subtitle: "네온과 인쇄골목이 공존하는 도심 산업지", icon: "🔧" },
    "충무로": { title: "영화의 거리", subtitle: "필름과 인쇄 문화의 흔적이 남아 있는 중심지", icon: "🎬" },
    "동대입구": { title: "동국대학교", subtitle: "캠퍼스와 남산 자락이 인접한 학술 구간", icon: "🎓" },
    "약수": { title: "약수 언덕", subtitle: "경사형 주거지와 도심 생활권이 만나는 곳", icon: "🏙️" },
    "금호": { title: "한강 조망", subtitle: "강변과 언덕 주거지의 풍경이 겹치는 구간", icon: "🌉" },
    "옥수": { title: "옥수교", subtitle: "한강과 교량, 환승 풍경이 겹치는 대표 뷰포인트", icon: "🌉" },
    "압구정": { title: "압구정 로데오", subtitle: "패션과 트렌드가 모이는 강남의 대표 거리", icon: "🕶️" },
    "신사": { title: "가로수길", subtitle: "가로수와 카페, 편집숍이 이어지는 거리", icon: "🌳" },
    "잠원": { title: "잠원한강공원", subtitle: "강변 산책과 자전거길이 어우러진 수변 공간", icon: "🚴" },
    "고속터미널": { title: "고속버스터미널", subtitle: "전국으로 뻗는 교통망과 대형 상권의 중심", icon: "🚌" },
    "교대": { title: "교육의 거리", subtitle: "서초의 교육 거점과 업무지구가 만나는 지점", icon: "📚" },
    "남부터미널": { title: "예술의전당 방면", subtitle: "버스터미널과 공연 예술권이 이어지는 지역", icon: "🎼" },
    "양재": { title: "양재 시민의숲", subtitle: "숲과 업무지구가 공존하는 남부의 관문", icon: "🌲" },
    "매봉": { title: "매봉산", subtitle: "완만한 산책길과 주거지가 이어지는 언덕 지형", icon: "🌄" },
    "도곡": { title: "타워팰리스", subtitle: "고층 주거 스카이라인이 상징적인 강남 주거지", icon: "🏢" },
    "대치": { title: "학원가", subtitle: "학습과 입시 문화의 상징적인 거리", icon: "✏️" },
    "학여울": { title: "SETEC", subtitle: "전시와 박람회가 열리는 컨벤션 구간", icon: "🧩" },
    "대청": { title: "녹지 주거지", subtitle: "조용한 주거 환경과 근린공원이 가까운 역세권", icon: "🌿" },
    "일원": { title: "일원 생태권", subtitle: "병원과 생활권, 녹지축이 인접한 지역", icon: "🍃" },
    "수서": { title: "SRT 수서역", subtitle: "광역 철도와 업무·상업이 연결되는 대형 환승 거점", icon: "🚄" },
    "가락시장": { title: "가락시장", subtitle: "농수산물과 활기찬 시장 풍경이 떠오르는 역", icon: "🍎" },
    "경찰병원": { title: "경찰병원", subtitle: "의료와 공공 서비스 기능이 맞물린 구간", icon: "🏥" },
    "오금": { title: "오금 생활권", subtitle: "주거지와 올림픽공원권이 만나는 3호선의 종점", icon: "🏁" }
  };
  const LINE_SPECIFIC_CONTEXTS = {
    "2:시청": { title: "서울광장", subtitle: "도심 행정과 광장이 만나는 2호선 순환의 출발점", icon: "🏛️" },
    "2:동대문역사문화공원": { title: "DDP", subtitle: "곡선형 건축과 패션 상권이 이어지는 동대문 중심", icon: "✨" },
    "2:왕십리": { title: "왕십리 환승센터", subtitle: "동북권 철도와 상업 기능이 겹치는 대형 환승 거점", icon: "🚉" },
    "2:성수": { title: "성수동", subtitle: "붉은 벽돌과 창고형 카페가 어우러진 창조 산업 거리", icon: "☕" },
    "2:건대입구": { title: "건대 상권", subtitle: "캠퍼스와 먹거리 거리가 맞닿은 활기찬 동부 상권", icon: "🎓" },
    "2:잠실": { title: "롯데월드타워", subtitle: "호수와 초고층 스카이라인이 상징적인 동남권 중심", icon: "🏙️" },
    "2:종합운동장": { title: "잠실종합운동장", subtitle: "대형 경기장과 국제 행사가 펼쳐지는 스포츠 거점", icon: "🏟️" },
    "2:삼성": { title: "COEX", subtitle: "전시·업무·쇼핑이 밀집한 강남의 국제 비즈니스 지구", icon: "🏢" },
    "2:강남": { title: "강남대로", subtitle: "고층 빌딩과 유동 인구가 집중되는 대표 업무 상권", icon: "🌃" },
    "2:사당": { title: "사당 환승권", subtitle: "남부권 버스와 지하철이 연결되는 교통 중심지", icon: "🚌" },
    "2:서울대입구": { title: "샤로수길", subtitle: "대학가와 골목 상권이 살아 있는 관악의 중심", icon: "📚" },
    "2:신림": { title: "신림동", subtitle: "청년 주거와 상권, 문화가 밀집한 서남권 핵심 지역", icon: "🍜" },
    "2:구로디지털단지": { title: "G밸리", subtitle: "테크 기업과 업무 빌딩이 이어지는 디지털 산업 지구", icon: "💻" },
    "2:신도림": { title: "신도림 환승", subtitle: "서남권 철도망과 대형 상업시설이 만나는 관문", icon: "🚆" },
    "2:당산": { title: "당산철교", subtitle: "한강을 가로지르는 철교와 강변 조망이 인상적인 구간", icon: "🌉" },
    "2:합정": { title: "합정 메세나", subtitle: "홍대 문화권과 한강 생활권이 만나는 서부 상권", icon: "🎵" },
    "2:홍대입구": { title: "홍대 거리", subtitle: "음악과 디자인, 야간 문화가 모이는 서울 대표 젊음의 거리", icon: "🎸" },
    "2:신촌": { title: "신촌 대학가", subtitle: "여러 대학과 상권이 밀집한 서북권 청년 문화 중심", icon: "🎓" },
    "2:충정로": { title: "서소문 도심", subtitle: "근대 건축과 업무지구가 이어지는 순환선의 마지막 구간", icon: "🏙️" },
    "2:신설동": { title: "신설동 교차로", subtitle: "동북권 구도심과 여러 교통축이 만나는 지선 종점", icon: "🚇" },
    "2:까치산": { title: "까치산 생활권", subtitle: "주거 밀집 지역과 서남권 환승이 맞물리는 지선 종점", icon: "🏘️" },
    "2:을지로입구": { title: "명동·을지로 도심", subtitle: "대형 금융사와 백화점, 명동 상권이 가까운 서울 중심 업무지", icon: "🏙️" },
    "2:을지로3가": { title: "을지로 골목", subtitle: "인쇄소와 공구상, 새로운 카페가 공존하는 도심 산업 골목", icon: "🔧" },
    "2:을지로4가": { title: "방산시장", subtitle: "포장·인쇄 재료 상점과 전통시장이 이어지는 생활 산업 지역", icon: "📦" },
    "2:신당": { title: "신당동 떡볶이타운", subtitle: "오래된 먹거리 골목과 중앙시장 상권이 가까운 지역", icon: "🍲" },
    "2:상왕십리": { title: "왕십리 뉴타운", subtitle: "대단지 주거와 구도심 골목이 맞닿은 동북권 생활권", icon: "🏘️" },
    "2:한양대": { title: "한양대학교", subtitle: "캠퍼스와 젊은 상권, 중랑천 생활권이 이어지는 대학가", icon: "🎓" },
    "2:뚝섬": { title: "서울숲 방면", subtitle: "서울숲과 성수 카페거리로 이어지는 도심 녹지 관문", icon: "🌳" },
    "2:구의": { title: "광진구청", subtitle: "행정시설과 주거 골목, 동서울 생활권이 어우러진 지역", icon: "🏢" },
    "2:강변": { title: "동서울터미널", subtitle: "광역버스와 한강변 주거, 테크노마트가 만나는 교통 거점", icon: "🚌" },
    "2:잠실나루": { title: "석촌호수 북단", subtitle: "한강과 석촌호수 사이의 주거단지와 수변 산책권", icon: "💧" },
    "2:잠실새내": { title: "새마을시장", subtitle: "먹거리 골목과 야구장 배후 상권이 활기찬 지역", icon: "🍜" },
    "2:선릉": { title: "선정릉", subtitle: "도심 왕릉과 테헤란로 업무지구가 나란히 놓인 지역", icon: "🌲" },
    "2:역삼": { title: "테헤란로", subtitle: "IT 기업과 스타트업, 업무 빌딩이 밀집한 강남 비즈니스 축", icon: "💼" },
    "2:교대": { title: "법조·교육 중심지", subtitle: "법원·검찰청과 교육기관, 직장인 상권이 모인 서초 중심", icon: "⚖️" },
    "2:서초": { title: "서초 법조타운", subtitle: "법원과 업무시설, 조용한 주거지가 공존하는 지역", icon: "⚖️" },
    "2:방배": { title: "방배동 카페골목", subtitle: "낮은 주거지와 소규모 카페, 생활 상권이 이어지는 동네", icon: "☕" },
    "2:낙성대": { title: "낙성대공원", subtitle: "강감찬 장군 유적과 관악산 산책권이 가까운 지역", icon: "🌳" },
    "2:봉천": { title: "봉천 생활권", subtitle: "언덕형 주거지와 전통시장, 관악구 생활 상권이 이어지는 곳", icon: "🏡" },
    "2:신대방": { title: "보라매공원 방면", subtitle: "도림천과 주거단지, 보라매 생활권이 연결되는 지역", icon: "🌿" },
    "2:대림": { title: "대림 중앙시장", subtitle: "다문화 음식점과 시장 상권이 밀집한 서남권 생활 거점", icon: "🥟" },
    "2:문래": { title: "문래창작촌", subtitle: "철공소 골목과 예술 작업실이 공존하는 창작 지역", icon: "🎨" },
    "2:영등포구청": { title: "영등포 행정타운", subtitle: "구청과 업무시설, 당산·문래 생활권을 잇는 중심 지역", icon: "🏛️" },
    "2:이대": { title: "이화여자대학교", subtitle: "캠퍼스와 패션 골목, 신촌 대학가가 연결되는 지역", icon: "🎓" },
    "2:아현": { title: "아현동 언덕길", subtitle: "도심과 주거지, 오래된 시장 골목이 만나는 서북권 동네", icon: "🏡" },
    "2:용답": { title: "청계천 생활권", subtitle: "청계천 산책로와 자동차 부품 상가가 가까운 지선 구간", icon: "💧" },
    "2:신답": { title: "신답 철도 관사촌", subtitle: "철도 시설과 조용한 주거 골목이 남아 있는 지역", icon: "🚇" },
    "2:용두": { title: "동대문구청", subtitle: "행정시설과 전통시장, 청계천 동부 생활권이 만나는 곳", icon: "🏛️" },
    "2:도림천": { title: "도림천 산책로", subtitle: "수변 산책길과 신도림 주거단지가 가까운 조용한 역세권", icon: "🚴" },
    "2:양천구청": { title: "목동 행정타운", subtitle: "양천구청과 목동 주거단지, 학교가 밀집한 생활 중심", icon: "🏢" },
    "2:신정네거리": { title: "신정동 생활상권", subtitle: "전통시장과 주거 골목이 모이는 양천구 남부 중심지", icon: "🛍️" }
  };
  const CITY_REGION_META = {
    yeoncheon: { id: "yeoncheon", label: "연천군", en: "YEONCHEON", short: "연천" },
    dongducheon: { id: "dongducheon", label: "동두천시", en: "DONGDUCHEON", short: "동두천" },
    yangju: { id: "yangju", label: "양주시", en: "YANGJU", short: "양주" },
    uijeongbu: { id: "uijeongbu", label: "의정부시", en: "UIJEONGBU", short: "의정부" },
    goyang: { id: "goyang", label: "고양시", en: "GOYANG", short: "고양" },
    seoul: { id: "seoul", label: "서울특별시", en: "SEOUL", short: "서울" },
    hanam: { id: "hanam", label: "하남시", en: "HANAM", short: "하남" },
    namyangju: { id: "namyangju", label: "남양주시", en: "NAMYANGJU", short: "남양주" },
    guri: { id: "guri", label: "구리시", en: "GURI", short: "구리" },
    seongnam: { id: "seongnam", label: "성남시", en: "SEONGNAM", short: "성남" },
    gwacheon: { id: "gwacheon", label: "과천시", en: "GWACHEON", short: "과천" },
    ansan: { id: "ansan", label: "안산시", en: "ANSAN", short: "안산" },
    siheung: { id: "siheung", label: "시흥시", en: "SIHEUNG", short: "시흥" },
    bucheon: { id: "bucheon", label: "부천시", en: "BUCHEON", short: "부천" },
    incheon: { id: "incheon", label: "인천광역시", en: "INCHEON", short: "인천" },
    gwangmyeong: { id: "gwangmyeong", label: "광명시", en: "GWANGMYEONG", short: "광명" },
    anyang: { id: "anyang", label: "안양시", en: "ANYANG", short: "안양" },
    gunpo: { id: "gunpo", label: "군포시", en: "GUNPO", short: "군포" },
    uiwang: { id: "uiwang", label: "의왕시", en: "UIWANG", short: "의왕" },
    suwon: { id: "suwon", label: "수원시", en: "SUWON", short: "수원" },
    hwaseong: { id: "hwaseong", label: "화성시", en: "HWASEONG", short: "화성" },
    osan: { id: "osan", label: "오산시", en: "OSAN", short: "오산" },
    pyeongtaek: { id: "pyeongtaek", label: "평택시", en: "PYEONGTAEK", short: "평택" },
    cheonan: { id: "cheonan", label: "천안시", en: "CHEONAN", short: "천안" },
    asan: { id: "asan", label: "아산시", en: "ASAN", short: "아산" }
  };

  const COURSE_CITY_SEGMENTS = {
    "1:gyeongin": [
      { id: "yeoncheon", stations: ["연천", "전곡", "청산"] },
      { id: "dongducheon", stations: ["소요산", "동두천", "보산", "동두천중앙", "지행"] },
      { id: "yangju", stations: ["덕정", "덕계", "양주"] },
      { id: "uijeongbu", stations: ["녹양", "가능", "의정부", "회룡", "망월사"] },
      { id: "seoul", stations: ["도봉산", "도봉", "방학", "창동", "녹천", "월계", "광운대", "석계", "신이문", "외대앞", "회기", "청량리", "제기동", "신설동", "동묘앞", "동대문", "종로5가", "종로3가", "종각", "시청", "서울역", "남영", "용산", "노량진", "대방", "신길", "영등포", "신도림", "구로", "구일", "개봉", "오류동", "온수"] },
      { id: "bucheon", stations: ["역곡", "소사", "부천", "중동", "송내"] },
      { id: "incheon", stations: ["부개", "부평", "백운", "동암", "간석", "주안", "도화", "제물포", "도원", "동인천", "인천"] }
    ],
    "1:gyeongbu": [
      { id: "seoul", stations: ["광운대", "석계", "신이문", "외대앞", "회기", "청량리", "제기동", "신설동", "동묘앞", "동대문", "종로5가", "종로3가", "종각", "시청", "서울역", "남영", "용산", "노량진", "대방", "신길", "영등포", "신도림", "구로", "가산디지털단지", "독산", "금천구청"] },
      { id: "anyang", stations: ["석수", "관악", "안양", "명학"] },
      { id: "gunpo", stations: ["금정", "군포", "당정"] },
      { id: "uiwang", stations: ["의왕"] },
      { id: "suwon", stations: ["성균관대", "화서", "수원", "세류"] },
      { id: "hwaseong", stations: ["병점"] },
      { id: "osan", stations: ["세마", "오산대", "오산"] },
      { id: "pyeongtaek", stations: ["진위", "송탄", "서정리", "평택지제", "평택"] },
      { id: "cheonan", stations: ["성환", "직산", "두정", "천안", "봉명", "쌍용"] },
      { id: "asan", stations: ["아산", "탕정", "배방", "온양온천", "신창"] }
    ],
    "1:seodongtan": [
      { id: "seoul", stations: ["광운대", "석계", "신이문", "외대앞", "회기", "청량리", "제기동", "신설동", "동묘앞", "동대문", "종로5가", "종로3가", "종각", "시청", "서울역", "남영", "용산", "노량진", "대방", "신길", "영등포", "신도림", "구로", "가산디지털단지", "독산", "금천구청"] },
      { id: "anyang", stations: ["석수", "관악", "안양", "명학"] },
      { id: "gunpo", stations: ["금정", "군포", "당정"] },
      { id: "uiwang", stations: ["의왕"] },
      { id: "suwon", stations: ["성균관대", "화서", "수원", "세류"] },
      { id: "hwaseong", stations: ["병점"] },
      { id: "osan", stations: ["서동탄"] }
    ],
    "1:gwangmyeong": [
      { id: "seoul", stations: ["영등포", "신도림", "구로", "가산디지털단지", "독산", "금천구청"] },
      { id: "gwangmyeong", stations: ["광명"] }
    ],
    "2:loop": [{ id: "seoul", stations: ["시청", "을지로입구", "을지로3가", "을지로4가", "동대문역사문화공원", "신당", "상왕십리", "왕십리", "한양대", "뚝섬", "성수", "건대입구", "구의", "강변", "잠실나루", "잠실", "잠실새내", "종합운동장", "삼성", "선릉", "역삼", "강남", "교대", "서초", "방배", "사당", "낙성대", "서울대입구", "봉천", "신림", "신대방", "구로디지털단지", "대림", "신도림", "문래", "영등포구청", "당산", "합정", "홍대입구", "신촌", "이대", "아현", "충정로", "시청"] }],
    "2:seongsu": [{ id: "seoul", stations: ["성수", "용답", "신답", "용두", "신설동"] }],
    "2:sinjeong": [{ id: "seoul", stations: ["신도림", "도림천", "양천구청", "신정네거리", "까치산"] }],
    "3:main": [
      { id: "goyang", stations: ["대화", "주엽", "정발산", "마두", "백석", "대곡", "화정", "원당", "원흥", "삼송", "지축"] },
      { id: "seoul", stations: ["구파발", "연신내", "불광", "녹번", "홍제", "무악재", "독립문", "경복궁", "안국", "종로3가", "을지로3가", "충무로", "동대입구", "약수", "금호", "옥수", "압구정", "신사", "잠원", "고속터미널", "교대", "남부터미널", "양재", "매봉", "도곡", "대치", "학여울", "대청", "일원", "수서", "가락시장", "경찰병원", "오금"] }
    ],
    "4:jinjeopSadang": [
      { id: "namyangju", stations: ["진접", "오남", "별내별가람"] },
      { id: "seoul", stations: ["불암산", "상계", "노원", "창동", "쌍문", "수유", "미아", "미아사거리", "길음", "성신여대입구", "한성대입구", "혜화", "동대문", "동대문역사문화공원", "충무로", "명동", "회현", "서울역", "숙대입구", "삼각지", "신용산", "이촌", "동작", "총신대입구(이수)", "사당"] }
    ],
    "4:buramsanOido": [
      { id: "seoul", stations: ["불암산", "상계", "노원", "창동", "쌍문", "수유", "미아", "미아사거리", "길음", "성신여대입구", "한성대입구", "혜화", "동대문", "동대문역사문화공원", "충무로", "명동", "회현", "서울역", "숙대입구", "삼각지", "신용산", "이촌", "동작", "총신대입구(이수)", "사당", "남태령"] },
      { id: "gwacheon", stations: ["선바위", "경마공원", "대공원", "과천", "정부과천청사"] },
      { id: "anyang", stations: ["인덕원", "평촌", "범계"] },
      { id: "gunpo", stations: ["금정", "산본", "수리산", "대야미"] },
      { id: "ansan", stations: ["반월", "상록수", "한대앞", "중앙", "고잔", "초지", "안산", "신길온천"] },
      { id: "siheung", stations: ["정왕", "오이도"] }
    ],
    "4:buramsanAnsan": [
      { id: "seoul", stations: ["불암산", "상계", "노원", "창동", "쌍문", "수유", "미아", "미아사거리", "길음", "성신여대입구", "한성대입구", "혜화", "동대문", "동대문역사문화공원", "충무로", "명동", "회현", "서울역", "숙대입구", "삼각지", "신용산", "이촌", "동작", "총신대입구(이수)", "사당", "남태령"] },
      { id: "gwacheon", stations: ["선바위", "경마공원", "대공원", "과천", "정부과천청사"] },
      { id: "anyang", stations: ["인덕원", "평촌", "범계"] },
      { id: "gunpo", stations: ["금정", "산본", "수리산", "대야미"] },
      { id: "ansan", stations: ["반월", "상록수", "한대앞", "중앙", "고잔", "초지", "안산"] }
    ],
    "5:banghwaSangil": [
      { id: "seoul", stations: ["방화", "개화산", "김포공항", "송정", "마곡", "발산", "우장산", "화곡", "까치산", "신정", "목동", "오목교", "양평", "영등포구청", "영등포시장", "신길", "여의도", "여의나루", "마포", "공덕", "애오개", "충정로", "서대문", "광화문", "종로3가", "을지로4가", "동대문역사문화공원", "청구", "신금호", "행당", "왕십리", "마장", "답십리", "장한평", "군자", "아차산", "광나루", "천호", "강동", "길동", "굽은다리", "명일", "고덕", "상일동"] }
    ],
    "5:banghwaHanam": [
      { id: "seoul", stations: ["방화", "개화산", "김포공항", "송정", "마곡", "발산", "우장산", "화곡", "까치산", "신정", "목동", "오목교", "양평", "영등포구청", "영등포시장", "신길", "여의도", "여의나루", "마포", "공덕", "애오개", "충정로", "서대문", "광화문", "종로3가", "을지로4가", "동대문역사문화공원", "청구", "신금호", "행당", "왕십리", "마장", "답십리", "장한평", "군자", "아차산", "광나루", "천호", "강동", "길동", "굽은다리", "명일", "고덕", "상일동", "강일"] },
      { id: "hanam", stations: ["미사", "하남풍산", "하남시청", "하남검단산"] }
    ],
    "5:banghwaMacheon": [
      { id: "seoul", stations: ["방화", "개화산", "김포공항", "송정", "마곡", "발산", "우장산", "화곡", "까치산", "신정", "목동", "오목교", "양평", "영등포구청", "영등포시장", "신길", "여의도", "여의나루", "마포", "공덕", "애오개", "충정로", "서대문", "광화문", "종로3가", "을지로4가", "동대문역사문화공원", "청구", "신금호", "행당", "왕십리", "마장", "답십리", "장한평", "군자", "아차산", "광나루", "천호", "강동", "둔촌동", "올림픽공원", "방이", "오금", "개롱", "거여", "마천"] }
    ],
    "6:eungamSinnae": [
      { id: "seoul", stations: ["응암", "역촌", "불광", "독바위", "연신내", "구산", "새절", "증산", "디지털미디어시티", "월드컵경기장", "마포구청", "망원", "합정", "상수", "광흥창", "대흥", "공덕", "효창공원앞", "삼각지", "녹사평", "이태원", "한강진", "버티고개", "약수", "청구", "신당", "동묘앞", "창신", "보문", "안암", "고려대", "월곡", "상월곡", "돌곶이", "석계", "태릉입구", "화랑대", "봉화산", "신내"] }
    ],
    "6:eungamBonghwasan": [
      { id: "seoul", stations: ["응암", "역촌", "불광", "독바위", "연신내", "구산", "새절", "증산", "디지털미디어시티", "월드컵경기장", "마포구청", "망원", "합정", "상수", "광흥창", "대흥", "공덕", "효창공원앞", "삼각지", "녹사평", "이태원", "한강진", "버티고개", "약수", "청구", "신당", "동묘앞", "창신", "보문", "안암", "고려대", "월곡", "상월곡", "돌곶이", "석계", "태릉입구", "화랑대", "봉화산"] }
    ],
    "7:jangamSeongnam": [
      { id: "uijeongbu", stations: ["장암"] },
      { id: "seoul", stations: ["도봉산", "수락산", "마들", "노원", "중계", "하계", "공릉", "태릉입구", "먹골", "중화", "상봉", "면목", "사가정", "용마산", "중곡", "군자", "어린이대공원", "건대입구", "자양", "청담", "강남구청", "학동", "논현", "반포", "고속터미널", "내방", "이수", "남성", "숭실대입구", "상도", "장승배기", "신대방삼거리", "보라매", "신풍", "대림", "남구로", "가산디지털단지"] },
      { id: "gwangmyeong", stations: ["철산", "광명사거리"] },
      { id: "seoul", stations: ["천왕", "온수"] },
      { id: "bucheon", stations: ["까치울", "부천종합운동장", "춘의", "신중동", "부천시청", "상동"] },
      { id: "incheon", stations: ["삼산체육관", "굴포천", "부평구청", "산곡", "석남"] }
    ],
    "7:dobongsanSeongnam": [
      { id: "seoul", stations: ["도봉산", "수락산", "마들", "노원", "중계", "하계", "공릉", "태릉입구", "먹골", "중화", "상봉", "면목", "사가정", "용마산", "중곡", "군자", "어린이대공원", "건대입구", "자양", "청담", "강남구청", "학동", "논현", "반포", "고속터미널", "내방", "이수", "남성", "숭실대입구", "상도", "장승배기", "신대방삼거리", "보라매", "신풍", "대림", "남구로", "가산디지털단지"] },
      { id: "gwangmyeong", stations: ["철산", "광명사거리"] },
      { id: "seoul", stations: ["천왕", "온수"] },
      { id: "bucheon", stations: ["까치울", "부천종합운동장", "춘의", "신중동", "부천시청", "상동"] },
      { id: "incheon", stations: ["삼산체육관", "굴포천", "부평구청", "산곡", "석남"] }
    ],
    "8:byeollaeMoran": [
      { id: "namyangju", stations: ["별내", "다산"] },
      { id: "guri", stations: ["동구릉", "구리", "장자호수공원"] },
      { id: "seoul", stations: ["암사역사공원", "암사", "천호", "강동구청", "몽촌토성", "잠실", "석촌", "송파", "가락시장", "문정", "장지", "복정"] },
      { id: "seongnam", stations: ["남위례", "산성", "남한산성입구", "단대오거리", "신흥", "수진", "모란"] }
    ],
    "9:local": [{ id: "seoul", stations: ["개화", "김포공항", "공항시장", "신방화", "마곡나루", "양천향교", "가양", "증미", "등촌", "염창", "신목동", "선유도", "당산", "국회의사당", "여의도", "샛강", "노량진", "노들", "흑석", "동작", "구반포", "신반포", "고속터미널", "사평", "신논현", "언주", "선정릉", "삼성중앙", "봉은사", "종합운동장", "삼전", "석촌고분", "석촌", "송파나루", "한성백제", "올림픽공원", "둔촌오륜", "중앙보훈병원"] }],
    "9:express": [{ id: "seoul", stations: ["김포공항", "마곡나루", "가양", "염창", "당산", "여의도", "노량진", "동작", "고속터미널", "신논현", "선정릉", "봉은사", "종합운동장", "석촌", "올림픽공원", "중앙보훈병원"] }]
  };

  const STATION_ADMIN_DISTRICTS = (() => {
    const map = new Map();
    const add = (district, names) => names.forEach((name) => map.set(name, district));

    // 고양시
    add("일산서구", ["대화", "주엽"]);
    add("일산동구", ["정발산", "마두", "백석"]);
    add("덕양구", ["대곡", "화정", "원당", "원흥", "삼송", "지축"]);

    // 서울특별시
    add("도봉구", ["도봉산", "도봉", "방학", "창동"]);
    add("노원구", ["녹천", "월계", "광운대", "석계"]);
    add("동대문구", ["신이문", "외대앞", "회기", "청량리", "제기동", "신설동", "용두"]);
    add("종로구", ["동묘앞", "동대문", "종로5가", "종로3가", "종각", "경복궁", "안국"]);
    add("중구", ["시청", "서울역", "을지로입구", "을지로3가", "을지로4가", "동대문역사문화공원", "신당", "충무로", "동대입구", "약수"]);
    add("용산구", ["남영", "용산"]);
    add("동작구", ["노량진", "대방", "사당", "신대방"]);
    add("영등포구", ["신길", "영등포", "문래", "영등포구청", "당산"]);
    add("구로구", ["신도림", "구로", "구일", "개봉", "오류동", "온수", "구로디지털단지", "대림", "도림천"]);
    add("금천구", ["가산디지털단지", "독산", "금천구청"]);
    add("은평구", ["구파발", "연신내", "불광", "녹번"]);
    add("서대문구", ["홍제", "무악재", "독립문", "충정로"]);
    add("성동구", ["상왕십리", "왕십리", "한양대", "뚝섬", "성수", "용답", "신답", "금호", "옥수"]);
    add("광진구", ["건대입구", "구의", "강변"]);
    add("송파구", ["잠실나루", "잠실", "잠실새내", "종합운동장", "가락시장", "경찰병원", "오금"]);
    add("강남구", ["삼성", "선릉", "역삼", "강남", "압구정", "신사", "매봉", "도곡", "대치", "학여울", "대청", "일원", "수서"]);
    add("서초구", ["교대", "서초", "방배", "잠원", "고속터미널", "남부터미널", "양재"]);
    add("관악구", ["낙성대", "서울대입구", "봉천", "신림"]);
    add("마포구", ["합정", "홍대입구", "신촌", "이대", "아현"]);
    add("양천구", ["양천구청", "신정네거리"]);
    add("강서구", ["까치산"]);

    // 4호선 서울 구간
    add("노원구", ["불암산", "상계", "노원"]);
    add("도봉구", ["창동", "쌍문"]);
    add("강북구", ["수유", "미아", "미아사거리"]);
    add("성북구", ["길음", "성신여대입구", "한성대입구"]);
    add("종로구", ["혜화", "동대문"]);
    add("중구", ["동대문역사문화공원", "충무로", "명동", "회현", "서울역"]);
    add("용산구", ["숙대입구", "삼각지", "신용산", "이촌"]);
    add("동작구", ["동작", "총신대입구(이수)", "사당"]);
    add("서초구", ["남태령"]);

    // 4호선 경기 남부 일반구
    add("동안구", ["인덕원", "평촌", "범계"]);
    add("상록구", ["반월", "상록수", "한대앞"]);
    add("단원구", ["중앙", "고잔", "초지", "안산", "신길온천"]);

    // 5호선 서울·하남 구간
    add("강서구", ["방화", "개화산", "김포공항", "송정", "마곡", "발산", "우장산", "화곡", "까치산"]);
    add("양천구", ["신정", "목동", "오목교"]);
    add("영등포구", ["양평", "영등포구청", "영등포시장", "신길", "여의도", "여의나루"]);
    add("마포구", ["마포", "공덕"]);
    add("서대문구", ["애오개", "충정로", "서대문"]);
    add("종로구", ["광화문", "종로3가"]);
    add("중구", ["을지로4가", "동대문역사문화공원", "청구"]);
    add("성동구", ["신금호", "행당", "왕십리", "마장"]);
    add("동대문구", ["답십리", "장한평"]);
    add("광진구", ["군자", "아차산", "광나루"]);
    add("강동구", ["천호", "강동", "길동", "굽은다리", "명일", "고덕", "상일동", "강일", "둔촌동"]);
    add("송파구", ["올림픽공원", "방이", "오금", "개롱", "거여", "마천"]);
    add("미사동", ["미사"]);
    add("덕풍동", ["하남풍산"]);
    add("신장동", ["하남시청"]);
    add("창우·신장동", ["하남검단산"]);

    // 6호선 서울 북부 구간
    add("은평구", ["응암", "역촌", "불광", "독바위", "연신내", "구산", "새절", "증산"]);
    add("마포구", ["디지털미디어시티", "월드컵경기장", "마포구청", "망원", "합정", "상수", "광흥창", "대흥", "공덕"]);
    add("용산구", ["효창공원앞", "삼각지", "녹사평", "이태원", "한강진"]);
    add("중구", ["버티고개", "약수", "청구", "신당"]);
    add("종로구", ["동묘앞", "창신"]);
    add("성북구", ["보문", "안암", "고려대", "월곡", "상월곡", "돌곶이"]);
    add("노원구", ["석계", "태릉입구", "화랑대"]);
    add("중랑구", ["봉화산", "신내"]);

    // 7호선 의정부·서울·광명·부천·인천 구간
    add("장암동", ["장암"]);
    add("도봉구", ["도봉산"]);
    add("노원구", ["수락산", "마들", "노원", "중계", "하계", "공릉"]);
    add("중랑구", ["먹골", "중화", "상봉", "면목", "사가정", "용마산"]);
    add("광진구", ["중곡", "군자", "어린이대공원", "건대입구", "자양"]);
    add("강남구", ["청담", "강남구청", "학동", "논현"]);
    add("서초구", ["반포", "고속터미널", "내방"]);
    add("동작구", ["이수", "남성", "숭실대입구", "상도", "장승배기", "신대방삼거리", "보라매"]);
    add("영등포구", ["신풍"]);
    add("구로구", ["대림", "남구로", "천왕", "온수"]);
    add("금천구", ["가산디지털단지"]);
    add("철산동", ["철산"]);
    add("광명동", ["광명사거리"]);
    add("원미구", ["까치울", "부천종합운동장", "춘의", "신중동", "부천시청", "상동"]);
    add("부평구", ["삼산체육관", "굴포천", "부평구청", "산곡"]);
    add("서해구", ["석남"]);

    // 인천광역시
    add("부평구", ["부개", "부평", "백운"]);
    add("남동구", ["동암", "간석"]);
    add("미추홀구", ["주안", "도화", "제물포"]);
    add("중구", ["도원", "동인천", "인천"]);

    // 경기도 주요 시의 일반구
    add("소사구", ["역곡", "소사", "부천", "송내"]);
    add("원미구", ["중동"]);
    add("만안구", ["석수", "관악", "안양", "명학"]);
    add("장안구", ["성균관대"]);
    add("팔달구", ["화서", "수원"]);
    add("권선구", ["세류"]);

    // 천안시
    add("서북구", ["성환", "직산", "두정", "쌍용"]);
    add("동남구", ["천안", "봉명"]);

    // 8호선 별내선·성남 구간
    add("별내동", ["별내"]);
    add("다산동", ["다산"]);
    add("인창동", ["동구릉", "구리"]);
    add("교문동", ["장자호수공원"]);
    add("강동구", ["암사역사공원", "암사", "천호", "강동구청"]);
    add("송파구", ["몽촌토성", "잠실", "석촌", "송파", "가락시장", "문정", "장지", "복정"]);
    add("수정구", ["남위례", "산성"]);
    add("중원구", ["남한산성입구", "단대오거리", "신흥", "수진", "모란"]);

    // 9호선 서울 동서 구간
    add("강서구", ["개화", "김포공항", "공항시장", "신방화", "마곡나루", "양천향교", "가양", "증미", "등촌", "염창"]);
    add("양천구", ["신목동"]);
    add("영등포구", ["선유도", "당산", "국회의사당", "여의도", "샛강"]);
    add("동작구", ["노량진", "노들", "흑석", "동작"]);
    add("서초구", ["구반포", "신반포", "고속터미널", "사평"]);
    add("강남구", ["신논현", "언주", "선정릉", "삼성중앙", "봉은사"]);
    add("송파구", ["종합운동장", "삼전", "석촌고분", "석촌", "송파나루", "한성백제", "올림픽공원"]);
    add("강동구", ["둔촌오륜", "중앙보훈병원"]);

    return map;
  })();

  const TRANSFER_INFO = {
    "회룡": [{ kind: "light", tag: "LRT", name: "의정부경전철" }],
    "도봉산": [{ kind: "subway", tag: "7", name: "7호선" }],
    "창동": [{ kind: "subway", tag: "4", name: "4호선" }],
    "광운대": [{ kind: "rail", tag: "ITX", name: "경춘선 · ITX-청춘" }],
    "석계": [{ kind: "subway", tag: "6", name: "6호선" }],
    "회기": [{ kind: "rail", tag: "JR", name: "경의·중앙선 · 경춘선" }],
    "청량리": [{ kind: "rail", tag: "JR", name: "경의·중앙선 · 경춘선 · 수인분당선" }, { kind: "rail", tag: "KTX", name: "KTX · ITX-마음" }],
    "신설동": [{ kind: "subway", tag: "2", name: "2호선" }, { kind: "light", tag: "LRT", name: "우이신설선" }],
    "동묘앞": [{ kind: "subway", tag: "6", name: "6호선" }],
    "동대문": [{ kind: "subway", tag: "4", name: "4호선" }],
    "종로3가": [{ kind: "subway", tag: "3", name: "3호선" }, { kind: "subway", tag: "5", name: "5호선" }],
    "시청": [{ kind: "subway", tag: "2", name: "2호선" }],
    "서울역": [{ kind: "subway", tag: "4", name: "4호선" }, { kind: "rail", tag: "JR", name: "경의·중앙선" }, { kind: "airport", tag: "AREX", name: "공항철도" }, { kind: "rail", tag: "KTX", name: "KTX · 일반철도" }],
    "용산": [{ kind: "rail", tag: "JR", name: "경의·중앙선" }, { kind: "rail", tag: "KTX", name: "KTX · ITX · 일반철도" }],
    "노량진": [{ kind: "subway", tag: "9", name: "9호선" }],
    "대방": [{ kind: "light", tag: "LRT", name: "신림선" }],
    "신길": [{ kind: "subway", tag: "5", name: "5호선" }],
    "신도림": [{ kind: "subway", tag: "2", name: "2호선" }],
    "가산디지털단지": [{ kind: "subway", tag: "7", name: "7호선" }],
    "금정": [{ kind: "subway", tag: "4", name: "4호선" }],
    "병점": [{ kind: "branch", tag: "BR", name: "1호선 서동탄 지선" }],
    "수원": [{ kind: "rail", tag: "JR", name: "수인분당선" }, { kind: "rail", tag: "KTX", name: "일반철도 · ITX" }],
    "평택지제": [{ kind: "rail", tag: "SRT", name: "SRT" }],
    "아산": [{ kind: "rail", tag: "KTX", name: "KTX · SRT (천안아산 연계)" }],
    "을지로3가": [{ kind: "subway", tag: "3", name: "3호선" }],
    "을지로4가": [{ kind: "subway", tag: "5", name: "5호선" }],
    "동대문역사문화공원": [{ kind: "subway", tag: "4", name: "4호선" }, { kind: "subway", tag: "5", name: "5호선" }],
    "신당": [{ kind: "subway", tag: "6", name: "6호선" }],
    "왕십리": [{ kind: "subway", tag: "5", name: "5호선" }, { kind: "rail", tag: "JR", name: "경의·중앙선 · 경춘선 · 수인분당선" }],
    "건대입구": [{ kind: "subway", tag: "7", name: "7호선" }],
    "잠실": [{ kind: "subway", tag: "8", name: "8호선" }],
    "종합운동장": [{ kind: "subway", tag: "9", name: "9호선" }],
    "삼성": [{ kind: "gtx", tag: "GTX", name: "GTX-A (예정)" }],
    "선릉": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "강남": [{ kind: "rail", tag: "NDB", name: "신분당선" }],
    "교대": [{ kind: "subway", tag: ACTIVE_LINE_NUMBER === 3 ? "2" : "3", name: ACTIVE_LINE_NUMBER === 3 ? "2호선" : "3호선" }],
    "사당": [{ kind: "subway", tag: "4", name: "4호선" }],
    "신림": [{ kind: "light", tag: "LRT", name: "신림선" }],
    "대림": [{ kind: "subway", tag: "7", name: "7호선" }],
    "영등포구청": [{ kind: "subway", tag: "5", name: "5호선" }],
    "당산": [{ kind: "subway", tag: "9", name: "9호선" }],
    "합정": [{ kind: "subway", tag: "6", name: "6호선" }],
    "홍대입구": [{ kind: "rail", tag: "JR", name: "경의·중앙선" }, { kind: "airport", tag: "AREX", name: "공항철도" }],
    "충정로": [{ kind: "subway", tag: "5", name: "5호선" }],
    "까치산": [{ kind: "subway", tag: "5", name: "5호선" }],
    "대곡": [{ kind: "rail", tag: "JR", name: "경의·중앙선 · 서해선" }, { kind: "gtx", tag: "GTX", name: "GTX-A" }],
    "연신내": [{ kind: "subway", tag: "6", name: "6호선" }, { kind: "gtx", tag: "GTX", name: "GTX-A" }],
    "불광": [{ kind: "subway", tag: "6", name: "6호선" }],
    "충무로": [{ kind: "subway", tag: "4", name: "4호선" }],
    "약수": [{ kind: "subway", tag: "6", name: "6호선" }],
    "옥수": [{ kind: "rail", tag: "JR", name: "경의·중앙선" }],
    "고속터미널": [{ kind: "subway", tag: "7", name: "7호선" }, { kind: "subway", tag: "9", name: "9호선" }],
    "양재": [{ kind: "rail", tag: "NDB", name: "신분당선" }],
    "도곡": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "수서": [{ kind: "rail", tag: "JR", name: "수인분당선" }, { kind: "rail", tag: "SRT", name: "SRT" }, { kind: "gtx", tag: "GTX", name: "GTX-A" }],
    "가락시장": [{ kind: "subway", tag: "8", name: "8호선" }],
    "오금": [{ kind: "subway", tag: "5", name: "5호선" }]
  };

  const SVG_NS = "http://www.w3.org/2000/svg";
  const STORAGE = {
    sessions: "metrotype.sessions.v4",
    cleared: "metrotype.cleared-routes.v4"
  };

  const MAP = {
    width: 1200,
    height: 760,
    paddingX: 58,
    paddingY: 50
  };
  const DEFAULT_MAP_BOUNDS = {
    minLng: 126.725,
    maxLng: 127.155,
    minLat: 37.455,
    maxLat: 37.700
  };

  const REGION_SHAPES = window.METRO_BOUNDARY_FEATURES || {
    yeoncheon: {
      id: "yeoncheon",
      name: "YEONCHEON",
      points: [
        [126.885, 38.165], [126.945, 38.160], [127.015, 38.148], [127.088, 38.130],
        [127.135, 38.092], [127.145, 38.040], [127.112, 37.998], [127.048, 37.972],
        [126.978, 37.972], [126.922, 37.988], [126.888, 38.032], [126.876, 38.094]
      ],
      label: { text: "YEONCHEON", lng: 127.020, lat: 38.078 }
    },
    dongducheon: {
      id: "dongducheon",
      name: "DONGDUCHEON",
      points: [
        [126.972, 37.972], [127.020, 37.972], [127.072, 37.956], [127.098, 37.924],
        [127.096, 37.886], [127.062, 37.858], [127.010, 37.852], [126.974, 37.868],
        [126.962, 37.904]
      ],
      label: { text: "DONGDUCHEON", lng: 127.030, lat: 37.915 }
    },
    yangju: {
      id: "yangju",
      name: "YANGJU",
      points: [
        [126.904, 37.944], [126.960, 37.958], [127.020, 37.946], [127.088, 37.910],
        [127.118, 37.862], [127.104, 37.804], [127.062, 37.760], [126.994, 37.736],
        [126.932, 37.748], [126.886, 37.786], [126.872, 37.842], [126.882, 37.892]
      ],
      label: { text: "YANGJU", lng: 126.995, lat: 37.842 }
    },
    uijeongbu: {
      id: "uijeongbu",
      name: "UIJEONGBU",
      points: [
        [126.930, 37.764], [126.968, 37.774], [127.010, 37.768], [127.036, 37.740],
        [127.030, 37.704], [126.998, 37.680], [126.952, 37.682], [126.924, 37.710],
        [126.920, 37.740]
      ],
      label: { text: "UIJEONGBU", lng: 126.978, lat: 37.726 }
    },
    goyang: {
      id: "goyang",
      name: "GOYANG",
      points: [
        [126.716, 37.705], [126.775, 37.706], [126.826, 37.690], [126.875, 37.672],
        [126.921, 37.646], [126.919, 37.607], [126.889, 37.586], [126.838, 37.578],
        [126.789, 37.589], [126.748, 37.617], [126.721, 37.655]
      ],
      label: { text: "GOYANG", lng: 126.825, lat: 37.648 }
    },
    seoul: {
      id: "seoul",
      name: "SEOUL",
      points: [
        [126.764, 37.566], [126.784, 37.615], [126.820, 37.650], [126.870, 37.684],
        [126.930, 37.700], [126.995, 37.690], [127.047, 37.675], [127.104, 37.650],
        [127.148, 37.615], [127.171, 37.565], [127.164, 37.520], [127.142, 37.482],
        [127.102, 37.456], [127.052, 37.442], [126.996, 37.438], [126.942, 37.446],
        [126.892, 37.463], [126.844, 37.489], [126.802, 37.522]
      ],
      label: { text: "SEOUL", lng: 126.995, lat: 37.586 },
      primary: true
    },
    bucheon: {
      id: "bucheon",
      name: "BUCHEON",
      points: [
        [126.730, 37.535], [126.772, 37.546], [126.815, 37.542], [126.844, 37.518],
        [126.844, 37.482], [126.812, 37.462], [126.766, 37.458], [126.732, 37.476],
        [126.720, 37.506]
      ],
      label: { text: "BUCHEON", lng: 126.783, lat: 37.503 }
    },
    incheon: {
      id: "incheon",
      name: "INCHEON",
      points: [
        [126.300, 37.592], [126.366, 37.608], [126.446, 37.604], [126.520, 37.578],
        [126.558, 37.534], [126.556, 37.478], [126.520, 37.438], [126.458, 37.410],
        [126.380, 37.398], [126.314, 37.414], [126.288, 37.454], [126.288, 37.518]
      ],
      label: { text: "INCHEON", lng: 126.430, lat: 37.505 }
    },
    gwangmyeong: {
      id: "gwangmyeong",
      name: "GWANGMYEONG",
      points: [
        [126.820, 37.470], [126.856, 37.474], [126.890, 37.460], [126.904, 37.434],
        [126.898, 37.402], [126.870, 37.386], [126.832, 37.390], [126.812, 37.418],
        [126.810, 37.446]
      ],
      label: { text: "GWANGMYEONG", lng: 126.860, lat: 37.428 }
    },
    anyang: {
      id: "anyang",
      name: "ANYANG",
      points: [
        [126.918, 37.436], [126.956, 37.438], [126.994, 37.424], [127.008, 37.394],
        [126.992, 37.360], [126.956, 37.344], [126.920, 37.350], [126.904, 37.382],
        [126.906, 37.410]
      ],
      label: { text: "ANYANG", lng: 126.958, lat: 37.390 }
    },
    gunpo: {
      id: "gunpo",
      name: "GUNPO",
      points: [
        [126.916, 37.382], [126.946, 37.388], [126.976, 37.378], [126.986, 37.352],
        [126.974, 37.326], [126.944, 37.314], [126.916, 37.320], [126.902, 37.346],
        [126.904, 37.366]
      ],
      label: { text: "GUNPO", lng: 126.946, lat: 37.350 }
    },
    uiwang: {
      id: "uiwang",
      name: "UIWANG",
      points: [
        [126.952, 37.378], [126.990, 37.382], [127.028, 37.372], [127.048, 37.344],
        [127.038, 37.312], [127.004, 37.294], [126.970, 37.300], [126.950, 37.330],
        [126.946, 37.354]
      ],
      label: { text: "UIWANG", lng: 127.000, lat: 37.336 }
    },
    suwon: {
      id: "suwon",
      name: "SUWON",
      points: [
        [126.936, 37.334], [126.982, 37.344], [127.038, 37.340], [127.082, 37.314],
        [127.094, 37.272], [127.080, 37.234], [127.038, 37.216], [126.986, 37.220],
        [126.946, 37.246], [126.930, 37.288]
      ],
      label: { text: "SUWON", lng: 127.012, lat: 37.282 }
    },
    hwaseong: {
      id: "hwaseong",
      name: "HWASEONG",
      points: [
        [126.896, 37.290], [126.944, 37.304], [127.010, 37.300], [127.082, 37.276],
        [127.122, 37.232], [127.122, 37.180], [127.094, 37.136], [127.036, 37.110],
        [126.968, 37.108], [126.918, 37.126], [126.886, 37.168], [126.882, 37.224]
      ],
      label: { text: "HWASEONG", lng: 127.022, lat: 37.190 }
    },
    osan: {
      id: "osan",
      name: "OSAN",
      points: [
        [127.014, 37.182], [127.040, 37.186], [127.070, 37.176], [127.082, 37.154],
        [127.076, 37.126], [127.050, 37.112], [127.020, 37.118], [127.006, 37.142],
        [127.006, 37.162]
      ],
      label: { text: "OSAN", lng: 127.044, lat: 37.146 }
    },
    pyeongtaek: {
      id: "pyeongtaek",
      name: "PYEONGTAEK",
      points: [
        [126.930, 37.112], [126.986, 37.124], [127.056, 37.118], [127.120, 37.084],
        [127.136, 37.032], [127.118, 36.968], [127.062, 36.930], [126.992, 36.924],
        [126.944, 36.944], [126.918, 36.988], [126.914, 37.048]
      ],
      label: { text: "PYEONGTAEK", lng: 127.030, lat: 37.008 }
    },
    cheonan: {
      id: "cheonan",
      name: "CHEONAN",
      points: [
        [126.978, 36.934], [127.032, 36.946], [127.102, 36.936], [127.176, 36.896],
        [127.210, 36.838], [127.198, 36.778], [127.136, 36.742], [127.064, 36.734],
        [127.006, 36.758], [126.972, 36.806], [126.962, 36.870]
      ],
      label: { text: "CHEONAN", lng: 127.104, lat: 36.836 }
    },
    asan: {
      id: "asan",
      name: "ASAN",
      points: [
        [126.896, 36.948], [126.944, 36.958], [127.014, 36.952], [127.078, 36.920],
        [127.100, 36.870], [127.090, 36.814], [127.042, 36.778], [126.980, 36.774],
        [126.928, 36.796], [126.896, 36.838], [126.886, 36.896]
      ],
      label: { text: "ASAN", lng: 126.986, lat: 36.856 }
    }
  };

  const COURSE_REGION_IDS = {
    "1:gyeongin": ["yeoncheon", "dongducheon", "yangju", "uijeongbu", "seoul", "bucheon", "incheon"],
    "1:gyeongbu": ["seoul", "anyang", "gunpo", "uiwang", "suwon", "osan", "pyeongtaek", "cheonan", "asan"],
    "1:seodongtan": ["seoul", "anyang", "gunpo", "uiwang", "suwon", "hwaseong", "osan"],
    "1:gwangmyeong": ["seoul", "gwangmyeong"],
    "2:loop": ["seoul"],
    "2:seongsu": ["seoul"],
    "2:sinjeong": ["seoul"],
    "3:main": ["goyang", "seoul"],
    "4:jinjeopSadang": ["namyangju", "seoul"],
    "4:buramsanOido": ["seoul", "gwacheon", "anyang", "gunpo", "ansan", "siheung"],
    "4:buramsanAnsan": ["seoul", "gwacheon", "anyang", "gunpo", "ansan"],
    "5:banghwaSangil": ["seoul"],
    "5:banghwaHanam": ["seoul", "hanam"],
    "5:banghwaMacheon": ["seoul"],
    "6:eungamSinnae": ["seoul"],
    "6:eungamBonghwasan": ["seoul"],
    "7:jangamSeongnam": ["uijeongbu", "seoul", "gwangmyeong", "bucheon", "incheon"],
    "7:dobongsanSeongnam": ["seoul", "gwangmyeong", "bucheon", "incheon"],
    "8:byeollaeMoran": ["namyangju", "guri", "seoul", "seongnam"],
    "9:local": ["seoul"],
    "9:express": ["seoul"]
  };

  const DISTRICT_GUIDES = [
    [[126.828,37.624],[126.900,37.585],[126.975,37.574],[127.042,37.598],[127.115,37.565]],
    [[126.846,37.514],[126.920,37.536],[126.988,37.520],[127.054,37.492],[127.123,37.506]],
    [[126.904,37.674],[126.930,37.620],[126.950,37.563],[126.946,37.486]],
    [[127.034,37.671],[127.018,37.612],[127.025,37.548],[127.060,37.472]],
    [[127.102,37.647],[127.092,37.586],[127.107,37.524],[127.126,37.472]]
  ];

  // v24: 한강 본류는 별도 GIS 검증 파일에서 로드합니다.
  // 다중 링(본류 외곽 + 섬 홀) 구조를 사용해 강서·강동 굴곡과 섬을 일관되게 렌더링합니다.
  const HAN_RIVER_GEOMETRY = window.HAN_RIVER_GEOMETRY || { polygons: [] };
  const HAN_RIVER_POLYGONS = Array.isArray(HAN_RIVER_GEOMETRY.polygons) ? HAN_RIVER_GEOMETRY.polygons : [];
  const HAN_RIVER_ISLANDS = HAN_RIVER_POLYGONS.flatMap((polygon) =>
    (polygon.holes || []).map((hole) => hole.ring || hole).filter(Array.isArray)
  );

  function getCourseRegionIds() {
    return COURSE_REGION_IDS[`${ACTIVE_LINE_NUMBER}:${ACTIVE_COURSE_ID}`] || (ACTIVE_LINE_NUMBER === 3 ? ["goyang", "seoul"] : ["seoul"]);
  }

  function getRenderedRegions() {
    return getCourseRegionIds().map((id) => REGION_SHAPES[id]).filter(Boolean);
  }

  function getRegionParts(region, { forBounds = false } = {}) {
    if (!region) return [];
    const candidates = forBounds && Array.isArray(region.boundsParts) && region.boundsParts.length
      ? region.boundsParts
      : Array.isArray(region.parts) && region.parts.length
        ? region.parts
        : Array.isArray(region.points)
          ? [region.points]
          : [];
    return candidates.filter((part) => Array.isArray(part) && part.length >= 3);
  }

  function formatCityName(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/(^|[\s-])\p{L}/gu, (char) => char.toUpperCase());
  }

  function computeGeoBounds(points) {
    if (!points.length) return null;
    const lngs = points.map((point) => point[0]);
    const lats = points.map((point) => point[1]);
    return {
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats)
    };
  }

  function expandBounds(bounds, lngRatio = 0.08, latRatio = 0.1) {
    const width = Math.max(bounds.maxLng - bounds.minLng, 0.02);
    const height = Math.max(bounds.maxLat - bounds.minLat, 0.02);
    const padLng = Math.max(width * lngRatio, 0.018);
    const padLat = Math.max(height * latRatio, 0.014);
    return {
      minLng: bounds.minLng - padLng,
      maxLng: bounds.maxLng + padLng,
      minLat: bounds.minLat - padLat,
      maxLat: bounds.maxLat + padLat
    };
  }

  function normalizeBoundsToAspect(bounds) {
    const targetAspect = (MAP.width - MAP.paddingX * 2) / (MAP.height - MAP.paddingY * 2);
    const refLat = (bounds.minLat + bounds.maxLat) / 2;
    const lngScale = Math.max(0.68, Math.cos((refLat * Math.PI) / 180));
    const rawLngWidth = Math.max(bounds.maxLng - bounds.minLng, 0.02);
    const physicalWidth = rawLngWidth * lngScale;
    const height = Math.max(bounds.maxLat - bounds.minLat, 0.02);
    const aspect = physicalWidth / height;

    if (aspect > targetAspect) {
      const nextHeight = physicalWidth / targetAspect;
      const delta = (nextHeight - height) / 2;
      return { ...bounds, minLat: bounds.minLat - delta, maxLat: bounds.maxLat + delta };
    }

    const nextPhysicalWidth = height * targetAspect;
    const nextLngWidth = nextPhysicalWidth / lngScale;
    const delta = (nextLngWidth - rawLngWidth) / 2;
    return { ...bounds, minLng: bounds.minLng - delta, maxLng: bounds.maxLng + delta };
  }

  function currentMapBounds() {
    const regionPoints = getRenderedRegions().flatMap((region) => getRegionParts(region, { forBounds: true }).flat());
    const stationPoints = STATIONS.map((station) => [station.lng, station.lat]);
    const adaptivePoints = regionPoints.length ? [...regionPoints, ...stationPoints] : stationPoints;
    const configured = COURSE?.mapBounds || LINE_CONFIG?.mapBounds || DEFAULT_MAP_BOUNDS;
    const baseBounds = computeGeoBounds(adaptivePoints) || configured;
    const spanLng = Math.max(baseBounds.maxLng - baseBounds.minLng, 0.02);
    const spanLat = Math.max(baseBounds.maxLat - baseBounds.minLat, 0.02);
    const lngRatio = spanLng > 0.75 ? 0.07 : spanLng > 0.28 ? 0.09 : 0.13;
    const latRatio = spanLat > 0.75 ? 0.08 : spanLat > 0.28 ? 0.1 : 0.14;
    return normalizeBoundsToAspect(expandBounds(baseBounds, lngRatio, latRatio));
  }

  const state = {
    screen: "home",
    targetIndex: 0,
    completedIndex: -1,
    routePosition: 0,
    attempts: 0,
    errors: [],
    stationErrors: {},
    startedAt: null,
    elapsedMs: 0,
    timerId: null,
    isAnimating: false,
    maps: {},
    demoFrame: null,
    demoRunning: false,
    setupDemoFrame: null,
    setupDemoRunning: false,
    setupDemoRunId: 0,
    currentResult: null,
    autoFollow: true,
    viewAnimation: null,
    completedPulseTimer: null
  };

  const $ = (id) => document.getElementById(id);
  const screens = {
    home: $("homeScreen"),
    game: $("gameScreen"),
    result: $("resultScreen")
  };


  const TRANSFER_INFO_BY_LINE = {
    "1:시청": [{ kind: "subway", tag: "2", name: "2호선" }],
    "2:시청": [{ kind: "subway", tag: "1", name: "1호선" }],
    "1:신도림": [{ kind: "subway", tag: "2", name: "2호선" }],
    "2:신도림": [{ kind: "subway", tag: "1", name: "1호선" }],
    "1:신설동": [{ kind: "subway", tag: "2", name: "2호선" }, { kind: "light", tag: "LRT", name: "우이신설선" }],
    "2:신설동": [{ kind: "subway", tag: "1", name: "1호선" }, { kind: "light", tag: "LRT", name: "우이신설선" }],
    "1:종로3가": [{ kind: "subway", tag: "3", name: "3호선" }, { kind: "subway", tag: "5", name: "5호선" }],
    "3:종로3가": [{ kind: "subway", tag: "1", name: "1호선" }, { kind: "subway", tag: "5", name: "5호선" }],
    "2:을지로3가": [{ kind: "subway", tag: "3", name: "3호선" }],
    "3:을지로3가": [{ kind: "subway", tag: "2", name: "2호선" }],
    "2:교대": [{ kind: "subway", tag: "3", name: "3호선" }],
    "3:교대": [{ kind: "subway", tag: "2", name: "2호선" }],
    "4:노원": [{ kind: "subway", tag: "7", name: "7호선" }],
    "4:창동": [{ kind: "subway", tag: "1", name: "1호선" }],
    "4:성신여대입구": [{ kind: "light", tag: "LRT", name: "우이신설선" }],
    "4:동대문": [{ kind: "subway", tag: "1", name: "1호선" }],
    "4:동대문역사문화공원": [{ kind: "subway", tag: "2", name: "2호선" }, { kind: "subway", tag: "5", name: "5호선" }],
    "4:충무로": [{ kind: "subway", tag: "3", name: "3호선" }],
    "4:서울역": [{ kind: "subway", tag: "1", name: "1호선" }, { kind: "rail", tag: "JR", name: "경의·중앙선" }, { kind: "airport", tag: "AREX", name: "공항철도" }, { kind: "rail", tag: "KTX", name: "KTX · 일반철도" }],
    "4:삼각지": [{ kind: "subway", tag: "6", name: "6호선" }],
    "4:이촌": [{ kind: "rail", tag: "JR", name: "경의·중앙선" }],
    "4:동작": [{ kind: "subway", tag: "9", name: "9호선" }],
    "4:총신대입구(이수)": [{ kind: "subway", tag: "7", name: "7호선" }],
    "4:사당": [{ kind: "subway", tag: "2", name: "2호선" }],
    "4:금정": [{ kind: "subway", tag: "1", name: "1호선" }],
    "4:한대앞": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "4:초지": [{ kind: "rail", tag: "JR", name: "수인분당선" }, { kind: "rail", tag: "WS", name: "서해선" }],
    "4:안산": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "4:신길온천": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "4:정왕": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "4:오이도": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "5:김포공항": [{ kind: "subway", tag: "9", name: "9호선" }, { kind: "airport", tag: "AREX", name: "공항철도" }, { kind: "rail", tag: "WS", name: "서해선" }, { kind: "light", tag: "GOLD", name: "김포골드라인" }],
    "5:까치산": [{ kind: "subway", tag: "2", name: "2호선 신정지선" }],
    "5:영등포구청": [{ kind: "subway", tag: "2", name: "2호선" }],
    "5:신길": [{ kind: "subway", tag: "1", name: "1호선" }],
    "5:여의도": [{ kind: "subway", tag: "9", name: "9호선" }],
    "5:공덕": [{ kind: "subway", tag: "6", name: "6호선" }, { kind: "airport", tag: "AREX", name: "공항철도" }, { kind: "rail", tag: "JR", name: "경의·중앙선" }],
    "5:충정로": [{ kind: "subway", tag: "2", name: "2호선" }],
    "5:종로3가": [{ kind: "subway", tag: "1", name: "1호선" }, { kind: "subway", tag: "3", name: "3호선" }],
    "5:을지로4가": [{ kind: "subway", tag: "2", name: "2호선" }],
    "5:동대문역사문화공원": [{ kind: "subway", tag: "2", name: "2호선" }, { kind: "subway", tag: "4", name: "4호선" }],
    "5:청구": [{ kind: "subway", tag: "6", name: "6호선" }],
    "5:왕십리": [{ kind: "subway", tag: "2", name: "2호선" }, { kind: "rail", tag: "JR", name: "경의·중앙선 · 경춘선 · 수인분당선" }],
    "5:군자": [{ kind: "subway", tag: "7", name: "7호선" }],
    "5:천호": [{ kind: "subway", tag: "8", name: "8호선" }],
    "5:올림픽공원": [{ kind: "subway", tag: "9", name: "9호선" }],
    "5:오금": [{ kind: "subway", tag: "3", name: "3호선" }],
    "6:불광": [{ kind: "subway", tag: "3", name: "3호선" }],
    "6:연신내": [{ kind: "subway", tag: "3", name: "3호선" }, { kind: "gtx", tag: "GTX", name: "GTX-A" }],
    "6:디지털미디어시티": [{ kind: "rail", tag: "JR", name: "경의·중앙선" }, { kind: "airport", tag: "AREX", name: "공항철도" }],
    "6:합정": [{ kind: "subway", tag: "2", name: "2호선" }],
    "6:공덕": [{ kind: "subway", tag: "5", name: "5호선" }, { kind: "rail", tag: "JR", name: "경의·중앙선" }, { kind: "airport", tag: "AREX", name: "공항철도" }],
    "6:효창공원앞": [{ kind: "rail", tag: "JR", name: "경의·중앙선" }],
    "6:삼각지": [{ kind: "subway", tag: "4", name: "4호선" }],
    "6:약수": [{ kind: "subway", tag: "3", name: "3호선" }],
    "6:청구": [{ kind: "subway", tag: "5", name: "5호선" }],
    "6:신당": [{ kind: "subway", tag: "2", name: "2호선" }],
    "6:동묘앞": [{ kind: "subway", tag: "1", name: "1호선" }],
    "6:보문": [{ kind: "light", tag: "LRT", name: "우이신설선" }],
    "6:석계": [{ kind: "subway", tag: "1", name: "1호선" }],
    "6:태릉입구": [{ kind: "subway", tag: "7", name: "7호선" }],
    "6:신내": [{ kind: "rail", tag: "JR", name: "경춘선" }],
    "1:도봉산": [{ kind: "subway", tag: "7", name: "7호선" }],
    "1:온수": [{ kind: "subway", tag: "7", name: "7호선" }],
    "7:도봉산": [{ kind: "subway", tag: "1", name: "1호선" }],
    "7:노원": [{ kind: "subway", tag: "4", name: "4호선" }],
    "7:태릉입구": [{ kind: "subway", tag: "6", name: "6호선" }],
    "7:상봉": [{ kind: "rail", tag: "JR", name: "경의·중앙선 · 경춘선" }],
    "7:군자": [{ kind: "subway", tag: "5", name: "5호선" }],
    "7:건대입구": [{ kind: "subway", tag: "2", name: "2호선" }],
    "7:강남구청": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "7:논현": [{ kind: "rail", tag: "NDB", name: "신분당선" }],
    "7:고속터미널": [{ kind: "subway", tag: "3", name: "3호선" }, { kind: "subway", tag: "9", name: "9호선" }],
    "7:이수": [{ kind: "subway", tag: "4", name: "4호선" }],
    "7:보라매": [{ kind: "light", tag: "LRT", name: "신림선" }],
    "7:대림": [{ kind: "subway", tag: "2", name: "2호선" }],
    "7:가산디지털단지": [{ kind: "subway", tag: "1", name: "1호선" }],
    "7:온수": [{ kind: "subway", tag: "1", name: "1호선" }],
    "7:부천종합운동장": [{ kind: "rail", tag: "WS", name: "서해선" }],
    "7:부평구청": [{ kind: "subway", tag: "I1", name: "인천 1호선" }],
    "7:석남": [{ kind: "subway", tag: "I2", name: "인천 2호선" }],
    "8:별내": [{ kind: "rail", tag: "JR", name: "경춘선" }],
    "8:구리": [{ kind: "rail", tag: "JR", name: "경의·중앙선" }],
    "8:천호": [{ kind: "subway", tag: "5", name: "5호선" }],
    "8:잠실": [{ kind: "subway", tag: "2", name: "2호선" }],
    "8:석촌": [{ kind: "subway", tag: "9", name: "9호선" }],
    "8:가락시장": [{ kind: "subway", tag: "3", name: "3호선" }],
    "8:복정": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "8:모란": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "9:김포공항": [{ kind: "subway", tag: "5", name: "5호선" }, { kind: "airport", tag: "AREX", name: "공항철도" }, { kind: "rail", tag: "WS", name: "서해선" }, { kind: "light", tag: "GOLD", name: "김포골드라인" }],
    "9:마곡나루": [{ kind: "airport", tag: "AREX", name: "공항철도" }],
    "9:당산": [{ kind: "subway", tag: "2", name: "2호선" }],
    "9:여의도": [{ kind: "subway", tag: "5", name: "5호선" }],
    "9:샛강": [{ kind: "light", tag: "LRT", name: "신림선" }],
    "9:노량진": [{ kind: "subway", tag: "1", name: "1호선" }],
    "9:동작": [{ kind: "subway", tag: "4", name: "4호선" }],
    "9:고속터미널": [{ kind: "subway", tag: "3", name: "3호선" }, { kind: "subway", tag: "7", name: "7호선" }],
    "9:신논현": [{ kind: "rail", tag: "NDB", name: "신분당선" }],
    "9:선정릉": [{ kind: "rail", tag: "JR", name: "수인분당선" }],
    "9:종합운동장": [{ kind: "subway", tag: "2", name: "2호선" }],
    "9:석촌": [{ kind: "subway", tag: "8", name: "8호선" }],
    "9:올림픽공원": [{ kind: "subway", tag: "5", name: "5호선" }]
  };

  function getCourseCityLookup() {
    const segments = COURSE_CITY_SEGMENTS[`${ACTIVE_LINE_NUMBER}:${ACTIVE_COURSE_ID}`] || [];
    const lookup = new Map();
    segments.forEach((segment) => {
      segment.stations.forEach((name) => lookup.set(name, segment.id));
    });
    return lookup;
  }

  function getStationCityMeta(station) {
    if (!station) return CITY_REGION_META.seoul;
    const lookup = getCourseCityLookup();
    const regionId = lookup.get(station.name) || (ACTIVE_LINE_NUMBER === 3 ? (station.lng < 126.92 ? "goyang" : "seoul") : "seoul");
    return CITY_REGION_META[regionId] || CITY_REGION_META.seoul;
  }

  function getStationAdminMeta(station) {
    const city = getStationCityMeta(station);
    const district = station ? STATION_ADMIN_DISTRICTS.get(station.name) || "" : "";
    return {
      ...city,
      district,
      fullLabel: district ? `${city.label} · ${district}` : city.label
    };
  }

  function getTransferInfo(stationName) {
    const keyed = TRANSFER_INFO_BY_LINE[`${ACTIVE_LINE_NUMBER}:${stationName}`];
    const fallback = TRANSFER_INFO[stationName] || [];
    const selected = keyed || fallback;
    return selected.filter((item) => !(item.kind === "subway" && String(item.tag) === String(ACTIVE_LINE_NUMBER)));
  }

  function getTransferVisual(item) {
    if (item.name.includes("수인분당선")) {
      return { color: "#FABE00", icon: "수" };
    }

    const map = {
      "1": { color: "#0052A4", icon: "1" },
      "2": { color: "#00A84D", icon: "2" },
      "3": { color: "#EF7C1C", icon: "3" },
      "4": { color: "#00A5DE", icon: "4" },
      "5": { color: "#996CAC", icon: "5" },
      "6": { color: "#CD7C2F", icon: "6" },
      "7": { color: "#747F00", icon: "7" },
      "8": { color: "#E6186C", icon: "8" },
      "9": { color: "#BDB092", icon: "9" },
      "AREX": { color: "#0090D2", icon: "A" },
      "GTX": { color: "#8A3FFC", icon: "G" },
      "KTX": { color: "#1B5EAA", icon: "K" },
      "SRT": { color: "#7A0019", icon: "S" },
      "JR": { color: "#008C95", icon: "JR" },
      "WS": { color: "#8FC31F", icon: "서" },
      "ITX": { color: "#2D74DA", icon: "ITX" },
      "NDB": { color: "#D31145", icon: "신" },
      "LRT": { color: item.name.includes("우이") ? "#B7C450" : item.name.includes("신림") ? "#6789CA" : "#2F9E44", icon: "경" },
      "BR": { color: "#EF7C1C", icon: "1B" },
      "GOLD": { color: "#BCA01D", icon: "G" }
    };
    return map[item.tag] || { color: "#59524A", icon: item.tag };
  }

  function updateCitySegmentIndicator(station) {
    const el = $("citySegmentIndicator");
    if (!el || !station) return;
    const area = getStationAdminMeta(station);
    const nextStation = STATIONS[Math.min(state.targetIndex + 1, STATIONS.length - 1)];
    const nextArea = nextStation && nextStation !== station ? getStationAdminMeta(nextStation) : null;
    let suffix = "";
    if (nextArea && nextArea.id !== area.id) {
      suffix = ` · NEXT ${nextArea.en} / ${nextArea.fullLabel}`;
    } else if (nextArea && nextArea.district && nextArea.district !== area.district) {
      suffix = ` · NEXT DISTRICT ${nextArea.district}`;
    }
    el.textContent = `CURRENT AREA · ${area.en} / ${area.fullLabel}${suffix}`;
    el.style.setProperty("--line-color", LINE_COLOR);
  }

  function maybeAnnounceCityEntry(prevIndex, nextIndex) {
    const previous = STATIONS[Math.max(0, prevIndex)];
    const next = STATIONS[Math.min(nextIndex, STATIONS.length - 1)];
    if (!previous || !next) return;
    const prevCity = getStationCityMeta(previous);
    const nextCity = getStationCityMeta(next);
    if (prevCity.id !== nextCity.id) {
      showToast(`${nextCity.short} 진입`);
    }
  }

  function renderTransferList(station) {
    const wrap = $("stationTransferBlock");
    const list = $("stationTransferList");
    const summary = $("stationTransferSummary");
    if (!wrap || !list || !summary) return;
    const transfers = getTransferInfo(station.name);
    list.innerHTML = "";
    if (!transfers.length) {
      wrap.hidden = true;
      return;
    }
    transfers.forEach((item) => {
      const chip = document.createElement("span");
      const visual = getTransferVisual(item);
      chip.className = "transfer-chip";
      chip.dataset.kind = item.kind || "rail";
      chip.style.setProperty("--transfer-color", visual.color);
      chip.innerHTML = `<i aria-hidden="true">${escapeHtml(visual.icon)}</i><b>${escapeHtml(item.name)}</b>`;
      list.appendChild(chip);
    });
    summary.textContent = `${transfers.length}개 연결 노선`;
    wrap.hidden = false;
  }

  function createJourneyStations(course, direction) {
    const base = [...(course.stations || [])];
    if (!base.length) return [];
    const mode = direction?.mode || "forward";

    if (mode === "reverse") return base.slice().reverse();

    if (mode === "loopReverse") {
      const start = { ...base[0], isReturn: false };
      const middle = base.slice(1, -1).reverse().map((station) => ({ ...station, isReturn: false }));
      const end = { ...base[0], code: `${base[0].code}R-OUTER`, en: `${base[0].en} · LOOP COMPLETE`, isReturn: true };
      return [start, ...middle, end];
    }

    if (mode === "custom" && Array.isArray(direction?.stationNames)) {
      const seen = new Map();
      return direction.stationNames.map((name) => {
        const source = base.find((station) => station.name === name);
        if (!source) return null;
        const count = seen.get(name) || 0;
        seen.set(name, count + 1);
        if (count === 0) return { ...source, isReturn: false };
        return {
          ...source,
          code: `${source.code}R${count}`,
          en: `${source.en} · LOOP COMPLETE`,
          isReturn: true
        };
      }).filter(Boolean);
    }

    if (mode === "range") {
      const fromIndex = base.findIndex((station) => station.name === direction.from);
      const toIndex = base.findIndex((station) => station.name === direction.to);
      if (fromIndex < 0 || toIndex < 0) return base;
      if (fromIndex <= toIndex) return base.slice(fromIndex, toIndex + 1).map((station) => ({ ...station, isReturn: false }));
      return base.slice(toIndex, fromIndex + 1).reverse().map((station) => ({ ...station, isReturn: false }));
    }

    return base.map((station) => ({ ...station }));
  }

  function journeyStart() {
    return STATIONS[0]?.name || COURSE.start;
  }

  function journeyEnd() {
    return STATIONS.at(-1)?.name || COURSE.end;
  }

  function currentDirectionLabel() {
    return DIRECTION?.name || `${journeyEnd()}행`;
  }

  function courseKey(lineNumber = ACTIVE_LINE_NUMBER, courseId = ACTIVE_COURSE_ID, directionId = ACTIVE_DIRECTION_ID) {
    return `${lineNumber}-${courseId}-${directionId}`;
  }

  function getLineJourneyKeys(lineNumber) {
    const line = window.METRO_LINES[lineNumber];
    if (!line) return [];
    return Object.values(line.courses).flatMap((course) => {
      const directions = course.directions?.length ? course.directions : [{ id: "forward" }];
      return directions.map((direction) => courseKey(lineNumber, course.id, direction.id));
    });
  }

  function setActiveTheme() {
    const root = document.documentElement;
    root.style.setProperty("--orange", LINE_CONFIG.color);
    root.style.setProperty("--orange-dark", LINE_CONFIG.darkColor);
    root.style.setProperty("--orange-soft", LINE_CONFIG.softColor);
    const brandMark = document.querySelector(".brand-mark");
    if (brandMark) {
      brandMark.style.background = `linear-gradient(180deg, ${LINE_CONFIG.color}, ${LINE_CONFIG.darkColor})`;
      brandMark.style.boxShadow = `0 10px 22px ${LINE_CONFIG.softColor}`;
    }
  }

  function rebuildMaps() {
    state.maps.home = buildMap($("homeMapSvg"), { mode: "home" });
    state.maps.game = buildMap($("gameMapSvg"), { mode: "game" });
    state.maps.result = buildMap($("resultMapSvg"), { mode: "result" });
    const setupSvg = $("routeDemoMapSvg");
    if (setupSvg) state.maps.setup = buildMap(setupSvg, { mode: "setup" });
  }

  function updateDynamicCopy() {
    const lineNo = LINE_CONFIG.number;
    const lineLabel = String(lineNo).padStart(2, "0");
    const stationCount = STATIONS.length;
    const routeStart = journeyStart();
    const routeEnd = journeyEnd();
    $("heroTitle").innerHTML = `${LINE_CONFIG.heroRegion || "서울 위에"}<br><span>${LINE_CONFIG.name}</span>을 개척하세요.`;
    $("startButton").innerHTML = `${LINE_CONFIG.name} 주행 설정 <span>→</span>`;
    $("heroStationCount").textContent = String(stationCount);
    $("homeAreaLabel").textContent = LINE_CONFIG.areaLabel || "SEOUL";
    $("homeMapTitle").textContent = `${LINE_CONFIG.name} ${COURSE.name} · ${currentDirectionLabel()}`;
    $("homeLineChip").innerHTML = `<i>${lineNo}</i> LINE ${lineLabel}`;
    const cornerLabels = COURSE.cornerLabels || LINE_CONFIG.cornerLabels || {};
    const routeRegions = getRenderedRegions();
    const firstCity = routeRegions[0]?.name || "SEOUL";
    const lastCity = routeRegions.at(-1)?.name || firstCity;
    $("northWestLabel").textContent = formatCityName(cornerLabels.northWest || firstCity);
    $("southEastLabel").textContent = formatCityName(cornerLabels.southEast || lastCity);
    $("gameLineNumber").textContent = String(lineNo);
    $("gameRouteTitle").textContent = `${routeStart} → ${routeEnd} · ${currentDirectionLabel()}`;
    $("resultLineEyebrow").textContent = `LINE ${lineLabel} · ${currentDirectionLabel().toUpperCase()} COMPLETED`;
    $("resultDescription").textContent = `${routeStart}역부터 ${routeEnd}역까지 ${currentDirectionLabel()} 경로를 따라 완성한 노선이 자동으로 저장되었습니다.`;
    $("resultMapTitle").textContent = `서울 지하철 ${LINE_CONFIG.name} · ${currentDirectionLabel()}`;
    $("resultLineChip").innerHTML = `<i>${lineNo}</i> COMPLETE`;
    $("homeMapSvg").setAttribute("aria-label", `${LINE_CONFIG.name} ${currentDirectionLabel()} 실제 역 위치 지도`);
    $("gameMapSvg").setAttribute("aria-label", `현재까지 완성된 ${LINE_CONFIG.name} ${currentDirectionLabel()}`);
    $("resultMapSvg").setAttribute("aria-label", `완성된 ${LINE_CONFIG.name} ${currentDirectionLabel()} 인포그래픽`);
    document.title = `RAILTYPE KOREA — ${LINE_CONFIG.name} ${currentDirectionLabel()}`;
  }

  function activateCourse(lineNumber, courseId, { directionId = null, start = false, openSetup = false } = {}) {
    const nextLine = window.METRO_LINES[lineNumber];
    const nextCourse = nextLine?.courses?.[courseId];
    if (!nextLine || !nextCourse) return;

    cancelHomeDemo();
    cancelRouteSetupDemo();
    stopTimer();
    ACTIVE_LINE_NUMBER = lineNumber;
    ACTIVE_COURSE_ID = courseId;
    LINE_CONFIG = nextLine;
    COURSE = nextCourse;
    const directions = COURSE.directions?.length
      ? COURSE.directions
      : [{ id: "forward", name: `${COURSE.end}행`, destination: COURSE.end, mode: "forward" }];
    ACTIVE_DIRECTION_ID = directions.some((item) => item.id === directionId) ? directionId : directions[0].id;
    DIRECTION = directions.find((item) => item.id === ACTIVE_DIRECTION_ID) || directions[0];
    STATIONS = createJourneyStations(COURSE, DIRECTION);
    LINE_COLOR = LINE_CONFIG.color;
    MAJOR_STATION_NAMES = new Set(LINE_CONFIG.majorStations || []);
    state.targetIndex = 0;
    state.completedIndex = -1;
    state.routePosition = 0;
    state.currentResult = null;
    setActiveTheme();
    updateDynamicCopy();
    rebuildMaps();
    buildLineButtons();
    renderHomeMap();
    renderGame();
    renderRouteSetup();

    if (start) {
      closeRouteSetup();
      startGame();
    } else if (openSetup) {
      openRouteSetup();
    }
  }

  function openRouteSetupForLine(lineNumber = ACTIVE_LINE_NUMBER) {
    const line = window.METRO_LINES[lineNumber];
    if (!line) return;
    const courseId = lineNumber === ACTIVE_LINE_NUMBER && line.courses[ACTIVE_COURSE_ID]
      ? ACTIVE_COURSE_ID
      : Object.keys(line.courses)[0];
    const course = line.courses[courseId];
    const directionId = lineNumber === ACTIVE_LINE_NUMBER && courseId === ACTIVE_COURSE_ID
      ? ACTIVE_DIRECTION_ID
      : course.directions?.[0]?.id;
    activateCourse(lineNumber, courseId, { directionId, openSetup: true });
  }

  function openRouteSetup() {
    const modal = $("routeSetupModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    renderRouteSetup();
    startRouteSetupDemo();
  }

  function closeRouteSetup() {
    const modal = $("routeSetupModal");
    if (!modal) return;
    cancelRouteSetupDemo();
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function renderRouteSetup() {
    if (!$("routeSetupModal")) return;
    const lineNo = LINE_CONFIG.number;
    $("routeSetupEyebrow").textContent = `LINE ${String(lineNo).padStart(2, "0")} PREVIEW`;
    $("routeSetupTitle").textContent = `${LINE_CONFIG.name} 주행을 설정하세요.`;
    $("routeSetupDescription").textContent = "코스와 종착역 방향을 고른 뒤 모션 데모를 확인하고 START를 누르세요.";
    $("routeSetupLineBadge").textContent = String(lineNo);
    $("routeSetupLineBadge").style.background = LINE_CONFIG.color;

    const train = LINE_CONFIG.train || {};
    const trainImage = $("routeTrainImage");
    trainImage.src = train.src || "";
    trainImage.alt = train.alt || `${LINE_CONFIG.name} 전동차`;
    $("routeTrainCaption").textContent = train.caption || `${LINE_CONFIG.name} 전동차`;
    const trainCredit = $("routeTrainCredit");
    trainCredit.href = train.sourceUrl || "https://commons.wikimedia.org/";
    trainCredit.textContent = [train.credit, train.license].filter(Boolean).join(" · ") || "사진 출처";

    renderLineHistory();

    const courseList = $("courseChoiceList");
    courseList.innerHTML = Object.values(LINE_CONFIG.courses).map((course) => `
      <button type="button" class="route-choice ${course.id === ACTIVE_COURSE_ID ? "is-selected" : ""}" data-course-id="${course.id}">
        <span>${course.name}</span>
        <small>${course.subtitle}</small>
      </button>
    `).join("");
    courseList.querySelectorAll("[data-course-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const course = LINE_CONFIG.courses[button.dataset.courseId];
        activateCourse(ACTIVE_LINE_NUMBER, course.id, { directionId: course.directions?.[0]?.id, openSetup: true });
      });
    });

    const directionList = $("directionChoiceList");
    const directions = COURSE.directions?.length ? COURSE.directions : [DIRECTION];
    directionList.innerHTML = directions.map((direction) => `
      <button type="button" class="direction-choice ${direction.id === ACTIVE_DIRECTION_ID ? "is-selected" : ""}" data-direction-id="${direction.id}">
        <strong>${direction.name}</strong>
        <span>${direction.subtitle || `${journeyStart()} 출발 · ${direction.destination || journeyEnd()} 종착`}</span>
      </button>
    `).join("");
    directionList.querySelectorAll("[data-direction-id]").forEach((button) => {
      button.addEventListener("click", () => {
        activateCourse(ACTIVE_LINE_NUMBER, ACTIVE_COURSE_ID, { directionId: button.dataset.directionId, openSetup: true });
      });
    });

    $("selectedRouteTitle").textContent = `${journeyStart()} → ${journeyEnd()}`;
    $("selectedRouteDescription").textContent = `${currentDirectionLabel()} · ${STATIONS.length}개 역`;
    $("routeDemoDirection").textContent = currentDirectionLabel();
    $("routeDemoStation").textContent = journeyStart();
    $("routeDemoProgress").textContent = `01 / ${STATIONS.length}`;

    const map = state.maps.setup;
    if (map) {
      fitMapToRoute(map, false);
      setMapProgress(map, 0, { currentIndex: 0, completedIndex: -1, showAllLabels: true });
    }
  }

  function renderLineHistory() {
    const history = LINE_CONFIG.history || {};
    const events = Array.isArray(history.events) ? history.events : [];
    const sources = Array.isArray(history.sources) ? history.sources : [];

    $("lineHistoryTitle").textContent = `${LINE_CONFIG.name}이 만들어진 과정`;
    $("lineHistorySummary").textContent = history.summary || `${LINE_CONFIG.name}의 기획부터 개통과 연장 과정을 정리했습니다.`;
    $("lineHistoryPeriod").textContent = history.period || (events.length
      ? `${events[0].year} — ${events.at(-1).year}`
      : "HISTORY");

    const timeline = $("lineHistoryTimeline");
    timeline.innerHTML = events.map((event, index) => `
      <li class="line-history-event">
        <div class="line-history-marker"><i style="background:${LINE_CONFIG.color}"></i><span>${String(index + 1).padStart(2, "0")}</span></div>
        <div class="line-history-copy">
          <time>${escapeHtml(event.year || "")}</time>
          <strong>${escapeHtml(event.label || "")}</strong>
          <p>${escapeHtml(event.detail || "")}</p>
        </div>
      </li>
    `).join("");

    const sourceContainer = $("lineHistorySources");
    sourceContainer.innerHTML = sources.map((source) => `
      <a href="${escapeHtml(source.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(source.name || "자료 보기")}</a>
    `).join("");
  }

  function startRouteSetupDemo() {
    cancelRouteSetupDemo();
    const map = state.maps.setup;
    const demoStations = STATIONS.slice();
    if (!map || !demoStations.length) return;
    const runId = state.setupDemoRunId;
    state.setupDemoRunning = true;
    const button = $("routeDemoButton");
    button.textContent = "처음부터";
    fitMapToRoute(map, false);
    setMapProgress(map, 0, { currentIndex: 0, completedIndex: -1, showAllLabels: true });
    const startedAt = performance.now();
    const duration = clamp(demoStations.length * 135, 2800, 6800);

    const frame = (now) => {
      if (runId !== state.setupDemoRunId || !state.setupDemoRunning) return;
      const raw = Math.min(1, (now - startedAt) / duration);
      const eased = raw < 1 ? 1 - Math.pow(1 - raw, 2) : 1;
      const currentIndex = Math.min(demoStations.length - 1, Math.floor(eased * demoStations.length));
      setMapProgress(map, eased, {
        currentIndex: raw < 1 ? currentIndex : null,
        completedIndex: raw <= 0 ? -1 : Math.floor(eased * (demoStations.length - 1)),
        showAllLabels: true
      });
      $("routeDemoStation").textContent = demoStations[currentIndex]?.name || journeyEnd();
      $("routeDemoProgress").textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${demoStations.length}`;
      if (raw < 1) {
        state.setupDemoFrame = requestAnimationFrame(frame);
      } else {
        state.setupDemoRunning = false;
        state.setupDemoFrame = null;
        button.textContent = "다시 보기";
        $("routeDemoStation").textContent = demoStations.at(-1)?.name || journeyEnd();
      }
    };
    state.setupDemoFrame = requestAnimationFrame(frame);
  }

  function cancelRouteSetupDemo() {
    state.setupDemoRunId += 1;
    if (state.setupDemoFrame) cancelAnimationFrame(state.setupDemoFrame);
    state.setupDemoFrame = null;
    state.setupDemoRunning = false;
  }

  function init() {
    setActiveTheme();
    updateDynamicCopy();
    buildLineButtons();
    rebuildMaps();
    bindEvents();
    renderHomeMap();
    renderGame();
    updateStatsHeader();
  }

  function bindEvents() {
    $("brandButton").addEventListener("click", goHome);
    $("startButton").addEventListener("click", () => openRouteSetupForLine(ACTIVE_LINE_NUMBER));
    $("demoButton").addEventListener("click", runHomeDemo);
    $("submitButton").addEventListener("click", submitStation);
    $("stationInput").addEventListener("input", startTimerIfNeeded);
    $("stationInput").addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.isComposing) submitStation();
    });
    $("exitButton").addEventListener("click", goHome);
    $("retryButton").addEventListener("click", startGame);
    $("finishButton").addEventListener("click", () => {
      showToast(`홈 지도에서 완성된 ${LINE_CONFIG.name} ${COURSE.name}을 확인할 수 있습니다.`);
      goHome();
    });
    $("statsButton").addEventListener("click", openStats);
    $("closeStatsButton").addEventListener("click", closeStats);
    $("statsModal").addEventListener("click", (event) => {
      if (event.target === $("statsModal")) closeStats();
    });
    $("resetButton").addEventListener("click", resetData);
    $("focusCurrentButton").addEventListener("click", () => focusCurrentStation(true));
    $("showFullRouteButton").addEventListener("click", () => resetMapView(state.maps.game, true));
    $("toggleAutoFollowButton").addEventListener("click", toggleAutoFollow);
    $("closeRouteSetupButton").addEventListener("click", closeRouteSetup);
    $("cancelRouteSetupButton").addEventListener("click", closeRouteSetup);
    $("routeStartButton").addEventListener("click", () => activateCourse(ACTIVE_LINE_NUMBER, ACTIVE_COURSE_ID, { directionId: ACTIVE_DIRECTION_ID, start: true }));
    $("routeDemoButton").addEventListener("click", startRouteSetupDemo);
    $("routeSetupModal").addEventListener("click", (event) => {
      if (event.target === $("routeSetupModal")) closeRouteSetup();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeStats();
        closeRouteSetup();
        if (state.screen === "game") goHome();
      }
    });
  }

  const RAIL_NETWORK_CATALOG = [
    {
      id: "capital-metro",
      region: "수도권",
      title: "수도권 전철 · 서울 도시철도",
      description: "서울 1–9호선과 직결 운행 계통",
      open: true,
      lines: [
        { id: "capital-1", symbol: "1", name: "수도권 전철 1호선", detail: "경부·경인·경원·장항·병점·광운대 연계", color: "#0052A4", lineNumber: 1 },
        { id: "capital-2", symbol: "2", name: "서울 지하철 2호선", detail: "순환 본선 · 성수지선 · 신정지선", color: "#00A84D", lineNumber: 2 },
        { id: "capital-3", symbol: "3", name: "수도권 전철 3호선", detail: "일산선 · 서울 지하철 3호선", color: "#EF7C1C", lineNumber: 3 },
        { id: "capital-4", symbol: "4", name: "수도권 전철 4호선", detail: "진접선 · 과천선 · 안산선 연계", color: "#00A5DE", lineNumber: 4 },
        { id: "capital-5", symbol: "5", name: "수도권 전철 5호선", detail: "서울 본선 · 마천지선 · 하남선", color: "#996CAC", lineNumber: 5 },
        { id: "capital-6", symbol: "6", name: "서울 지하철 6호선", detail: "응암순환 · 봉화산 · 신내", color: "#CD7C2F", lineNumber: 6 },
        { id: "capital-7", symbol: "7", name: "수도권 전철 7호선", detail: "장암 · 도봉산 · 석남 광역축", color: "#747F00", lineNumber: 7 },
        { id: "capital-8", symbol: "8", name: "수도권 전철 8호선", detail: "별내 · 구리 · 잠실 · 모란", color: "#E6186C", lineNumber: 8 },
        { id: "capital-9", symbol: "9", name: "서울 지하철 9호선", detail: "개화 · 여의도 · 강남 · 중앙보훈병원", color: "#BDB092", lineNumber: 9 }
      ]
    },
    {
      id: "gtx",
      region: "수도권",
      title: "수도권 광역급행철도",
      description: "GTX 광역 고속 네트워크",
      lines: [
        { id: "gtx-a", symbol: "A", name: "GTX-A", detail: "수도권 광역급행철도 A노선", color: "#8A3FFC" },
        { id: "gtx-b", symbol: "B", name: "GTX-B", detail: "수도권 광역급행철도 B노선", color: "#0067A0" },
        { id: "gtx-c", symbol: "C", name: "GTX-C", detail: "수도권 광역급행철도 C노선", color: "#5B8C3A" }
      ]
    },
    {
      id: "capital-light",
      region: "수도권",
      title: "경전철 · 무인경전철",
      description: "도심 지선과 신도시 연결 노선",
      lines: [
        { id: "ui-sinseol", symbol: "우", name: "우이신설선", detail: "북부 경전철", color: "#B7C450" },
        { id: "sillim", symbol: "신", name: "신림선", detail: "서남권 경전철", color: "#6789CA" },
        { id: "uijeongbu-lrt", symbol: "의", name: "의정부경전철", detail: "의정부 도심 경전철", color: "#FDA600" },
        { id: "everline", symbol: "에", name: "용인경전철", detail: "에버라인", color: "#77C4A3" },
        { id: "incheon-2", symbol: "I2", name: "인천 도시철도 2호선", detail: "인천 무인경전철", color: "#ED8B00" },
        { id: "gimpo-gold", symbol: "G", name: "김포골드라인", detail: "김포 도시철도", color: "#BCA01D" }
      ]
    },
    {
      id: "capital-regional",
      region: "수도권",
      title: "광역전철 · 기타 노선",
      description: "수도권 도시 간 광역 연결망",
      lines: [
        { id: "suin-bundang", symbol: "수", name: "수인분당선", detail: "수원·분당·인천 광역축", color: "#FABE00", darkText: true },
        { id: "gyeongui-jungang", symbol: "경", name: "경의중앙선", detail: "문산·용문 광역축", color: "#77C4A3" },
        { id: "gyeongchun", symbol: "춘", name: "경춘선", detail: "서울·춘천 광역축", color: "#0C8E72" },
        { id: "gyeonggang", symbol: "강", name: "경강선", detail: "판교·여주 광역축", color: "#003DA5" },
        { id: "seohae", symbol: "서", name: "서해선", detail: "서부 수도권 광역축", color: "#8FC31F" },
        { id: "shinbundang", symbol: "신", name: "신분당선", detail: "강남·광교 광역축", color: "#D31145" }
      ]
    },
    {
      id: "airport-rail",
      region: "수도권",
      title: "공항 철도",
      description: "서울·인천공항 연결 노선",
      lines: [
        { id: "arex", symbol: "A", name: "공항철도", detail: "AREX", color: "#0090D2" },
        { id: "airport-maglev", symbol: "M", name: "인천공항 자기부상철도", detail: "공항 무인 교통 시스템", color: "#FFB81C", darkText: true }
      ]
    },
    {
      id: "high-speed-rail",
      region: "전국",
      title: "고속철도",
      description: "KTX·SRT로 연결되는 대한민국 고속철도 간선",
      lines: [
        { id: "ktx-gyeongbu", symbol: "K", name: "KTX 경부고속선", detail: "서울·대전·동대구·부산", color: "#1B5EAA" },
        { id: "ktx-honam", symbol: "K", name: "KTX 호남고속선", detail: "용산·익산·광주송정·목포", color: "#1B5EAA" },
        { id: "ktx-gangneung", symbol: "K", name: "KTX 강릉선", detail: "서울·청량리·강릉", color: "#2D74DA" },
        { id: "ktx-eum", symbol: "이", name: "KTX-이음 중앙선", detail: "청량리·원주·안동·부전", color: "#2C7A7B" },
        { id: "srt-gyeongbu", symbol: "S", name: "SRT 경부선", detail: "수서·대전·동대구·부산", color: "#7A0019" },
        { id: "srt-honam", symbol: "S", name: "SRT 호남선", detail: "수서·익산·광주송정·목포", color: "#7A0019" }
      ]
    },
    {
      id: "conventional-rail",
      region: "전국",
      title: "일반철도 · 간선철도",
      description: "ITX·무궁화호 등이 운행하는 전국 주요 철도축",
      lines: [
        { id: "rail-gyeongbu", symbol: "경", name: "경부선", detail: "서울·수원·대전·동대구·부산", color: "#4E6E58" },
        { id: "rail-honam", symbol: "호", name: "호남선", detail: "대전조차장·익산·광주송정·목포", color: "#617A55" },
        { id: "rail-jeolla", symbol: "전", name: "전라선", detail: "익산·전주·순천·여수엑스포", color: "#4F7C6B" },
        { id: "rail-jungang", symbol: "중", name: "중앙선", detail: "청량리·원주·안동·경주", color: "#477A8C" },
        { id: "rail-gyeongjeon", symbol: "경", name: "경전선", detail: "삼랑진·진주·순천·광주송정", color: "#597E52" },
        { id: "rail-janghang", symbol: "장", name: "장항선", detail: "천안·아산·홍성·익산", color: "#7C6A4A" },
        { id: "rail-donghae", symbol: "동", name: "동해선", detail: "부전·울산·포항·영덕", color: "#376E8C" },
        { id: "rail-yeongdong-taebaek", symbol: "산", name: "영동·태백선", detail: "제천·태백·영주·동해", color: "#665A8B" }
      ]
    },
    {
      id: "incheon-metro",
      region: "인천",
      title: "인천 도시철도",
      description: "인천광역시 도시철도망",
      lines: [
        { id: "incheon-1", symbol: "I1", name: "인천 도시철도 1호선", detail: "계양·송도 도시축", color: "#7CA8D5" }
      ]
    },
    {
      id: "busan",
      region: "부산 · 경남",
      title: "부산 · 경남권",
      description: "부산 도시철도와 동남권 광역철도",
      lines: [
        { id: "busan-1", symbol: "1", name: "부산 도시철도 1호선", detail: "다대포해수욕장·노포", color: "#F06A00" },
        { id: "busan-2", symbol: "2", name: "부산 도시철도 2호선", detail: "양산·장산", color: "#81BF48" },
        { id: "busan-3", symbol: "3", name: "부산 도시철도 3호선", detail: "수영·대저", color: "#BB8C00" },
        { id: "busan-4", symbol: "4", name: "부산 도시철도 4호선", detail: "미남·안평", color: "#217DCB" },
        { id: "bgl", symbol: "B", name: "부산김해경전철", detail: "BGL · 사상·가야대", color: "#8652A1" },
        { id: "donghae", symbol: "동", name: "동해선 광역전철", detail: "부전·태화강", color: "#0054A6" },
        { id: "oryukdo", symbol: "T", name: "오륙도선", detail: "무가선 트램 · 구축 중", color: "#00A6A6", status: "구축 중" }
      ]
    },
    {
      id: "daegu",
      region: "대구 · 경북",
      title: "대구권",
      description: "대구 도시철도와 대경 광역철도",
      lines: [
        { id: "daegu-1", symbol: "1", name: "대구 도시철도 1호선", detail: "설화명곡·하양", color: "#D93F5C" },
        { id: "daegu-2", symbol: "2", name: "대구 도시철도 2호선", detail: "문양·영남대", color: "#00AA80" },
        { id: "daegu-3", symbol: "3", name: "대구 도시철도 3호선", detail: "모노레일", color: "#FFB300", darkText: true },
        { id: "daegyeong", symbol: "대", name: "대경선", detail: "대구권 광역철도", color: "#0054A6" }
      ]
    },
    {
      id: "daejeon",
      region: "대전",
      title: "대전권",
      description: "대전 도시철도망",
      lines: [
        { id: "daejeon-1", symbol: "1", name: "대전 도시철도 1호선", detail: "반석·판암", color: "#00A84D" }
      ]
    },
    {
      id: "gwangju",
      region: "광주",
      title: "광주권",
      description: "광주 도시철도망",
      lines: [
        { id: "gwangju-1", symbol: "1", name: "광주 도시철도 1호선", detail: "평동·녹동", color: "#009B77" }
      ]
    }
  ];

  function buildLineButtons() {
    const container = $("lineButtons");
    container.innerHTML = "";
    container.classList.add("line-catalog");
    const cleared = new Set(getCleared());

    RAIL_NETWORK_CATALOG.forEach((group, groupIndex) => {
      const details = document.createElement("details");
      details.className = `line-catalog-group ${group.open ? "is-primary" : ""}`;
      details.open = group.open || groupIndex === 0;

      const summary = document.createElement("summary");
      summary.innerHTML = `
        <span class="catalog-region-tag">${escapeHtml(group.region)}</span>
        <span class="catalog-group-copy">
          <strong>${escapeHtml(group.title)}</strong>
          <small>${escapeHtml(group.description)}</small>
        </span>
        <span class="catalog-group-count">${group.lines.length} LINES</span>
        <i class="catalog-chevron" aria-hidden="true"></i>
      `;
      details.appendChild(summary);

      const grid = document.createElement("div");
      grid.className = "line-card-grid";

      group.lines.forEach((item) => {
        const playable = Number.isInteger(item.lineNumber) && Boolean(window.METRO_LINES[item.lineNumber]);
        const journeyKeys = playable ? getLineJourneyKeys(item.lineNumber) : [];
        const completedJourneyCount = journeyKeys.filter((key) => cleared.has(key)).length;
        const lineCleared = playable && journeyKeys.length > 0 && completedJourneyCount === journeyKeys.length;
        const status = lineCleared
          ? "CLEARED"
          : playable
            ? `${completedJourneyCount}/${journeyKeys.length} ROUTES`
            : item.status || "추가 예정";

        const button = document.createElement("button");
        button.type = "button";
        button.className = `network-line-card ${playable ? "playable" : "planned"} ${lineCleared ? "cleared" : ""} ${item.lineNumber === ACTIVE_LINE_NUMBER ? "selected" : ""}`;
        button.style.setProperty("--line-color", item.color);
        button.innerHTML = `
          <span class="network-line-symbol ${item.darkText ? "has-dark-text" : ""}">${escapeHtml(item.symbol)}</span>
          <span class="network-line-copy">
            <strong>${escapeHtml(item.name)}</strong>
            <small>${escapeHtml(item.detail)}</small>
          </span>
          <span class="network-line-status">${escapeHtml(status)}</span>
        `;

        if (playable) {
          button.setAttribute("aria-label", `${item.name} 주행 설정 열기`);
          button.addEventListener("click", () => openRouteSetupForLine(item.lineNumber));
        } else {
          button.disabled = true;
          button.setAttribute("aria-label", `${item.name} 추가 예정`);
        }
        grid.appendChild(button);
      });

      details.appendChild(grid);
      container.appendChild(details);
    });
  }


  function project(lng, lat) {
    const bounds = currentMapBounds();
    const usableW = MAP.width - MAP.paddingX * 2;
    const usableH = MAP.height - MAP.paddingY * 2;
    return {
      x: MAP.paddingX + ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * usableW,
      y: MAP.paddingY + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * usableH
    };
  }

  function pathFromGeo(points, close = false) {
    const projected = points.map(([lng, lat]) => project(lng, lat));
    return `${projected.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ")}${close ? " Z" : ""}`;
  }

  function smoothClosedPathFromGeo(points) {
    const projected = points.map(([lng, lat]) => project(lng, lat));
    if (projected.length < 3) return pathFromGeo(points, true);
    const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
    const firstMid = midpoint(projected.at(-1), projected[0]);
    let d = `M${firstMid.x.toFixed(2)},${firstMid.y.toFixed(2)}`;
    projected.forEach((point, index) => {
      const next = projected[(index + 1) % projected.length];
      const mid = midpoint(point, next);
      d += ` Q${point.x.toFixed(2)},${point.y.toFixed(2)} ${mid.x.toFixed(2)},${mid.y.toFixed(2)}`;
    });
    return `${d} Z`;
  }

  function hanRiverWaterPath() {
    return HAN_RIVER_POLYGONS.flatMap((polygon) => {
      const outerPath = Array.isArray(polygon.outer) ? [pathFromGeo(polygon.outer, true)] : [];
      const holePaths = (polygon.holes || [])
        .map((hole) => hole.ring || hole)
        .filter(Array.isArray)
        .map((ring) => pathFromGeo(ring, true));
      return [...outerPath, ...holePaths];
    }).join(" ");
  }

  function pointInHanRiverWater(lng, lat) {
    return HAN_RIVER_POLYGONS.some((polygon) => {
      if (!Array.isArray(polygon.outer) || !pointInGeoRing(lng, lat, polygon.outer)) return false;
      const onIsland = (polygon.holes || []).some((hole) => {
        const ring = hole.ring || hole;
        return Array.isArray(ring) && pointInGeoRing(lng, lat, ring);
      });
      return !onIsland;
    });
  }

  function cubicPoint(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const t2 = t * t;
    return {
      x: (mt2 * mt * p0.x) + (3 * mt2 * t * p1.x) + (3 * mt * t2 * p2.x) + (t2 * t * p3.x),
      y: (mt2 * mt * p0.y) + (3 * mt2 * t * p1.y) + (3 * mt * t2 * p2.y) + (t2 * t * p3.y)
    };
  }

  function buildSmoothPath(points, tension = 0.38) {
    if (!points.length) return { d: "", segmentDs: [] };
    if (points.length === 1) {
      return {
        d: `M${points[0].x.toFixed(4)},${points[0].y.toFixed(4)}`,
        segmentDs: []
      };
    }

    let d = `M${points[0].x.toFixed(4)},${points[0].y.toFixed(4)}`;
    const segmentDs = [];

    for (let i = 0; i < points.length - 1; i += 1) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      const c1 = {
        x: p1.x + ((p2.x - p0.x) / 6) * tension,
        y: p1.y + ((p2.y - p0.y) / 6) * tension
      };
      const c2 = {
        x: p2.x - ((p3.x - p1.x) / 6) * tension,
        y: p2.y - ((p3.y - p1.y) / 6) * tension
      };
      const curve = `C${c1.x.toFixed(4)},${c1.y.toFixed(4)} ${c2.x.toFixed(4)},${c2.y.toFixed(4)} ${p2.x.toFixed(4)},${p2.y.toFixed(4)}`;
      d += ` ${curve}`;

      // 각 역 사이를 독립된 SVG path로 보관합니다. 전체 path의 dash 비율을
      // 역 순서에 대입하지 않고, 활성 구간 자체를 그리기 때문에 모든 구간의
      // 마지막 좌표가 반드시 다음 역 노드의 중심과 정확히 일치합니다.
      segmentDs.push(`M${p1.x.toFixed(4)},${p1.y.toFixed(4)} ${curve}`);
    }

    return { d, segmentDs };
  }

  function svgElement(tag, attrs = {}) {
    const element = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) element.setAttribute(key, value);
    });
    return element;
  }


  function buildMap(svg, { mode }) {
    svg.innerHTML = "";

    const defs = svgElement("defs");
    defs.innerHTML = `
      <filter id="shadow-${mode}" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#9b8b72" flood-opacity="0.14"/>
      </filter>
      <filter id="glow-${mode}" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="9" result="blur"/>
        <feFlood flood-color="${LINE_COLOR}" flood-opacity="0.38" result="color"/>
        <feComposite in="color" in2="blur" operator="in" result="glow"/>
        <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="river-${mode}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="#d9effc"/>
        <stop offset="0.48" stop-color="#b9ddf5"/>
        <stop offset="1" stop-color="#d6eefb"/>
      </linearGradient>
      <pattern id="grid-${mode}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#bbb3a7" stroke-opacity="0.08" stroke-width="1"/>
      </pattern>
    `;
    svg.appendChild(defs);

    const background = svgElement("rect", { x: 0, y: 0, width: MAP.width, height: MAP.height, fill: `url(#grid-${mode})` });
    svg.appendChild(background);

    const renderedRegions = getRenderedRegions();
    renderedRegions.forEach((region, index) => {
      getRegionParts(region).forEach((part, partIndex) => {
        const regionPath = svgElement("path", {
          d: pathFromGeo(part, true),
          class: `city-silhouette ${region.primary ? "primary-land" : "secondary-land"}${index % 2 === 1 ? " toned-land" : ""}`,
          filter: region.primary && partIndex === 0 ? `url(#shadow-${mode})` : undefined,
          "data-region-id": region.id,
          "data-region-part": partIndex
        });
        if (!region.primary) regionPath.style.opacity = "0.96";
        svg.appendChild(regionPath);
      });
    });

    const bounds = currentMapBounds();
    if (getCourseRegionIds().includes("seoul")) {
      const waterD = hanRiverWaterPath();
      const riverWater = svgElement("path", {
        d: waterD,
        class: "han-river-water",
        fill: `url(#river-${mode})`,
        "fill-rule": "evenodd",
        "clip-rule": "evenodd"
      });
      svg.appendChild(riverWater);

      HAN_RIVER_POLYGONS.forEach((polygon) => {
        if (Array.isArray(polygon.outer)) {
          const bankOutline = svgElement("path", {
            d: pathFromGeo(polygon.outer, true),
            class: "han-river-bank"
          });
          svg.appendChild(bankOutline);
        }
        (polygon.holes || []).forEach((hole) => {
          const ring = hole.ring || hole;
          if (!Array.isArray(ring)) return;
          const islandOutline = svgElement("path", {
            d: pathFromGeo(ring, true),
            class: "river-island-outline"
          });
          svg.appendChild(islandOutline);
        });
      });

    }

    renderedRegions.forEach((region) => {
      if (!region.label) return;
      const point = project(region.label.lng, region.label.lat);
      const label = svgElement("text", {
        x: point.x,
        y: point.y,
        class: `city-region-label${region.primary ? " is-primary" : ""}`,
        "text-anchor": "middle"
      });
      const rawName = region.name || region.label.text || region.id;
      label.textContent = formatCityName(rawName);
      svg.appendChild(label);
    });

    const stationPoints = STATIONS.map((station) => {
      const point = project(station.lng, station.lat);
      return { x: Number(point.x.toFixed(4)), y: Number(point.y.toFixed(4)) };
    });
    const routeGeometry = buildSmoothPath(stationPoints);
    const routeD = routeGeometry.d;

    const routePreview = svgElement("path", { d: routeD, class: "route-preview" });
    const routeProgressLayer = svgElement("g", { class: "route-progress-layer" });
    const routeSegments = routeGeometry.segmentDs.map((segmentD, index) => {
      const segment = svgElement("path", {
        d: segmentD,
        class: "route-progress route-segment",
        "data-segment-index": index
      });
      routeProgressLayer.appendChild(segment);
      return segment;
    });
    svg.appendChild(routePreview);
    svg.appendChild(routeProgressLayer);

    const nodes = svgElement("g", { class: "station-node-layer" });
    const labels = svgElement("g", { class: "station-label-layer" });
    svg.appendChild(nodes);
    svg.appendChild(labels);

    const nodeElements = [];
    const labelElements = [];
    STATIONS.forEach((station, index) => {
      const point = stationPoints[index];
      const group = svgElement("g", { class: "station-node", "data-index": index });
      const halo = svgElement("circle", { cx: point.x, cy: point.y, r: 17, class: "station-halo" });
      const circle = svgElement("circle", { cx: point.x, cy: point.y, r: index === 0 || index === STATIONS.length - 1 ? 8.5 : 6.5, class: "station-circle" });
      const title = svgElement("title");
      title.textContent = `${station.code} ${station.name} · ${station.lat.toFixed(6)}, ${station.lng.toFixed(6)}`;
      group.appendChild(title);
      group.appendChild(halo);
      group.appendChild(circle);
      nodes.appendChild(group);
      nodeElements.push(group);

      const label = svgElement("g", { class: "station-label", "data-index": index });
      const direction = labelDirection(index, point);
      const text = svgElement("text", {
        x: point.x + direction.dx,
        y: point.y + direction.dy,
        "text-anchor": direction.anchor,
        class: "station-label-text"
      });
      text.textContent = station.isReturn ? "" : station.name;
      label.appendChild(text);
      labels.appendChild(label);
      labelElements.push(label);
    });

    const train = svgElement("g", { class: "train-marker", transform: `translate(${stationPoints[0].x} ${stationPoints[0].y})` });
    train.innerHTML = `
      <circle class="train-anchor" cx="0" cy="0" r="5"></circle>
      <g class="train-body" transform="translate(0 -22)">
        <rect x="-19" y="-11" width="38" height="22" rx="8"></rect>
        <rect class="train-window" x="-11" y="-5" width="7" height="6" rx="2"></rect>
        <rect class="train-window" x="4" y="-5" width="7" height="6" rx="2"></rect>
        <circle cx="-9" cy="13" r="2.8"></circle><circle cx="9" cy="13" r="2.8"></circle>
      </g>
    `;
    svg.appendChild(train);

    const segmentLengths = routeSegments.map((segment) => {
      const length = segment.getTotalLength();
      segment.style.strokeDasharray = `${length}`;
      segment.style.strokeDashoffset = `${length}`;
      return length;
    });

    svg.setAttribute("viewBox", `0 0 ${MAP.width} ${MAP.height}`);
    return {
      svg, routePreview, routeProgressLayer, routeSegments, segmentLengths,
      nodeElements, labelElements, train, stationPoints,
      totalLength: segmentLengths.reduce((sum, length) => sum + length, 0),
      viewBox: { x: 0, y: 0, width: MAP.width, height: MAP.height }
    };
  }

  function labelDirection(index, point) {
    const special = {
      0: { dx: 0, dy: -20, anchor: "middle" },
      5: { dx: -12, dy: 22, anchor: "end" },
      10: { dx: 12, dy: -13, anchor: "start" },
      13: { dx: -12, dy: -13, anchor: "end" },
      18: { dx: -10, dy: 22, anchor: "end" },
      20: { dx: 12, dy: -13, anchor: "start" },
      26: { dx: -12, dy: -13, anchor: "end" },
      27: { dx: 12, dy: 22, anchor: "start" },
      30: { dx: -12, dy: 24, anchor: "end" },
      31: { dx: 12, dy: -14, anchor: "start" },
      33: { dx: 10, dy: 22, anchor: "start" },
      40: { dx: -10, dy: 23, anchor: "end" },
      43: { dx: 0, dy: -20, anchor: "middle" }
    };
    if (special[index]) return special[index];
    if (point.x > 900) return { dx: -10, dy: -13, anchor: "end" };
    return index % 2 === 0
      ? { dx: 10, dy: -12, anchor: "start" }
      : { dx: 10, dy: 20, anchor: "start" };
  }

  function normalizedCompletedIndex(progress) {
    if (progress <= 0) return -1;
    return Math.floor(progress * (STATIONS.length - 1) + 0.001);
  }

  function setSegmentProgress(segment, length, fraction) {
    const normalized = clamp(fraction, 0, 1);
    segment.style.transition = "none";
    segment.style.strokeDasharray = `${length}`;
    segment.style.strokeDashoffset = `${length * (1 - normalized)}`;
  }

  function getExactRoutePoint(map, stationPosition) {
    if (stationPosition <= 0) return { ...map.stationPoints[0] };
    if (stationPosition >= STATIONS.length - 1) return { ...map.stationPoints.at(-1) };

    const nearestStation = Math.round(stationPosition);
    if (Math.abs(stationPosition - nearestStation) < 0.000001) {
      return { ...map.stationPoints[nearestStation] };
    }

    const segmentIndex = Math.floor(stationPosition);
    const localProgress = stationPosition - segmentIndex;
    const segment = map.routeSegments[segmentIndex];
    const length = map.segmentLengths[segmentIndex];
    return segment.getPointAtLength(length * localProgress);
  }

  function setMapProgress(map, progress, options = {}) {
    const {
      currentIndex = null,
      showAllLabels = false,
      justCompletedIndex = null,
      completedIndex = normalizedCompletedIndex(progress)
    } = options;
    const normalized = clamp(progress, 0, 1);

    // progress를 전체 path 길이 비율로 변환하지 않습니다. 진행도를 역 순번
    // 좌표로 변환한 뒤, 완성된 구간은 100%, 현재 구간만 부분 렌더링합니다.
    // 따라서 정답 애니메이션의 끝은 항상 해당 역 노드의 정확한 중심입니다.
    let stationPosition = normalized * (STATIONS.length - 1);
    const snappedStation = Math.round(stationPosition);
    if (Math.abs(stationPosition - snappedStation) < 0.000001) stationPosition = snappedStation;

    const fullSegmentCount = Math.floor(stationPosition);
    const activeFraction = stationPosition - fullSegmentCount;

    map.routeSegments.forEach((segment, index) => {
      let fraction = 0;
      if (index < fullSegmentCount) fraction = 1;
      else if (index === fullSegmentCount && fullSegmentCount < map.routeSegments.length) fraction = activeFraction;
      setSegmentProgress(segment, map.segmentLengths[index], fraction);
    });

    map.nodeElements.forEach((node, index) => {
      node.classList.toggle("is-complete", index <= completedIndex);
      node.classList.toggle("is-current", currentIndex === index);
      node.classList.toggle("is-pending", currentIndex !== null && index === currentIndex + 1);
      node.classList.toggle("just-completed", justCompletedIndex === index);
    });

    map.labelElements.forEach((label, index) => {
      const isMajorStation = MAJOR_STATION_NAMES.has(STATIONS[index].name);
      const isCurrentTarget = currentIndex !== null && index === currentIndex;
      const isPreviousStation = currentIndex !== null && index === currentIndex - 1;
      const isOlderCompletedMajor = currentIndex !== null
        && index < currentIndex - 1
        && index <= completedIndex
        && isMajorStation;

      // 플레이 화면: 직전 역 + 현재 입력 대상 역을 항상 표시하고,
      // 그보다 오래 전에 완성한 역은 주요 역만 남깁니다. 미래 역 라벨은 숨깁니다.
      // 홈·결과 화면: 주요 역 라벨만 표시합니다.
      const isReturnStation = Boolean(STATIONS[index].isReturn);
      const isVisible = !isReturnStation && (showAllLabels
        ? isMajorStation
        : isCurrentTarget || isPreviousStation || isOlderCompletedMajor);

      label.classList.toggle("is-visible", isVisible);
      label.classList.toggle("is-current", isCurrentTarget);
      label.classList.toggle("is-previous", isPreviousStation);
      label.classList.toggle("is-major-complete", !showAllLabels && isOlderCompletedMajor);
      label.classList.toggle("is-overview", showAllLabels && isMajorStation);
    });

    const point = getExactRoutePoint(map, stationPosition);
    map.train.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
    map.train.classList.toggle("is-hidden", normalized <= 0 && currentIndex === null);
    map.svg.dataset.routeStationPosition = stationPosition.toFixed(6);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function animateViewBox(map, target, duration = 620) {
    if (!map) return;
    if (viewBoxesNearlyEqual(map.viewBox, target)) {
      setViewBoxDirect(map, target);
      return;
    }
    if (state.viewAnimation) cancelAnimationFrame(state.viewAnimation);
    const startBox = { ...map.viewBox };
    const startedAt = performance.now();

    const frame = (now) => {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = {
        x: startBox.x + (target.x - startBox.x) * eased,
        y: startBox.y + (target.y - startBox.y) * eased,
        width: startBox.width + (target.width - startBox.width) * eased,
        height: startBox.height + (target.height - startBox.height) * eased
      };
      setViewBoxDirect(map, current);
      if (t < 1) state.viewAnimation = requestAnimationFrame(frame);
      else {
        setViewBoxDirect(map, target);
        state.viewAnimation = null;
      }
    };
    state.viewAnimation = requestAnimationFrame(frame);
  }

  function resetMapView(map, animate = false) {
    const target = { x: 0, y: 0, width: MAP.width, height: MAP.height };
    if (animate) animateViewBox(map, target, 680);
    else {
      map.svg.setAttribute("viewBox", `0 0 ${MAP.width} ${MAP.height}`);
      map.viewBox = target;
    }
  }

  function fitMapToRoute(map, animate = false) {
    if (!map?.stationPoints?.length || STATIONS.length > 10) {
      resetMapView(map, animate);
      return;
    }
    const xs = map.stationPoints.map((point) => point.x);
    const ys = map.stationPoints.map((point) => point.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const width = Math.max(430, maxX - minX + 230);
    const height = Math.max(330, maxY - minY + 210);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const target = {
      x: clamp(centerX - width / 2, 0, MAP.width - width),
      y: clamp(centerY - height / 2, 0, MAP.height - height),
      width,
      height
    };
    if (animate) animateViewBox(map, target, 680);
    else {
      map.svg.setAttribute("viewBox", `${target.x} ${target.y} ${target.width} ${target.height}`);
      map.viewBox = target;
    }
  }

  function routeCameraViewportWidth() {
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const isLongRegionalRoute = [1, 4].includes(ACTIVE_LINE_NUMBER) && STATIONS.length > 20;
    if (isLongRegionalRoute) return mobile ? 560 : 430;
    if (STATIONS.length > 24) return mobile ? 660 : 540;
    return mobile ? 720 : 610;
  }

  function routeCameraTarget(map, stationPosition) {
    const position = clamp(stationPosition, 0, STATIONS.length - 1);
    const point = getExactRoutePoint(map, position);
    const behind = getExactRoutePoint(map, clamp(position - 0.42, 0, STATIONS.length - 1));
    const ahead = getExactRoutePoint(map, clamp(position + 0.42, 0, STATIONS.length - 1));
    const dx = ahead.x - behind.x;
    const dy = ahead.y - behind.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const width = routeCameraViewportWidth();
    const height = width * (MAP.height / MAP.width);
    const isLongRegionalRoute = [1, 4].includes(ACTIVE_LINE_NUMBER) && STATIONS.length > 20;
    const lead = isLongRegionalRoute ? 0.14 : 0.1;
    const centerX = point.x + (dx / length) * width * lead;
    const centerY = point.y + (dy / length) * height * lead;
    return {
      x: clamp(centerX - width / 2, 0, MAP.width - width),
      y: clamp(centerY - height / 2, 0, MAP.height - height),
      width,
      height
    };
  }

  function setViewBoxDirect(map, box) {
    map.svg.setAttribute("viewBox", `${box.x.toFixed(2)} ${box.y.toFixed(2)} ${box.width.toFixed(2)} ${box.height.toFixed(2)}`);
    map.viewBox = { ...box };
  }

  function viewBoxesNearlyEqual(left, right, tolerance = 1.2) {
    return Math.abs(left.x - right.x) < tolerance
      && Math.abs(left.y - right.y) < tolerance
      && Math.abs(left.width - right.width) < tolerance
      && Math.abs(left.height - right.height) < tolerance;
  }

  function setMapCameraAtRoutePosition(map, stationPosition, animate = false, duration = 620) {
    if (!map) return;
    const target = routeCameraTarget(map, stationPosition);
    if (viewBoxesNearlyEqual(map.viewBox, target)) {
      setViewBoxDirect(map, target);
      return;
    }
    if (animate) animateViewBox(map, target, duration);
    else setViewBoxDirect(map, target);
  }

  function focusMapOnStation(map, index, animate = true) {
    if (!map || index < 0 || index >= map.stationPoints.length) return;
    const framingPosition = index > 0 ? index - 0.5 : 0;
    const duration = [1, 4].includes(ACTIVE_LINE_NUMBER) && STATIONS.length > 20 ? 680 : 560;
    setMapCameraAtRoutePosition(map, framingPosition, animate, duration);
  }

  function focusCurrentStation(force = false) {
    if (state.screen !== "game") return;
    if (force || state.autoFollow) focusMapOnStation(state.maps.game, Math.min(state.targetIndex, STATIONS.length - 1), true);
  }

  function toggleAutoFollow() {
    state.autoFollow = !state.autoFollow;
    const button = $("toggleAutoFollowButton");
    button.classList.toggle("is-active", state.autoFollow);
    button.setAttribute("aria-pressed", String(state.autoFollow));
    button.textContent = `자동 추적 ${state.autoFollow ? "ON" : "OFF"}`;
    if (state.autoFollow) focusCurrentStation(true);
  }

  function renderHomeMap() {
    const cleared = getCleared().includes(courseKey());
    const map = state.maps.home;
    if (!map) return;
    fitMapToRoute(map, false);
    setMapProgress(map, cleared ? 1 : 0, {
      currentIndex: cleared ? null : 0,
      completedIndex: cleared ? STATIONS.length - 1 : -1,
      showAllLabels: true
    });
    $("homeMapStatus").textContent = cleared
      ? `${LINE_CONFIG.name} ${COURSE.name} 완주 기록 저장됨`
      : `${journeyStart()}역에서 시작`;
    $("homeMapSubstatus").textContent = cleared
      ? "서울 지도에 완성된 노선이 유지됩니다."
      : "역을 입력하면 실제 위치에 노선이 생성됩니다.";
  }

  function runHomeDemo() {
    if (state.demoRunning) {
      cancelAnimationFrame(state.demoFrame);
      state.demoRunning = false;
      $("demoButton").textContent = "모션 데모";
      renderHomeMap();
      return;
    }

    state.demoRunning = true;
    $("demoButton").textContent = "데모 정지";
    const start = performance.now();
    const duration = 8500;
    const map = state.maps.home;

    const frame = (now) => {
      const raw = Math.min(1, (now - start) / duration);
      const stepped = Math.floor(raw * (STATIONS.length - 1)) / (STATIONS.length - 1);
      const currentIndex = Math.min(STATIONS.length - 1, Math.floor(raw * STATIONS.length));
      setMapProgress(map, stepped, {
        currentIndex,
        completedIndex: Math.max(-1, currentIndex - 1),
        showAllLabels: true,
        animate: true
      });
      $("homeMapStatus").textContent = `${String(currentIndex + 1).padStart(2, "0")} · ${STATIONS[currentIndex].name}`;
      $("homeMapSubstatus").textContent = "실제 역 위치에 역을 하나씩 추가하는 모션 데모";
      if (raw < 1 && state.demoRunning) {
        state.demoFrame = requestAnimationFrame(frame);
      } else {
        state.demoRunning = false;
        $("demoButton").textContent = "모션 데모";
        $("homeMapStatus").textContent = `${LINE_CONFIG.name} ${COURSE.name} 전체 경로 완성`;
        $("homeMapSubstatus").textContent = `${journeyStart()}부터 ${journeyEnd()}까지 ${currentDirectionLabel()} 경로가 표시됩니다.`;
      }
    };
    state.demoFrame = requestAnimationFrame(frame);
  }

  function startGame() {
    cancelHomeDemo();
    stopTimer();
    state.targetIndex = 0;
    state.completedIndex = -1;
    state.routePosition = 0;
    state.attempts = 0;
    state.errors = [];
    state.stationErrors = {};
    state.startedAt = null;
    state.elapsedMs = 0;
    state.isAnimating = false;
    state.currentResult = null;
    $("stationInput").value = "";
    setFeedback("READY", "한글 철자가 일치하면 역이 추가됩니다.", "neutral");
    state.autoFollow = true;
    const followButton = $("toggleAutoFollowButton");
    followButton.classList.add("is-active");
    followButton.setAttribute("aria-pressed", "true");
    followButton.textContent = "자동 추적 ON";
    resetMapView(state.maps.game, false);
    switchScreen("game");
    renderGame();
    setTimeout(() => {
      focusCurrentStation(true);
      $("stationInput").focus();
    }, 180);
  }

  function cancelHomeDemo() {
    if (state.demoFrame) cancelAnimationFrame(state.demoFrame);
    state.demoRunning = false;
    $("demoButton").textContent = "모션 데모";
  }

  function switchScreen(name) {
    Object.entries(screens).forEach(([key, screen]) => screen.classList.toggle("is-active", key === name));
    state.screen = name;
    window.scrollTo({ top: 0, behavior: "smooth" });
    updateStatsHeader();
  }

  function goHome() {
    stopTimer();
    if (state.viewAnimation) cancelAnimationFrame(state.viewAnimation);
    state.viewAnimation = null;
    switchScreen("home");
    buildLineButtons();
    renderHomeMap();
  }

  function renderGame() {
    const target = STATIONS[Math.min(state.targetIndex, STATIONS.length - 1)];
    const progress = STATIONS.length > 1 ? state.routePosition / (STATIONS.length - 1) : 1;
    const currentIndex = state.targetIndex;
    setMapProgress(state.maps.game, progress, {
      currentIndex,
      completedIndex: state.completedIndex,
      showAllLabels: false
    });

    $("stationCode").textContent = target.code;
    $("targetName").textContent = target.name;
    $("targetEnglish").textContent = target.en;
    $("targetIndexLabel").textContent = `${String(state.targetIndex + 1).padStart(2, "0")} / ${STATIONS.length}`;
    $("fromStation").textContent = state.targetIndex === 0 ? "START" : STATIONS[state.targetIndex - 1].name;
    $("toStation").textContent = target.name;
    $("coordinateBadge").textContent = `${target.lat.toFixed(6)}° N · ${target.lng.toFixed(6)}° E`;

    updateStationContext(target);

    const percent = Math.round(((state.completedIndex + 1) / STATIONS.length) * 100);
    $("progressPercent").textContent = `${Math.max(0, percent)}%`;
    $("progressBar").style.width = `${Math.max(0, percent)}%`;
    renderNearbyStations();
    updateLiveMetrics();
    if (state.autoFollow && !state.isAnimating) focusMapOnStation(state.maps.game, Math.min(state.targetIndex, STATIONS.length - 1), true);
  }

  function getStationContextCategory(stationName) {
    const categories = [
      { names: ["독립문", "경복궁", "안국", "종로3가", "시청", "동대문역사문화공원", "충정로"], badge: "HISTORY & CULTURE", area: "역사 문화권", keywords: "궁궐 · 근대사 · 도심 산책" },
      { names: ["홍제", "금호", "옥수", "잠원", "뚝섬", "잠실나루", "당산"], badge: "RIVERSIDE", area: "한강·수변 생활권", keywords: "강변 · 산책 · 교량 조망" },
      { names: ["주엽", "정발산", "불광", "양재", "매봉", "대청", "일원", "잠실", "종합운동장", "낙성대"], badge: "PARK & GREEN", area: "공원·녹지 생활권", keywords: "공원 · 산책 · 주거" },
      { names: ["대곡", "고속터미널", "교대", "남부터미널", "수서", "가락시장", "경찰병원", "오금", "왕십리", "강변", "사당", "신도림", "영등포구청", "신설동", "까치산"], badge: "TRANSIT HUB", area: "광역 교통권", keywords: "환승 · 버스 · 철도 연결" },
      { names: ["동대입구", "대치", "한양대", "건대입구", "서울대입구", "이대", "신촌"], badge: "CAMPUS AREA", area: "대학·교육 생활권", keywords: "캠퍼스 · 학습 · 청년 문화" },
      { names: ["연신내", "을지로입구", "을지로3가", "을지로4가", "충무로", "압구정", "신사", "화정", "마두", "백석", "성수", "강남", "신림", "합정", "홍대입구", "문래"], badge: "LOCAL DISTRICT", area: "상업·문화 생활권", keywords: "상권 · 골목 · 지역 문화" },
      { names: ["지축", "구파발", "녹번", "무악재", "약수", "방배", "봉천"], badge: "HILLSIDE", area: "산자락·언덕 생활권", keywords: "산세 · 주거 · 도심 경계" },
      { names: ["대화", "학여울", "삼성"], badge: "EXHIBITION & BUSINESS", area: "전시·업무 생활권", keywords: "컨벤션 · 업무 · 대형 시설" }
    ];
    return categories.find((category) => category.names.includes(stationName)) || {
      badge: "STATION NOTE",
      area: "역 주변 생활권",
      keywords: "주거 · 교통 · 지역 일상"
    };
  }

  function updateStationContext(station) {
    const contextKey = `${ACTIVE_LINE_NUMBER}:${station.name}`;
    const externalContext = ACTIVE_LINE_NUMBER === 1
      ? window.LINE_1_CONTEXTS?.[station.name]
      : ACTIVE_LINE_NUMBER === 4
        ? window.LINE_4_CONTEXTS?.[station.name]
        : ACTIVE_LINE_NUMBER === 5
          ? window.LINE_5_CONTEXTS?.[station.name]
          : ACTIVE_LINE_NUMBER === 6
            ? window.LINE_6_CONTEXTS?.[station.name]
            : ACTIVE_LINE_NUMBER === 7
              ? window.LINE_7_CONTEXTS?.[station.name]
              : ACTIVE_LINE_NUMBER === 8
                ? window.LINE_8_CONTEXTS?.[station.name]
                : ACTIVE_LINE_NUMBER === 9
                  ? window.LINE_9_CONTEXTS?.[station.name]
                  : null;
    const context = externalContext || LINE_SPECIFIC_CONTEXTS[contextKey] || STATION_CONTEXTS[station.name] || {
      title: station.en,
      subtitle: `${station.name}역 주변의 생활권과 지역 분위기를 살펴볼 수 있는 구간`,
      icon: "🚉"
    };
    const defaultCategory = getStationContextCategory(station.name);
    const admin = getStationAdminMeta(station);
    const category = {
      badge: context.badge || defaultCategory.badge,
      area: `${admin.fullLabel} · ${context.area || defaultCategory.area}`,
      keywords: context.keywords || defaultCategory.keywords
    };
    const description = /[.!?。]$/.test(context.subtitle) ? context.subtitle : `${context.subtitle}입니다.`;

    $("stationContextIcon").textContent = context.icon || "🚉";
    $("stationContextBadge").textContent = category.badge;
    $("stationContextTitle").textContent = `${context.title} · ${station.name}`;
    $("stationContextDescription").textContent = description;
    $("stationContextArea").textContent = category.area;
    $("stationContextKeyword").textContent = category.keywords;
    $("stationContext").style.setProperty("--station-accent", LINE_COLOR);
    renderTransferList(station);
    updateCitySegmentIndicator(station);
  }

  function renderNearbyStations() {
    const list = $("nearbyStations");
    const start = Math.max(0, state.targetIndex - 2);
    const end = Math.min(STATIONS.length - 1, state.targetIndex + 2);
    list.innerHTML = "";
    for (let index = start; index <= end; index += 1) {
      const station = STATIONS[index];
      const item = document.createElement("li");
      item.className = index < state.targetIndex ? "complete" : index === state.targetIndex ? "current" : "pending";
      item.innerHTML = `<span>${station.code}</span><strong>${station.name}</strong><small>${station.en}</small>`;
      list.appendChild(item);
    }
  }

  function startTimerIfNeeded() {
    if (state.startedAt || state.screen !== "game") return;
    state.startedAt = performance.now();
    state.timerId = window.setInterval(() => {
      state.elapsedMs = performance.now() - state.startedAt;
      updateLiveMetrics();
      updateStatsHeader();
    }, 80);
    setFeedback("RUNNING", "정확하게 입력하면 다음 위치까지 노선이 그려집니다.", "neutral");
  }

  function stopTimer() {
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;
    if (state.startedAt) state.elapsedMs = performance.now() - state.startedAt;
  }

  function submitStation() {
    if (state.isAnimating || state.screen !== "game") return;
    const input = $("stationInput");
    const typed = input.value.trim().normalize("NFC");
    const expected = STATIONS[state.targetIndex].name.normalize("NFC");

    if (!typed) {
      setFeedback("EMPTY", "역명을 입력한 뒤 Enter를 눌러주세요.", "error");
      shakePanel();
      return;
    }

    startTimerIfNeeded();
    state.attempts += 1;

    if (typed === expected) {
      input.value = "";
      const typedIndex = state.targetIndex;
      const isFinalStation = typedIndex >= STATIONS.length - 1;

      if (isFinalStation) {
        state.isAnimating = true;
        state.completedIndex = typedIndex;
        state.routePosition = typedIndex;
        setMapProgress(state.maps.game, 1, {
          currentIndex: typedIndex,
          completedIndex: typedIndex,
          showAllLabels: false,
          justCompletedIndex: typedIndex
        });
        setFeedback("CORRECT", `${expected}역까지 모든 역명을 확인했습니다.`, "success");
        window.setTimeout(() => {
          state.isAnimating = false;
          finishGame();
        }, 360);
        return;
      }

      const destinationIndex = typedIndex + 1;
      const destinationName = STATIONS[destinationIndex].name;
      setFeedback("CORRECT", `${expected} 확인 · ${destinationName}역으로 이동합니다.`, "success");
      animateToStation(destinationIndex, typedIndex, () => {
        state.completedIndex = typedIndex;
        state.targetIndex = destinationIndex;
        state.routePosition = destinationIndex;
        maybeAnnounceCityEntry(typedIndex, destinationIndex);
        renderGame();
        input.focus();
      });
      return;
    }

    const typoType = analyzeTypo(expected, typed);
    state.errors.push({ expected, actual: typed, type: typoType, at: Date.now() });
    state.stationErrors[expected] = (state.stationErrors[expected] || 0) + 1;
    setFeedback("TRY AGAIN", `${typoType} · “${expected}”의 철자를 다시 확인하세요.`, "error");
    shakePanel();
    input.select();
    updateLiveMetrics();
    updateStatsHeader();
  }

  function animateToStation(destinationIndex, typedIndex, done) {
    state.isAnimating = true;
    if (state.viewAnimation) cancelAnimationFrame(state.viewAnimation);
    state.viewAnimation = null;
    const map = state.maps.game;
    const fromProgress = STATIONS.length > 1 ? state.routePosition / (STATIONS.length - 1) : 1;
    const toProgress = STATIONS.length > 1 ? destinationIndex / (STATIONS.length - 1) : 1;
    const start = performance.now();
    const isLongRegionalRoute = [1, 4].includes(ACTIVE_LINE_NUMBER) && STATIONS.length > 20;
    const duration = isLongRegionalRoute ? 980 : 760;
    const cameraStart = { ...map.viewBox };
    const cameraEndPosition = destinationIndex > 0 ? destinationIndex - 0.5 : 0;
    const cameraEnd = routeCameraTarget(map, cameraEndPosition);

    const frame = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const progress = fromProgress + (toProgress - fromProgress) * eased;
      setMapProgress(map, progress, {
        currentIndex: destinationIndex,
        completedIndex: typedIndex,
        showAllLabels: false
      });

      if (state.autoFollow && STATIONS.length > 1) {
        const cameraFrame = {
          x: cameraStart.x + (cameraEnd.x - cameraStart.x) * eased,
          y: cameraStart.y + (cameraEnd.y - cameraStart.y) * eased,
          width: cameraStart.width + (cameraEnd.width - cameraStart.width) * eased,
          height: cameraStart.height + (cameraEnd.height - cameraStart.height) * eased
        };
        setViewBoxDirect(map, cameraFrame);
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setMapProgress(map, toProgress, {
          currentIndex: destinationIndex,
          completedIndex: typedIndex,
          showAllLabels: false,
          justCompletedIndex: typedIndex
        });
        if (state.autoFollow) setViewBoxDirect(map, cameraEnd);
        clearTimeout(state.completedPulseTimer);
        state.routePosition = destinationIndex;
        state.completedPulseTimer = setTimeout(() => {
          map.nodeElements[typedIndex]?.classList.remove("just-completed");
        }, 900);
        state.isAnimating = false;
        done();
      }
    };
    requestAnimationFrame(frame);
  }

  function setFeedback(status, message, mode) {
    const feedback = $("feedback");
    feedback.className = `feedback ${mode}`;
    feedback.querySelector("strong").textContent = status;
    feedback.querySelector("p").textContent = message;
  }

  function shakePanel() {
    const panel = $("typingPanel");
    panel.classList.remove("shake");
    void panel.offsetWidth;
    panel.classList.add("shake");
  }

  function updateLiveMetrics() {
    const accuracy = calculateAccuracy();
    $("sideTimer").textContent = formatTime(state.elapsedMs);
    $("sideAccuracy").textContent = `${accuracy.toFixed(1)}%`;
    $("sideErrors").textContent = String(state.errors.length);
  }

  function updateStatsHeader() {
    const elapsed = state.screen === "game" || state.screen === "result" ? state.elapsedMs : 0;
    $("headerTimer").textContent = formatTime(elapsed).slice(0, 5);
    $("headerAccuracy").textContent = `${calculateAccuracy().toFixed(1)}%`;
    $("headerProgress").textContent = `${Math.max(0, state.completedIndex + 1)} / ${STATIONS.length}`;
  }

  function calculateAccuracy() {
    if (!state.attempts) return 100;
    const correct = Math.max(0, state.attempts - state.errors.length);
    return (correct / state.attempts) * 100;
  }

  function analyzeTypo(expected, actual) {
    if (/[a-zA-Z]/.test(actual)) return "한/영 전환 오류";
    if (expected.replace(/\s/g, "") === actual.replace(/\s/g, "") && expected !== actual) return "띄어쓰기 오류";
    if (actual.length < expected.length) return "글자 누락";
    if (actual.length > expected.length) return "글자 추가";

    let initial = 0;
    let medial = 0;
    let final = 0;
    let other = 0;

    for (let i = 0; i < expected.length; i += 1) {
      if (expected[i] === actual[i]) continue;
      const left = decomposeHangul(expected[i]);
      const right = decomposeHangul(actual[i]);
      if (!left || !right) {
        other += 1;
        continue;
      }
      if (left.initial !== right.initial) initial += 1;
      if (left.medial !== right.medial) medial += 1;
      if (left.final !== right.final) final += 1;
    }

    const types = [initial, medial, final, other].filter(Boolean).length;
    if (types > 1) return "복합 철자 오류";
    if (initial) return "초성 오류";
    if (medial) return "중성 오류";
    if (final) return "종성 오류";
    return "음절 오류";
  }

  function decomposeHangul(char) {
    const code = char.charCodeAt(0);
    if (code < 0xac00 || code > 0xd7a3) return null;
    const value = code - 0xac00;
    return {
      initial: Math.floor(value / 588),
      medial: Math.floor((value % 588) / 28),
      final: value % 28
    };
  }

  function finishGame() {
    stopTimer();
    state.completedIndex = STATIONS.length - 1;
    state.targetIndex = STATIONS.length;
    state.routePosition = STATIONS.length - 1;
    const accuracy = (STATIONS.length / Math.max(STATIONS.length, state.attempts)) * 100;
    const result = {
      id: window.crypto?.randomUUID?.() || String(Date.now()),
      line: ACTIVE_LINE_NUMBER,
      course: ACTIVE_COURSE_ID,
      courseName: COURSE.name,
      direction: ACTIVE_DIRECTION_ID,
      directionName: currentDirectionLabel(),
      routeName: `${journeyStart()} → ${journeyEnd()}`,
      date: new Date().toISOString(),
      durationMs: Math.max(100, state.elapsedMs),
      attempts: state.attempts,
      errors: state.errors.length,
      accuracy,
      typoCounts: countBy(state.errors.map((item) => item.type)),
      stationErrors: { ...state.stationErrors }
    };
    state.currentResult = result;
    saveSession(result);
    markCleared();
    renderResult(result);
    switchScreen("result");
  }

  function renderResult(result) {
    $("resultTime").textContent = formatTime(result.durationMs);
    $("resultAccuracy").textContent = `${result.accuracy.toFixed(1)}%`;
    $("resultErrors").textContent = String(result.errors);
    fitMapToRoute(state.maps.result, false);
    setMapProgress(state.maps.result, 0, { currentIndex: 0, completedIndex: -1, showAllLabels: true });
    animateMapCompletion(state.maps.result, 2200);
    renderTypoChart(result.typoCounts);
    renderTroubleStations(result.stationErrors);
  }

  function animateMapCompletion(map, duration = 1800) {
    const start = performance.now();
    const frame = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const currentIndex = Math.min(STATIONS.length - 1, Math.floor(eased * STATIONS.length));
      setMapProgress(map, eased, {
        currentIndex: t < 1 ? currentIndex : null,
        completedIndex: t <= 0 ? -1 : Math.floor(eased * (STATIONS.length - 1)),
        showAllLabels: true
      });
      if (t < 1) requestAnimationFrame(frame);
      else setMapProgress(map, 1, { currentIndex: null, completedIndex: STATIONS.length - 1, showAllLabels: true });
    };
    requestAnimationFrame(frame);
  }

  function renderTypoChart(counts) {
    const container = $("typoChart");
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    $("topTypoBadge").textContent = entries.length ? entries[0][0] : "NO ERRORS";
    if (!entries.length) {
      container.innerHTML = `<div class="empty-state"><strong>PERFECT RUN</strong><p>오답이 없어 분석할 철자 패턴이 없습니다.</p></div>`;
      return;
    }
    const max = Math.max(...entries.map(([, value]) => value));
    container.innerHTML = entries.slice(0, 5).map(([label, value]) => `
      <div class="typo-row">
        <strong>${escapeHtml(label)}</strong>
        <div class="typo-bar"><i style="width:${(value / max) * 100}%"></i></div>
        <span>${value}</span>
      </div>
    `).join("");
  }

  function renderTroubleStations(counts) {
    const list = $("troubleStations");
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (!entries.length) {
      list.innerHTML = `<li class="empty-state"><strong>ALL CLEAR</strong><p>모든 역을 한 번에 통과했습니다.</p></li>`;
      return;
    }
    list.innerHTML = entries.map(([station, count], index) => `
      <li><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(station)}</strong><em>${count}회</em></li>
    `).join("");
  }

  function countBy(items) {
    return items.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  }

  function formatTime(ms) {
    const totalSeconds = Math.max(0, ms) / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const tenths = Math.floor((totalSeconds % 1) * 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
  }

  function saveSession(result) {
    const sessions = getSessions();
    sessions.unshift(result);
    localStorage.setItem(STORAGE.sessions, JSON.stringify(sessions.slice(0, 50)));
  }

  function getSessions() {
    try { return JSON.parse(localStorage.getItem(STORAGE.sessions)) || []; }
    catch { return []; }
  }

  function getCleared() {
    try { return JSON.parse(localStorage.getItem(STORAGE.cleared)) || []; }
    catch { return []; }
  }

  function markCleared() {
    const cleared = new Set(getCleared());
    cleared.add(courseKey());
    localStorage.setItem(STORAGE.cleared, JSON.stringify([...cleared]));
    buildLineButtons();
  }

  function openStats() {
    renderStats();
    $("statsModal").classList.add("is-open");
    $("statsModal").setAttribute("aria-hidden", "false");
  }

  function closeStats() {
    $("statsModal").classList.remove("is-open");
    $("statsModal").setAttribute("aria-hidden", "true");
  }

  function renderStats() {
    const sessions = getSessions();
    const cleared = new Set(getCleared());
    const availableLineNumbers = Object.keys(window.METRO_LINES).map(Number);
    const clearedLineCount = availableLineNumbers.filter((lineNumber) => {
      const journeyKeys = getLineJourneyKeys(lineNumber);
      return journeyKeys.length > 0 && journeyKeys.every((key) => cleared.has(key));
    }).length;
    $("statCleared").textContent = `${clearedLineCount} / 9`;
    $("statSessions").textContent = String(sessions.length);
    $("statBest").textContent = sessions.length ? formatTime(Math.min(...sessions.map((item) => item.durationMs))) : "—";
    $("statAccuracy").textContent = sessions.length
      ? `${(sessions.reduce((sum, item) => sum + item.accuracy, 0) / sessions.length).toFixed(1)}%`
      : "—";

    const history = $("historyList");
    if (!sessions.length) {
      history.innerHTML = `<div class="history-empty">아직 저장된 주행 기록이 없습니다.</div>`;
      return;
    }
    history.innerHTML = sessions.slice(0, 8).map((session) => {
      const date = new Date(session.date);
      const lineConfig = window.METRO_LINES[session.line] || window.METRO_LINES[3];
      const courseName = session.courseName || lineConfig.courses[session.course]?.name || "본선";
      return `
        <article class="history-item">
          <i style="background:${lineConfig.color}">${session.line}</i>
          <div><strong>${session.line}호선 ${escapeHtml(session.directionName || courseName)} 완주</strong><span>${escapeHtml(session.routeName || courseName)} · ${date.toLocaleString("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</span></div>
          <b>${formatTime(session.durationMs)}</b>
          <em>${session.accuracy.toFixed(1)}%</em>
        </article>
      `;
    }).join("");
  }

  function resetData() {
    localStorage.removeItem(STORAGE.sessions);
    localStorage.removeItem(STORAGE.cleared);
    renderStats();
    buildLineButtons();
    renderHomeMap();
    showToast("저장된 프로토타입 데이터를 초기화했습니다.");
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2300);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  function pointInGeoRing(lng, lat, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      const intersects = ((yi > lat) !== (yj > lat))
        && (lng < ((xj - xi) * (lat - yi)) / ((yj - yi) || Number.EPSILON) + xi);
      if (intersects) inside = !inside;
    }
    return inside;
  }

  window.__METROTYPE_RIVER_TEST__ = () => STATIONS
    .filter((station) => pointInHanRiverWater(station.lng, station.lat))
    .map((station) => station.name);

  window.__METROTYPE_ALL_WATER_TEST__ = () => Object.values(window.METRO_LINES)
    .flatMap((line) => Object.values(line.courses || {}).flatMap((course) => course.stations || [])
      .map((station) => ({ line: line.number, name: station.name, lat: station.lat, lng: station.lng })))
    .filter((station, index, all) => all.findIndex((item) => item.line === station.line && item.name === station.name) === index)
    .filter((station) => pointInHanRiverWater(station.lng, station.lat));

  window.__METROTYPE_GEOMETRY_TEST__ = () => {
    const map = state.maps.game;
    if (!map) return [];
    return map.routeSegments.map((segment, index) => {
      const end = segment.getPointAtLength(map.segmentLengths[index]);
      const target = map.stationPoints[index + 1];
      return {
        segment: index,
        from: STATIONS[index].name,
        to: STATIONS[index + 1].name,
        endpointError: Math.hypot(end.x - target.x, end.y - target.y)
      };
    });
  };

  init();
})();
