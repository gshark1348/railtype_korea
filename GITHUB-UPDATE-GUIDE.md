# RAILTYPE KOREA v24.1 GitHub 업데이트 가이드

이 패키지는 기존 `gshark1348/railtype_korea` 저장소의 README, LICENSE, `.github`, `assets`, `docs`를 유지하면서 커뮤니티 기록판 업데이트에 필요한 파일만 교체하도록 구성되어 있습니다.

## 업로드 전 중요 확인

- ZIP 자체를 저장소에 올리지 말고 먼저 압축을 해제합니다.
- 압축을 풀었을 때 보이는 `index.html`, `styles.css`, `js`, `supabase` 등을 저장소 최상위(root)에 업로드합니다.
- `js/community-config.js`가 `enabled: false`이면 커뮤니티 기록판은 PREVIEW 모드로 표시됩니다.
- 실제 사용자 간 기록 공유를 사용하려면 `COMMUNITY-SETUP.md`에 따라 Supabase를 먼저 설정합니다.
- `service_role` 키는 절대 GitHub에 올리지 않습니다. 브라우저에는 Supabase의 공개용 anon key만 사용합니다.

## GitHub 웹사이트에서 업데이트

1. GitHub의 `gshark1348/railtype_korea` 저장소를 엽니다.
2. `Code` 탭에서 `Add file` → `Upload files`를 선택합니다.
3. 이 ZIP을 압축 해제한 뒤, 내부의 모든 파일과 폴더를 업로드 영역으로 끌어다 놓습니다.
4. 같은 이름의 기존 파일은 새 버전으로 교체되고, 패키지에 없는 README·LICENSE·assets·docs·워크플로 파일은 그대로 유지됩니다.
5. 커밋 메시지에 다음을 입력합니다.

   `feat: add community records board and remove shared map`

6. `Commit changes`를 눌러 `main` 브랜치에 반영합니다.
7. 저장소의 `Actions` 탭에서 Pages 배포가 완료되는지 확인합니다.
8. 배포 주소에서 강력 새로고침을 수행합니다.

   - macOS Chrome: `Command + Shift + R`
   - Windows Chrome: `Ctrl + F5`

## 터미널에서 업데이트

```bash
git clone https://github.com/gshark1348/railtype_korea.git
cd railtype_korea

# 이 패키지의 압축을 다른 폴더에 해제한 뒤 해당 경로의 내용을 현재 저장소에 복사
cp -R /path/to/railtype-korea-v24.1-github-update/. .

git status
git add index.html styles.css js/app.js js/community.js js/community-config.js \
  COMMUNITY-SETUP.md supabase/community-schema.sql GITHUB-UPDATE-GUIDE.md
git commit -m "feat: add community records board and remove shared map"
git push origin main
```

## 배포 확인 항목

- 메인 화면에 커뮤니티 기록판이 표시되는가
- `SHARED RAIL MAP` 카드가 사라졌는가
- 최근 완주 / 최고 기록 탭이 전환되는가
- 닉네임 저장과 새로고침 버튼이 작동하는가
- 기존 1–9호선 선택과 주행이 정상 작동하는가
- Supabase 미설정 시 `PREVIEW`, 설정 시 `LIVE`가 표시되는가

## 문제가 생겼을 때 되돌리기

GitHub 저장소의 `Commits`에서 업데이트 직전 커밋을 확인한 후 Revert하거나, 터미널에서 다음처럼 이전 커밋으로 복구합니다.

```bash
git log --oneline
git revert <업데이트-커밋-해시>
git push origin main
```
