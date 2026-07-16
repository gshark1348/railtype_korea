# RAILTYPE KOREA v26.0 · GitHub 웹 업로드

## 업데이트 내용

- KTX 호남고속축 용산–목포 대표 정차 코스 추가
- 목포행·용산행 양방향 주행
- 대한민국 서남해안 전국 경계 보강
- 역별 지역 설명·환승 정보·역사 타임라인 추가
- KTX 경부고속선과 분리된 호남고속선 커뮤니티 최고 기록

## GitHub에서 직접 업로드

1. `railtype_korea-v26.0-github-upload.zip`의 압축을 풉니다.
2. GitHub의 `gshark1348/railtype_korea` 저장소로 이동합니다.
3. **Add file → Upload files**를 선택합니다.
4. 압축을 푼 폴더 안의 파일과 폴더를 모두 업로드 영역으로 드래그합니다.
5. 기존 파일과 이름이 같다는 안내가 나와도 그대로 덮어씁니다.
6. 커밋 메시지를 입력하고 **Commit changes**를 누릅니다.

```text
feat: add KTX Honam high-speed route
```

## Supabase

호남고속선은 내부 노선 번호 `11`로 저장됩니다. 기존 `public_runs.line` 제약이 `1–99`이므로 SQL 스키마를 다시 실행할 필요가 없습니다. 최고 기록은 10번 KTX 경부고속선과 11번 KTX 호남고속선을 별도로 조회합니다.

## 배포 후 확인

- 메인 메뉴에 `KTX 호남고속선` 카드가 보이는가
- 목포행과 용산행이 모두 선택되는가
- START 전 전국 지도 모션 데모가 실행되는가
- 10개 역을 순서대로 입력할 수 있는가
- 최고 기록에서 `KTX 호남고속선`이 별도 필터로 나타나는가
- 경부고속선 기록과 호남고속선 기록이 섞이지 않는가
- GitHub Actions의 Pages 배포가 초록색 체크로 끝나는가

배포 주소: `https://gshark1348.github.io/railtype_korea/`
