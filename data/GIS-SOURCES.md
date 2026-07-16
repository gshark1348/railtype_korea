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

## KTX 경부고속선 · 대한민국 전국 지도 (v25.0)

- Station locations: 국가철도공단 역사정보, KORAIL 철도 노선도 교차 확인
- National administrative outline: Natural Earth Admin 0 Countries (public domain)
- Coastline refinement: GSHHS intermediate-resolution coastline dataset
- Runtime CRS: EPSG:4326 (WGS84)
- Validation: `ktx-gyeongbu-validation-v25.json`


## KTX 호남고속선 · v26.0

- 대표 정차축: 용산–광명–천안아산–오송–공주–익산–정읍–광주송정–나주–목포
- 역사 좌표: 국가철도공단 철도역 정보의 WGS84 위·경도 항목을 우선 기준으로 사용하고, 각 역사 공개 좌표와 교차 확인
- 노선·사업 연혁: 국가철도공단 호남고속철도 주요사업현황
- 현재 선로 설명: 오송–광주송정은 호남고속선, 광주송정–목포는 기존 호남선 연계 운행
- Runtime: `js/ktx-honam-data.js`
- CSV: `ktx-honam-stations.csv`
- Validation: `ktx-honam-validation-v26.json`


## KTX 호남고속선 위치 보정 · v26.1

- 역사 좌표 기준: 한국철도공사 `역 위치 정보` 공개자료의 WGS84 위도·경도
- 정밀 좌표 교차 검수: 개별 역사 공개 위치 자료
- 전국 경계 기준: Natural Earth 계열 국가 경계의 남북 경계선과 GSHHG/GSHHS 2.3.6 중해상도 해안선
- 경계 처리:
  1. 남북 경계선을 서쪽에서 동쪽으로 연속 병합
  2. 동해안에서 서해안까지 대한민국 본토 해안선 연결
  3. 한강 하구에 비정상 대각선을 만들던 단절 정점 제거
  4. `buffer(0)`을 이용한 미세 자기교차 복구
  5. 본토·제주·거제·진도·남해·강화를 유효한 `MultiPolygon`으로 통합
  6. topology-preserving simplification 적용
- 런타임 CRS: WGS84 / EPSG:4326
- 결과:
  - 대한민국 경계 위상 유효성: PASS
  - 호남축 대표 역사 경계 내부 포함: 10 / 10
  - v26.0 대비 최대 역사 좌표 조정: 85.5 m
- Runtime: `js/national-boundary.js`, `js/ktx-honam-data.js`
- Exchange: `south-korea-boundary.geojson`, `ktx-honam-stations.csv`
- Validation: `ktx-honam-validation-v26.1.json`
