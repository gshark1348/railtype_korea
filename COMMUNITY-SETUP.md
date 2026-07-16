# RAILTYPE KOREA 커뮤니티 기록판 설정

## 왜 별도 설정이 필요한가요?

GitHub Pages는 정적 웹 호스팅이므로 각 사용자의 브라우저에 저장된 `localStorage`를 서로 공유할 수 없습니다. 다른 사용자들의 완주 기록을 함께 표시하려면 외부 데이터베이스가 필요합니다.

이 버전은 Supabase REST API를 사용하도록 준비되어 있습니다. 설정 전에는 메인 화면의 기록판이 `PREVIEW`로 표시되며, 데모 기록과 현재 브라우저의 기록만 보여줍니다.

## 1. Supabase 프로젝트 준비

Supabase 프로젝트를 생성한 뒤 프로젝트의 SQL 실행 화면에서 다음 파일을 실행합니다.

```text
supabase/community-schema.sql
```

이 SQL은 다음을 생성합니다.

- `public_runs` 공개 완주 기록 테이블
- 최근 기록 및 노선별 기록 조회용 인덱스
- 익명 사용자의 조회·등록을 허용하는 RLS 정책
- 공개 수정·삭제를 차단하는 기본 정책

## 2. 프런트엔드 설정

`js/community-config.js`를 열고 다음 값을 변경합니다.

```js
window.RAILTYPE_COMMUNITY_CONFIG = {
  enabled: true,
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_PUBLIC_KEY",
  table: "public_runs",
  maxRecords: 36
};
```

주의 사항:

- 반드시 `anon public key`를 사용합니다.
- `service_role key`는 브라우저 코드에 절대로 넣지 않습니다.
- 설정 후 GitHub 저장소에 다시 업로드하거나 커밋하면 됩니다.

## 3. 저장되는 공개 정보

앱이 커뮤니티 테이블에 보내는 값은 다음과 같습니다.

- 사용자가 정한 공개 닉네임
- 노선 번호
- 코스 및 종착역 방향
- 출발역과 도착역
- 전체 소요 시간
- 정확도
- 오답 수
- 완주 시각

이메일, 로그인 계정, 입력한 오답 문자열, 개인 통계 전체는 전송하지 않습니다.

## 4. 동작 확인

설정이 정상적이면 메인 화면의 상태 배지가 `PREVIEW`에서 `LIVE`로 변경됩니다.

1. 첫 번째 브라우저에서 노선을 완주합니다.
2. 다른 브라우저 또는 시크릿 창에서 사이트를 엽니다.
3. 메인 화면의 `최근 완주` 기록에 첫 번째 브라우저의 닉네임과 기록이 나타나는지 확인합니다.
4. `최고 기록` 탭에서 소요 시간이 빠른 순서로 정렬되는지 확인합니다.

## 5. 공개 서비스 확장 시 권장 사항

현재 구조는 포트폴리오와 소규모 공개 테스트에 적합합니다. 방문자가 많아질 경우 직접 익명 INSERT 대신 Supabase Edge Function을 거치도록 변경하고 다음 기능을 추가하는 것이 좋습니다.

- 요청 횟수 제한
- CAPTCHA 또는 Turnstile
- 비정상적으로 짧은 기록 검증
- 금칙어 및 닉네임 필터
- 신고 및 관리자 숨김 기능
- 노선별·일간·주간 랭킹 집계
