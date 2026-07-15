(() => {
  "use strict";

  const config = {
    enabled: false,
    supabaseUrl: "",
    anonKey: "",
    table: "public_runs",
    maxRecords: 36,
    ...(window.RAILTYPE_COMMUNITY_CONFIG || {})
  };

  const STORAGE = {
    nickname: "railtype.community.nickname.v1",
    localFeed: "railtype.community.local-feed.v1"
  };

  const state = {
    records: [],
    mode: "recent",
    loading: false,
    source: "demo"
  };

  const DEMO_RECORDS = [
    { id: "demo-1", nickname: "한강러너", line: 9, course_name: "일반", direction_name: "중앙보훈병원행", route_name: "개화 → 중앙보훈병원", duration_ms: 178420, accuracy: 98.6, errors: 1, completed_at: minutesAgo(4) },
    { id: "demo-2", nickname: "환승요정", line: 2, course_name: "순환 본선", direction_name: "내선순환", route_name: "시청 → 시청", duration_ms: 256810, accuracy: 97.9, errors: 2, completed_at: minutesAgo(11) },
    { id: "demo-3", nickname: "일산탐험가", line: 3, course_name: "본선", direction_name: "오금행", route_name: "대화 → 오금", duration_ms: 221370, accuracy: 99.3, errors: 1, completed_at: minutesAgo(19) },
    { id: "demo-4", nickname: "성수산책자", line: 5, course_name: "하남선", direction_name: "하남검단산행", route_name: "방화 → 하남검단산", duration_ms: 284930, accuracy: 96.8, errors: 3, completed_at: minutesAgo(31) },
    { id: "demo-5", nickname: "노선수집가", line: 8, course_name: "별내선", direction_name: "모란행", route_name: "별내 → 모란", duration_ms: 139240, accuracy: 100, errors: 0, completed_at: minutesAgo(47) },
    { id: "demo-6", nickname: "막차직전", line: 4, course_name: "안산선", direction_name: "오이도행", route_name: "불암산 → 오이도", duration_ms: 318560, accuracy: 95.5, errors: 4, completed_at: minutesAgo(68) },
    { id: "demo-7", nickname: "서울지리왕", line: 6, course_name: "본선", direction_name: "신내행", route_name: "응암 → 신내", duration_ms: 189710, accuracy: 98.2, errors: 2, completed_at: minutesAgo(93) },
    { id: "demo-8", nickname: "오답제로", line: 7, course_name: "본선", direction_name: "석남행", route_name: "장암 → 석남", duration_ms: 301080, accuracy: 100, errors: 0, completed_at: minutesAgo(128) }
  ];

  function minutesAgo(minutes) {
    return new Date(Date.now() - minutes * 60 * 1000).toISOString();
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

    await refresh();
  }

  async function refresh() {
    if (state.loading) return;
    state.loading = true;
    setLoading(true);

    if (isLiveConfigured()) {
      try {
        const max = Math.min(100, Math.max(8, Number(config.maxRecords) || 36));
        const query = `?select=id,nickname,line,course_name,direction_name,route_name,duration_ms,accuracy,errors,completed_at&order=completed_at.desc&limit=${max}`;
        const response = await fetch(endpoint(query), {
          headers: headers({ Prefer: "count=exact" }),
          cache: "no-store"
        });
        if (!response.ok) throw new Error(`Community fetch failed: ${response.status}`);
        const records = await response.json();
        state.records = Array.isArray(records) ? records.map(normalizeRecord).filter(Boolean) : [];
        state.source = "live";
      } catch (error) {
        console.warn(error);
        state.records = getFallbackRecords();
        state.source = "offline";
      }
    } else {
      state.records = getFallbackRecords();
      state.source = "demo";
    }

    state.loading = false;
    setLoading(false);
    render();
  }

  function getFallbackRecords() {
    let local = [];
    try { local = JSON.parse(localStorage.getItem(STORAGE.localFeed)) || []; }
    catch { local = []; }
    return [...local.map(normalizeRecord).filter(Boolean), ...DEMO_RECORDS]
      .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
      .slice(0, Number(config.maxRecords) || 36);
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
        showStatus("완주 기록이 커뮤니티 기록판에 등록되었습니다.");
        await refresh();
        return;
      } catch (error) {
        console.warn(error);
        saveLocalRecord(record);
        state.source = "offline";
        state.records = getFallbackRecords();
        render();
        showStatus("네트워크 문제로 기록을 이 브라우저에 임시 저장했습니다.");
        return;
      }
    }

    saveLocalRecord(record);
    state.records = getFallbackRecords();
    render();
  }

  function saveLocalRecord(record) {
    let records = [];
    try { records = JSON.parse(localStorage.getItem(STORAGE.localFeed)) || []; }
    catch { records = []; }
    records = [record, ...records.filter((item) => item.id !== record.id)].slice(0, 20);
    localStorage.setItem(STORAGE.localFeed, JSON.stringify(records));
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
      ? "다른 사용자가 완주하면 이 기록판에 반영됩니다."
      : state.source === "offline"
        ? "공유 서버에 연결하지 못해 브라우저 저장 기록과 미리보기를 표시합니다."
        : "Supabase 연결 전 화면 구성을 확인할 수 있는 미리보기 기록입니다.";

    const records = [...state.records];
    const sorted = state.mode === "best"
      ? records.sort((a, b) => a.duration_ms - b.duration_ms || b.accuracy - a.accuracy)
      : records.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));
    const visible = sorted.slice(0, 8);

    updateSummary(records);

    if (!visible.length) {
      list.innerHTML = `<div class="community-empty"><strong>첫 기록을 기다리는 중</strong><span>노선을 완주하면 이곳에 기록이 나타납니다.</span></div>`;
      return;
    }

    list.innerHTML = visible.map((record, index) => {
      const lineConfig = window.METRO_LINES?.[record.line];
      const color = lineConfig?.color || "#5d5a54";
      const rank = state.mode === "best" ? `<span class="community-rank">${String(index + 1).padStart(2, "0")}</span>` : "";
      return `
        <article class="community-record">
          ${rank}
          <i class="community-line-badge" style="--record-line:${escapeHtml(color)}">${record.line}</i>
          <div class="community-record-copy">
            <div><strong>${escapeHtml(record.nickname)}</strong><span>${escapeHtml(relativeTime(record.completed_at))}</span></div>
            <p>${escapeHtml(`${record.line}호선 · ${record.direction_name}`)}</p>
            <small>${escapeHtml(record.route_name)}</small>
          </div>
          <div class="community-record-score">
            <strong>${formatTime(record.duration_ms)}</strong>
            <span>${record.accuracy.toFixed(1)}% · ${record.errors}오답</span>
          </div>
        </article>`;
    }).join("");
  }

  function updateSummary(records) {
    const uniqueUsers = new Set(records.map((item) => item.nickname)).size;
    const fastest = records.length ? Math.min(...records.map((item) => item.duration_ms)) : null;
    const avgAccuracy = records.length ? records.reduce((sum, item) => sum + item.accuracy, 0) / records.length : null;
    document.getElementById("communityRunCount").textContent = String(records.length);
    document.getElementById("communityUserCount").textContent = String(uniqueUsers);
    document.getElementById("communityFastest").textContent = fastest ? formatTime(fastest) : "—";
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
    if (list && isLoading && !state.records.length) {
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
