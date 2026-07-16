# GIS Sources and v24 Method

## Coordinate system
- Runtime map and station data: WGS84 / EPSG:4326
- Metric validation: EPSG:5179

## Reference hierarchy
1. National Geographic Information Institute / VWorld national base-map real-width river and river-boundary layers
2. SGIS municipality topology and annual administrative-boundary guidance
3. S-Map and Smart Seoul Map for visual cross-checks at the Seoul–Goyang/Gimpo and Seoul–Guri/Hanam seams
4. Seoul Metro and Korea Rail Network Authority/open railway datasets for official station coordinates

## v24 implementation
The previous river was a sparse hand-drawn ribbon embedded in `app.js`. v24 moves the geometry to a standalone multi-ring dataset and increases control-point density at the western and eastern approaches. Islands are represented as holes. The result is designed for a minimalist SVG infographic and is not a cadastral, hydrographic, or legal survey product.

Municipal geometry was not arbitrarily redrawn. All 25 stored features passed topology validity checks and were retained; the separate river layer was the primary source of the visible mismatch.

## 수인분당선 v27.0

- 국가철도공단 분당선 역위치 공개자료: https://www.data.go.kr/data/15041333/fileData.do
- 한국철도공사 광역철도 운영노선: https://info.korail.com/info/contents.do?key=1446
- 런타임 좌표계: WGS84 / EPSG:4326
- 프로젝트 데이터: `suin-bundang-stations.csv`, `js/suin-bundang-data.js`
- 자동 검증: `suin-bundang-validation-v27.json`

## v27.1 수인분당선 도시 경계·역 위치

- 수인분당선 63개 역 기준점: 국가철도공단 `분당선 역위치` 공개 데이터, WGS84 십진수 좌표
- 서울·성남·수원·화성·안산·시흥·인천: 프로젝트의 KOSTAT 기반 시·군 경계 피처
- 용인: KOSTAT 센서스용 행정구역경계의 수지구·기흥구·처인구를 dissolve한 시 외곽선
- 웹 렌더링을 위해 위상을 보존하는 범위에서 정점을 단순화하며, 법적 경계 판정·측량 용도로 사용하지 않습니다.
