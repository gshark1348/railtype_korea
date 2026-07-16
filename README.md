<div align="center">

<img src="docs/social-preview-v24.png" alt="RAILTYPE KOREA — 실제 좌표 위에 수도권 도시철도와 KTX 경부·호남고속축을 시각화한 프로젝트 대표 이미지" width="100%">

# RAILTYPE KOREA

### Type the Stations · Trace the Rails

역명을 정확히 입력하며 실제 지리 좌표 위에 철도를 한 역씩 완성하는 **GIS 기반 인터랙티브 타자 연습 웹앱**입니다.

`Vanilla JavaScript` · `SVG` · `GeoJSON` · `WGS84` · `GitHub Pages`

</div>

> **GitHub Pages URL**  
> https://gshark1348.github.io/railtype_korea/

---

## 프로젝트를 만든 이유

우리는 종종 멀리 떨어진 곳에서 새로운 가치와 이야기를 찾습니다. 여행지의 골목과 명소는 열심히 찾아보면서도, 정작 매일 타고 다니는 지하철이 어떤 동네를 지나고 각 역이 도시와 국토의 어디에 놓여 있는지는 잘 모르는 경우가 많습니다.

**RAILTYPE KOREA**는 이 익숙하지만 낯선 도시를 다시 바라보기 위한 프로젝트입니다. 과거 학교 컴퓨터실에서 사용하던 타자 연습 프로그램의 단순하고 즉각적인 성취감에서 영감을 받아, 역명을 입력할 때마다 실제 지도 위에 선로가 놓이고 도시의 한 구간이 완성되는 게임으로 재해석했습니다.

사용자는 단순히 역 이름을 외우는 데서 끝나지 않습니다. 각 역이 놓인 지리적 위치, 주변 동네의 특징과 대표 장소, 노선이 계획되고 개통·연장된 과정까지 함께 살펴보며 **철도를 통해 도시의 역사와 지리를 학습**하게 됩니다.

---


## v26.0 업데이트

KTX 경부고속선에 이어 **KTX 호남고속축 대표 정차 코스**를 추가했습니다. 용산에서 목포까지 실제 역사 좌표를 따라 전국 지도 위에서 주행하며, 경부고속선과는 별도의 커뮤니티 기록으로 비교됩니다.

- 용산–광명–천안아산–오송–공주–익산–정읍–광주송정–나주–목포 대표 정차축
- 목포행·용산행 양방향 타자 주행
- 대한민국 경계 GeoJSON의 서남해안 형상 보강과 10개 역사 좌표 검증
- 호남고속철도 기본계획·착공·1단계 개통·2단계 건설 역사 타임라인
- 각 역 주변 도시·랜드마크·환승 정보 추가
- KTX 경부고속선과 호남고속선을 서로 분리한 노선별 최고 기록
- 광주송정 이남은 현재 기존 호남선 연계 구간이며, 호남고속철도 2단계 건설 상황을 안내문에 반영

## v25.0 업데이트

수도권 도시철도에서 전국 철도망으로 확장하는 첫 단계로 **KTX 경부고속선**을 추가했습니다.

- 서울–광명–천안아산–오송–대전–김천구미–서대구–동대구–경주–울산–부산 대표 정차축
- 부산행·서울행 양방향 타자 주행
- 대한민국 경계 GeoJSON 기반 전국 지도와 실제 역사 좌표 플로팅
- KTX-I 열차 이미지와 경부고속철도 건설 역사 타임라인
- 역별 지역 특징·랜드마크 설명과 환승 정보
- 개인 통계와 커뮤니티 기록판에서 KTX를 독립 노선으로 분류
- 최고 기록은 기존과 동일하게 KTX 경부고속선 내부에서만 비교

## 현재 제공되는 경험

- **수도권 전철 1–9호선 및 KTX 경부·호남고속축 플레이**  
  본선·지선·일반·급행 등 노선별 코스를 선택할 수 있습니다.
- **종착역 방향 선택**  
  예를 들어 3호선의 오금행·수서행·구파발행·대화행처럼 실제 운행 방향을 선택합니다.
- **START 전 모션 데모**  
  선택한 노선이 지도 위에 완성되는 흐름을 미리 확인한 뒤 주행을 시작합니다.
- **정확한 한글 입력 판정**  
  현재 역명을 정확히 입력하고 Enter를 눌러야 다음 역으로 이동합니다.
- **역 단위 모션 그래픽**  
  정답을 입력할 때마다 선로, 역 노드, 열차 위치가 같은 지리 좌표를 기준으로 다음 역까지 이동합니다.
- **역 주변 이야기**  
  사진 중심 구성을 제거하고, 각 역의 대표 랜드마크·생활권·동네 특징을 짧은 텍스트로 제공합니다.
- **노선 역사 타임라인**  
  기획, 착공, 최초 개통, 연장 과정을 노선별 자료와 함께 확인할 수 있습니다.
- **실시간 주행 기록**  
  소요 시간, 정확도, 오답 수, 진행률을 플레이 중 실시간으로 표시합니다.
- **오답 유형 분석**  
  초성·중성·종성·복합 철자·글자 누락·글자 추가·띄어쓰기·한/영 전환 오류를 분류합니다.
- **개인 진척도 저장**  
  주행 기록과 완료한 코스를 브라우저 `localStorage`에 저장합니다.
- **호선별 커뮤니티 최고 기록**  
  최근 완주는 전체 노선을 함께 보여주되, 최고 기록은 1–9호선, KTX 경부고속선, KTX 호남고속선을 각각 분리해 같은 노선 안에서만 순위를 비교합니다.

---

## 화면과 지도 시각화

### GIS 개발 플롯

아래 이미지는 서울과 인접 도시의 경계, 한강 수계, 노선별 역 좌표를 한 화면에서 비교하며 초기 오차를 찾기 위해 사용한 개발 플롯입니다.

![서울·수도권 GIS 개발 플롯](docs/gis-development-plot-v24.png)

### v24 공간 검증 결과

한강을 단순한 두 개의 선이 아닌 실제 폭을 가진 폴리곤으로 구성하고, 서울 경계와 역 좌표를 중첩하여 수면 위에 잘못 놓인 역이 있는지 검사했습니다.

![RAILTYPE KOREA v24 GIS 검증 플롯](docs/gis-audit-v24.png)

### v25 KTX 경부고속선 공간 검증

대한민국 전국 경계와 KTX 대표 정차역 11개의 WGS84 좌표를 중첩하고, 모든 역과 역 연결 중심선이 국토 경계 안에 놓이는지 검사했습니다.

![KTX 경부고속선 GIS 검증 플롯](docs/ktx-gyeongbu-audit-v25.png)

상세 결과는 [`VALIDATION-v25.md`](VALIDATION-v25.md)와 [`data/ktx-gyeongbu-validation-v25.json`](data/ktx-gyeongbu-validation-v25.json)에서 확인할 수 있습니다.

### v26 KTX 호남고속축 공간 검증

대한민국 전국 경계와 용산–목포 대표 정차역 10개의 WGS84 좌표를 중첩했습니다. 서남해안 경계를 중해상도 해안선으로 보강한 뒤 모든 역이 육지 경계 안에 위치하는지 검사했습니다. 역 사이의 화면 선은 실제 철도 측량 선형이 아니라 역 좌표를 연결한 인포그래픽 중심선입니다.

![KTX 호남고속축 GIS 검증 플롯](docs/ktx-honam-audit-v26.png)

상세 결과는 [`VALIDATION-v26.md`](VALIDATION-v26.md)와 [`data/ktx-honam-validation-v26.json`](data/ktx-honam-validation-v26.json)에서 확인할 수 있습니다.

---

## 개발 과정

| 단계 | 개발 내용 |
|---|---|
| **Concept** | 학교 컴퓨터실의 타자 연습 경험과 서울 지하철 지리 학습을 결합한 게임 콘셉트 설계 |
| **UI Prototype** | 빈 서울 인포그래픽 위에 노선 선택 버튼을 배치하고, 완료한 노선만 점차 표시되는 메인 화면 구성 |
| **Typing Interaction** | 역명을 정확히 입력해야 다음 역으로 이동하며, 노드와 선로가 한 구간씩 생성되는 주행 로직 구현 |
| **Geographic Motion** | 열차와 선로가 역 노드보다 뒤처지지 않도록 전체 경로 비율이 아닌 **역 구간 단위 진행도**로 애니메이션 방식을 수정 |
| **Content Redesign** | 역별 배경 사진 방식에서 주변 랜드마크·생활권·동네 특징을 설명하는 텍스트 방식으로 전환 |
| **Line Expansion** | 1호선의 광역 지선, 2호선 순환·지선, 3–9호선의 본선·분기·급행 코스를 순차적으로 추가 |
| **Route Setup** | 전동차 이미지, 방향 선택, 노선 모션 데모, 노선 역사 타임라인을 START 전 설정 화면에 통합 |
| **v21** | 5호선과 기존 역 좌표의 행정경계·수면 교차 검증 및 위치 보정 자료 구축 |
| **v22** | 별내선이 연결된 8호선 추가, 서울–구리–남양주–성남 경계 검증 |
| **v23** | 9호선 일반·급행 코스 추가, 서울 서부–강남–강동 구간 좌표 검증 |
| **v24** | 강서·강동 한강 흐름 재구성, 섬 홀 처리, 1–9호선 전체 수면 교차 검사, GitHub Pages 배포 구조 정리 |
| **v24.1** | 공개 닉네임과 최근 완주·최고 기록을 표시하는 커뮤니티 기록판 및 Supabase 연동 구조 추가 |
| **v24.2** | 전체 노선 통합 최고 기록을 제거하고, 1–9호선별 선택형 리더보드와 호선별 순위 계산 방식 적용 |
| **v25.0** | 대한민국 전국 경계와 KTX 경부고속선 대표 정차축, 양방향 주행, 역사 타임라인과 노선별 기록판 추가 |
| **v26.0** | KTX 호남고속축 용산–목포 대표 코스, 양방향 주행, 서남해안 GIS 보강, 역사·역별 콘텐츠와 독립 리더보드 추가 |

---

## GIS 지도는 어떻게 만들었는가

![RAILTYPE KOREA GIS 처리 파이프라인](docs/gis-pipeline-v24.svg)

### 1. 역사 좌표 수집과 통합

각 역은 WGS84 위도·경도 좌표를 기준으로 관리합니다. 서울교통공사 및 국가철도공단의 공개 역사 정보와 노선별 위치 데이터를 교차 확인하고, 런타임에서는 다음과 같은 공통 구조로 정규화합니다.

```js
{
  code: "309",
  name: "대화",
  en: "DAEHWA",
  lat: 37.676087,
  lng: 126.747569
}
```

- 런타임 좌표계: **WGS84 / EPSG:4326**
- 거리·수면 교차 검증 좌표계: **UTM-K / EPSG:5179**

### 2. 서울과 인접 도시 경계 생성

행정경계는 SGIS/KOSTAT 계열 시·군 경계 데이터를 기반으로 웹 렌더링에 필요한 지역만 추출했습니다.

1. 시·군 단위 피처 선택
2. 동일 지자체 조각을 하나의 `MultiPolygon`으로 통합
3. 경계의 연결 관계를 훼손하지 않는 topology-preserving simplification 적용
4. WGS84로 변환
5. GeoJSON과 브라우저용 JavaScript 데이터로 각각 저장

프로젝트는 서울만 잘라내지 않고 고양·김포·인천·부천·광명·과천·성남·하남·구리·남양주·의정부 등 노선이 실제로 통과하는 인접 지역을 함께 표시합니다.

### 3. 한강 폴리곤 생성

초기 버전의 한강은 북안과 남안의 소수 좌표를 연결한 단순 리본이었습니다. 이 방식은 강서구와 강동구에서 실제 흐름과 강폭을 충분히 표현하지 못했고, 행정경계 및 역 좌표와 중첩할 때 왜곡이 크게 보였습니다.

v24에서는 한강을 독립된 **multi-ring 수면 폴리곤**으로 재구성했습니다.

- **강서 구간:** 행주–방화–가양–염창 진입 방향과 강폭 보정
- **도심 구간:** 여의도·밤섬·선유도·노들섬을 수면 내부의 `hole`로 처리
- **강동 구간:** 암사–고덕–구리–하남 방향으로 이어지는 북동 굴곡과 수로 폭 보정
- 런타임 형상: `js/han-river-geometry.js`
- GIS 교환 형상: `data/han-river-geometry-v24.geojson`

SVG에서는 `fill-rule="evenodd"` 방식으로 외곽 수면과 섬 홀을 하나의 수면 레이어로 렌더링합니다.

### 4. 위·경도를 SVG 화면 좌표로 투영

현재 웹앱은 외부 지도 타일 없이 동작합니다. 선택한 노선의 지리 범위를 계산한 뒤 위·경도를 `1200 × 760` SVG 좌표로 선형 변환합니다.

```js
x = paddingX + ((lng - minLng) / (maxLng - minLng)) * usableWidth
y = paddingY + ((maxLat - lat) / (maxLat - minLat)) * usableHeight
```

같은 `project(lng, lat)` 함수를 행정경계, 한강, 역 노드, 노선 경로, 열차에 공통 적용하기 때문에 모든 지도 요소가 같은 좌표 기준으로 움직입니다.

### 5. 역 사이의 선로 플로팅

노선은 역의 실제 좌표를 순서대로 연결하되, 직선의 각진 느낌을 줄이기 위해 저긴장도 곡선으로 보간합니다. 초기 장력 `0.72`는 역 사이에서 경로가 실제 위치보다 과도하게 휘어지는 overshoot를 만들 수 있어 v24에서 `0.38`로 낮췄습니다.

또한 진행도를 전체 path 길이 비율로 계산하지 않고 **현재 역과 다음 역 사이의 segment 진행도**로 계산합니다. 따라서 정답 애니메이션의 끝점은 항상 다음 역 노드의 정확한 중심과 일치합니다.

### 6. 공간 검증

| 검증 항목 | v24 결과 |
|---|---:|
| 플레이 가능한 노선 | 1–9호선 + KTX 경부·호남고속축 |
| 검사한 역사 좌표 조합 | **458개** |
| 한강 수면 내부 역사 | **0개** |
| 가장 수면 경계에 가까운 역사 | 청담역 · 약 **36.1 m** |
| 검사한 시·군 경계 피처 | **25개** |
| 유효한 경계 피처 | **25 / 25** |
| 한강 폴리곤 유효성 | **PASS** |
| 노선 보간 기본 장력 | **0.38** |

상세 결과는 다음 파일에서 확인할 수 있습니다.

- [`VALIDATION-v24.md`](VALIDATION-v24.md)
- [`data/station-water-validation-v24.json`](data/station-water-validation-v24.json)
- [`data/boundary-topology-audit-v24.json`](data/boundary-topology-audit-v24.json)
- [`data/runtime-structure-validation-v24.json`](data/runtime-structure-validation-v24.json)
- [`data/GIS-SOURCES.md`](data/GIS-SOURCES.md)
- [`VALIDATION-v25.md`](VALIDATION-v25.md)
- [`VALIDATION-v26.md`](VALIDATION-v26.md)
- [`data/ktx-gyeongbu-validation-v25.json`](data/ktx-gyeongbu-validation-v25.json)
- [`data/ktx-honam-validation-v26.json`](data/ktx-honam-validation-v26.json)

> 이 지도는 교육·게임·데이터 시각화를 위한 웹 인포그래픽입니다. 지적, 측량, 수리해석, 법적 행정경계 판정 용도로 사용할 수 없습니다.

---

## 프로젝트 구조

```text
railtype_korea/
├── index.html                         # 전체 화면과 모달 구조
├── styles.css                        # 미니멀 UI, 지도, 모션 스타일
├── .nojekyll                         # GitHub Pages의 Jekyll 처리 비활성화
├── .github/workflows/
│   └── deploy-pages.yml              # main push 시 GitHub Pages 자동 배포
├── assets/trains/                    # 노선 선택 화면 전동차 이미지
├── docs/
│   ├── social-preview-v24.png        # 저장소 Social preview 권장 이미지
│   ├── gis-development-plot-v24.png  # 개발 단계 중첩 플롯
│   ├── gis-audit-v24.png             # 최종 GIS 검증 플롯
│   ├── gis-pipeline-v24.svg          # 데이터 처리 파이프라인
│   ├── ktx-gyeongbu-audit-v25.png    # 경부고속선 GIS 검증
│   └── ktx-honam-audit-v26.png       # 호남고속축 GIS 검증
├── js/
│   ├── app.js                        # 게임, 통계, 지도 투영, 애니메이션
│   ├── metro-lines.js                # 노선 설정, 코스, 방향, 역사 정보
│   ├── line*-data.js                 # 도시철도 노선별 역사와 코스 데이터
│   ├── ktx-gyeongbu-data.js          # KTX 경부 대표 정차역 데이터
│   ├── ktx-honam-data.js             # KTX 호남 대표 정차역 데이터
│   ├── community.js                  # 공개 기록과 노선별 리더보드
│   ├── national-boundary.js          # 대한민국 전국 경계
│   ├── geo-boundaries.js             # 런타임 행정경계
│   └── han-river-geometry.js         # 런타임 한강 다중 링 폴리곤
└── data/
    ├── line*-stations.csv            # 노선별 역사 좌표 원본/검수표
    ├── municipality-boundaries-processed.geojson
    ├── south-korea-boundary.geojson  # 대한민국 전국 경계
    ├── ktx-gyeongbu-stations.csv     # 경부 대표 정차역 좌표
    ├── ktx-honam-stations.csv        # 호남 대표 정차역 좌표
    ├── han-river-geometry-v24.geojson
    └── *validation*.json             # 자동 공간 검증 결과
```

---

## 로컬 실행

이 프로젝트는 별도 프레임워크나 빌드 과정이 없는 정적 웹사이트입니다.

```bash
git clone https://github.com/<USERNAME>/<REPOSITORY>.git
cd <REPOSITORY>
python3 -m http.server 8000
```

브라우저에서 다음 주소를 엽니다.

```text
http://localhost:8000
```

VS Code의 **Live Server**를 사용해도 됩니다. `index.html`을 파일로 직접 열기보다 로컬 HTTP 서버를 사용하는 것을 권장합니다.

---

## GitHub Pages 배포

저장소에는 정적 사이트용 GitHub Actions 워크플로가 이미 포함되어 있습니다.

### 1. 저장소 생성과 업로드

```bash
git init
git add .
git commit -m "Release RAILTYPE KOREA v26.0"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPOSITORY>.git
git push -u origin main
```

### 2. Pages 소스 설정

GitHub 저장소에서 다음 순서로 이동합니다.

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

`main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`이 사이트 전체를 Pages artifact로 업로드하고 배포합니다.

### 3. 배포 확인

```text
Actions → Deploy static site to GitHub Pages → deploy
```

성공 후 `Settings → Pages`에 공개 URL이 표시됩니다. GitHub 공식 문서에 따르면 Pages는 저장소의 HTML·CSS·JavaScript 정적 파일을 직접 호스팅할 수 있으며, Actions를 배포 소스로 선택할 수 있습니다.

- [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

### 4. Social preview 설정

GitHub 저장소의 다음 메뉴에서 `docs/social-preview-v24.png`를 업로드하면 공유 링크에 프로젝트 대표 이미지가 표시됩니다.

```text
Settings → General → Social preview → Edit
```

---

## 노선과 역 데이터 업데이트

### 역 정보 수정

1. `data/line*-stations.csv`에서 역명·역 코드·위도·경도를 수정합니다.
2. 대응하는 `js/line*-data.js` 또는 `js/metro-lines.js`의 런타임 데이터를 갱신합니다.
3. 코스의 역 순서와 방향 설정을 확인합니다.
4. 수면 교차 및 경계 포함 여부를 다시 검증합니다.

### 새 노선 추가

1. 노선별 역사 배열 작성
2. `window.METRO_LINES`에 색상·코스·방향·역사 정보 등록
3. 노선 선택 카탈로그에 `lineNumber` 연결
4. 해당 노선이 통과하는 지역 경계와 지도 범위 추가
5. 노선 전체와 각 단축 종착 코스의 주행 테스트
6. 전동차 이미지 출처 및 라이선스를 `THIRD_PARTY_NOTICES.md`에 기록

### GitHub에서 계속 업데이트할 수 있는가?

가능합니다. 이후 노선을 추가하거나 좌표·설명·UI를 수정한 뒤 `main` 브랜치에 push하면 GitHub Actions가 변경 사항을 자동으로 다시 배포합니다.

---

## 주요 데이터 출처

| 데이터 | 활용 | 공식 출처 |
|---|---|---|
| 도시·광역철도 역사 정보 | 역명, 역 코드, 위도·경도, 환승 정보 교차 확인 | [공공데이터포털 · 국가철도공단 도시광역철도 역사정보](https://www.data.go.kr/data/15093755/fileData.do) |
| 실폭하천 | 한강 본류의 흐름과 강폭 기준 | [VWorld · 국토지리정보원 연속수치지형도 실폭하천](https://www.vworld.kr/dtmk/dtmk_ntads_s002.do?dsId=30207) |
| 통계지역경계 | 서울과 인접 시·군 행정경계 기준 | [SGIS · 자료제공 목록](https://sgis.kostat.go.kr/view/pss/openDataIntrcn) |
| 서울 지도 교차검수 | 강서·강동 접경부와 수변 형상 시각 확인 | [서울시 S-Map](https://smap.seoul.go.kr/) · [스마트서울맵](https://map.seoul.go.kr/) |
| KTX·도시철도 역사 정보 | 노선 구성, 실제 역사 좌표와 환승 정보 교차 확인 | [국가철도공단 철도역정보](https://www.data.go.kr/data/15067652/fileData.do) · [코레일 노선도](https://info.korail.com/info/contents.do?key=857) |
| 호남고속철도 사업 | 기본계획, 착공, 1단계 개통과 2단계 건설 현황 | [국가철도공단 호남고속철도](https://www.kr.or.kr/sub/info.do?m=05010202) |
| 전국 경계·해안선 | KTX 전국 지도 배경과 서남해안 형상 | Natural Earth · GSHHS |
| 전동차 이미지 | 노선 선택 화면의 열차 이미지 | Wikimedia Commons 및 각 파일별 출처 |

세부 저작자·라이선스·데이터 기준일은 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)를 확인하세요.

---

## 기술 스택

- **HTML5** — 시맨틱 화면 구조와 접근성 속성
- **CSS3** — 반응형 패널, SVG 모션, 노선별 색상 시스템
- **Vanilla JavaScript** — 게임 상태, 코스 선택, 입력 판정, 통계, 저장
- **SVG** — 지도 경계, 수계 폴리곤, 노선, 역 노드, 열차 애니메이션
- **GeoJSON** — 행정경계와 한강 형상의 GIS 교환 포맷
- **LocalStorage** — 사용자별 완료 코스 및 과거 주행 기록 저장
- **GitHub Actions / Pages** — 정적 웹사이트 자동 배포

외부 JavaScript 프레임워크나 지도 타일 API에 의존하지 않으므로, 저장소만으로 프로젝트를 재현하고 배포할 수 있습니다.

---

## 향후 로드맵

- 수도권 광역전철·경전철·GTX 노선 추가
- 부산·대구·대전·광주 등 전국 도시철도 확장
- KTX 강릉선·전라선과 SRT 등 전국 고속철도 코스 추가
- 사용자 계정 기반 클라우드 기록 동기화
- 역별 지리·역사 콘텐츠의 출처 체계 강화
- 모바일 타이핑과 접근성 개선
- 노선별·지역별 학습 모드와 퀴즈 모드
- 완료한 노선이 하나의 전국 철도망으로 누적되는 장기 진행 화면

---

## 저장 데이터와 개인정보

개인 주행 기록, 완료 코스와 오답 통계는 사용자의 브라우저 `localStorage`에 저장됩니다. 브라우저 데이터 삭제, 시크릿 모드 사용 또는 다른 기기 접속 시 개인 기록이 유지되지 않을 수 있습니다.

Supabase 커뮤니티 기능을 활성화한 경우에는 사용자가 정한 공개 닉네임과 노선·방향·소요 시간·정확도·오답 수·완주 시각만 공개 기록판에 전송됩니다. 이메일, 로그인 비밀번호, 실제 오답 문자열과 전체 개인 통계는 전송하지 않습니다.

---

## 라이선스와 사용 주의

프로젝트 코드의 배포 라이선스는 저장소 소유자가 별도로 선택해 `LICENSE` 파일로 명시해야 합니다. 라이선스가 추가되기 전에는 일반적인 저작권이 유지됩니다.

공공데이터와 전동차 이미지는 원 제공기관 및 개별 파일의 이용 조건을 따릅니다. 특히 Wikimedia Commons 이미지는 파일마다 라이선스가 다를 수 있으므로 재배포 전 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)를 확인하세요.

---

<div align="center">

**익숙한 역명을 입력하며, 익숙하지 않았던 도시를 다시 발견합니다.**

RAILTYPE KOREA · v26.0

</div>
