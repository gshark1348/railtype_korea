# RAILTYPE KOREA v28.1 GitHub 웹 업로드 안내

이번 패치는 타자 UI의 현재 입력 대상역과 열차·진행 선로·환승 판정을 같은 역으로 동기화합니다. Supabase 데이터베이스 구조는 변경하지 않습니다.

## 변경·추가 파일

```text
README.md
index.html
js/app.js
TEST-v28.1.md
GITHUB-UPLOAD-v28.1.md
docs/station-sync-v28.1.png
```

## GitHub 웹사이트에서 업로드

1. `railtype_korea-v28.1-github-upload.zip`의 압축을 풉니다.
2. GitHub의 `gshark1348/railtype_korea` 저장소를 엽니다.
3. **Add file → Upload files**를 선택합니다.
4. 압축 해제한 폴더 내부의 파일과 폴더를 모두 업로드 영역으로 드래그합니다.
5. 기존 파일은 같은 경로의 v28.1 파일로 덮어씁니다.
6. 커밋 메시지에 다음 내용을 입력합니다.

```text
fix: sync train position with current typing station
```

7. **Commit changes**를 누릅니다.

## 배포 후 확인

- 현재 입력 대상역 노드 위에 열차가 위치하는가
- 정답 입력 후 UI가 다음 역으로 바뀌고 열차·선로가 그 역까지 이동하는가
- 이동 중 환승 버튼이 비활성화되는가
- 환승 안내의 역명과 입력 대상역이 일치하는가
- `TAB` 환승이 직전 역이 아닌 현재 표시 역에서 실행되는가
- 환승 후 새 노선의 입력 대상역과 열차 위치가 일치하는가
- 종착역 자동 회차 직후에도 같은 기준이 유지되는가
- 일반모드 입력·완주·기록 저장이 기존처럼 동작하는가

## Supabase

기록 스키마, RLS, 인덱스는 변경되지 않았습니다. Supabase SQL을 다시 실행할 필요가 없습니다.

## 캐시 새로고침

`index.html`의 `app.js` 캐시 버전을 `28.1.0`으로 올렸습니다. 배포 후 이전 동작이 남아 있으면 강력 새로고침합니다.

- macOS Chrome: `Command + Shift + R`
- Windows Chrome: `Ctrl + Shift + R`
