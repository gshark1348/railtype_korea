# RAILTYPE KOREA v27.1 · 수인분당선 도시 경계 테스트

## 정적 검사

- `COURSE_REGION_IDS["12:full"]`: 8개 문자열 ID — **PASS**
- `COURSE_REGION_IDS["12:regular"]`: 8개 문자열 ID — **PASS**
- 런타임 `METRO_BOUNDARY_FEATURES.yongin`: 존재 — **PASS**
- 용인시 폴리곤 위상 유효성 — **PASS**
- 수인분당선 63개 역사 WGS84 좌표 — **PASS**
- 지정 도시 내부 역사 — **63 / 63**
- JavaScript 구문 검사 — **PASS**
- HTML 로컬 자원 연결 — **누락 0개**

## 브라우저 통합 검사

프로젝트 HTML과 JavaScript를 독립 브라우저 환경에 로드한 뒤 수인분당선 설정 화면을 열어 검사했습니다.

- 고유 도시 ID: `seoul, seongnam, yongin, suwon, hwaseong, ansan, siheung, incheon`
- 렌더링된 도시: **8개**
- multipart를 포함한 SVG 도시 경로: **35개**
- 수인분당선 역 노드: **63개**
- JavaScript 런타임 오류: **0개**

검사 화면은 `docs/suin-bundang-city-boundaries-v27.1.png`에 저장했습니다.
