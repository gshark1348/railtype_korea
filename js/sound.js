(() => {
  "use strict";

  const STORAGE_KEY = "railtype.interfaceSound.enabled.v2";
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const AudioClass = window.Audio;
  const AUDIO_FILES = {
    key: "./assets/audio/key-soft.wav",
    click: "./assets/audio/click-soft.wav"
  };
  const ignoredKeys = new Set([
    "Shift", "Control", "Alt", "Meta", "CapsLock", "Escape",
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End",
    "PageUp", "PageDown", "Insert", "F1", "F2", "F3", "F4", "F5", "F6",
    "F7", "F8", "F9", "F10", "F11", "F12"
  ]);

  let enabled = readPreference();
  let context = null;
  let masterGain = null;
  let noiseBuffer = null;
  let lastKeyAt = 0;
  let initialized = false;
  let filePools = { key: [], click: [] };
  let filePoolIndex = { key: 0, click: 0 };

  function readPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "false";
    } catch (_error) {
      return true;
    }
  }

  function savePreference() {
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch (_error) {
      // Private browsing or restricted storage must not block the sound control.
    }
  }

  function ensureContext() {
    if (!enabled || !AudioContextClass) return null;
    try {
      if (!context) {
        context = new AudioContextClass();
        masterGain = context.createGain();
        masterGain.gain.value = 0.7;
        masterGain.connect(context.destination);
        noiseBuffer = createNoiseBuffer(context);
      }
      if (context.state === "suspended") context.resume().catch(() => {});
      return context;
    } catch (_error) {
      return null;
    }
  }

  function createFilePool(kind, size = 5) {
    if (!AudioClass) return [];
    return Array.from({ length: size }, () => {
      const audio = new AudioClass(AUDIO_FILES[kind]);
      audio.preload = "auto";
      audio.volume = kind === "key" ? 0.55 : 0.58;
      audio.load?.();
      return audio;
    });
  }

  function playFile(kind, fallback) {
    const pool = filePools[kind];
    if (!pool?.length) return false;
    const index = filePoolIndex[kind] % pool.length;
    filePoolIndex[kind] += 1;
    const audio = pool[index];
    try {
      audio.pause?.();
      audio.currentTime = 0;
      audio.playbackRate = kind === "key" ? 0.97 + Math.random() * 0.07 : 1;
      const playback = audio.play();
      playback?.catch?.(() => fallback());
      return true;
    } catch (_error) {
      return false;
    }
  }

  function createNoiseBuffer(audioContext) {
    const length = Math.max(1, Math.floor(audioContext.sampleRate * 0.035));
    const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      const fade = 1 - index / length;
      data[index] = (Math.random() * 2 - 1) * fade;
    }
    return buffer;
  }

  function envelope(node, now, peak, duration) {
    node.gain.cancelScheduledValues(now);
    node.gain.setValueAtTime(0.0001, now);
    node.gain.exponentialRampToValueAtTime(peak, now + 0.003);
    node.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  }

  function playTap({ frequency, noiseFrequency, peak, duration }) {
    const audioContext = ensureContext();
    if (!audioContext || !masterGain) return;

    const now = audioContext.currentTime;
    const tone = audioContext.createOscillator();
    const toneGain = audioContext.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(frequency, now);
    tone.frequency.exponentialRampToValueAtTime(frequency * 0.72, now + duration);
    envelope(toneGain, now, peak, duration);
    tone.connect(toneGain).connect(masterGain);
    tone.start(now);
    tone.stop(now + duration + 0.01);

    if (noiseBuffer) {
      const noise = audioContext.createBufferSource();
      const filter = audioContext.createBiquadFilter();
      const noiseGain = audioContext.createGain();
      noise.buffer = noiseBuffer;
      filter.type = "bandpass";
      filter.frequency.value = noiseFrequency;
      filter.Q.value = 0.75;
      envelope(noiseGain, now, peak * 0.34, duration * 0.72);
      noise.connect(filter).connect(noiseGain).connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);
    }
  }

  function playKey() {
    const now = performance.now();
    if (!enabled || now - lastKeyAt < 24) return;
    lastKeyAt = now;
    ensureContext();
    const fallback = () => playTap({
      frequency: 168 + Math.random() * 18,
      noiseFrequency: 1050 + Math.random() * 160,
      peak: 0.07,
      duration: 0.052
    });
    if (!playFile("key", fallback)) fallback();
  }

  function playClick() {
    if (!enabled) return;
    ensureContext();
    const fallback = () => playTap({ frequency: 126, noiseFrequency: 760, peak: 0.06, duration: 0.065 });
    if (!playFile("click", fallback)) fallback();
  }

  function isEditableTarget(target) {
    return target instanceof HTMLElement && (
      target.matches("input:not([type]), input[type='text'], input[type='search'], input[type='email'], input[type='url'], input[type='password'], textarea") ||
      target.isContentEditable
    );
  }

  function isInteractiveTarget(target) {
    return target instanceof Element && Boolean(
      target.closest("button:not(:disabled), a[href], select:not(:disabled), input[type='checkbox']:not(:disabled), input[type='radio']:not(:disabled), [role='button']:not([aria-disabled='true'])")
    );
  }

  function updateToggle() {
    const button = document.getElementById("soundToggleButton");
    if (!button) return;
    const label = enabled ? "인터페이스 소리 끄기" : "인터페이스 소리 켜기";
    button.setAttribute("aria-pressed", String(enabled));
    button.setAttribute("aria-label", label);
    button.title = label;
    const icon = button.querySelector("[data-sound-icon]");
    const status = button.querySelector("[data-sound-label]");
    if (icon) icon.textContent = enabled ? "🔊" : "🔇";
    if (status) status.textContent = enabled ? "ON" : "OFF";
  }

  function setEnabled(nextEnabled) {
    const wasEnabled = enabled;
    if (wasEnabled && !nextEnabled) playClick();
    enabled = Boolean(nextEnabled);
    savePreference();
    updateToggle();
    if (!wasEnabled && enabled) playClick();
    window.dispatchEvent(new CustomEvent("railtype:soundchange", { detail: { enabled } }));
  }

  function init() {
    if (initialized) return;
    initialized = true;
    filePools = {
      key: createFilePool("key"),
      click: createFilePool("click")
    };
    updateToggle();

    document.getElementById("soundToggleButton")?.addEventListener("click", () => setEnabled(!enabled));

    document.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("#soundToggleButton")) return;
      if (isInteractiveTarget(event.target)) playClick();
    });

    document.addEventListener("keydown", (event) => {
      if (!isEditableTarget(event.target) || event.ctrlKey || event.altKey || event.metaKey) return;
      // Korean IME often reports the physical key as Process while composition is active.
      // Keep one softly throttled tap per physical key instead of waiting for compositionend.
      if (event.isComposing) {
        playKey();
        return;
      }
      if (ignoredKeys.has(event.key)) return;
      if (event.key.length === 1 || ["Backspace", "Delete", "Enter", "Tab"].includes(event.key)) playKey();
    });
  }

  window.RAILTYPE_SOUND = {
    init,
    playKey,
    playClick,
    isEnabled: () => enabled,
    setEnabled
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
