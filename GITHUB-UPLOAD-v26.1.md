# RAILTYPE KOREA v26.1 · GitHub 웹 업로드

이번 업데이트는 KTX 호남고속선 역 위치와 대한민국 전국 경계 표시를 보정합니다.

## 업로드 방법

1. `railtype_korea-v26.1-github-upload.zip`의 압축을 풉니다.
2. GitHub의 `gshark1348/railtype_korea` 저장소를 엽니다.
3. **Add file → Upload files**를 선택합니다.
4. 압축을 푼 폴더 내부의 파일과 폴더를 모두 업로드 영역으로 드래그합니다.
5. 다음 메시지로 커밋합니다.

```text
fix: correct KTX Honam station positions and national boundary
```

## 주요 변경 파일

- `js/national-boundary.js`
- `data/south-korea-boundary.geojson`
- `js/ktx-honam-data.js`
- `data/ktx-honam-stations.csv`
- `data/ktx-honam-validation-v26.1.json`
- `docs/ktx-honam-position-audit-v26.1.png`
- `VALIDATION-v26.1.md`
- `TEST-v26.1.md`
- `README.md`

Supabase 데이터베이스 구조는 변경되지 않았으므로 SQL을 다시 실행할 필요가 없습니다.

## 배포 후 확인

- KTX 호남고속선 선택 시 대한민국 외곽선에 긴 대각선이 나타나지 않는가
- 용산·광명·천안아산·오송이 수도권과 충청권의 올바른 위치에 보이는가
- 공주·익산·정읍이 서남 방향으로 자연스럽게 이어지는가
- 광주송정·나주·목포가 서남부 육지 위에 표시되는가
- 목포행과 용산행에서 역 순서가 반대로 정상 적용되는가
