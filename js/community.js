(() => {
  "use strict";

  const config = {
    enabled: false,
    supabaseUrl: "",
    anonKey: "",
    table: "public_runs",
    maxRecords: 36,
    leaderboardPerLine: 8,
    ...(window.RAILTYPE_COMMUNITY_CONFIG || {})
  };

  const STORAGE = {
    nickname: "railtype.community.nickname.v1",
    localFeed: "railtype.community.local-feed.v1"
  };

  const state = {
    recentRecords: [],
    bestByLine: {},
    mode: "recent",
    selectedLine: 1,
    loading: false,
    source: "demo"
  };

  const DEMO_RECORDS = [
    { id: "demo-0", nickname: "경인선기록자", line: 1, course_name: "경인선", direction_name: "인천행", route_name: "소요산 → 인천", duration_ms: 346530, accuracy: 98.9, errors: 1, completed_at: minutesAgo(2) },
    { id: "demo-1", nickname: "한강러너", line: 9, course_name: "일반", direction_name: "중앙보훈병원행", route_name: "개화 → 중앙보훈병원", duration_ms: 178420, accuracy: 98.6, errors: 1, completed_at: minutesAgo(4) },
    { id: "demo-2", nickname: "환승요정", line: 2, course_name: "순환 본선", direction_name: "내선순환", route_name: "시청 → 시청", duration_ms: 256810, accuracy: 97.9, errors: 2, completed_at: minutesAgo(11) },
    { id: "demo-3", nickname: "일산탐험가", line: 3, course_name: "본선", direction_name: "오금행", route_name: "대화 → 오금", duration_ms: 221370, accuracy: 99.3, errors: 1, completed_at: minutesAgo(19) },
    { id: "demo-4", nickname: "성수산책자", line: 5, course_name: "하남선", direction_name: "하남검단산행", route_name: "방화 → 하남검단산", duration_ms: 284930, accuracy: 96.8, errors: 3, completed_at: minutesAgo(31) },
    { id: "demo-5", nickname: "노선수집가", line: 8, course_name: "별내선", direction_name: "모란행", route_name: "별내 → 모란", duration_ms: 139240, accuracy: 100, errors: 0, completed_at: minutesAgo(47) },
    { id: "demo-6", nickname: "막차직전", line: 4, course_name: "안산선", direction_name: "오이도행", route_name: "불암산 → 오이도", duration_ms: 318560, accuracy: 95.5, errors: 4, completed_at: minutesAgo(68) },
    { id: "demo-7", nickname: "서울지리왕", line: 6, course_name: "본선", direction_name: "신내행", route_name: "응암 → 신내", duration_ms: 189710, accuracy: 98.2, errors: 2, completed_at: minutesAgo(93) },
    { id: "demo-8", nickname: "오답제로", line: 7, course_name: "본선", direction_name: "석남행", route_name: "장암 → 석남", duration_ms: 301080, accuracy: 100, errors: 0, completed_at: minutesAgo(128) },
    { id: "demo-9", nickname: "급행연구원", line: 9, course_name: "급행", direction_name: "중앙보훈병원행", route_name: "김포공항 → 중앙보훈병원", duration_ms: 112850, accuracy: 99.1, errors: 1, completed_at: minutesAgo(155) },
    { id: "demo-10", nickname: "삼호선마스터", line: 3, course_name: "본선", direction_name: "대화행", route_name: "오금 → 대화", duration_ms: 215740, accuracy: 99.7, errors: 1, completed_at: minutesAgo(188) },
    { id: "demo-11", nickname: "경부선여행자", line: 10, course_name: "대표 정차축", direction_name: "부산행", route_name: "서울 → 부산", duration_ms: 84210, accuracy: 98.8, errors: 1, completed_at: minutesAgo(214) }
  ];

  function minutesAgo(minutes) {
    return new Date(Date.now() - minutes * 60 * 1000).toISOString();
  }

  function getLineNumbers() {
    const configured = Object.keys(window.METRO_LINES || {})
      .map(Number)
      .filter((line) => Number.isInteger(line) && line >= 1)
      .sort((a, b) => a - b);
    return configured.length ? configured : [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  function getLineMeta(line) {
    const config = window.METRO_LINES?.[line] || {};
    return {
      symbol: String(config.number ?? line),
      name: String(config.name || `${line}호선`),
      code: String(config.code || `LINE ${String(line).padStart(2, "0")}`),
      color: config.color || "#5d5a54"
    };
  }

  function isLiveConfigured() {
    return Boolean(
      config.enabled
      && /^https:\/\/.+\.supabase\.co\/?$/i.test(String(config.supabaseUrl || "").trim())
      && String(config.anonKey || "").trim().length > 20
      && /^[a-zA-Z0-9_]+$/.test(String(config.table || ""))
    );
  }

  function endpoint(query = "") {
    const base = String(config.supabaseUrl).replace(/\/$/, "");
    return `${base}/rest/v1/${config.table}${query}`;
  }

  function headers(extra = {}) {
    return {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      "Content-Type": "application/json",
      ...extra
    };
  }

  function getNickname() {
    const stored = localStorage.getItem(STORAGE.nickname);
    if (stored) return sanitizeNickname(stored);
    const adjectives = ["노선", "환승", "한강", "골목", "막차", "서울", "지리", "철도"];
    const nouns = ["탐험가", "수집가", "여행자", "러너", "산책자", "기록자"];
    const generated = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(10 + Math.random() * 90)}`;
    localStorage.setItem(STORAGE.nickname, generated);
    return generated;
  }

  function sanitizeNickname(value) {
    return String(value || "")
      .replace(/[<>"'`]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 16) || "익명 여행자";
  }

  function saveNickname(value) {
    const nickname = sanitizeNickname(value);
    localStorage.setItem(STORAGE.nickname, nickname);
    const input = document.getElementById("communityNickname");
    if (input) input.value = nickname;
    showStatus(`닉네임을 ‘${nickname}’으로 저장했습니다.`);
  }

  async function init() {
    const panel = document.getElementById("communityPanel");
    if (!panel) return;

    const availableLines = getLineNumbers();
    if (!availableLines.includes(state.selectedLine)) state.selectedLine = availableLines[0];

    document.getElementById("communityNickname").value = getNickname();
    document.getElementById("saveCommunityNickname").addEventListener("click", () => {
      saveNickname(document.getElementById("communityNickname").value);
    });
    document.getElementById("communityNickname").addEventListener("keydown", (event) => {
      if (event.key === "Enter") saveNickname(event.currentTarget.value);
    });
    document.getElementById("refreshCommunityButton").addEventListener("click", refresh);
    document.querySelectorAll("[data-community-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        state.mode = button.dataset.communityMode;
        document.querySelectorAll("[data-community-mode]").forEach((item) => item.classList.toggle("is-active", item === button));
        render();
      });
    });

    renderLineFilters();
    await refresh();
  }

  async function refresh() {
    if (state.loading) return;
    state.loading = true;
    setLoading(true);

    if (isLiveConfigured()) {
      try {
        const max = Math.min(100, Math.max(8, Number(config.maxRecords) || 36));
        const perLine = Math.min(20, Math.max(3, Number(config.leaderboardPerLine) || 8));
        const select = "id,nickname,line,course_name,direction_name,route_name,duration_ms,accuracy,errors,completed_at";
        const recentResponse = await fetch(endpoint(`?select=${select}&order=completed_at.desc&limit=${max}`), {
          headers: headers({ Prefer: "count=exact" }),
          cache: "no-store"
        });
        if (!recentResponse.ok) throw new Error(`Community fetch failed: ${recentResponse.status}`);
        const recent = await recentResponse.json();
        state.recentRecords = Array.isArray(recent) ? recent.map(normalizeRecord).filter(Boolean) : [];

        const lineNumbers = getLineNumbers();
        const leaderboardResults = await Promise.allSettled(lineNumbers.map(async (line) => {
          const query = `?select=${select}&line=eq.${line}&order=duration_ms.asc,accuracy.desc,errors.asc,completed_at.asc&limit=${perLine}`;
          const response = await fetch(endpoint(query), { headers: headers(), cache: "no-store" });
          if (!response.ok) throw new Error(`Line ${line} leaderboard fetch failed: ${response.status}`);
          const rows = await response.json();
          return [line, Array.isArray(rows) ? rows.map(normalizeRecord).filter(Boolean) : []];
        }));

        state.bestByLine = {};
        leaderboardResults.forEach((result, index) => {
          const line = lineNumbers[index];
          state.bestByLine[line] = result.status === "fulfilled"
            ? sortBest(result.value[1]).slice(0, perLine)
            : sortBest(state.recentRecords.filter((record) => record.line === line)).slice(0, perLine);
        });
        state.source = "live";
      } catch (error) {
        console.warn(error);
        applyFallbackRecords();
        state.source = "offline";
      }
    } else {
      applyFallbackRecords();
      state.source = "demo";
    }

    state.loading = false;
    setLoading(false);
    render();
  }

  function getFallbackPool() {
    let local = [];
    try { local = JSON.parse(localStorage.getItem(STORAGE.localFeed)) || []; }
    catch { local = []; }
    return [...local.map(normalizeRecord).filter(Boolean), ...DEMO_RECORDS.map(normalizeRecord).filter(Boolean)];
  }

  function applyFallbackRecords() {
    const pool = getFallbackPool();
    const max = Number(config.maxRecords) || 36;
    const perLine = Number(config.leaderboardPerLine) || 8;
    state.recentRecords = [...pool]
      .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
      .slice(0, max);
    state.bestByLine = {};
    getLineNumbers().forEach((line) => {
      state.bestByLine[line] = sortBest(pool.filter((record) => record.line === line)).slice(0, perLine);
    });
  }

  function sortBest(records) {
    return [...records].sort((a, b) => (
      a.duration_ms - b.duration_ms
      || b.accuracy - a.accuracy
      || a.errors - b.errors
      || new Date(a.completed_at) - new Date(b.completed_at)
    ));
  }

  function normalizeRecord(record) {
    if (!record) return null;
    const line = Number(record.line);
    const duration = Number(record.duration_ms);
    const accuracy = Number(record.accuracy);
    if (!Number.isFinite(line) || !Number.isFinite(duration) || duration <= 0 || !Number.isFinite(accuracy)) return null;
    return {
      id: String(record.id || record.client_run_id || `${line}-${duration}-${record.completed_at || Date.now()}`),
      nickname: sanitizeNickname(record.nickname),
      line,
      course_name: String(record.course_name || "본선").slice(0, 40),
      direction_name: String(record.direction_name || "완주").slice(0, 40),
      route_name: String(record.route_name || "노선 완주").slice(0, 80),
      duration_ms: Math.max(100, Math.round(duration)),
      accuracy: Math.max(0, Math.min(100, accuracy)),
      errors: Math.max(0, Math.round(Number(record.errors) || 0)),
      completed_at: record.completed_at || new Date().toISOString()
    };
  }

  async function publish(result) {
    if (!result) return;
    const record = normalizeRecord({
      id: result.id,
      nickname: getNickname(),
      line: result.line,
      course_name: result.courseName,
      direction_name: result.directionName,
      route_name: result.routeName,
      duration_ms: result.durationMs,
      accuracy: result.accuracy,
      errors: result.errors,
      completed_at: result.date
    });
    if (!record) return;

    if (isLiveConfigured()) {
      const payload = {
        client_run_id: String(result.id || `${Date.now()}-${Math.random()}`).slice(0, 80),
        nickname: record.nickname,
        line: record.line,
        course_name: record.course_name,
        direction_name: record.direction_name,
        route_name: record.route_name,
        duration_ms: record.duration_ms,
        accuracy: Number(record.accuracy.toFixed(2)),
        errors: record.errors,
        completed_at: record.completed_at
      };
      try {
        const response = await fetch(endpoint("?on_conflict=client_run_id"), {
          method: "POST",
          headers: headers({ Prefer: "resolution=ignore-duplicates,return=minimal" }),
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Community publish failed: ${response.status}`);
        state.selectedLine = record.line;
        showStatus(`${getLineMeta(record.line).name} 완주 기록이 커뮤니티 기록판에 등록되었습니다.`);
        await refresh();
        return;
      } catch (error) {
        console.warn(error);
        saveLocalRecord(record);
        state.selectedLine = record.line;
        applyFallbackRecords();
        state.source = "offline";
        render();
        showStatus("네트워크 문제로 기록을 이 브라우저에 임시 저장했습니다.");
        return;
      }
    }

    saveLocalRecord(record);
    state.selectedLine = record.line;
    applyFallbackRecords();
    render();
  }

  function saveLocalRecord(record) {
    let records = [];
    try { records = JSON.parse(localStorage.getItem(STORAGE.localFeed)) || []; }
    catch { records = []; }
    records = [record, ...records.filter((item) => item.id !== record.id)].slice(0, 20);
    localStorage.setItem(STORAGE.localFeed, JSON.stringify(records));
  }

  function renderLineFilters() {
    const container = document.getElementById("communityLineFilter");
    if (!container) return;
    const lineNumbers = getLineNumbers();
    container.innerHTML = lineNumbers.map((line) => {
      const meta = getLineMeta(line);
      const color = meta.color;
      const selected = line === state.selectedLine;
      return `
        <button type="button" data-community-line="${line}" class="${selected ? "is-active" : ""}" aria-pressed="${selected}" style="--filter-line:${escapeHtml(color)}">
          <i>${escapeHtml(meta.symbol)}</i><span>${escapeHtml(meta.name)}</span>
        </button>`;
    }).join("");
    container.querySelectorAll("[data-community-line]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedLine = Number(button.dataset.communityLine);
        render();
      });
    });
  }

  function render() {
    const list = document.getElementById("communityRecordList");
    if (!list) return;

    const sourceBadge = document.getElementById("communitySourceBadge");
    const sourceText = document.getElementById("communitySourceText");
    const live = state.source === "live";
    sourceBadge.className = `community-source-badge is-${state.source}`;
    sourceBadge.textContent = live ? "LIVE" : state.source === "offline" ? "OFFLINE" : "PREVIEW";
    sourceText.textContent = live
      ? "다른 사용자가 완주하면 이 기록판에 반영됩니다. 최고 기록은 같은 노선 안에서만 비교합니다."
      : state.source === "offline"
        ? "공유 서버에 연결하지 못해 브라우저 저장 기록과 미리보기를 표시합니다. 최고 기록은 노선별로 분리됩니다."
        : "Supabase 연결 전 화면 구성을 확인할 수 있는 미리보기입니다. 최고 기록은 노선별로 분리됩니다.";

    const lineFilter = document.getElementById("communityLineFilter");
    const rankingNote = document.getElementById("communityRankingNote");
    const isBest = state.mode === "best";
    if (lineFilter) lineFilter.hidden = !isBest;
    if (rankingNote) rankingNote.hidden = !isBest;
    renderLineFilters();

    const records = isBest
      ? sortBest(state.bestByLine[state.selectedLine] || [])
      : [...state.recentRecords].sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));
    const visible = records.slice(0, 8);

    updateSummary(records, isBest);

    if (!visible.length) {
      const emptyTitle = isBest ? `${getLineMeta(state.selectedLine).name}의 첫 기록을 기다리는 중` : "첫 기록을 기다리는 중";
      list.innerHTML = `<div class="community-empty"><strong>${emptyTitle}</strong><span>해당 노선을 완주하면 이곳에 기록이 나타납니다.</span></div>`;
      return;
    }

    list.innerHTML = visible.map((record, index) => {
      const lineMeta = getLineMeta(record.line);
      const color = lineMeta.color;
      const rank = isBest ? `<span class="community-rank">${String(index + 1).padStart(2, "0")}</span>` : "";
      return `
        <article class="community-record">
          ${rank}
          <i class="community-line-badge" style="--record-line:${escapeHtml(color)}">${escapeHtml(lineMeta.symbol)}</i>
          <div class="community-record-copy">
            <div><strong>${escapeHtml(record.nickname)}</strong><span>${escapeHtml(relativeTime(record.completed_at))}</span></div>
            <p>${escapeHtml(`${lineMeta.name} · ${record.course_name} · ${record.direction_name}`)}</p>
            <small>${escapeHtml(record.route_name)}</small>
          </div>
          <div class="community-record-score">
            <strong>${formatTime(record.duration_ms)}</strong>
            <span>${record.accuracy.toFixed(1)}% · ${record.errors}오답</span>
          </div>
        </article>`;
    }).join("");
  }

  function updateSummary(records, isBest) {
    const uniqueUsers = new Set(records.map((item) => item.nickname)).size;
    const fastest = records.length ? Math.min(...records.map((item) => item.duration_ms)) : null;
    const avgAccuracy = records.length ? records.reduce((sum, item) => sum + item.accuracy, 0) / records.length : null;
    const activeLines = new Set(records.map((item) => item.line)).size;
    const thirdLabel = document.getElementById("communityFastestLabel");

    document.getElementById("communityRunCount").textContent = String(records.length);
    document.getElementById("communityUserCount").textContent = String(uniqueUsers);
    if (isBest) {
      if (thirdLabel) thirdLabel.textContent = `${getLineMeta(state.selectedLine).code} BEST`;
      document.getElementById("communityFastest").textContent = fastest ? formatTime(fastest) : "—";
    } else {
      if (thirdLabel) thirdLabel.textContent = "ACTIVE LINES";
      document.getElementById("communityFastest").textContent = String(activeLines);
    }
    document.getElementById("communityAverageAccuracy").textContent = avgAccuracy == null ? "—" : `${avgAccuracy.toFixed(1)}%`;
  }

  function setLoading(isLoading) {
    const button = document.getElementById("refreshCommunityButton");
    const list = document.getElementById("communityRecordList");
    if (button) {
      button.disabled = isLoading;
      button.classList.toggle("is-loading", isLoading);
      button.textContent = isLoading ? "불러오는 중" : "새로고침";
    }
    if (list && isLoading && !state.recentRecords.length) {
      list.innerHTML = `<div class="community-empty"><strong>기록을 불러오는 중</strong><span>철도망의 최근 움직임을 확인하고 있습니다.</span></div>`;
    }
  }

  function showStatus(message) {
    const status = document.getElementById("communityStatus");
    if (!status) return;
    status.textContent = message;
    status.classList.add("is-visible");
    clearTimeout(showStatus.timer);
    showStatus.timer = setTimeout(() => status.classList.remove("is-visible"), 2600);
  }

  function formatTime(ms) {
    const seconds = Math.max(0, Number(ms) || 0) / 1000;
    const minutes = Math.floor(seconds / 60);
    const remain = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10);
    return `${String(minutes).padStart(2, "0")}:${String(remain).padStart(2, "0")}.${tenths}`;
  }

  function relativeTime(value) {
    const time = new Date(value).getTime();
    if (!Number.isFinite(time)) return "방금 전";
    const seconds = Math.max(0, Math.floor((Date.now() - time) / 1000));
    if (seconds < 60) return "방금 전";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}일 전`;
    return new Date(value).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" });
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  window.RAILTYPE_COMMUNITY = { init, refresh, publish, getNickname };
})();
