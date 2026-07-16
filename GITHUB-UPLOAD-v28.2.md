# RAILTYPE KOREA v28.2 GitHub 웹 업로드 안내

## 변경 파일

```text
README.md
index.html
styles.css
js/app.js
TEST-v28.2.md
GITHUB-UPLOAD-v28.2.md
```

## 업로드 방법

1. `railtype_korea-v28.2-github-upload.zip`의 압축을 풉니다.
2. GitHub의 `railtype_korea` 저장소를 엽니다.
3. **Add file → Upload files**를 선택합니다.
4. 압축 해제된 파일과 `js` 폴더를 업로드 영역으로 드래그합니다.
5. 기존 파일은 같은 경로의 v28.2 파일로 덮어씁니다.
6. 다음 메시지로 커밋합니다.

```text
feat: add infinite journey map and compact game layout
```

## 배포 후 확인

- 각 노선 설정 화면을 열면 모션 데모가 자동으로 움직이는가
- `다시 보기` 버튼으로 데모를 재생할 수 있는가
- 무한모드에서 여러 역을 이동한 뒤 종료하면 전체 경로가 결과 지도에 표시되는가
- 환승한 경우 구간별 노선색이 다르게 표시되는가
- 마지막 위치에 `운행 종료` 마커가 표시되는가
- 데스크톱에서 게임 지도와 입력 패널, 운행 종료 버튼이 한 화면 안에 들어오는가
- 모바일에서는 세로 레이아웃이 정상적으로 유지되는가

## 캐시

`index.html`의 앱 캐시 버전은 `28.2.0`입니다. 이전 화면이 남으면 강력 새로고침합니다.

- macOS Chrome: `Command + Shift + R`
- Windows Chrome: `Ctrl + Shift + R`

Supabase 스키마는 변경하지 않았으므로 SQL을 다시 실행할 필요가 없습니다.
