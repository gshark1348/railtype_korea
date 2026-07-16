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
