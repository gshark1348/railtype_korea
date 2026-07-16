# RAILTYPE KOREA v28.0 GitHub 웹 업로드 안내

이번 업데이트는 일반모드와 분리된 무한모드를 추가합니다. Supabase 데이터베이스 구조는 변경하지 않습니다.

## 변경·추가 파일

```text
README.md
index.html
styles.css
js/app.js
TEST-v28.md
GITHUB-UPLOAD-v28.0.md
docs/infinite-mode-v28.png
```

## GitHub 웹사이트에서 업로드

1. `railtype_korea-v28.0-github-upload.zip`의 압축을 풉니다.
2. GitHub의 `gshark1348/railtype_korea` 저장소를 엽니다.
3. **Add file → Upload files**를 선택합니다.
4. 압축 해제한 폴더 내부의 파일과 폴더를 모두 업로드 영역으로 드래그합니다.
5. 기존 파일은 같은 경로의 v28.0 파일로 덮어씁니다.
6. 커밋 메시지에 다음 내용을 입력합니다.

```text
feat: add infinite transfer mode
```

7. **Commit changes**를 누릅니다.

## 배포 후 확인

- 메인 화면의 `무한모드` 버튼
- 출발 노선·코스·역·방향 선택
- 환승 가능한 역의 환승 버튼
- 단일 환승역에서 `TAB` 즉시 환승
- 복수 환승역에서 노선 선택 모달
- 환승 후 노선색·노선 번호·열차 UI 전환
- 종착역 도착 후 자동 반대 방향 운행
- 운행 종료 시 비공개 여정·오답 분석
- 일반모드 최고 기록과 공개 기록의 기존 동작

## Supabase

무한모드 여정은 공개 기록으로 전송하지 않습니다. 테이블·RLS·인덱스 변경이 없으므로 Supabase SQL을 다시 실행할 필요가 없습니다.

## 캐시 새로고침

GitHub Pages 배포가 완료된 뒤 변경사항이 보이지 않으면 강력 새로고침합니다.

- macOS Chrome: `Command + Shift + R`
- Windows Chrome: `Ctrl + Shift + R`
