(() => {
  "use strict";

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  // UI elements
  const hudEl = document.getElementById("hud");
  const telemetryEl = document.getElementById("telemetry");
  const telCoordsEl = document.getElementById("tel-coords");
  const telSkinEl = document.getElementById("tel-skin");
  const telProgressEl = document.getElementById("tel-progress");

  const scoreEl = document.getElementById("score-val");
  const bestEl = document.getElementById("best-val");
  const waveEl = document.getElementById("wave-val");
  const overdriveTagEl = document.getElementById("overdrive-tag");
  const shieldTagEl = document.getElementById("shield-tag");
  const bossTagEl = document.getElementById("boss-tag");
  const comboBadgeEl = document.getElementById("combo-badge");
  const comboValEl = document.getElementById("combo-val");
  const comboBarFillEl = document.getElementById("combo-bar-fill");
  const chainBadgeEl = document.getElementById("chain-badge");
  const chainValEl = document.getElementById("chain-val");
  const chainBarFillEl = document.getElementById("chain-bar-fill");
  const dashPipsEl = document.getElementById("dash-pips");
  const perkStripEl = document.getElementById("perk-strip");

  const startOverlay = document.getElementById("start-overlay");
  const perkOverlay = document.getElementById("perk-overlay");
  const pauseOverlay = document.getElementById("pause-overlay");
  const settingsOverlay = document.getElementById("settings-overlay");
  const gameoverOverlay = document.getElementById("gameover-overlay");
  const roomOverlay = document.getElementById("room-overlay");
  const duelOverOverlay = document.getElementById("duel-over-overlay");

  // 1v1 Online Private Room & Duel HUD DOM refs
  const openRoomBtn = document.getElementById("open-room-btn");
  const closeRoomBtn = document.getElementById("close-room-btn");
  const netStatusPill = document.getElementById("net-status-pill");
  const roomConnectView = document.getElementById("room-connect-view");
  const roomLobbyView = document.getElementById("room-lobby-view");
  const callsignInput = document.getElementById("callsign-input");
  const serverUrlInput = document.getElementById("server-url-input");
  const createRoomBtn = document.getElementById("create-room-btn");
  const joinCodeInput = document.getElementById("join-code-input");
  const joinRoomBtn = document.getElementById("join-room-btn");
  const roomErrorEl = document.getElementById("room-error");
  const lobbyCodeVal = document.getElementById("lobby-code-val");
  const copyLinkBtn = document.getElementById("copy-link-btn");
  const leaveRoomBtn = document.getElementById("leave-room-btn");
  const slotHostName = document.getElementById("slot-host-name");
  const slotHostMeta = document.getElementById("slot-host-meta");
  const slotGuestName = document.getElementById("slot-guest-name");
  const slotGuestMeta = document.getElementById("slot-guest-meta");
  const roomModeSeg = document.getElementById("room-mode-seg");
  const roomHazardsSeg = document.getElementById("room-hazards-seg");
  const lobbyReadyBtn = document.getElementById("lobby-ready-btn");
  const lobbyStartBtn = document.getElementById("lobby-start-btn");

  const duelHudEl = document.getElementById("duel-hud");
  const duelP1Name = document.getElementById("duel-p1-name");
  const duelP1Score = document.getElementById("duel-p1-score");
  const duelP1Shield = document.getElementById("duel-p1-shield");
  const duelP2Name = document.getElementById("duel-p2-name");
  const duelP2Score = document.getElementById("duel-p2-score");
  const duelP2Shield = document.getElementById("duel-p2-shield");
  const duelModeLabel = document.getElementById("duel-mode-label");
  const duelTimerEl = document.getElementById("duel-timer");
  const duelPingEl = document.getElementById("duel-ping");
  const duelLeaveBtn = document.getElementById("duel-leave-btn");

  const duelOverMode = document.getElementById("duel-over-mode");
  const duelOverSub = document.getElementById("duel-over-sub");
  const duelOverTitle = document.getElementById("duel-over-title");
  const duelResP1Name = document.getElementById("duel-res-p1-name");
  const duelResP1Val = document.getElementById("duel-res-p1-val");
  const duelResP2Name = document.getElementById("duel-res-p2-name");
  const duelResP2Val = document.getElementById("duel-res-p2-val");
  const duelResClashes = document.getElementById("duel-res-clashes");
  const duelRematchBtn = document.getElementById("duel-rematch-btn");
  const duelLobbyBtn = document.getElementById("duel-lobby-btn");

  const openSettingsBtn = document.getElementById("open-settings-btn");
  const pauseSettingsBtn = document.getElementById("pause-settings-btn");
  const hudSettingsBtn = document.getElementById("hud-settings-btn");
  const closeSettingsBtn = document.getElementById("close-settings-btn");
  const volumeSlider = document.getElementById("volume-slider");
  const volReadout = document.getElementById("vol-readout");
  const descDifficulty = document.getElementById("desc-difficulty");
  const resetSettingsBtn = document.getElementById("reset-settings-btn");
  const wipeSaveBtn = document.getElementById("wipe-save-btn");

  const posterEditionStamp = document.getElementById("poster-edition-stamp");
  const startBestInline = document.getElementById("start-best-inline");
  const asciiPreviewEl = document.getElementById("ascii-preview");
  const asciiCaptionEl = document.getElementById("ascii-caption");
  const paletteGridEl = document.getElementById("palette-grid");
  const paletteNameLabel = document.getElementById("palette-name-label");
  const skinGridEl = document.getElementById("skin-grid");
  const skinStatusLabel = document.getElementById("skin-status-label");

  const perkWaveLabel = document.getElementById("perk-wave-label");
  const draftTitleEl = document.getElementById("draft-title");
  const draftSubEl = document.getElementById("draft-sub");
  const perkChoicesEl = document.getElementById("perk-choices");
  const pausePerksEl = document.getElementById("pause-perks");

  const newBestPill = document.getElementById("new-best-pill");
  const unlockBannerEl = document.getElementById("unlock-banner");
  const finalScoreEl = document.getElementById("final-score");
  const finalBestEl = document.getElementById("final-best");
  const finalWaveEl = document.getElementById("final-wave");
  const finalComboEl = document.getElementById("final-combo");
  const finalShatteredEl = document.getElementById("final-shattered");

  const startBtn = document.getElementById("start-btn");
  const retryBtn = document.getElementById("retry-btn");
  const resumeBtn = document.getElementById("resume-btn");
  const restartPauseBtn = document.getElementById("restart-pause-btn");
  const menuPauseBtn = document.getElementById("menu-pause-btn");
  const menuOverBtn = document.getElementById("menu-over-btn");
  const muteBtn = document.getElementById("mute-btn");
  const muteIcon = document.getElementById("mute-icon");
  const pauseBtn = document.getElementById("pause-btn");

  const SAVE_KEY = "nova_drift_swiss_v3";

  // ---------------------------------------------------------------------------
  // Editions / Palettes (Including Brutalist Industrialism)
  // ---------------------------------------------------------------------------
  const PALETTES = {
    zurich: {
      id: "zurich",
      name: "ZÜRICH",
      stamp: "FIG. 03 // SWISS INTERNATIONAL GRID",
      bg: "#f2f0ea",
      ink: "#111111",
      muted: "#7a776f",
      grid: "rgba(17,17,17,0.085)",
      cross: "rgba(17,17,17,0.22)",
      accent: "#e63222",
      secondary: "#0047ab",
      gold: "#d49400",
      warn: "#d95d00",
      alt: "#5b21b6",
      asciiMode: false,
      brutalMode: false,
    },
    brutal: {
      id: "brutal",
      name: "BRUTAL",
      stamp: "WERK-99 // BRUTALIST INDUSTRIALISM",
      bg: "#bebbb3",
      ink: "#0a0a0a",
      muted: "#3d3c38",
      grid: "rgba(10,10,10,0.16)",
      cross: "rgba(10,10,10,0.42)",
      accent: "#ff4800",
      secondary: "#1e293b",
      gold: "#ffd400",
      warn: "#b91c1c",
      alt: "#334155",
      asciiMode: false,
      brutalMode: true,
    },
    basel: {
      id: "basel",
      name: "BASEL",
      stamp: "NOIR-02 // SWISS DARK SYSTEM",
      bg: "#121212",
      ink: "#f3f1ea",
      muted: "#8c8980",
      grid: "rgba(243,241,234,0.075)",
      cross: "rgba(243,241,234,0.22)",
      accent: "#ff3b2f",
      secondary: "#00d4ff",
      gold: "#f5cc00",
      warn: "#ff8c00",
      alt: "#c084fc",
      asciiMode: false,
      brutalMode: false,
    },
    geneva: {
      id: "geneva",
      name: "GENEVA",
      stamp: "BLUEPRINT // TECHNICAL SCHEMATIC",
      bg: "#0c2d57",
      ink: "#f7f9fc",
      muted: "#8eaad0",
      grid: "rgba(247,249,252,0.10)",
      cross: "rgba(247,249,252,0.26)",
      accent: "#ff4d4d",
      secondary: "#56cfe1",
      gold: "#ffbe0b",
      warn: "#ff9f1c",
      alt: "#b8c0ff",
      asciiMode: false,
      brutalMode: false,
    },
    mono: {
      id: "mono",
      name: "ASCII-M",
      stamp: "TTY-04 // PURE MONO ASCII",
      bg: "#efece4",
      ink: "#141414",
      muted: "#65625b",
      grid: "rgba(20,20,20,0.095)",
      cross: "rgba(20,20,20,0.25)",
      accent: "#141414",
      secondary: "#141414",
      gold: "#141414",
      warn: "#141414",
      alt: "#2f2f2f",
      asciiMode: true,
      brutalMode: false,
    },
  };

  // ---------------------------------------------------------------------------
  // Pixel Matrices (7x7) for Crisp Minimalist & Brutalist Geometry
  // ---------------------------------------------------------------------------
  const PIXEL_SPRITES = {
    vector: [
      "..11...",
      "..111..",
      "111111.",
      "1122111",
      "111111.",
      "..111..",
      "..11...",
    ],
    bauhaus: [
      ".11111.",
      "1122211",
      "1222221",
      "1221221",
      "1222221",
      "1122211",
      ".11111.",
    ],
    piston: [
      "1111...",
      "12211..",
      "111111.",
      "1211211",
      "111111.",
      "12211..",
      "1111...",
    ],
    invader: [
      ".1...1.",
      "..1.1..",
      ".11111.",
      "1121211",
      "1111111",
      "1.111.1",
      "..1.1..",
    ],
    monolith: [
      "...1...",
      "..111..",
      ".11211.",
      "1122211",
      ".11211.",
      "..111..",
      "...1...",
    ],
    phantom: [
      "..1.1..",
      ".1...1.",
      "1..2..1",
      ".12221.",
      "1..2..1",
      ".1...1.",
      "..1.1..",
    ],
    seeker: [
      "11.....",
      "1111...",
      ".11111.",
      "..12111",
      ".11111.",
      "1111...",
      "11.....",
    ],
    orbiter: [
      "...1...",
      "..111..",
      ".11.11.",
      "11.2.11",
      ".11.11.",
      "..111..",
      "...1...",
    ],
    lancer: [
      "1......",
      "111....",
      "11111..",
      ".211111",
      "11111..",
      "111....",
      "1......",
    ],
    sentinel: [
      "1111111",
      "1.....1",
      "1.121.1",
      "1.222.1",
      "1.121.1",
      "1.....1",
      "1111111",
    ],
    warden: [
      "111.111",
      "1211121",
      "1112111",
      ".12221.",
      "1112111",
      "1211121",
      "111.111",
    ],
    shard: [
      "...1...",
      "...1...",
      "..121..",
      "1122211",
      "..121..",
      "...1...",
      "...1...",
    ],
  };

  // ---------------------------------------------------------------------------
  // Craft Skins (8 Total: 4 Default + 4 Unlockable Milestones)
  // ---------------------------------------------------------------------------
  const SKINS = [
    {
      id: "vector",
      code: "01",
      name: "VECTOR",
      style: "PIXEL ARROW",
      trailType: "pixels",
      ascii: ["   ██", "   ███", "██████", "██░░███", "██████", "   ███", "   ██"].join("\n"),
      unlocked: () => true,
      hint: "DEFAULT",
    },
    {
      id: "piston",
      code: "02",
      name: "PISTON",
      style: "HEAVY RAM",
      trailType: "hazard",
      ascii: ["████   ", "█░░██  ", "██████ ", "█░██░██", "██████ ", "█░░██  ", "████   "].join("\n"),
      unlocked: () => true,
      hint: "DEFAULT",
    },
    {
      id: "ascii0",
      code: "03",
      name: "ASCII-0",
      style: "PURE GLYPH",
      trailType: "ascii",
      ascii: ["  ┌───┐", "  │ > │>", "  └───┘", "  · : ;"].join("\n"),
      unlocked: () => true,
      hint: "DEFAULT",
    },
    {
      id: "bauhaus",
      code: "04",
      name: "BAUHAUS",
      style: "GEO BLOCK",
      trailType: "squares",
      ascii: [" █████ ", "██░░░██", "█░░█░░█", "██░░░██", " █████ "].join("\n"),
      unlocked: () => true,
      hint: "DEFAULT",
    },
    {
      id: "invader",
      code: "05",
      name: "BIT-08",
      style: "8-BIT SPRITE",
      trailType: "pixels",
      ascii: [" █   █ ", "  █ █  ", " █████ ", "██░█░██", "███████"].join("\n"),
      unlocked: (p) => p.totalShattered >= 10,
      hint: "SHATTER 10 FOES",
    },
    {
      id: "reticle",
      code: "06",
      name: "RETICLE",
      style: "SWISS CROSS",
      trailType: "cross",
      ascii: [" ┌─┬─┐ ", " ├─+─┤ ", " └─┴─┘ "].join("\n"),
      unlocked: (p) => p.bestWave >= 3,
      hint: "REACH WAVE 03",
    },
    {
      id: "monolith",
      code: "07",
      name: "MONOLITH",
      style: "HALFTONE",
      trailType: "halftone",
      ascii: ["   █   ", "  ███  ", " ██░██ ", "██░░░██", " ██░██ ", "  ███  ", "   █   "].join("\n"),
      unlocked: (p) => p.bestScore >= 3000,
      hint: "SCORE 3,000",
    },
    {
      id: "phantom",
      code: "08",
      name: "PHANTOM",
      style: "WIREFRAME",
      trailType: "ascii",
      ascii: ["  █ █  ", " █   █ ", "█  ░  █", " █░░░█ ", "█  ░  █"].join("\n"),
      unlocked: (p) => p.bestCombo >= 8,
      hint: "HIT x08 COMBO",
    },
  ];

  // ---------------------------------------------------------------------------
  // Modular Perks (10 Stackable Upgrades)
  // ---------------------------------------------------------------------------
  const PERKS = [
    {
      id: "overclock",
      code: "MOD-01",
      glyph: "[+»]",
      name: "OVERCLOCK",
      desc: "+1 max Dash charge and +25% dash recharge speed.",
      maxLevel: 3,
    },
    {
      id: "magnet",
      code: "MOD-02",
      glyph: "(✦)",
      name: "ATTRACTOR",
      desc: "2x Starlight pull radius and +30% shard score value.",
      maxLevel: 3,
    },
    {
      id: "aftershock",
      code: "MOD-03",
      glyph: "((#))",
      name: "AFTERSHOCK",
      desc: "Ending a Dash emits a pixel shockwave that shatters nearby foes.",
      maxLevel: 3,
    },
    {
      id: "chrono",
      code: "MOD-04",
      glyph: "[T-]",
      name: "CHRONO BRAKE",
      desc: "Shatters & close grazes slow hostile motion briefly for precision dodging.",
      maxLevel: 2,
    },
    {
      id: "aegis",
      code: "MOD-05",
      glyph: "[■]",
      name: "AEGIS SHELL",
      desc: "Absorb 1 fatal hit with a defensive blast. Recharges every wave.",
      maxLevel: 2,
    },
    {
      id: "refund",
      code: "MOD-06",
      glyph: "«↺»",
      name: "CHAIN LOOP",
      desc: "Shattering foes refunds 85% dash energy & extends combo timer.",
      maxLevel: 2,
    },
    {
      id: "drone",
      code: "MOD-07",
      glyph: "◈─○",
      name: "ORBIT DRONE",
      desc: "Deploys an orbiting satellite that intercepts foes & grabs Starlight.",
      maxLevel: 3,
    },
    {
      id: "mint",
      code: "MOD-08",
      glyph: "✦✦",
      name: "MINT PRESS",
      desc: "Higher Starlight density and faster Nova Pulse orb spawns.",
      maxLevel: 3,
    },
    {
      id: "rail",
      code: "MOD-09",
      glyph: "═══»",
      name: "RAIL ECHO",
      desc: "Each Dash fires a piercing geometric beam along your dash trajectory.",
      maxLevel: 2,
    },
    {
      id: "ram",
      code: "MOD-10",
      glyph: "[█▓]",
      name: "HEAVY RAM",
      desc: "Wider dash shatter radius and +20% bonus score on multi-shatters.",
      maxLevel: 2,
    },
  ];

  // ---------------------------------------------------------------------------
  // Settings & Persistence
  // ---------------------------------------------------------------------------
  const DEFAULT_SETTINGS = {
    difficulty: "standard",
    gameSpeed: 1,
    startWave: 1,
    inputMode: "auto",
    volume: 80,
    audioProfile: "auto",
    impactFrames: "major",    // "off" | "major" | "all"
    impactStyle: "invert",    // "invert" | "accent" | "ascii"
    impactHold: "dramatic",   // "snap" | "dramatic" | "full"
    hudMode: "full",          // "full" | "compact" | "zen"
    renderStyle: "edition",
    spriteScale: 1,           // 0.85 | 1 | 1.2
    shake: 1,
    hitstop: true,
    particles: 1,
    gridMode: "full",
    accentOverride: "auto",   // "auto" | "vermilion" | "orange" | "cobalt" | "gold" | "mono"
  };

  const ACCENT_MAP = {
    vermilion: "#e63222",
    orange: "#ff4800",
    cobalt: "#0047ab",
    gold: "#d49400",
  };

  function getAccent() {
    const ov = profile.settings.accentOverride;
    if (!ov || ov === "auto") return currentPalette.accent;
    if (ov === "mono") return currentPalette.ink;
    return ACCENT_MAP[ov] || currentPalette.accent;
  }

  function getHudInsets() {
    const top = profile.settings.hudMode === "full" ? HUD_TOP : 14;
    const bot = (profile.settings.hudMode === "full" && profile.settings.gridMode === "full") ? HUD_BOT : 14;
    return { top, bot };
  }

  const DIFFICULTY_TABLE = {
    chill: { enemySpeed: 0.82, spawnMult: 1.25, scoreMult: 0.8, label: "RELAXED · 0.80× SCORE" },
    standard: { enemySpeed: 1.0, spawnMult: 1.0, scoreMult: 1.0, label: "BALANCED · 1.00× SCORE" },
    hardcore: { enemySpeed: 1.24, spawnMult: 0.76, scoreMult: 1.35, label: "LETHAL · 1.35× SCORE" },
  };

  function getDiffConfig() {
    return DIFFICULTY_TABLE[profile.settings.difficulty] || DIFFICULTY_TABLE.standard;
  }

  function useAsciiRender() {
    if (profile.settings.renderStyle === "ascii") return true;
    if (profile.settings.renderStyle === "pixel") return false;
    return currentPalette.asciiMode;
  }

  function loadProfile() {
    const fallback = {
      bestScore: 0,
      bestWave: 1,
      bestCombo: 1,
      totalShattered: 0,
      palette: "zurich",
      skin: "vector",
      callsign: "PILOT-01",
      serverUrl: "",
      settings: { ...DEFAULT_SETTINGS },
    };
    try {
      const raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem("nova_drift_swiss_v2");
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return {
        ...fallback,
        ...parsed,
        palette: PALETTES[parsed.palette] ? parsed.palette : "zurich",
        skin: SKINS.some((s) => s.id === parsed.skin) ? parsed.skin : "vector",
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
      };
    } catch {
      return fallback;
    }
  }

  function saveProfile() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(profile));
    } catch {
      // ignore storage restrictions
    }
  }

  const profile = loadProfile();
  let currentPalette = PALETTES[profile.palette];

  // ---------------------------------------------------------------------------
  // Precision / Industrial Web Audio Synth
  // ---------------------------------------------------------------------------
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.master = null;
      this.muted = false;
      this.scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];
    }

    ensure() {
      if (this.muted || profile.settings.volume <= 0) return null;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
        this.master = this.ctx.createGain();
        this.master.connect(this.ctx.destination);
      }
      this.syncVolume();
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      return this.ctx;
    }

    out() {
      return this.master || this.ctx.destination;
    }

    syncVolume() {
      if (!this.master) return;
      const vol = this.muted ? 0 : clamp(profile.settings.volume / 100, 0, 1);
      this.master.gain.value = vol;
    }

    toggleMute() {
      this.muted = !this.muted;
      this.syncVolume();
      muteIcon.textContent = this.muted ? "SND:OFF" : "SND:ON";
    }

    isBrutal() {
      if (profile.settings.audioProfile === "brutal") return true;
      if (profile.settings.audioProfile === "chip") return false;
      return currentPalette.brutalMode;
    }

    click(pitch = 620) {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = this.isBrutal() ? "sawtooth" : "square";
      osc.frequency.setValueAtTime(this.isBrutal() ? pitch * 0.65 : pitch, now);
      gain.gain.setValueAtTime(0.055, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.045);
    }

    playPickup(comboVal) {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      const f = this.scale[Math.min(comboVal, this.scale.length - 1)] * (this.isBrutal() ? 0.8 : 1);
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = this.isBrutal() ? "sawtooth" : "square";
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.setValueAtTime(f * 1.5, now + 0.045);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.13);
    }

    playGraze() {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.05);
      gain.gain.setValueAtTime(0.055, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.065);
    }

    playDash() {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      const brutal = this.isBrutal();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = brutal ? "sawtooth" : "square";
      osc.frequency.setValueAtTime(brutal ? 240 : 340, now);
      osc.frequency.exponentialRampToValueAtTime(brutal ? 58 : 95, now + 0.12);
      gain.gain.setValueAtTime(brutal ? 0.12 : 0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.14);
    }

    playShatter(comboVal, multi = 1) {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      const brutal = this.isBrutal();
      const f = this.scale[Math.min(comboVal + multi, this.scale.length - 1)];

      const sub = c.createOscillator();
      const subG = c.createGain();
      sub.type = brutal ? "sawtooth" : "triangle";
      sub.frequency.setValueAtTime(brutal ? 130 : 165, now);
      sub.frequency.exponentialRampToValueAtTime(36, now + 0.14);
      subG.gain.setValueAtTime(brutal ? 0.22 : 0.18, now);
      subG.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      sub.connect(subG);
      subG.connect(this.out());
      sub.start(now);
      sub.stop(now + 0.16);

      const bip = c.createOscillator();
      const bipG = c.createGain();
      bip.type = "square";
      bip.frequency.setValueAtTime(f * 1.4, now);
      bip.frequency.setValueAtTime(f * (multi > 1 ? 2.25 : 1.9), now + 0.045);
      bipG.gain.setValueAtTime(0.065, now);
      bipG.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      bip.connect(bipG);
      bipG.connect(this.out());
      bip.start(now);
      bip.stop(now + 0.14);
    }

    playImpactHit(tier = 1) {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      const clampedTier = clamp(tier, 1, 6);

      // Heavy anime pressure-drop sub-bass ("THOOM")
      const sub = c.createOscillator();
      const subG = c.createGain();
      sub.type = this.isBrutal() ? "sawtooth" : "sine";
      sub.frequency.setValueAtTime(110 + clampedTier * 14, now);
      sub.frequency.exponentialRampToValueAtTime(28, now + 0.34);
      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(340 + clampedTier * 70, now);
      subG.gain.setValueAtTime(0.001, now);
      subG.gain.linearRampToValueAtTime(0.26, now + 0.012);
      subG.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      sub.connect(filter);
      filter.connect(subG);
      subG.connect(this.out());
      sub.start(now);
      sub.stop(now + 0.4);

      // Razor metallic slash harmonic chord scaling with kill chain tier
      const root = this.scale[Math.min(clampedTier + 1, this.scale.length - 1)];
      [root, root * 1.5].forEach((freq, idx) => {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = "square";
        const t = now + idx * 0.025;
        osc.frequency.setValueAtTime(freq * 1.5, t);
        osc.frequency.exponentialRampToValueAtTime(freq, t + 0.14);
        g.gain.setValueAtTime(0.075, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc.connect(g);
        g.connect(this.out());
        osc.start(t);
        osc.stop(t + 0.17);
      });
    }

    playWardenHorn() {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      [82.41, 110.0].forEach((freq, i) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        osc.frequency.linearRampToValueAtTime(freq * 0.92, now + 0.55);
        const filter = c.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(480, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.11, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.out());
        osc.start(now);
        osc.stop(now + 0.62);
      });
    }

    playNova() {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      [196, 293.66, 392, 587.33].forEach((f, i) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = this.isBrutal() ? "sawtooth" : "square";
        const t = now + i * 0.03;
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.055, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.out());
        osc.start(t);
        osc.stop(t + 0.27);
      });
    }

    playWaveClear() {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      [329.63, 440, 523.25, 659.25].forEach((f, i) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = "square";
        const t = now + i * 0.055;
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc.connect(gain);
        gain.connect(this.out());
        osc.start(t);
        osc.stop(t + 0.17);
      });
    }

    playShieldBreak() {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.24);
      gain.gain.setValueAtTime(0.13, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.27);
    }

    playGameOver() {
      const c = this.ensure();
      if (!c) return;
      const now = c.currentTime;
      [220, 185, 146.83, 98].forEach((f, i) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = this.isBrutal() ? "sawtooth" : "square";
        const t = now + i * 0.085;
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.09, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.19);
        osc.connect(gain);
        gain.connect(this.out());
        osc.start(t);
        osc.stop(t + 0.21);
      });
    }
  }

  const sound = new SoundEngine();

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------
  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const distSq = (x1, y1, x2, y2) => (x2 - x1) ** 2 + (y2 - y1) ** 2;
  const lerp = (a, b, t) => a + (b - a) * t;
  const padNum = (n, len = 6) => String(Math.floor(n)).padStart(len, "0");
  const snap = (v, step = 2) => Math.round(v / step) * step;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  const HUD_TOP = 64;
  const HUD_BOT = 30;

  // Ambient attract-mode shapes on title screen
  let attractNodes = [];
  function initAttract() {
    attractNodes = [];
    for (let i = 0; i < 14; i++) {
      attractNodes.push({
        x: rand(40, width - 40),
        y: rand(60, height - 60),
        vx: rand(-55, 55),
        vy: rand(-55, 55),
        kind: ["seeker", "orbiter", "shard", "sentinel"][i % 4],
        angle: rand(0, Math.PI * 2),
      });
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    initAttract();
  }

  // ---------------------------------------------------------------------------
  // Game State
  // ---------------------------------------------------------------------------
  let mode = "start"; // "start" | "playing" | "draft" | "paused" | "settings" | "gameover"
  let settingsReturnMode = "start";
  let wipeArmed = false;
  let score = 0;
  let wave = 1;
  let combo = 1;
  let maxCombo = 1;
  let comboTimer = 0;
  let killChain = 0;
  let killChainTimer = 0;
  const KILL_CHAIN_WINDOW = 3.0;
  let killChainPoints = [];
  let shatteredCount = 0;
  let waveTimer = 0;
  const WAVE_INTERVAL = 18;
  let spawnTimer = 0;
  let shardTimer = 0;
  let novaTimer = 14;
  let hitstop = 0;
  let slowmoTimer = 0;
  let shake = 0;
  let gridFlash = 0;
  let impactFrame = null;
  let waveBanner = { text: "", sub: "", timer: 0 };
  let bossSpawnedForWave = false;
  let bonusDraftPending = false;

  let activePerks = {};
  let currentDraft = [];

  const keys = new Set();
  let controlMode = "keyboard";
  const pointer = { x: width / 2, y: height / 2 };

  let player = null;
  let enemies = [];
  let spawns = [];
  let shards = [];
  let novas = [];
  let hazardPulses = []; // expanding square pulses from Sentinels
  let railBeams = []; // Rail Echo perk laser lines
  let particles = [];
  let rings = [];
  let popups = [];

  function perkLvl(id) {
    return activePerks[id] || 0;
  }

  function isOverdrive() {
    return combo >= 6;
  }

  function getComboDuration() {
    return 4.3 + perkLvl("refund") * 1.4;
  }

  function createPlayer() {
    return {
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      angle: 0,
      radius: 13,
      dashCharges: 2,
      maxDash: 2,
      dashRechargeRate: 0.48,
      dashTime: 0,
      wasDashing: false,
      dashKills: 0,
      dashDuration: 0.18,
      dashDirX: 1,
      dashDirY: 0,
      invulnTime: 1.0,
      shield: 0,
      droneAngle: 0,
      trail: [],
      afterimages: [],
    };
  }

  function applyPerksToPlayer(rechargeShield = false) {
    if (!player) return;
    player.maxDash = 2 + perkLvl("overclock");
    player.dashRechargeRate = 0.48 * (1 + perkLvl("overclock") * 0.25);
    player.dashCharges = Math.min(player.maxDash, player.dashCharges);
    if (rechargeShield && perkLvl("aegis") > 0) {
      player.shield = perkLvl("aegis");
    }
    rebuildDashPips();
    renderPerkStrip();
  }

  function showWaveBanner(text, sub = "") {
    waveBanner = { text, sub, timer: 2.0 };
  }

  function addShake(amount) {
    shake = Math.max(shake, amount * profile.settings.shake);
  }

  function triggerHitstop(duration) {
    if (profile.settings.hitstop) hitstop = duration;
  }

  function getHoldDuration(tier, major) {
    const modeHold = profile.settings.impactHold || "dramatic";
    if (modeHold === "snap") {
      return major ? 0.18 + Math.min(tier, 4) * 0.04 : 0.07;
    }
    if (modeHold === "full") {
      return major ? 0.8 + Math.min(tier, 4) * 0.075 : 0.28;
    }
    // "dramatic" (default): punchy 0.55s–0.98s freeze pause so every big combo hits hard
    return major ? 0.48 + Math.min(tier, 5) * 0.1 : 0.16;
  }

  function triggerImpactFrame({
    x,
    y,
    angle = 0,
    label = "SHATTER",
    sublabel = "",
    frames = 3,
    major = true,
    tier = 1,
    chainTrail = null,
  }) {
    const setting = profile.settings.impactFrames;
    if (setting === "off") return;
    if (setting === "major" && !major) return;

    // Don't let a minor impact cut interrupt a higher-tier chain hold
    if (impactFrame && impactFrame.tier > tier && !major) return;

    const holdDur = getHoldDuration(tier, major);
    sound.playImpactHit(tier);

    impactFrame = {
      x: clamp(x, 40, width - 40),
      y: clamp(y, 40, height - 40),
      angle,
      label,
      sublabel,
      strobeLeft: frames,
      totalStrobe: frames,
      stepTimer: 0.034,
      frameDur: 0.034,
      holdLeft: holdDur,
      totalHold: holdDur,
      tier: Math.max(1, tier),
      chainTrail: chainTrail ? chainTrail.map((pt) => ({ ...pt })) : null,
      elapsed: 0,
    };
  }

  function syncSettingsEffects() {
    sound.syncVolume();
    if (profile.settings.inputMode === "keyboard") controlMode = "keyboard";
    else if (profile.settings.inputMode === "mouse") controlMode = "mouse";

    document.documentElement.setAttribute("data-hud", profile.settings.hudMode || "full");
    if (profile.settings.accentOverride && profile.settings.accentOverride !== "auto") {
      document.documentElement.style.setProperty("--accent", getAccent());
    } else {
      document.documentElement.style.removeProperty("--accent");
    }

    if (mode === "playing" || mode === "paused" || mode === "draft") {
      const showTel = profile.settings.gridMode === "full" && profile.settings.hudMode === "full";
      telemetryEl.classList.toggle("hidden", !showTel);
    }
  }

  function renderSettingsUI() {
    const s = profile.settings;
    document.querySelectorAll("#settings-overlay .seg-group").forEach((group) => {
      const key = group.getAttribute("data-setting");
      const currentVal = String(s[key]);
      group.querySelectorAll(".seg-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-val") === currentVal);
      });
    });
    document.querySelectorAll("#accent-swatches .accent-dot").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-val") === String(s.accentOverride));
    });
    volumeSlider.value = String(s.volume);
    volReadout.textContent = `${s.volume}%`;
    descDifficulty.textContent = getDiffConfig().label;
    wipeArmed = false;
    wipeSaveBtn.classList.remove("armed");
    wipeSaveBtn.textContent = "CLEAR SAVE";
  }

  function openSettings() {
    if (mode === "settings") return;
    sound.click(620);
    if (mode === "playing") {
      settingsReturnMode = "paused";
    } else {
      settingsReturnMode = mode;
    }
    mode = "settings";
    startOverlay.classList.add("hidden");
    pauseOverlay.classList.add("hidden");
    renderSettingsUI();
    settingsOverlay.classList.remove("hidden");
  }

  function closeSettings() {
    if (mode !== "settings") return;
    sound.click(540);
    settingsOverlay.classList.add("hidden");
    mode = settingsReturnMode;
    syncSettingsEffects();
    if (mode === "start") {
      startOverlay.classList.remove("hidden");
      renderArchiveUI();
    } else if (mode === "paused") {
      renderPausePerks();
      pauseOverlay.classList.remove("hidden");
    }
  }

  function resetRun() {
    score = 0;
    wave = Math.max(1, Number(profile.settings.startWave) || 1);
    combo = 1;
    maxCombo = 1;
    comboTimer = 0;
    killChain = 0;
    killChainTimer = 0;
    killChainPoints = [];
    shatteredCount = 0;
    waveTimer = 0;
    spawnTimer = 0.65;
    shardTimer = 0.2;
    novaTimer = 13;
    hitstop = 0;
    slowmoTimer = 0;
    shake = 0;
    gridFlash = 0;
    impactFrame = null;
    bossSpawnedForWave = false;
    bonusDraftPending = false;
    activePerks = {};
    currentDraft = [];

    player = createPlayer();
    enemies = [];
    spawns = [];
    shards = [];
    novas = [];
    hazardPulses = [];
    railBeams = [];
    particles = [];
    rings = [];
    popups = [];

    applyPerksToPlayer(true);
    for (let i = 0; i < 4; i++) spawnShard();
    if (wave % 3 === 0) {
      queueEnemy("warden");
      bossSpawnedForWave = true;
      sound.playWardenHorn();
    } else {
      queueEnemy("seeker");
      queueEnemy("seeker");
    }

    const skinObj = SKINS.find((s) => s.id === profile.skin) || SKINS[0];
    telSkinEl.textContent = `CRAFT // ${skinObj.name} [${currentPalette.name}]`;
    showWaveBanner(
      `WAVE ${padNum(wave, 2)}`,
      wave % 3 === 0 ? "WARNING // SECTOR WARDEN INBOUND" : `${profile.settings.difficulty.toUpperCase()} // DASH TO SHATTER`
    );
    updateHud();
  }

  function startRun() {
    sound.ensure();
    sound.click(740);
    resetRun();
    mode = "playing";
    startOverlay.classList.add("hidden");
    perkOverlay.classList.add("hidden");
    pauseOverlay.classList.add("hidden");
    settingsOverlay.classList.add("hidden");
    gameoverOverlay.classList.add("hidden");
    hudEl.classList.remove("hidden");
    syncSettingsEffects();
  }

  function openMenu() {
    sound.click(480);
    mode = "start";
    hudEl.classList.add("hidden");
    duelHudEl.classList.add("hidden");
    telemetryEl.classList.add("hidden");
    perkOverlay.classList.add("hidden");
    pauseOverlay.classList.add("hidden");
    settingsOverlay.classList.add("hidden");
    roomOverlay.classList.add("hidden");
    duelOverOverlay.classList.add("hidden");
    gameoverOverlay.classList.add("hidden");
    startOverlay.classList.remove("hidden");
    renderArchiveUI();
  }

  function pauseGame() {
    if (mode !== "playing") return;
    sound.click(420);
    mode = "paused";
    renderPausePerks();
    pauseOverlay.classList.remove("hidden");
  }

  function resumeGame() {
    if (mode !== "paused") return;
    sound.click(640);
    mode = "playing";
    pauseOverlay.classList.add("hidden");
  }

  // ---------------------------------------------------------------------------
  // Modular Perk Draft
  // ---------------------------------------------------------------------------
  function openPerkDraft(isBonus = false) {
    mode = "draft";
    sound.playWaveClear();

    const pool = PERKS.filter((p) => perkLvl(p.id) < p.maxLevel);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    currentDraft = pool.slice(0, 3);
    if (currentDraft.length === 0) {
      if (isBonus) {
        mode = "playing";
      } else {
        advanceToNextWave();
      }
      return;
    }

    bonusDraftPending = isBonus;
    perkWaveLabel.textContent = isBonus
      ? `SECTOR WARDEN DESTROYED // BONUS DRAFT`
      : `WAVE ${padNum(wave, 2)} CLEARED`;
    draftTitleEl.textContent = isBonus ? "WARDEN SALVAGE" : "MODULAR UPGRADE";
    draftSubEl.textContent = isBonus
      ? "Claim a bonus system module from the destroyed Warden core."
      : "Choose a system perk before the next wave engages.";

    perkChoicesEl.innerHTML = "";
    currentDraft.forEach((perk, idx) => {
      const nextLv = perkLvl(perk.id) + 1;
      const btn = document.createElement("button");
      btn.className = "perk-card";
      btn.innerHTML = `
        <div>
          <div class="perk-card-top">
            <span>${perk.code}</span>
            <span>LV.${nextLv}/${perk.maxLevel}</span>
          </div>
          <div class="perk-glyph">${perk.glyph}</div>
          <div class="perk-name">${perk.name}</div>
          <p class="perk-desc">${perk.desc}</p>
        </div>
        <div class="perk-foot">PRESS [${idx + 1}] TO INSTALL</div>
      `;
      btn.addEventListener("click", () => selectPerk(idx));
      perkChoicesEl.appendChild(btn);
    });

    perkOverlay.classList.remove("hidden");
  }

  function selectPerk(index) {
    if (mode !== "draft" || !currentDraft[index]) return;
    const chosen = currentDraft[index];
    activePerks[chosen.id] = perkLvl(chosen.id) + 1;
    sound.click(880);
    if (chosen.id === "aegis") {
      player.shield = Math.max(player.shield, perkLvl("aegis"));
    }
    if (chosen.id === "overclock") {
      player.dashCharges = Math.min(2 + perkLvl("overclock"), player.dashCharges + 1);
    }
    perkOverlay.classList.add("hidden");

    if (bonusDraftPending) {
      bonusDraftPending = false;
      mode = "playing";
      applyPerksToPlayer(false);
      player.invulnTime = Math.max(player.invulnTime, 1.0);
      addPopup(player.x, player.y - 24, `+${chosen.name}`, getAccent());
      updateHud();
    } else {
      advanceToNextWave(chosen.name);
    }
  }

  function advanceToNextWave(installedName = null) {
    wave += 1;
    waveTimer = 0;
    bossSpawnedForWave = false;
    mode = "playing";
    applyPerksToPlayer(true);
    player.invulnTime = Math.max(player.invulnTime, 1.1);
    gridFlash = 0.9;

    const isBossWave = wave % 3 === 0;
    if (isBossWave) {
      showWaveBanner(`WAVE ${padNum(wave, 2)}`, "WARNING // SECTOR WARDEN INBOUND");
      queueEnemy("warden");
      bossSpawnedForWave = true;
      sound.playWardenHorn();
    } else {
      showWaveBanner(
        `WAVE ${padNum(wave, 2)}`,
        installedName ? `MODULE INSTALLED // ${installedName}` : "HOSTILE DENSITY INCREASED"
      );
      queueEnemy();
      queueEnemy();
    }
    updateHud();
  }

  function endGame() {
    mode = "gameover";
    sound.playGameOver();
    addShake(18);
    triggerImpactFrame({
      x: player.x,
      y: player.y,
      angle: player.angle,
      label: "TERMINATED",
      sublabel: `FINAL SCORE ${padNum(score, 6)}`,
      frames: 3,
      major: true,
      tier: 4,
    });
    spawnBurst(player.x, player.y, getAccent(), 30, 340, true);
    spawnBurst(player.x, player.y, currentPalette.ink, 18, 220, true);
    rings.push({ x: player.x, y: player.y, r: 8, maxR: 140, color: getAccent(), alpha: 1, width: 3.5 });

    const unlockedBefore = new Set(SKINS.filter((s) => s.unlocked(profile)).map((s) => s.id));

    const isNewBest = score > profile.bestScore;
    if (isNewBest) profile.bestScore = score;
    if (wave > profile.bestWave) profile.bestWave = wave;
    if (maxCombo > profile.bestCombo) profile.bestCombo = maxCombo;
    profile.totalShattered += shatteredCount;
    saveProfile();

    const newlyUnlocked = SKINS.filter((s) => !unlockedBefore.has(s.id) && s.unlocked(profile));

    finalScoreEl.textContent = padNum(score, 6);
    finalBestEl.textContent = padNum(profile.bestScore, 6);
    finalWaveEl.textContent = padNum(wave, 2);
    finalComboEl.textContent = `x${padNum(maxCombo, 2)}`;
    finalShatteredEl.textContent = padNum(shatteredCount, 2);
    newBestPill.classList.toggle("hidden", !isNewBest || score === 0);

    if (newlyUnlocked.length > 0) {
      unlockBannerEl.textContent = `NEW CRAFT UNLOCKED // ${newlyUnlocked.map((s) => s.name).join(", ")}`;
      unlockBannerEl.classList.remove("hidden");
    } else {
      unlockBannerEl.classList.add("hidden");
    }

    const overDelay = impactFrame
      ? Math.round((impactFrame.holdLeft + impactFrame.strobeLeft * impactFrame.frameDur) * 1000) + 260
      : 360;
    setTimeout(() => {
      if (mode === "gameover") gameoverOverlay.classList.remove("hidden");
    }, overDelay);
  }

  // ---------------------------------------------------------------------------
  // HUD & Archive UI
  // ---------------------------------------------------------------------------
  function rebuildDashPips() {
    if (!player) return;
    dashPipsEl.innerHTML = "";
    for (let i = 0; i < player.maxDash; i++) {
      const pip = document.createElement("div");
      pip.className = "dash-pip";
      const fill = document.createElement("div");
      fill.className = "dash-pip-fill";
      pip.appendChild(fill);
      dashPipsEl.appendChild(pip);
    }
  }

  function renderPerkStrip() {
    perkStripEl.innerHTML = "";
    Object.entries(activePerks).forEach(([id, lv]) => {
      const p = PERKS.find((x) => x.id === id);
      if (!p) return;
      const span = document.createElement("span");
      span.className = "perk-chip";
      span.textContent = `${p.glyph}×${lv}`;
      span.title = `${p.name} LV.${lv}`;
      perkStripEl.appendChild(span);
    });
  }

  function renderPausePerks() {
    pausePerksEl.innerHTML = "";
    const entries = Object.entries(activePerks);
    if (entries.length === 0) {
      const empty = document.createElement("span");
      empty.className = "cell-meta";
      empty.textContent = "NO MODULES INSTALLED YET";
      pausePerksEl.appendChild(empty);
      return;
    }
    entries.forEach(([id, lv]) => {
      const p = PERKS.find((x) => x.id === id);
      if (!p) return;
      const chip = document.createElement("span");
      chip.className = "perk-chip";
      chip.textContent = `${p.code} ${p.name} LV.${lv}`;
      pausePerksEl.appendChild(chip);
    });
  }

  function hasActiveBoss() {
    return enemies.some((e) => e.type === "warden") || spawns.some((s) => s.type === "warden");
  }

  function updateHud() {
    scoreEl.textContent = padNum(score, 6);
    bestEl.textContent = padNum(Math.max(profile.bestScore, score), 6);
    waveEl.textContent = padNum(wave, 2);
    overdriveTagEl.classList.toggle("hidden", !isOverdrive());
    bossTagEl.classList.toggle("hidden", !hasActiveBoss());

    if (combo > 1) {
      comboBadgeEl.classList.remove("hidden");
      comboValEl.textContent = `x${padNum(combo, 2)}`;
      const pct = clamp(comboTimer / getComboDuration(), 0, 1);
      comboBarFillEl.style.transform = `scaleX(${pct})`;
    } else {
      comboBadgeEl.classList.add("hidden");
    }

    if (killChain >= 2 && killChainTimer > 0) {
      chainBadgeEl.classList.remove("hidden");
      chainValEl.textContent = `CH×${padNum(killChain, 2)}`;
      const cpct = clamp(killChainTimer / KILL_CHAIN_WINDOW, 0, 1);
      chainBarFillEl.style.transform = `scaleX(${cpct})`;
    } else {
      chainBadgeEl.classList.add("hidden");
    }

    if (player) {
      shieldTagEl.classList.toggle("hidden", player.shield <= 0);
      shieldTagEl.textContent = player.shield > 1 ? `[AEGIS×${player.shield}]` : "[AEGIS]";

      const fills = dashPipsEl.querySelectorAll(".dash-pip-fill");
      fills.forEach((fill, idx) => {
        const amt = clamp(player.dashCharges - idx, 0, 1);
        fill.style.width = `${amt * 100}%`;
        fill.classList.toggle("ready", amt >= 1);
      });

      telCoordsEl.textContent = `POS ${padNum(player.x, 3)}:${padNum(player.y, 3)}${isOverdrive() ? " // OVERDRIVE" : ""}`;
      const blocks = 10;
      const filled = Math.min(blocks, Math.floor((waveTimer / WAVE_INTERVAL) * blocks));
      telProgressEl.textContent = hasActiveBoss()
        ? `WARDEN ACTIVE // DASH TO BREAK ARMOR`
        : `WAVE ${padNum(wave, 2)} [${"█".repeat(filled)}${"░".repeat(blocks - filled)}]`;
    }
  }

  function applyPalette(id) {
    if (!PALETTES[id]) return;
    profile.palette = id;
    currentPalette = PALETTES[id];
    document.documentElement.setAttribute("data-palette", id);
    saveProfile();
    renderArchiveUI();
  }

  function applySkin(id) {
    const skin = SKINS.find((s) => s.id === id);
    if (!skin || !skin.unlocked(profile)) return;
    profile.skin = id;
    saveProfile();
    renderArchiveUI();
  }

  function renderArchiveUI() {
    posterEditionStamp.textContent = currentPalette.stamp;
    startBestInline.textContent = `BEST ${padNum(profile.bestScore, 6)} // FOES ${profile.totalShattered}`;
    paletteNameLabel.textContent = currentPalette.name;

    paletteGridEl.innerHTML = "";
    Object.values(PALETTES).forEach((pal) => {
      const btn = document.createElement("button");
      btn.className = `palette-btn${profile.palette === pal.id ? " active" : ""}`;
      btn.innerHTML = `
        <span>${pal.name}</span>
        <span class="palette-dots">
          <i style="background:${pal.bg}"></i>
          <i style="background:${pal.accent}"></i>
        </span>
      `;
      btn.addEventListener("click", () => {
        sound.click(660);
        applyPalette(pal.id);
      });
      paletteGridEl.appendChild(btn);
    });

    const selectedSkin = SKINS.find((s) => s.id === profile.skin) || SKINS[0];
    asciiPreviewEl.textContent = selectedSkin.ascii;
    asciiCaptionEl.textContent = `${selectedSkin.code} / ${selectedSkin.name} · ${selectedSkin.style}`;
    const unlockedCount = SKINS.filter((s) => s.unlocked(profile)).length;
    skinStatusLabel.textContent = `${unlockedCount}/${SKINS.length} UNLOCKED`;

    skinGridEl.innerHTML = "";
    SKINS.forEach((skin) => {
      const isUnlocked = skin.unlocked(profile);
      const btn = document.createElement("button");
      btn.className = `skin-btn${profile.skin === skin.id ? " active" : ""}${!isUnlocked ? " locked" : ""}`;
      btn.innerHTML = `
        <div class="skin-top">
          <span>${skin.code} ${skin.name}</span>
          <span>${isUnlocked ? "■" : "×"}</span>
        </div>
        <div class="skin-sub">${isUnlocked ? skin.style : skin.hint}</div>
      `;
      if (isUnlocked) {
        btn.addEventListener("click", () => {
          sound.click(720);
          applySkin(skin.id);
        });
      }
      skinGridEl.appendChild(btn);
    });
  }

  // ---------------------------------------------------------------------------
  // Spawners & Combat Actions
  // ---------------------------------------------------------------------------
  function randomSafePos(minDistFromPlayer = 155) {
    const pad = 52;
    const minY = HUD_TOP + 38;
    const maxY = Math.max(minY + 20, height - HUD_BOT - 38);
    for (let attempt = 0; attempt < 24; attempt++) {
      const x = rand(pad, Math.max(pad + 20, width - pad));
      const y = rand(minY, maxY);
      if (!player || distSq(x, y, player.x, player.y) >= minDistFromPlayer ** 2) {
        return { x, y };
      }
    }
    return { x: rand(pad, width - pad), y: rand(minY, maxY) };
  }

  function spawnShard(pos = null, bonus = false) {
    const p = pos || randomSafePos(90);
    shards.push({
      x: clamp(p.x, 34, width - 34),
      y: clamp(p.y, HUD_TOP + 28, height - HUD_BOT - 28),
      r: bonus ? 9 : 7.5,
      phase: rand(0, Math.PI * 2),
      value: bonus ? 85 : 50,
      bonus,
      life: 16,
    });
  }

  function spawnNovaOrb() {
    const p = randomSafePos(155);
    novas.push({ x: p.x, y: p.y, r: 13, phase: 0, life: 15 });
  }

  function pickEnemyType() {
    const roll = Math.random();
    if (wave === 1) return "seeker";
    if (wave === 2) return roll < 0.65 ? "seeker" : "orbiter";
    if (wave === 3) {
      if (roll < 0.48) return "seeker";
      if (roll < 0.78) return "orbiter";
      return "lancer";
    }
    if (roll < 0.36) return "seeker";
    if (roll < 0.62) return "orbiter";
    if (roll < 0.82) return "lancer";
    return "sentinel";
  }

  function queueEnemy(forcedType = null) {
    const type = forcedType || pickEnemyType();
    const pos = type === "warden" ? randomSafePos(240) : randomSafePos(190);
    const dur = type === "warden" ? 1.35 : 0.88;
    spawns.push({ x: pos.x, y: pos.y, type, timer: dur, maxTimer: dur });
  }

  function enemyColor(type) {
    if (type === "seeker" || type === "warden") return getAccent();
    if (type === "lancer") return currentPalette.warn;
    if (type === "sentinel") return currentPalette.secondary;
    return currentPalette.alt;
  }

  function materializeEnemy(s) {
    const diff = getDiffConfig();
    const speedScale = (1 + (wave - 1) * 0.08) * diff.enemySpeed;
    if (s.type === "seeker") {
      enemies.push({
        type: "seeker",
        x: s.x,
        y: s.y,
        vx: 0,
        vy: 0,
        angle: 0,
        radius: 13,
        speed: 145 * speedScale,
        hp: 1,
        maxHp: 1,
        hitCooldown: 0,
        grazed: 0,
      });
    } else if (s.type === "orbiter") {
      const a = rand(0, Math.PI * 2);
      enemies.push({
        type: "orbiter",
        x: s.x,
        y: s.y,
        vx: Math.cos(a) * 165 * speedScale,
        vy: Math.sin(a) * 165 * speedScale,
        angle: a,
        spin: rand(-3.4, 3.4),
        radius: 14,
        speed: 168 * speedScale,
        turnDir: Math.random() < 0.5 ? 1 : -1,
        hp: 1,
        maxHp: 1,
        hitCooldown: 0,
        grazed: 0,
      });
    } else if (s.type === "lancer") {
      const a = Math.atan2(player.y - s.y, player.x - s.x);
      enemies.push({
        type: "lancer",
        x: s.x,
        y: s.y,
        vx: 0,
        vy: 0,
        angle: a,
        radius: 12,
        state: "aim",
        stateTimer: 0.92,
        chargeSpeed: 530 * Math.min(1.45, speedScale),
        hp: 1,
        maxHp: 1,
        hitCooldown: 0,
        grazed: 0,
      });
    } else if (s.type === "sentinel") {
      const a = rand(0, Math.PI * 2);
      enemies.push({
        type: "sentinel",
        x: s.x,
        y: s.y,
        vx: Math.cos(a) * 65,
        vy: Math.sin(a) * 65,
        angle: 0,
        radius: 15,
        pulseTimer: 2.2,
        hp: 1,
        maxHp: 1,
        hitCooldown: 0,
        grazed: 0,
      });
    } else if (s.type === "warden") {
      const bossHp = 3 + Math.floor(wave / 3);
      enemies.push({
        type: "warden",
        x: s.x,
        y: s.y,
        vx: 0,
        vy: 0,
        angle: 0,
        radius: 26,
        speed: 96 + wave * 4,
        pulseTimer: 2.6,
        hp: bossHp,
        maxHp: bossHp,
        hitCooldown: 0,
        grazed: 0,
      });
    }
  }

  const ASCII_DEBRIS = ["+", "×", "*", "#", "/", "░", "▒", "▓", "▪"];

  function spawnBurst(x, y, color, count = 12, speed = 220, includeAscii = true) {
    const scaledCount = Math.max(2, Math.round(count * profile.settings.particles));
    for (let i = 0; i < scaledCount; i++) {
      const a = rand(0, Math.PI * 2);
      const sp = rand(speed * 0.25, speed);
      const isChar = includeAscii && (useAsciiRender() || i % 3 === 0);
      particles.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        size: Math.floor(rand(3, currentPalette.brutalMode ? 9 : 7)),
        char: isChar ? ASCII_DEBRIS[Math.floor(Math.random() * ASCII_DEBRIS.length)] : null,
        color,
        life: rand(0.28, 0.62),
        maxLife: 0.62,
      });
    }
  }

  function addPopup(x, y, text, color) {
    popups.push({
      x,
      y,
      text,
      color: color || currentPalette.ink,
      life: 0.9,
      maxLife: 0.9,
    });
  }

  function addScore(basePoints, x, y, color) {
    const gained = Math.round(basePoints * combo * getDiffConfig().scoreMult);
    score += gained;
    comboTimer = getComboDuration();
    addPopup(x, y - 12, `+${gained}`, color);
  }

  function bumpCombo(amount = 1) {
    combo = Math.min(12, combo + amount);
    maxCombo = Math.max(maxCombo, combo);
    comboTimer = getComboDuration();
  }

  function fireRailEcho(x, y, dx, dy) {
    const lvl = perkLvl("rail");
    if (lvl <= 0) return;
    const len = 260 + lvl * 120;
    const x2 = x + dx * len;
    const y2 = y + dy * len;
    railBeams.push({ x1: x, y1: y, x2, y2, life: 0.24, maxLife: 0.24, width: 3 + lvl * 2 });

    // Check segment intersection with enemies
    const beamHitR = 14 + lvl * 4;
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      const t = clamp(((e.x - x) * dx + (e.y - y) * dy), 0, len);
      const px = x + dx * t;
      const py = y + dy * t;
      if (distSq(e.x, e.y, px, py) <= (e.radius + beamHitR) ** 2) {
        damageOrShatterEnemy(i, true);
      }
    }
  }

  function triggerDash() {
    if (mode !== "playing" || !player) return;
    if (player.dashCharges < 1 || player.dashTime > 0) return;

    let dx = 0;
    let dy = 0;
    if (controlMode === "keyboard") {
      if (keys.has("KeyW") || keys.has("ArrowUp")) dy -= 1;
      if (keys.has("KeyS") || keys.has("ArrowDown")) dy += 1;
      if (keys.has("KeyA") || keys.has("ArrowLeft")) dx -= 1;
      if (keys.has("KeyD") || keys.has("ArrowRight")) dx += 1;
    }

    if (dx === 0 && dy === 0) {
      if (controlMode === "mouse") {
        dx = pointer.x - player.x;
        dy = pointer.y - player.y;
      } else {
        dx = Math.cos(player.angle);
        dy = Math.sin(player.angle);
      }
    }

    const len = Math.hypot(dx, dy);
    if (len < 0.001) {
      dx = Math.cos(player.angle);
      dy = Math.sin(player.angle);
    } else {
      dx /= len;
      dy /= len;
    }

    player.dashCharges = Math.max(0, player.dashCharges - 1);
    player.dashTime = player.dashDuration;
    player.wasDashing = true;
    player.dashKills = 0;
    player.dashDirX = dx;
    player.dashDirY = dy;
    player.angle = Math.atan2(dy, dx);
    player.invulnTime = Math.max(player.invulnTime, player.dashDuration + 0.14);

    sound.playDash();
    addShake(currentPalette.brutalMode ? 7 : 5);
    gridFlash = Math.max(gridFlash, 0.55);
    rings.push({ x: player.x, y: player.y, r: 8, maxR: 54, color: getAccent(), alpha: 0.9, width: 2.5 });
    spawnBurst(player.x, player.y, getAccent(), 9, 175, true);
    fireRailEcho(player.x, player.y, dx, dy);
  }

  function triggerAftershock() {
    const lvl = perkLvl("aftershock");
    if (lvl <= 0 || !player) return;
    const rad = 76 + lvl * 28;
    rings.push({ x: player.x, y: player.y, r: 10, maxR: rad, color: currentPalette.secondary, alpha: 0.95, width: 3 });
    spawnBurst(player.x, player.y, currentPalette.secondary, 10, 195, true);
    const r2 = rad * rad;
    for (let i = enemies.length - 1; i >= 0; i--) {
      if (distSq(player.x, player.y, enemies[i].x, enemies[i].y) <= r2) {
        damageOrShatterEnemy(i, true);
      }
    }
  }

  function damageOrShatterEnemy(index, fromWaveFx = false) {
    const e = enemies[index];
    if (!e) return;
    if (e.hitCooldown > 0) return;

    e.hp -= 1;
    if (e.hp > 0) {
      // Multi-HP enemy (Warden armor break)
      e.hitCooldown = 0.28;
      sound.playShatter(combo, 2);
      addShake(12);
      triggerHitstop(0.045);
      triggerImpactFrame({
        x: e.x,
        y: e.y,
        angle: player ? player.angle : 0,
        label: "ARMOR BREAK",
        sublabel: `WARDEN INTEGRITY ${e.hp}/${e.maxHp}`,
        frames: 3,
        major: true,
        tier: 3,
      });
      spawnBurst(e.x, e.y, currentPalette.gold, 18, 280, true);
      rings.push({ x: e.x, y: e.y, r: 16, maxR: 92, color: currentPalette.gold, alpha: 0.95, width: 3 });
      // Drop 2 shards to fuel chain dashes around the Warden
      spawnShard({ x: e.x + rand(-48, 48), y: e.y + rand(-48, 48) }, true);
      spawnShard({ x: e.x + rand(-48, 48), y: e.y + rand(-48, 48) }, false);
      if (player) {
        player.dashCharges = Math.min(player.maxDash, player.dashCharges + 0.6);
      }
      addPopup(e.x, e.y - 32, `ARMOR ${e.hp}/${e.maxHp}`, currentPalette.gold);
      return;
    }

    const color = enemyColor(e.type);
    const wasWarden = e.type === "warden";
    const ex = e.x;
    const ey = e.y;
    enemies.splice(index, 1);
    shatteredCount += 1;

    // Kill Chain Impact Combo tracking
    killChain += 1;
    killChainTimer = KILL_CHAIN_WINDOW;
    killChainPoints.push({ x: ex, y: ey, num: killChain });
    if (killChainPoints.length > 6) killChainPoints.shift();

    bumpCombo(wasWarden ? 2 : 1);

    let multiBonus = 1;
    let multiTag = "";
    if (!fromWaveFx && player) {
      player.dashKills += 1;
      if (player.dashKills >= 2) {
        multiBonus = 1 + (player.dashKills - 1) * (0.25 + perkLvl("ram") * 0.2);
        const labels = ["", "", "DOUBLE SHATTER", "TRIPLE SHATTER", "QUAD SHATTER", "MEGA SHATTER"];
        multiTag = labels[Math.min(player.dashKills, labels.length - 1)];
        addPopup(ex, ey - 28, multiTag, currentPalette.gold);
      }
      const refund = perkLvl("refund") > 0 ? 0.65 + perkLvl("refund") * 0.15 : 0.48;
      player.dashCharges = Math.min(player.maxDash, player.dashCharges + refund);
    }

    // Named Kill Combo tier escalation
    let chainBonus = 0;
    let chainLabel = "";
    if (killChain === 2) {
      chainBonus = 180;
      chainLabel = "CROSS CUT";
    } else if (killChain === 3) {
      chainBonus = 360;
      chainLabel = "TRI-FRACTURE";
    } else if (killChain === 4) {
      chainBonus = 650;
      chainLabel = "SEVERANCE";
    } else if (killChain >= 5) {
      chainBonus = 1100;
      chainLabel = "ABSOLUTE ZERO";
      // 5+ Kill Chain climax: refills dash and vaporizes nearby hazard pulses!
      if (player) player.dashCharges = player.maxDash;
      hazardPulses = [];
    }

    const basePts = wasWarden
      ? 900
      : e.type === "lancer"
      ? 160
      : e.type === "sentinel"
      ? 150
      : e.type === "orbiter"
      ? 130
      : 100;
    addScore(Math.round(basePts * multiBonus) + chainBonus, ex, ey, color);

    if (perkLvl("chrono") > 0) {
      slowmoTimer = Math.max(slowmoTimer, 0.26 + perkLvl("chrono") * 0.14);
    }

    if (e.type === "orbiter") {
      spawnShard({ x: ex, y: ey }, true);
    }
    if (wasWarden) {
      for (let k = 0; k < 5; k++) {
        spawnShard({ x: ex + rand(-55, 55), y: ey + rand(-55, 55) }, true);
      }
      sound.playNova();
      addShake(18);
      triggerImpactFrame({
        x: ex,
        y: ey,
        angle: player ? player.angle : 0,
        label: "WARDEN DOWN",
        sublabel: `CHAIN ×${padNum(killChain, 2)} // SALVAGE UNLOCKED`,
        frames: 4,
        major: true,
        tier: 5,
        chainTrail: killChainPoints,
      });
      rings.push({ x: ex, y: ey, r: 14, maxR: 260, color: currentPalette.gold, alpha: 1, width: 4 });
      spawnBurst(ex, ey, currentPalette.gold, 34, 360, true);
      setTimeout(() => {
        if (mode === "playing") openPerkDraft(true);
      }, 950);
    } else {
      sound.playShatter(combo, player ? player.dashKills : 1);
      spawnBurst(ex, ey, color, 16, 280, true);
      spawnBurst(ex, ey, currentPalette.ink, 6, 160, true);
      rings.push({ x: ex, y: ey, r: 8, maxR: 62, color, alpha: 0.95, width: 2.5 });
      if (!fromWaveFx) {
        triggerHitstop(0.03);
        addShake(currentPalette.brutalMode ? 10 : 8);
        if (killChain >= 2) {
          triggerImpactFrame({
            x: ex,
            y: ey,
            angle: player ? player.angle : 0,
            label: multiTag ? `${multiTag}` : chainLabel,
            sublabel: `KILL COMBO ×${padNum(killChain, 2)} // +${Math.round(chainBonus * combo * getDiffConfig().scoreMult)} BONUS`,
            frames: 3,
            major: true,
            tier: killChain,
            chainTrail: killChainPoints,
          });
        } else {
          triggerImpactFrame({
            x: ex,
            y: ey,
            angle: player ? player.angle : 0,
            label: "SHATTER",
            sublabel: `CHAIN START // 01`,
            frames: 2,
            major: false,
            tier: 1,
          });
        }
      }
    }
  }

  function triggerNovaPulse(x, y) {
    sound.playNova();
    addShake(14);
    triggerImpactFrame({
      x,
      y,
      angle: 0,
      label: "NOVA PULSE",
      sublabel: "SECTOR CLEARED // DASH REFILLED",
      frames: 3,
      major: true,
      tier: 4,
    });
    gridFlash = 1.0;
    rings.push({ x, y, r: 12, maxR: 330, color: currentPalette.secondary, alpha: 1, width: 4 });
    rings.push({ x, y, r: 6, maxR: 225, color: getAccent(), alpha: 0.85, width: 2.5 });
    spawnBurst(x, y, currentPalette.secondary, 26, 360, true);

    const blastR2 = 320 * 320;
    for (let i = enemies.length - 1; i >= 0; i--) {
      if (distSq(x, y, enemies[i].x, enemies[i].y) <= blastR2) {
        damageOrShatterEnemy(i, true);
      }
    }
    hazardPulses = [];
    if (player) {
      player.dashCharges = player.maxDash;
      player.invulnTime = Math.max(player.invulnTime, 0.8);
    }
    addPopup(x, y - 18, "NOVA PULSE", currentPalette.secondary);
  }

  // ---------------------------------------------------------------------------
  // Update Loop
  // ---------------------------------------------------------------------------
  function updateAttract(dt) {
    for (const n of attractNodes) {
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      n.angle += dt * 0.9;
      if (n.x < 24 || n.x > width - 24) n.vx *= -1;
      if (n.y < 24 || n.y > height - 24) n.vy *= -1;
    }
  }

  function update(rawDt) {
    if (impactFrame) {
      impactFrame.elapsed += rawDt;
      if (impactFrame.strobeLeft > 0) {
        impactFrame.stepTimer -= rawDt;
        if (impactFrame.stepTimer <= 0) {
          impactFrame.strobeLeft -= 1;
          impactFrame.stepTimer = impactFrame.frameDur;
        }
      } else {
        impactFrame.holdLeft -= rawDt;
        if (impactFrame.holdLeft <= 0) {
          const fx = impactFrame.x;
          const fy = impactFrame.y;
          const t = impactFrame.tier;
          impactFrame = null;
          rings.push({ x: fx, y: fy, r: 14, maxR: 90 + t * 28, color: getAccent(), alpha: 0.95, width: 3 });
          addShake(6 + t * 2);
          if (player && mode === "playing") {
            player.invulnTime = Math.max(player.invulnTime, 0.35);
          }
        }
      }
      if (impactFrame && (mode === "playing" || mode === "duel")) return;
    }

    const dt = rawDt * (mode === "duel" ? 1 : (profile.settings.gameSpeed || 1));
    updateFx(dt);
    if (mode === "start" || mode === "room" || (mode === "settings" && settingsReturnMode === "start")) {
      updateAttract(dt);
      return;
    }
    if (mode === "duel") {
      updateDuel(dt);
      return;
    }
    if (mode !== "playing") return;

    if (hitstop > 0) {
      hitstop -= dt;
      return;
    }

    const enemyDt = slowmoTimer > 0 ? dt * 0.45 : dt;
    if (slowmoTimer > 0) slowmoTimer = Math.max(0, slowmoTimer - dt);
    if (waveBanner.timer > 0) waveBanner.timer = Math.max(0, waveBanner.timer - dt);

    // On Warden waves, hold wave completion until Warden is defeated
    const bossUp = hasActiveBoss();
    if (!bossUp) {
      waveTimer += dt;
    } else if (waveTimer < WAVE_INTERVAL - 1) {
      waveTimer += dt * 0.35;
    }
    gridFlash = Math.max(0, gridFlash - dt * 1.8);

    if (waveTimer >= WAVE_INTERVAL && !bossUp) {
      openPerkDraft(false);
      return;
    }

    if (combo > 1) {
      comboTimer -= dt;
      if (comboTimer <= 0) {
        combo = 1;
        comboTimer = 0;
      }
    }

    if (killChain > 0) {
      killChainTimer -= dt;
      if (killChainTimer <= 0) {
        killChain = 0;
        killChainTimer = 0;
        killChainPoints = [];
      }
    }

    spawnTimer -= enemyDt;
    const maxEnemies = Math.min(20, 4 + wave * 2);
    if (spawnTimer <= 0) {
      if (enemies.length + spawns.length < maxEnemies) {
        queueEnemy();
        if (wave >= 3 && Math.random() < 0.3) queueEnemy();
      }
      spawnTimer = Math.max(0.6, (2.3 - wave * 0.14) * getDiffConfig().spawnMult);
    }

    const mintLvl = perkLvl("mint");
    shardTimer -= dt;
    if (shardTimer <= 0 && shards.length < 6 + mintLvl * 2) {
      spawnShard();
      shardTimer = rand(1.1, 2.0) / (1 + mintLvl * 0.35);
    }

    novaTimer -= dt;
    if (novaTimer <= 0 && novas.length < 1) {
      spawnNovaOrb();
      novaTimer = rand(15, 21) / (1 + mintLvl * 0.3);
    }

    updatePlayer(dt);
    updateDrones(dt);
    updateSpawns(enemyDt);
    updateEnemies(enemyDt);
    updateHazardPulses(enemyDt);
    updatePickups(dt);
    updateHud();
  }

  function updatePlayer(dt) {
    const odBonus = isOverdrive() ? 1.15 : 1.0;
    const prevFull = Math.floor(player.dashCharges);
    player.dashCharges = Math.min(player.maxDash, player.dashCharges + player.dashRechargeRate * odBonus * dt);
    if (Math.floor(player.dashCharges) > prevFull) {
      // Crisp micro-ring when a dash bar finishes recharging
      rings.push({ x: player.x, y: player.y, r: 10, maxR: 28, color: currentPalette.ink, alpha: 0.5, width: 1.5 });
    }
    if (player.invulnTime > 0) player.invulnTime -= dt;

    if (player.dashTime > 0) {
      player.dashTime -= dt;
      const dashSpeed = 900;
      player.vx = player.dashDirX * dashSpeed;
      player.vy = player.dashDirY * dashSpeed;
      player.afterimages.push({ x: player.x, y: player.y, angle: player.angle, alpha: 0.72 });
      if (player.dashTime <= 0 && player.wasDashing) {
        player.wasDashing = false;
        triggerAftershock();
      }
    } else {
      let ax = 0;
      let ay = 0;
      const maxSpeed = 350 * (isOverdrive() ? 1.12 : 1.0);

      if (controlMode === "keyboard") {
        if (keys.has("KeyW") || keys.has("ArrowUp")) ay -= 1;
        if (keys.has("KeyS") || keys.has("ArrowDown")) ay += 1;
        if (keys.has("KeyA") || keys.has("ArrowLeft")) ax -= 1;
        if (keys.has("KeyD") || keys.has("ArrowRight")) ax += 1;
        const mag = Math.hypot(ax, ay);
        if (mag > 0) {
          ax /= mag;
          ay /= mag;
          player.vx = lerp(player.vx, ax * maxSpeed, 1 - Math.exp(-13 * dt));
          player.vy = lerp(player.vy, ay * maxSpeed, 1 - Math.exp(-13 * dt));
          player.angle = Math.atan2(player.vy, player.vx);
        } else {
          player.vx *= Math.exp(-9.5 * dt);
          player.vy *= Math.exp(-9.5 * dt);
        }
      } else {
        const dx = pointer.x - player.x;
        const dy = pointer.y - player.y;
        const d = Math.hypot(dx, dy);
        if (d > 6) {
          const desired = Math.min(maxSpeed, d * 5.2);
          player.vx = lerp(player.vx, (dx / d) * desired, 1 - Math.exp(-14 * dt));
          player.vy = lerp(player.vy, (dy / d) * desired, 1 - Math.exp(-14 * dt));
          player.angle = Math.atan2(dy, dx);
        } else {
          player.vx *= Math.exp(-12 * dt);
          player.vy *= Math.exp(-12 * dt);
        }
      }
    }

    player.x += player.vx * dt;
    player.y += player.vy * dt;

    const pad = 18;
    const insets = getHudInsets();
    const minY = insets.top + pad;
    const maxY = height - insets.bot - pad;
    if (player.x < pad) {
      player.x = pad;
      player.vx = Math.abs(player.vx) * 0.35;
    } else if (player.x > width - pad) {
      player.x = width - pad;
      player.vx = -Math.abs(player.vx) * 0.35;
    }
    if (player.y < minY) {
      player.y = minY;
      player.vy = Math.abs(player.vy) * 0.35;
    } else if (player.y > maxY) {
      player.y = maxY;
      player.vy = -Math.abs(player.vy) * 0.35;
    }

    player.trail.push({ x: player.x, y: player.y });
    if (player.trail.length > 14) player.trail.shift();

    for (let i = player.afterimages.length - 1; i >= 0; i--) {
      player.afterimages[i].alpha -= dt * 3.6;
      if (player.afterimages[i].alpha <= 0) player.afterimages.splice(i, 1);
    }
  }

  function updateDrones(dt) {
    const count = perkLvl("drone");
    if (count <= 0) return;
    player.droneAngle += dt * 3.2;
    const orbitR = 56;

    for (let d = 0; d < count; d++) {
      const a = player.droneAngle + (d * Math.PI * 2) / count;
      const dx = player.x + Math.cos(a) * orbitR;
      const dy = player.y + Math.sin(a) * orbitR;

      for (let i = enemies.length - 1; i >= 0; i--) {
        if (distSq(dx, dy, enemies[i].x, enemies[i].y) <= (10 + enemies[i].radius) ** 2) {
          damageOrShatterEnemy(i, true);
        }
      }
      for (let i = shards.length - 1; i >= 0; i--) {
        if (distSq(dx, dy, shards[i].x, shards[i].y) <= 22 * 22) {
          collectShard(i);
        }
      }
    }
  }

  function updateSpawns(dt) {
    for (let i = spawns.length - 1; i >= 0; i--) {
      spawns[i].timer -= dt;
      if (spawns[i].timer <= 0) {
        materializeEnemy(spawns[i]);
        spawns.splice(i, 1);
      }
    }
  }

  function hitPlayer() {
    if (player.invulnTime > 0) return;
    if (player.shield > 0) {
      player.shield -= 1;
      player.invulnTime = 1.25;
      sound.playShieldBreak();
      addShake(13);
      triggerImpactFrame({
        x: player.x,
        y: player.y,
        angle: player.angle,
        label: "AEGIS DEFLECT",
        sublabel: "SHIELD DISCHARGE",
        frames: 3,
        major: true,
        tier: 3,
      });
      rings.push({ x: player.x, y: player.y, r: 10, maxR: 155, color: currentPalette.secondary, alpha: 1, width: 3.5 });
      addPopup(player.x, player.y - 20, "AEGIS DEFLECT", currentPalette.secondary);
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (distSq(player.x, player.y, enemies[j].x, enemies[j].y) <= 155 * 155) {
          damageOrShatterEnemy(j, true);
        }
      }
      return;
    }
    endGame();
  }

  function updateEnemies(dt) {
    const isDashing = player.dashTime > 0;
    const shatterPad = isDashing ? 12 + perkLvl("ram") * 8 : 0;
    const pad = 16;
    const insets = getHudInsets();
    const minY = insets.top + pad;
    const maxY = height - insets.bot - pad;

    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      if (e.grazed > 0) e.grazed -= dt;
      if (e.hitCooldown > 0) e.hitCooldown -= dt;

      if (e.type === "seeker") {
        const target = Math.atan2(player.y - e.y, player.x - e.x);
        e.vx = lerp(e.vx, Math.cos(target) * e.speed, 1 - Math.exp(-3.4 * dt));
        e.vy = lerp(e.vy, Math.sin(target) * e.speed, 1 - Math.exp(-3.4 * dt));
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        e.angle = Math.atan2(e.vy, e.vx);
      } else if (e.type === "orbiter") {
        const toPlayer = Math.atan2(player.y - e.y, player.x - e.x);
        const desired = toPlayer + e.turnDir * 0.72;
        e.vx = lerp(e.vx, Math.cos(desired) * e.speed, 1 - Math.exp(-1.7 * dt));
        e.vy = lerp(e.vy, Math.sin(desired) * e.speed, 1 - Math.exp(-1.7 * dt));
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        e.angle += e.spin * dt;
      } else if (e.type === "lancer") {
        e.stateTimer -= dt;
        if (e.state === "aim") {
          const aim = Math.atan2(player.y - e.y, player.x - e.x);
          let diff = aim - e.angle;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          e.angle += diff * Math.min(1, dt * 6);
          e.vx *= Math.exp(-8 * dt);
          e.vy *= Math.exp(-8 * dt);
          if (e.stateTimer <= 0) {
            e.state = "charge";
            e.stateTimer = 0.65;
            e.vx = Math.cos(e.angle) * e.chargeSpeed;
            e.vy = Math.sin(e.angle) * e.chargeSpeed;
            spawnBurst(e.x, e.y, currentPalette.warn, 7, 130, true);
          }
        } else if (e.state === "charge") {
          e.x += e.vx * dt;
          e.y += e.vy * dt;
          if (e.stateTimer <= 0) {
            e.state = "recover";
            e.stateTimer = 0.55;
          }
        } else {
          e.vx *= Math.exp(-6 * dt);
          e.vy *= Math.exp(-6 * dt);
          e.x += e.vx * dt;
          e.y += e.vy * dt;
          if (e.stateTimer <= 0) {
            e.state = "aim";
            e.stateTimer = 0.9;
          }
        }
      } else if (e.type === "sentinel") {
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        e.angle += dt * 1.4;
        e.pulseTimer -= dt;
        if (e.pulseTimer <= 0) {
          e.pulseTimer = 3.4;
          hazardPulses.push({
            x: e.x,
            y: e.y,
            r: 18,
            maxR: 135,
            speed: 145,
            color: currentPalette.secondary,
          });
        }
      } else if (e.type === "warden") {
        const target = Math.atan2(player.y - e.y, player.x - e.x);
        e.vx = lerp(e.vx, Math.cos(target) * e.speed, 1 - Math.exp(-2.2 * dt));
        e.vy = lerp(e.vy, Math.sin(target) * e.speed, 1 - Math.exp(-2.2 * dt));
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        e.angle += dt * 1.1;
        e.pulseTimer -= dt;
        if (e.pulseTimer <= 0) {
          e.pulseTimer = 3.0;
          hazardPulses.push({
            x: e.x,
            y: e.y,
            r: 28,
            maxR: 195,
            speed: 175,
            color: getAccent(),
          });
        }
      }

      if (e.x < pad) {
        e.x = pad;
        e.vx = Math.abs(e.vx);
      } else if (e.x > width - pad) {
        e.x = width - pad;
        e.vx = -Math.abs(e.vx);
      }
      if (e.y < minY) {
        e.y = minY;
        e.vy = Math.abs(e.vy);
      } else if (e.y > maxY) {
        e.y = maxY;
        e.vy = -Math.abs(e.vy);
      }

      const d2 = distSq(player.x, player.y, e.x, e.y);
      const hitR = player.radius + e.radius + shatterPad - 3;

      if (d2 <= hitR * hitR) {
        if (isDashing) {
          damageOrShatterEnemy(i, false);
        } else {
          hitPlayer();
          if (mode !== "playing") return;
        }
      } else if (!isDashing && player.invulnTime <= 0 && e.grazed <= 0) {
        const grazeR = player.radius + e.radius + 26;
        if (d2 <= grazeR * grazeR) {
          e.grazed = 1.1;
          score += 25 * combo;
          player.dashCharges = Math.min(player.maxDash, player.dashCharges + 0.14);
          if (perkLvl("chrono") > 0) {
            slowmoTimer = Math.max(slowmoTimer, 0.22);
          }
          sound.playGraze();
          addPopup((player.x + e.x) / 2, (player.y + e.y) / 2 - 8, "GRAZE +", currentPalette.secondary);
          spawnBurst((player.x + e.x) / 2, (player.y + e.y) / 2, currentPalette.ink, 4, 110, true);
        }
      }
    }
  }

  function updateHazardPulses(dt) {
    for (let i = hazardPulses.length - 1; i >= 0; i--) {
      const p = hazardPulses[i];
      p.r += p.speed * dt;
      if (p.r >= p.maxR) {
        hazardPulses.splice(i, 1);
        continue;
      }
      // Square perimeter collision (dashing phases straight through!)
      if (player && player.dashTime <= 0 && player.invulnTime <= 0) {
        const dx = Math.abs(player.x - p.x);
        const dy = Math.abs(player.y - p.y);
        const edgeDist = Math.max(dx, dy);
        if (Math.abs(edgeDist - p.r) < 7) {
          hitPlayer();
          if (mode !== "playing") return;
        }
      }
    }
  }

  function collectShard(index) {
    const s = shards[index];
    if (!s) return;
    shards.splice(index, 1);
    bumpCombo(1);
    const bonusMult = 1 + perkLvl("magnet") * 0.3;
    addScore(Math.round(s.value * bonusMult), s.x, s.y, currentPalette.gold);
    sound.playPickup(combo);
    spawnBurst(s.x, s.y, currentPalette.gold, 8, 160, true);
    rings.push({ x: s.x, y: s.y, r: 4, maxR: 30, color: currentPalette.gold, alpha: 0.85, width: 1.5 });
    player.dashCharges = Math.min(player.maxDash, player.dashCharges + 0.14);
  }

  function updatePickups(dt) {
    const pullRadius = 115 * (1 + perkLvl("magnet") * 0.75);
    const pullR2 = pullRadius * pullRadius;

    for (let i = shards.length - 1; i >= 0; i--) {
      const s = shards[i];
      s.phase += dt * 4.5;
      s.life -= dt;
      if (s.life <= 0) {
        shards.splice(i, 1);
        continue;
      }

      const d2 = distSq(player.x, player.y, s.x, s.y);
      if (d2 < pullR2) {
        const d = Math.max(1, Math.sqrt(d2));
        const pull = (1 - d / pullRadius) * 470;
        s.x += ((player.x - s.x) / d) * pull * dt;
        s.y += ((player.y - s.y) / d) * pull * dt;
      }

      const collectR = player.radius + s.r + 5;
      if (d2 <= collectR * collectR) {
        collectShard(i);
      }
    }

    for (let i = novas.length - 1; i >= 0; i--) {
      const n = novas[i];
      n.phase += dt * 3.8;
      n.life -= dt;
      if (n.life <= 0) {
        novas.splice(i, 1);
        continue;
      }
      const collectR = player.radius + n.r + 6;
      if (distSq(player.x, player.y, n.x, n.y) <= collectR * collectR) {
        novas.splice(i, 1);
        triggerNovaPulse(n.x, n.y);
      }
    }
  }

  function updateFx(dt) {
    shake = Math.max(0, shake - dt * 38);

    for (let i = railBeams.length - 1; i >= 0; i--) {
      railBeams[i].life -= dt;
      if (railBeams[i].life <= 0) railBeams.splice(i, 1);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= Math.exp(-4.2 * dt);
      p.vy *= Math.exp(-4.2 * dt);
    }

    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i];
      r.r = lerp(r.r, r.maxR, 1 - Math.exp(-9 * dt));
      r.alpha -= dt * 2.2;
      if (r.alpha <= 0.03) rings.splice(i, 1);
    }

    for (let i = popups.length - 1; i >= 0; i--) {
      const p = popups[i];
      p.life -= dt;
      p.y -= dt * 36;
      if (p.life <= 0) popups.splice(i, 1);
    }
  }

  // ---------------------------------------------------------------------------
  // Swiss & Brutalist Pixel / ASCII Renderer
  // ---------------------------------------------------------------------------
  function drawPixelSprite(matrix, x, y, angle, pixelSize, primaryColor, accentColor) {
    const scaled = Math.max(1.5, pixelSize * (profile.settings.spriteScale || 1));
    const rows = matrix.length;
    const cols = matrix[0].length;
    const halfW = (cols * scaled) / 2;
    const halfH = (rows * scaled) / 2;

    ctx.save();
    ctx.translate(snap(x, 1), snap(y, 1));
    ctx.rotate(angle);

    // Hard offset drop shadow in Brutalist Industrialism mode
    if (currentPalette.brutalMode) {
      ctx.fillStyle = "rgba(10, 10, 10, 0.28)";
      for (let r = 0; r < rows; r++) {
        const row = matrix[r];
        for (let c = 0; c < cols; c++) {
          if (row[c] === ".") continue;
          ctx.fillRect(
            Math.floor(c * scaled - halfW) + 3,
            Math.floor(r * scaled - halfH) + 3,
            Math.ceil(scaled),
            Math.ceil(scaled)
          );
        }
      }
    }

    for (let r = 0; r < rows; r++) {
      const row = matrix[r];
      for (let c = 0; c < cols; c++) {
        const ch = row[c];
        if (ch === ".") continue;
        ctx.fillStyle = ch === "2" ? accentColor : primaryColor;
        ctx.fillRect(
          Math.floor(c * scaled - halfW),
          Math.floor(r * scaled - halfH),
          Math.ceil(scaled),
          Math.ceil(scaled)
        );
      }
    }
    ctx.restore();
  }

  function drawBrutalistBackdrop() {
    // Raw poured concrete slab with heavy 96px formwork seams & tie-rod holes
    ctx.fillStyle = currentPalette.bg;
    ctx.fillRect(-20, -20, width + 40, height + 40);

    const step = 96;
    ctx.strokeStyle = currentPalette.grid;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = step; x < width; x += step) {
      ctx.moveTo(x, HUD_TOP);
      ctx.lineTo(x, height - HUD_BOT);
    }
    for (let y = HUD_TOP + step; y < height - HUD_BOT; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Formwork tie-rod bolts & rivets at intersections
    const rivetCol = gridFlash > 0.1 || isOverdrive() ? getAccent() : currentPalette.cross;
    ctx.fillStyle = rivetCol;
    for (let x = step; x < width; x += step) {
      for (let y = HUD_TOP + step; y < height - HUD_BOT; y += step) {
        ctx.fillRect(x - 3, y - 3, 6, 6);
        ctx.fillStyle = currentPalette.bg;
        ctx.fillRect(x - 1, y - 1, 2, 2);
        ctx.fillStyle = rivetCol;
      }
    }

    // Industrial Hazard Striping along arena top & bottom edges during play
    if (mode !== "start") {
      const stripeH = 7;
      ctx.save();
      for (let x = -20; x < width + 20; x += 24) {
        ctx.fillStyle = (Math.floor(x / 24) % 2 === 0) ? "#0a0a0a" : "#ffd400";
        ctx.fillRect(x, HUD_TOP, 14, stripeH);
        ctx.fillRect(x, height - HUD_BOT - stripeH, 14, stripeH);
      }
      ctx.restore();
    }

    // Monolithic industrial stencil stamp
    ctx.save();
    ctx.fillStyle = "rgba(10, 10, 10, 0.11)";
    ctx.font = "900 132px 'Arial Black', Impact, 'Helvetica Neue', sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(`S-${padNum(wave, 2)}`, 18, height - HUD_BOT - 12);

    ctx.font = "900 11px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "right";
    ctx.fillStyle = currentPalette.cross;
    ctx.fillText(
      `WERK-99 // CONCRETE FORMWORK // ${isOverdrive() ? "TURBINE OVERDRIVE" : "PRESSURE NOMINAL"}`,
      width - 18,
      height - HUD_BOT - 16
    );
    ctx.restore();
  }

  function drawSwissGrid() {
    if (profile.settings.gridMode === "off") {
      ctx.fillStyle = currentPalette.bg;
      ctx.fillRect(-20, -20, width + 40, height + 40);
      return;
    }
    if (currentPalette.brutalMode) {
      drawBrutalistBackdrop();
      return;
    }

    ctx.fillStyle = currentPalette.bg;
    ctx.fillRect(-20, -20, width + 40, height + 40);

    const step = 64;
    ctx.strokeStyle = currentPalette.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = step; x < width; x += step) {
      ctx.moveTo(x + 0.5, HUD_TOP);
      ctx.lineTo(x + 0.5, height - HUD_BOT);
    }
    for (let y = HUD_TOP + step; y < height - HUD_BOT; y += step) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
    }
    ctx.stroke();

    ctx.strokeStyle = gridFlash > 0.1 || isOverdrive() ? getAccent() : currentPalette.cross;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = step * 2; x < width; x += step * 2) {
      for (let y = HUD_TOP + step * 2; y < height - HUD_BOT; y += step * 2) {
        ctx.moveTo(x - 4, y + 0.5);
        ctx.lineTo(x + 5, y + 0.5);
        ctx.moveTo(x + 0.5, y - 4);
        ctx.lineTo(x + 0.5, y + 5);
      }
    }
    ctx.stroke();

    ctx.save();
    ctx.fillStyle = currentPalette.grid;
    ctx.font = "900 112px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(padNum(wave, 2), 20, height - HUD_BOT - 12);

    ctx.font = "700 11px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "right";
    ctx.fillStyle = currentPalette.cross;
    ctx.fillText(
      `GRID 64PX // ${currentPalette.name} EDITION // ${slowmoTimer > 0 ? "CHRONO 0.45X" : isOverdrive() ? "OVERDRIVE" : "REALTIME 1.00X"}`,
      width - 18,
      height - HUD_BOT - 14
    );
    ctx.restore();
  }

  function drawPlayerCraft(x, y, angle, alpha, isDashing) {
    const skin = profile.skin;
    const accentCol = getAccent();
    const primary = isDashing ? accentCol : currentPalette.ink;
    const accent = isDashing ? currentPalette.gold : accentCol;

    ctx.save();
    ctx.globalAlpha = alpha;

    if (skin === "ascii0" || useAsciiRender()) {
      ctx.translate(snap(x, 1), snap(y, 1));
      ctx.rotate(angle);
      ctx.fillStyle = primary;
      ctx.font = "900 18px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(isDashing ? "»█»" : "[>]", 0, 1);
    } else if (skin === "reticle") {
      ctx.translate(snap(x, 1), snap(y, 1));
      ctx.rotate(angle);
      ctx.strokeStyle = primary;
      ctx.lineWidth = currentPalette.brutalMode ? 3 : 2;
      ctx.strokeRect(-10, -10, 20, 20);
      ctx.fillStyle = accent;
      ctx.fillRect(4, -3, 10, 6);
      ctx.fillStyle = primary;
      ctx.fillRect(-3, -3, 6, 6);
    } else {
      const sprite = PIXEL_SPRITES[skin] || PIXEL_SPRITES.vector;
      drawPixelSprite(sprite, x, y, angle, 4, primary, accent);
    }

    ctx.restore();
  }

  function renderAttract() {
    for (const n of attractNodes) {
      const col = n.kind === "shard" ? currentPalette.gold : enemyColor(n.kind);
      ctx.save();
      ctx.globalAlpha = 0.42;
      if (useAsciiRender()) {
        ctx.fillStyle = col;
        ctx.font = "900 16px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(n.kind === "shard" ? "✦" : "◆", snap(n.x, 1), snap(n.y, 1));
      } else {
        drawPixelSprite(PIXEL_SPRITES[n.kind], n.x, n.y, n.angle, 3, col, currentPalette.bg);
      }
      ctx.restore();
    }
  }

  // ---------------------------------------------------------------------------
  // Anime Impact Frame Renderer (Swiss / Brutalist / ASCII Graphic Cuts + Hold)
  // ---------------------------------------------------------------------------
  function renderImpactFrame() {
    const imp = impactFrame;
    if (!imp) return;

    const inHold = imp.strobeLeft <= 0;
    const step = imp.totalStrobe - imp.strobeLeft;
    const flip = inHold ? false : (step % 2 === 1);
    const style = profile.settings.impactStyle || "invert";
    const accent = getAccent();

    let bgCol = "#080808";
    let fgCol = "#faf9f5";
    let slashCol = accent;

    if (style === "accent") {
      bgCol = flip ? "#080808" : accent;
      fgCol = flip ? accent : "#080808";
      slashCol = "#faf9f5";
    } else if (style === "ascii") {
      bgCol = flip ? "#f4f3ee" : "#0a0a0a";
      fgCol = flip ? "#0a0a0a" : "#f4f3ee";
      slashCol = accent;
    } else {
      bgCol = flip ? "#f4f3ee" : "#080808";
      fgCol = flip ? "#080808" : "#f4f3ee";
      slashCol = accent;
    }

    // Subtle coiled kinetic tremor during the dramatic hold pause!
    const holdRatio = imp.totalHold > 0 ? clamp(imp.holdLeft / imp.totalHold, 0, 1) : 0;
    const tremorMag = inHold ? (1.2 + imp.tier * 0.45) * (0.4 + holdRatio * 0.6) : 3.5;
    const tx = Math.round((Math.random() - 0.5) * tremorMag * 2);
    const ty = Math.round((Math.random() - 0.5) * tremorMag * 2);

    ctx.save();
    ctx.fillStyle = bgCol;
    ctx.fillRect(-20, -20, width + 40, height + 40);

    const maxRad = Math.hypot(width, height);
    const rayCount = style === "ascii" ? 20 : 32 + Math.min(imp.tier, 4) * 4;

    // 1. Converging Anime Speed-Lines
    if (style === "ascii" || useAsciiRender()) {
      ctx.fillStyle = fgCol;
      ctx.font = "900 14px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const chars = ["/", "\\", "─", "│", "+", "×", "█", "▓", "░"];
      for (let i = 0; i < rayCount; i++) {
        const a = (i / rayCount) * Math.PI * 2 + step * 0.12;
        const ch = chars[(i + step) % chars.length];
        for (let r = 46; r < maxRad * 0.75; r += 34) {
          const rx = imp.x + Math.cos(a) * r;
          const ry = imp.y + Math.sin(a) * r;
          if (rx < -20 || rx > width + 20 || ry < -20 || ry > height + 20) break;
          ctx.fillText(ch, snap(rx, 2), snap(ry, 2));
        }
      }
    } else {
      ctx.strokeStyle = fgCol;
      for (let i = 0; i < rayCount; i++) {
        const a = (i / rayCount) * Math.PI * 2 + ((i % 3) * 0.03) + step * 0.08;
        const innerR = (i % 2 === 0 ? 34 : 62) + (inHold ? (1 - holdRatio) * 18 : step * 10);
        const thick = i % 4 === 0 ? (currentPalette.brutalMode ? 6 : 4) : (i % 2 === 0 ? 2 : 1);
        ctx.lineWidth = thick;
        ctx.beginPath();
        ctx.moveTo(imp.x + Math.cos(a) * innerR, imp.y + Math.sin(a) * innerR);
        ctx.lineTo(imp.x + Math.cos(a) * maxRad, imp.y + Math.sin(a) * maxRad);
        ctx.stroke();
      }
    }

    // 2. Kill Combo Trajectory Chain ([01] ━━▶ [02] ━━▶ [03])
    if (imp.chainTrail && imp.chainTrail.length >= 2) {
      ctx.save();
      ctx.strokeStyle = slashCol;
      ctx.lineWidth = currentPalette.brutalMode ? 5 : 3.5;
      ctx.beginPath();
      imp.chainTrail.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      ctx.strokeStyle = fgCol;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Numbered Swiss kill-node stamps along the chain
      imp.chainTrail.forEach((pt) => {
        const sx = snap(pt.x, 1);
        const sy = snap(pt.y, 1);
        ctx.fillStyle = fgCol;
        ctx.fillRect(sx - 12, sy - 12, 24, 24);
        ctx.fillStyle = bgCol;
        ctx.fillRect(sx - 9, sy - 9, 18, 18);
        ctx.fillStyle = slashCol;
        ctx.font = "900 10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(padNum(pt.num, 2), sx, sy + 1);
      });
      ctx.restore();
    }

    // 3. Escalating Multi-Slash Cuts (1 slash -> ✕ Cross -> Tri-Fracture -> 4-Axis Severance)
    const slashCount = Math.min(4, Math.max(1, imp.tier));
    for (let s = 0; s < slashCount; s++) {
      ctx.save();
      ctx.translate(imp.x + tx, imp.y + ty);
      const offsetAngle = s === 0 ? 0 : (s * Math.PI) / slashCount;
      ctx.rotate(imp.angle + offsetAngle);
      const baseH = s === 0 ? 15 : 8;
      const slashH = Math.max(3, baseH * (currentPalette.brutalMode ? 1.35 : 1));
      ctx.fillStyle = s === 0 ? slashCol : fgCol;
      ctx.fillRect(-maxRad, -slashH / 2, maxRad * 2, slashH);
      ctx.fillStyle = s === 0 ? fgCol : slashCol;
      ctx.fillRect(-maxRad, -1, maxRad * 2, 2);
      ctx.restore();
    }

    // 4. Stark Focal Geometry
    const focalR = 38 + imp.tier * 10 + (inHold ? (1 - holdRatio) * 20 : step * 14);
    ctx.strokeStyle = fgCol;
    ctx.lineWidth = currentPalette.brutalMode ? 5 : 3;
    if (currentPalette.brutalMode) {
      ctx.strokeRect(snap(imp.x + tx - focalR, 1), snap(imp.y + ty - focalR, 1), focalR * 2, focalR * 2);
      ctx.fillStyle = slashCol;
      ctx.fillRect(0, HUD_TOP, width, 6);
      ctx.fillRect(0, height - HUD_BOT - 6, width, 6);
    } else {
      ctx.beginPath();
      ctx.arc(snap(imp.x + tx, 1), snap(imp.y + ty, 1), focalR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(imp.x - focalR - 28, imp.y); ctx.lineTo(imp.x + focalR + 28, imp.y);
      ctx.moveTo(imp.x, imp.y - focalR - 28); ctx.lineTo(imp.x, imp.y + focalR + 28);
      ctx.stroke();
    }

    // 5. 1-Bit High-Contrast Silhouettes (Solo or 1v1 Duel pilots!)
    if ((mode === "duel" || mode === "duel_over") && duel) {
      [duel.p1, duel.p2].forEach((p) => {
        if (p.respawnTimer > 0) return;
        const sp = duelToScreen(p.x, p.y);
        drawPixelSprite(
          PIXEL_SPRITES[p.skin] || PIXEL_SPRITES.vector,
          sp.x + tx,
          sp.y + ty,
          p.angle,
          4.6,
          fgCol,
          slashCol
        );
      });
    } else if (player) {
      drawPixelSprite(
        PIXEL_SPRITES[profile.skin] || PIXEL_SPRITES.vector,
        player.x + tx,
        player.y + ty,
        player.angle,
        4.6,
        fgCol,
        slashCol
      );
    }
    for (const e of enemies) {
      const sprite = PIXEL_SPRITES[e.type];
      if (!sprite) continue;
      drawPixelSprite(sprite, e.x, e.y, e.angle, e.type === "warden" ? 7.5 : 3.8, fgCol, bgCol);
    }

    // 6. Monolithic Kinetic Typography & Hold-Tension Bar
    ctx.save();
    const fontSize = Math.min(92, Math.max(36, Math.floor(width * 0.08)));
    ctx.font = `900 ${fontSize}px ${currentPalette.brutalMode ? "'Arial Black', Impact, sans-serif" : "'Helvetica Neue', Helvetica, Arial, sans-serif"}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    const stampY = height - HUD_BOT - 34;
    ctx.fillStyle = bgCol;
    ctx.fillText(`// ${imp.label}`, 24 + tx, stampY + 4 + ty);
    ctx.fillStyle = slashCol;
    ctx.fillText(`// ${imp.label}`, 20 + tx, stampY + ty);

    if (imp.sublabel) {
      ctx.font = "900 13px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = fgCol;
      ctx.fillText(imp.sublabel, 22, height - HUD_BOT - 12);
    }

    // Giant framed Chain Numeral on Tier 2+ Kill Combos
    if (imp.tier >= 2) {
      ctx.font = "900 120px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillStyle = fgCol;
      ctx.fillText(`×${padNum(imp.tier, 2)}`, width - 20 + tx, HUD_TOP + 16 + ty);
    }

    // Coiled Hold-Tension Bar across top of arena
    const barW = Math.round(width * holdRatio);
    ctx.fillStyle = slashCol;
    ctx.fillRect(0, HUD_TOP, barW, 5);
    ctx.restore();

    ctx.restore();
  }

  function render() {
    if (impactFrame) {
      renderImpactFrame();
      return;
    }

    ctx.save();
    if (shake > 0.25) {
      ctx.translate(Math.round((Math.random() - 0.5) * shake), Math.round((Math.random() - 0.5) * shake));
    }

    drawSwissGrid();

    if (mode === "start" || mode === "room" || (mode === "settings" && settingsReturnMode === "start")) {
      renderAttract();
      ctx.restore();
      return;
    }

    if (mode === "duel" || mode === "duel_over") {
      renderDuel();
      ctx.restore();
      return;
    }

    // Rail Echo Beams
    for (const b of railBeams) {
      const a = clamp(b.life / b.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.strokeStyle = getAccent();
      ctx.lineWidth = b.width * a;
      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(b.x2, b.y2);
      ctx.stroke();
      ctx.restore();
    }

    // Expanding Square Hazard Pulses (Sentinels & Wardens)
    for (const p of hazardPulses) {
      const a = clamp(1 - p.r / p.maxR, 0.15, 0.9);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = currentPalette.brutalMode ? 3 : 2;
      ctx.setLineDash([8, 4]);
      const sz = Math.round(p.r);
      ctx.strokeRect(snap(p.x, 1) - sz, snap(p.y, 1) - sz, sz * 2, sz * 2);
      ctx.restore();
    }

    // Shockwave Rings
    for (const r of rings) {
      ctx.save();
      ctx.globalAlpha = clamp(r.alpha, 0, 1);
      ctx.strokeStyle = r.color;
      ctx.lineWidth = r.width;
      ctx.setLineDash(currentPalette.brutalMode ? [10, 4] : [6, 4]);
      if (currentPalette.brutalMode) {
        const sz = Math.round(r.r);
        ctx.strokeRect(snap(r.x, 1) - sz, snap(r.y, 1) - sz, sz * 2, sz * 2);
      } else {
        ctx.beginPath();
        ctx.arc(snap(r.x, 1), snap(r.y, 1), Math.round(r.r), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Spawn Telegraphs
    for (const s of spawns) {
      const p = 1 - s.timer / s.maxTimer;
      const box = Math.round(lerp(s.type === "warden" ? 46 : 26, s.type === "warden" ? 22 : 10, p));
      const col = enemyColor(s.type);
      const sx = snap(s.x, 1);
      const sy = snap(s.y, 1);
      ctx.save();
      ctx.strokeStyle = col;
      ctx.fillStyle = col;
      ctx.lineWidth = s.type === "warden" || currentPalette.brutalMode ? 3 : 2;
      const arm = s.type === "warden" ? 10 : 6;
      ctx.beginPath();
      ctx.moveTo(sx - box, sy - box + arm); ctx.lineTo(sx - box, sy - box); ctx.lineTo(sx - box + arm, sy - box);
      ctx.moveTo(sx + box - arm, sy - box); ctx.lineTo(sx + box, sy - box); ctx.lineTo(sx + box, sy - box + arm);
      ctx.moveTo(sx - box, sy + box - arm); ctx.lineTo(sx - box, sy + box); ctx.lineTo(sx - box + arm, sy + box);
      ctx.moveTo(sx + box - arm, sy + box); ctx.lineTo(sx + box, sy + box); ctx.lineTo(sx + box, sy + box - arm);
      ctx.stroke();

      ctx.font = "900 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(s.type === "warden" ? "WARDEN" : "+", sx, sy);
      ctx.restore();
    }

    // Starlight Shards
    for (const s of shards) {
      const fade = s.life < 2 ? s.life / 2 : 1;
      ctx.save();
      ctx.globalAlpha = fade;
      if (useAsciiRender()) {
        ctx.fillStyle = currentPalette.ink;
        ctx.font = "900 16px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.bonus ? "★" : "✦", snap(s.x, 1), snap(s.y, 1));
      } else {
        drawPixelSprite(PIXEL_SPRITES.shard, s.x, s.y, s.phase * 0.4, s.bonus ? 3 : 2.5, currentPalette.gold, currentPalette.ink);
      }
      ctx.restore();
    }

    // Nova Pulse Orbs
    for (const n of novas) {
      const fade = n.life < 2 ? n.life / 2 : 1;
      const nx = snap(n.x, 1);
      const ny = snap(n.y, 1);
      const pulse = Math.round(Math.sin(n.phase) * 3);
      ctx.save();
      ctx.globalAlpha = fade;
      ctx.strokeStyle = currentPalette.secondary;
      ctx.lineWidth = currentPalette.brutalMode ? 3 : 2;
      ctx.strokeRect(nx - 12 - pulse, ny - 12 - pulse, 24 + pulse * 2, 24 + pulse * 2);
      ctx.fillStyle = currentPalette.secondary;
      ctx.font = "900 12px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("N", nx, ny + 1);
      ctx.restore();
    }

    // Enemies
    for (const e of enemies) {
      const col = enemyColor(e.type);

      if (e.type === "lancer" && e.state === "aim") {
        ctx.save();
        ctx.translate(snap(e.x, 1), snap(e.y, 1));
        ctx.rotate(e.angle);
        ctx.strokeStyle = col;
        ctx.lineWidth = currentPalette.brutalMode ? 2 : 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.lineTo(310, 0);
        ctx.stroke();
        ctx.restore();
      }

      if (useAsciiRender()) {
        ctx.save();
        ctx.translate(snap(e.x, 1), snap(e.y, 1));
        ctx.rotate(e.angle);
        ctx.fillStyle = col;
        ctx.font = e.type === "warden"
          ? "900 28px ui-monospace, SFMono-Regular, Menlo, monospace"
          : "900 18px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const glyph =
          e.type === "warden"
            ? "[█]"
            : e.type === "seeker"
            ? "▲"
            : e.type === "orbiter"
            ? "◆"
            : e.type === "sentinel"
            ? "◎"
            : "»";
        ctx.fillText(glyph, 0, 1);
        ctx.restore();
      } else {
        const sprite = PIXEL_SPRITES[e.type];
        const pxSize = e.type === "warden" ? 7 : 3.5;
        drawPixelSprite(sprite, e.x, e.y, e.angle, pxSize, col, currentPalette.gold);
      }

      // Warden ASCII HP bar
      if (e.type === "warden") {
        ctx.save();
        ctx.font = "900 11px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = currentPalette.ink;
        const bar = `[${"█".repeat(e.hp)}${"░".repeat(Math.max(0, e.maxHp - e.hp))}]`;
        ctx.fillText(bar, snap(e.x, 1), snap(e.y - 34, 1));
        ctx.restore();
      }
    }

    // Player, Trail, Aim Tick, Shield, Drones
    if (player && mode !== "gameover") {
      const skinObj = SKINS.find((s) => s.id === profile.skin) || SKINS[0];
      for (let i = 0; i < player.trail.length; i += 2) {
        const pt = player.trail[i];
        const t = (i + 1) / player.trail.length;
        ctx.save();
        ctx.globalAlpha = t * (player.dashTime > 0 ? 0.9 : 0.38);
        ctx.fillStyle = player.dashTime > 0 ? getAccent() : currentPalette.ink;
        if (skinObj.trailType === "ascii" || useAsciiRender()) {
          ctx.font = "700 11px ui-monospace, SFMono-Regular, Menlo, monospace";
          ctx.fillText(t > 0.6 ? ":" : "·", snap(pt.x, 1), snap(pt.y, 1));
        } else if (skinObj.trailType === "halftone") {
          ctx.font = "700 12px ui-monospace, SFMono-Regular, Menlo, monospace";
          ctx.fillText(t > 0.65 ? "▓" : t > 0.35 ? "▒" : "░", snap(pt.x, 1) - 4, snap(pt.y, 1) + 4);
        } else if (skinObj.trailType === "hazard") {
          ctx.fillStyle = i % 4 === 0 ? currentPalette.gold : currentPalette.ink;
          const sz = Math.max(3, Math.round(t * (player.dashTime > 0 ? 10 : 6)));
          ctx.fillRect(snap(pt.x, 1) - sz / 2, snap(pt.y, 1) - sz / 2, sz, sz);
        } else if (skinObj.trailType === "cross") {
          ctx.fillRect(snap(pt.x, 1) - 3, snap(pt.y, 1), 6, 1);
          ctx.fillRect(snap(pt.x, 1), snap(pt.y, 1) - 3, 1, 6);
        } else {
          const sz = Math.max(2, Math.round(t * (player.dashTime > 0 ? 8 : 5)));
          ctx.fillRect(snap(pt.x, 1) - sz / 2, snap(pt.y, 1) - sz / 2, sz, sz);
        }
        ctx.restore();
      }

      // Subtle dash aim tick when at least 1 dash charge is ready
      if (player.dashCharges >= 1 && player.dashTime <= 0) {
        const ax = player.x + Math.cos(player.angle) * 24;
        const ay = player.y + Math.sin(player.angle) * 24;
        ctx.save();
        ctx.fillStyle = getAccent();
        ctx.fillRect(snap(ax, 1) - 2, snap(ay, 1) - 2, 4, 4);
        ctx.restore();
      }

      for (const img of player.afterimages) {
        drawPlayerCraft(img.x, img.y, img.angle, img.alpha * 0.4, true);
      }

      if (player.shield > 0) {
        ctx.save();
        ctx.strokeStyle = currentPalette.secondary;
        ctx.lineWidth = currentPalette.brutalMode ? 2.5 : 1.5;
        ctx.setLineDash([4, 3]);
        ctx.strokeRect(snap(player.x, 1) - 22, snap(player.y, 1) - 22, 44, 44);
        ctx.restore();
      }

      const droneCount = perkLvl("drone");
      if (droneCount > 0) {
        const orbitR = 56;
        ctx.save();
        ctx.strokeStyle = currentPalette.grid;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.arc(snap(player.x, 1), snap(player.y, 1), orbitR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        for (let d = 0; d < droneCount; d++) {
          const a = player.droneAngle + (d * Math.PI * 2) / droneCount;
          const dx = snap(player.x + Math.cos(a) * orbitR, 1);
          const dy = snap(player.y + Math.sin(a) * orbitR, 1);
          ctx.fillStyle = currentPalette.secondary;
          ctx.fillRect(dx - 5, dy - 5, 10, 10);
          ctx.fillStyle = currentPalette.gold;
          ctx.fillRect(dx - 2, dy - 2, 4, 4);
        }
        ctx.restore();
      }

      if (player.invulnTime > 0 && player.dashTime <= 0) {
        ctx.save();
        ctx.strokeStyle = currentPalette.ink;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(snap(player.x, 1) - 18, snap(player.y, 1) - 18, 36, 36);
        ctx.restore();
      }

      drawPlayerCraft(player.x, player.y, player.angle, 1, player.dashTime > 0);
    }

    // Particles
    for (const p of particles) {
      const a = clamp(p.life / p.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      if (p.char) {
        ctx.font = "900 12px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(p.char, snap(p.x, 1), snap(p.y, 1));
      } else {
        const s = Math.max(2, Math.round(p.size * a));
        ctx.fillRect(snap(p.x, 1), snap(p.y, 1), s, s);
      }
      ctx.restore();
    }

    // Score & Combat Popups
    ctx.save();
    ctx.font = "900 12px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "center";
    for (const p of popups) {
      ctx.globalAlpha = clamp(p.life / p.maxLife, 0, 1);
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, snap(p.x, 1), snap(p.y, 1));
    }
    ctx.restore();

    // Crisp Wave Announcement Banner
    if (waveBanner.timer > 0) {
      const alpha = clamp(waveBanner.timer * 1.4, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      const bw = Math.min(380, width - 40);
      const bx = Math.round((width - bw) / 2);
      const by = HUD_TOP + 22;
      ctx.fillStyle = currentPalette.ink;
      ctx.fillRect(bx + 4, by + 4, bw, 48);
      ctx.fillStyle = currentPalette.bg;
      ctx.fillRect(bx, by, bw, 48);
      ctx.strokeStyle = currentPalette.ink;
      ctx.lineWidth = currentPalette.brutalMode ? 3 : 2;
      ctx.strokeRect(bx, by, bw, 48);

      ctx.fillStyle = getAccent();
      ctx.font = "900 16px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillText(waveBanner.text, width / 2, by + 22);
      ctx.fillStyle = currentPalette.ink;
      ctx.font = "800 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText(waveBanner.sub, width / 2, by + 39);
      ctx.restore();
    }

    ctx.restore();
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------
  window.addEventListener("resize", resize);

  window.addEventListener("keydown", (e) => {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
      if (e.code === "Escape" && mode === "room") closeRoomOverlay();
      return;
    }

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
      e.preventDefault();
    }

    if (e.code === "KeyM") {
      sound.toggleMute();
      return;
    }

    if (mode === "room") {
      if (e.code === "Escape") closeRoomOverlay();
      return;
    }

    if (e.code === "Comma") {
      if (mode === "settings") closeSettings();
      else if (mode === "start" || mode === "playing" || mode === "paused") openSettings();
      return;
    }

    if (mode === "settings") {
      if (e.code === "Escape") closeSettings();
      return;
    }

    if (mode === "draft") {
      if (e.code === "Digit1") selectPerk(0);
      if (e.code === "Digit2") selectPerk(1);
      if (e.code === "Digit3") selectPerk(2);
      return;
    }

    if (e.code === "KeyP" || e.code === "Escape") {
      if (mode === "playing") pauseGame();
      else if (mode === "paused") resumeGame();
      return;
    }

    if (mode === "paused" && e.code === "KeyR") {
      startRun();
      return;
    }

    if (mode === "start" && (e.code === "Space" || e.code === "Enter")) {
      startRun();
      return;
    }

    if (mode === "gameover" && (e.code === "Space" || e.code === "Enter" || e.code === "KeyR")) {
      startRun();
      return;
    }

    if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
      if (profile.settings.inputMode !== "mouse") {
        controlMode = "keyboard";
      }
    }

    keys.add(e.code);

    if ((mode === "playing" || mode === "duel") && (e.code === "Space" || e.code === "ShiftLeft" || e.code === "ShiftRight")) {
      if (mode === "playing") triggerDash();
      else queueLocalDuelDash();
    }
  });

  window.addEventListener("keyup", (e) => keys.delete(e.code));

  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    if (profile.settings.inputMode !== "keyboard") {
      controlMode = "mouse";
    }
  });

  canvas.addEventListener("pointerdown", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    if (profile.settings.inputMode !== "keyboard") {
      controlMode = "mouse";
    }
    if (mode === "playing") triggerDash();
    else if (mode === "duel") queueLocalDuelDash();
  });

  // Settings controls wiring
  document.querySelectorAll("#settings-overlay .seg-group").forEach((group) => {
    const key = group.getAttribute("data-setting");
    group.querySelectorAll(".seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const raw = btn.getAttribute("data-val");
        let parsed = raw;
        if (raw === "true") parsed = true;
        else if (raw === "false") parsed = false;
        else if (!Number.isNaN(Number(raw)) && raw !== "") parsed = Number(raw);
        profile.settings[key] = parsed;
        saveProfile();
        syncSettingsEffects();
        sound.click(700);
        renderSettingsUI();
      });
    });
  });

  // Accent color swatch wiring
  document.querySelectorAll("#accent-swatches .accent-dot").forEach((btn) => {
    btn.addEventListener("click", () => {
      profile.settings.accentOverride = btn.getAttribute("data-val") || "auto";
      saveProfile();
      syncSettingsEffects();
      sound.click(740);
      renderSettingsUI();
    });
  });

  volumeSlider.addEventListener("input", () => {
    profile.settings.volume = Number(volumeSlider.value);
    volReadout.textContent = `${profile.settings.volume}%`;
    sound.syncVolume();
    saveProfile();
  });

  volumeSlider.addEventListener("change", () => {
    sound.click(660);
  });

  resetSettingsBtn.addEventListener("click", () => {
    profile.settings = { ...DEFAULT_SETTINGS };
    saveProfile();
    syncSettingsEffects();
    sound.click(520);
    renderSettingsUI();
  });

  wipeSaveBtn.addEventListener("click", () => {
    if (!wipeArmed) {
      wipeArmed = true;
      wipeSaveBtn.classList.add("armed");
      wipeSaveBtn.textContent = "CONFIRM WIPE?";
      sound.click(360);
      return;
    }
    profile.bestScore = 0;
    profile.bestWave = 1;
    profile.bestCombo = 1;
    profile.totalShattered = 0;
    if (!SKINS.find((s) => s.id === profile.skin)?.unlocked(profile)) {
      profile.skin = "vector";
    }
    saveProfile();
    sound.click(280);
    renderSettingsUI();
    renderArchiveUI();
  });

  openSettingsBtn.addEventListener("click", openSettings);
  pauseSettingsBtn.addEventListener("click", openSettings);
  hudSettingsBtn.addEventListener("click", openSettings);
  closeSettingsBtn.addEventListener("click", closeSettings);

  startBtn.addEventListener("click", startRun);
  retryBtn.addEventListener("click", startRun);
  resumeBtn.addEventListener("click", resumeGame);
  restartPauseBtn.addEventListener("click", startRun);
  menuPauseBtn.addEventListener("click", openMenu);
  menuOverBtn.addEventListener("click", openMenu);
  muteBtn.addEventListener("click", () => sound.toggleMute());
  pauseBtn.addEventListener("click", () => {
    if (mode === "playing") pauseGame();
    else if (mode === "paused") resumeGame();
  });

  // ===========================================================================
  // ONLINE 1V1 VERSUS (PRIVATE ROOMS + DASH-CLASH PVP + SCORE DUEL)
  // ===========================================================================
  const DUEL_W = 960;
  const DUEL_H = 600;

  const net = {
    ws: null,
    connected: false,
    connecting: false,
    role: null, // "host" | "guest"
    roomCode: null,
    roomState: null,
    pingMs: 0,
    pingInterval: null,
    stateSendAccum: 0,
    inputSendAccum: 0,
    pendingAction: null,
  };

  let duel = null;
  const localDuelInput = { ax: 0, ay: 0, mouseX: DUEL_W / 2, mouseY: DUEL_H / 2, useMouse: false, dashQueued: false };
  const remoteGuestInput = { ax: 0, ay: 0, mouseX: DUEL_W * 0.78, mouseY: DUEL_H / 2, useMouse: false, dashQueued: false };

  function defaultServerUrl() {
    if (profile.serverUrl) return profile.serverUrl;
    if (window.location.protocol === "https:") return `wss://${window.location.host}`;
    if (window.location.protocol === "http:" && window.location.host) return `ws://${window.location.host}`;
    return "ws://localhost:3000";
  }

  function getDuelTransform() {
    const padTop = 76;
    const padBot = 24;
    const padSide = 24;
    const availW = Math.max(200, width - padSide * 2);
    const availH = Math.max(160, height - padTop - padBot);
    const scale = Math.min(availW / DUEL_W, availH / DUEL_H);
    const ox = Math.floor((width - DUEL_W * scale) / 2);
    const oy = Math.floor(padTop + (availH - DUEL_H * scale) / 2);
    return { scale, ox, oy };
  }

  function screenToDuel(sx, sy) {
    const tf = getDuelTransform();
    return {
      x: clamp((sx - tf.ox) / tf.scale, 0, DUEL_W),
      y: clamp((sy - tf.oy) / tf.scale, 0, DUEL_H),
    };
  }

  function duelToScreen(dx, dy) {
    const tf = getDuelTransform();
    return { x: tf.ox + dx * tf.scale, y: tf.oy + dy * tf.scale };
  }

  function showRoomError(msg) {
    if (!msg) {
      roomErrorEl.classList.add("hidden");
      roomErrorEl.textContent = "";
    } else {
      roomErrorEl.textContent = msg;
      roomErrorEl.classList.remove("hidden");
    }
  }

  function setNetStatus(text) {
    netStatusPill.textContent = text;
  }

  function netSend(obj) {
    if (net.ws && net.ws.readyState === WebSocket.OPEN) {
      net.ws.send(JSON.stringify(obj));
    }
  }

  function connectSocket(onReady) {
    const rawUrl = (serverUrlInput.value || defaultServerUrl()).trim();
    const wsUrl = rawUrl
      .replace(/^https:\/\//i, "wss://")
      .replace(/^http:\/\//i, "ws://");

    profile.serverUrl = wsUrl;
    profile.callsign = (callsignInput.value || profile.callsign || "PILOT-01").toUpperCase().slice(0, 12);
    saveProfile();

    if (net.ws && net.ws.readyState === WebSocket.OPEN && net.ws.url.startsWith(wsUrl)) {
      if (onReady) onReady();
      return;
    }

    if (net.ws) {
      try { net.ws.close(); } catch {}
    }

    showRoomError("");
    setNetStatus("CONNECTING...");
    net.connecting = true;
    net.pendingAction = onReady || null;

    let ws;
    try {
      ws = new WebSocket(wsUrl);
    } catch {
      net.connecting = false;
      setNetStatus("OFFLINE");
      showRoomError("INVALID SERVER URL — USE ws:// OR wss://");
      return;
    }

    net.ws = ws;
    const timeout = setTimeout(() => {
      if (net.connecting) {
        try { ws.close(); } catch {}
        net.connecting = false;
        setNetStatus("TIMEOUT");
        showRoomError("COULD NOT REACH SERVER. START server.js OR CHECK SERVER URL (SEE DEPLOY.MD).");
      }
    }, 6000);

    ws.addEventListener("open", () => {
      clearTimeout(timeout);
      net.connecting = false;
      net.connected = true;
      setNetStatus("ONLINE");
      if (net.pingInterval) clearInterval(net.pingInterval);
      net.pingInterval = setInterval(() => {
        netSend({ type: "ping", t: performance.now() });
      }, 2500);
      netSend({ type: "ping", t: performance.now() });
      if (net.pendingAction) {
        const fn = net.pendingAction;
        net.pendingAction = null;
        fn();
      }
    });

    ws.addEventListener("message", (ev) => {
      let msg;
      try { msg = JSON.parse(ev.data); } catch { return; }
      handleNetMessage(msg);
    });

    ws.addEventListener("close", () => {
      clearTimeout(timeout);
      net.connecting = false;
      net.connected = false;
      if (net.pingInterval) clearInterval(net.pingInterval);
      setNetStatus("OFFLINE");
      if (mode === "duel" || mode === "duel_over") {
        duelHudEl.classList.add("hidden");
        duelOverOverlay.classList.add("hidden");
        openRoomOverlay("DISCONNECTED FROM SERVER");
      } else if (net.roomCode) {
        net.roomCode = null;
        net.roomState = null;
        renderLobbyView();
        showRoomError("DISCONNECTED FROM SERVER");
      }
    });

    ws.addEventListener("error", () => {
      if (net.connecting) {
        clearTimeout(timeout);
        net.connecting = false;
        setNetStatus("ERROR");
        showRoomError("SERVER UNREACHABLE. RUN `npm start` LOCALLY OR DEPLOY FREE ON RENDER (DEPLOY.MD).");
      }
    });
  }

  function handleNetMessage(msg) {
    if (msg.type === "pong") {
      net.pingMs = Math.max(1, Math.round(performance.now() - msg.t));
      duelPingEl.textContent = `${net.pingMs}MS`;
      return;
    }

    if (msg.type === "error") {
      showRoomError(msg.message || "ROOM ERROR");
      return;
    }

    if (msg.type === "room_state") {
      net.role = msg.role;
      net.roomCode = msg.code;
      net.roomState = msg;
      showRoomError("");
      renderLobbyView();
      return;
    }

    if (msg.type === "peer_left") {
      if (mode === "duel" || mode === "duel_over") {
        duelHudEl.classList.add("hidden");
        duelOverOverlay.classList.add("hidden");
        openRoomOverlay(msg.promoted ? "HOST LEFT — YOU ARE NOW HOST" : "OPPONENT LEFT THE ROOM");
      } else {
        showRoomError(msg.promoted ? "HOST LEFT — YOU ARE NOW HOST" : "OPPONENT LEFT THE ROOM");
      }
      return;
    }

    if (msg.type === "start_match") {
      startDuelMatch(msg.settings, msg.hostInfo, msg.guestInfo);
      return;
    }

    if (msg.type === "input" && net.role === "host" && duel) {
      remoteGuestInput.ax = msg.ax || 0;
      remoteGuestInput.ay = msg.ay || 0;
      remoteGuestInput.mouseX = typeof msg.mx === "number" ? msg.mx : remoteGuestInput.mouseX;
      remoteGuestInput.mouseY = typeof msg.my === "number" ? msg.my : remoteGuestInput.mouseY;
      remoteGuestInput.useMouse = !!msg.um;
      if (msg.dash) remoteGuestInput.dashQueued = true;
      return;
    }

    if (msg.type === "state" && net.role === "guest" && duel) {
      applyGuestSnapshot(msg);
      return;
    }

    if (msg.type === "event" && duel) {
      handleDuelEvent(msg);
      return;
    }

    if (msg.type === "match_over" && duel) {
      finishDuelUI(msg);
      return;
    }

    if (msg.type === "rematch_vote" && net.role === "host" && mode === "duel_over") {
      hostLaunchMatch();
    }
  }

  function openRoomOverlay(errMsg = "") {
    sound.click(640);
    mode = "room";
    startOverlay.classList.add("hidden");
    pauseOverlay.classList.add("hidden");
    gameoverOverlay.classList.add("hidden");
    duelOverOverlay.classList.add("hidden");
    hudEl.classList.add("hidden");
    duelHudEl.classList.add("hidden");
    telemetryEl.classList.add("hidden");

    callsignInput.value = profile.callsign || "PILOT-01";
    serverUrlInput.value = defaultServerUrl();
    showRoomError(errMsg);
    renderLobbyView();
    roomOverlay.classList.remove("hidden");
  }

  function closeRoomOverlay() {
    if (net.roomCode) {
      netSend({ type: "leave_room" });
      net.roomCode = null;
      net.roomState = null;
    }
    openMenu();
  }

  function renderLobbyView() {
    const inRoom = Boolean(net.roomCode && net.roomState);
    roomConnectView.classList.toggle("hidden", inRoom);
    roomLobbyView.classList.toggle("hidden", !inRoom);
    if (!inRoom) return;

    const rs = net.roomState;
    lobbyCodeVal.textContent = rs.code;
    slotHostName.textContent = rs.host ? rs.host.name : "---";
    slotHostMeta.textContent = rs.host
      ? `${rs.host.skin.toUpperCase()} · ${rs.host.ready ? "READY ■" : "STANDING BY"}`
      : "WAITING";
    slotHostMeta.classList.toggle("ready", Boolean(rs.host && rs.host.ready));

    slotGuestName.textContent = rs.guest ? rs.guest.name : "WAITING FOR FRIEND...";
    slotGuestMeta.textContent = rs.guest
      ? `${rs.guest.skin.toUpperCase()} · ${rs.guest.ready ? "READY ■" : "STANDING BY"}`
      : "SHARE CODE OR INVITE LINK";
    slotGuestMeta.classList.toggle("ready", Boolean(rs.guest && rs.guest.ready));

    const isHost = net.role === "host";
    roomModeSeg.querySelectorAll(".seg-btn").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-rmode") === rs.settings.mode);
      b.disabled = !isHost;
    });
    roomHazardsSeg.querySelectorAll(".seg-btn").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-rhaz") === String(rs.settings.hazards));
      b.disabled = !isHost;
    });

    const myReady = isHost ? Boolean(rs.host && rs.host.ready) : Boolean(rs.guest && rs.guest.ready);
    lobbyReadyBtn.textContent = myReady ? "READY ■ (UNREADY)" : "READY UP";

    const hasBoth = Boolean(rs.host && rs.guest);
    if (isHost) {
      lobbyStartBtn.disabled = !hasBoth;
      lobbyStartBtn.textContent = hasBoth ? "START 1V1 MATCH" : "WAITING FOR P2...";
    } else {
      lobbyStartBtn.disabled = true;
      lobbyStartBtn.textContent = hasBoth ? "HOST STARTS MATCH" : "CONNECTING...";
    }
  }

  function hostLaunchMatch() {
    if (net.role !== "host" || !net.roomState || !net.roomState.guest) return;
    const settings = { ...net.roomState.settings };
    const hostInfo = { name: net.roomState.host.name, skin: net.roomState.host.skin };
    const guestInfo = { name: net.roomState.guest.name, skin: net.roomState.guest.skin };
    netSend({ type: "start_match", settings, hostInfo, guestInfo });
    startDuelMatch(settings, hostInfo, guestInfo);
  }

  function makeDuelPilot(side, info) {
    const isP1 = side === "p1";
    return {
      side,
      name: info.name || (isP1 ? "P1" : "P2"),
      skin: info.skin || "vector",
      x: isP1 ? DUEL_W * 0.22 : DUEL_W * 0.78,
      y: DUEL_H * 0.5,
      vx: 0,
      vy: 0,
      angle: isP1 ? 0 : Math.PI,
      radius: 14,
      dashCharges: 2,
      maxDash: 2,
      dashTime: 0,
      dashDuration: 0.19,
      dashDirX: isP1 ? 1 : -1,
      dashDirY: 0,
      invulnTime: 1.1,
      respawnTimer: 0,
      shield: 0,
      shardCharge: 0,
      ko: 0,
      score: 0,
      trail: [],
    };
  }

  function startDuelMatch(settings, hostInfo, guestInfo) {
    sound.ensure();
    sound.playWaveClear();
    mode = "duel";
    impactFrame = null;
    hitstop = 0;
    shake = 0;
    particles = [];
    rings = [];
    popups = [];

    duel = {
      mode: settings.mode === "score" ? "score" : "duel",
      targetKOs: settings.targetKOs || 5,
      hazardsEnabled: settings.hazards !== false,
      timeLeft: 90,
      clashes: 0,
      clashCooldown: 0,
      p1: makeDuelPilot("p1", hostInfo),
      p2: makeDuelPilot("p2", guestInfo),
      shards: [],
      hazards: [],
      novas: [],
      shardTimer: 0.4,
      hazardTimer: 3.5,
      novaTimer: 16,
    };

    if (net.role === "host") {
      for (let i = 0; i < 4; i++) spawnDuelShard();
    }

    roomOverlay.classList.add("hidden");
    duelOverOverlay.classList.add("hidden");
    startOverlay.classList.add("hidden");
    hudEl.classList.add("hidden");
    telemetryEl.classList.add("hidden");
    duelHudEl.classList.remove("hidden");

    duelP1Name.textContent = duel.p1.name;
    duelP2Name.textContent = duel.p2.name;
    duelModeLabel.textContent =
      duel.mode === "score" ? "90S SCORE DUEL" : `KO DUEL // FIRST TO 0${duel.targetKOs}`;
    updateDuelHud();
    showWaveBanner(
      duel.mode === "score" ? "SCORE DUEL" : "1V1 DASH-CLASH",
      `${duel.p1.name} VS ${duel.p2.name}`
    );
  }

  function queueLocalDuelDash() {
    localDuelInput.dashQueued = true;
  }

  function collectLocalDuelInput() {
    let ax = 0;
    let ay = 0;
    if (keys.has("KeyW") || keys.has("ArrowUp")) ay -= 1;
    if (keys.has("KeyS") || keys.has("ArrowDown")) ay += 1;
    if (keys.has("KeyA") || keys.has("ArrowLeft")) ax -= 1;
    if (keys.has("KeyD") || keys.has("ArrowRight")) ax += 1;
    const dp = screenToDuel(pointer.x, pointer.y);
    localDuelInput.ax = ax;
    localDuelInput.ay = ay;
    localDuelInput.mouseX = dp.x;
    localDuelInput.mouseY = dp.y;
    localDuelInput.useMouse = controlMode === "mouse";
  }

  function spawnDuelShard() {
    duel.shards.push({
      x: rand(90, DUEL_W - 90),
      y: rand(70, DUEL_H - 70),
      r: 8,
      phase: rand(0, Math.PI * 2),
      life: 15,
    });
  }

  function spawnDuelHazard() {
    const side = Math.random() < 0.5 ? "top" : "bot";
    const x = rand(180, DUEL_W - 180);
    const y = side === "top" ? 50 : DUEL_H - 50;
    duel.hazards.push({
      type: Math.random() < 0.65 ? "seeker" : "orbiter",
      x,
      y,
      vx: rand(-90, 90),
      vy: side === "top" ? 110 : -110,
      angle: 0,
      radius: 13,
      speed: 145,
    });
  }

  function emitDuelEvent(ev) {
    handleDuelEvent(ev);
    if (net.role === "host") {
      netSend({ type: "event", ...ev });
    }
  }

  function handleDuelEvent(ev) {
    const sp = duelToScreen(ev.x, ev.y);
    if (ev.kind === "dash") {
      sound.playDash();
      addShake(5);
      rings.push({ x: sp.x, y: sp.y, r: 8, maxR: 48, color: ev.side === "p1" ? getAccent() : currentPalette.secondary, alpha: 0.9, width: 2.5 });
      spawnBurst(sp.x, sp.y, ev.side === "p1" ? getAccent() : currentPalette.secondary, 8, 160, true);
    } else if (ev.kind === "shard") {
      sound.playPickup(ev.combo || 2);
      spawnBurst(sp.x, sp.y, currentPalette.gold, 8, 150, true);
      if (ev.label) addPopup(sp.x, sp.y - 12, ev.label, currentPalette.gold);
    } else if (ev.kind === "hazard_kill") {
      sound.playShatter(3, 1);
      addShake(8);
      spawnBurst(sp.x, sp.y, getAccent(), 14, 240, true);
      addPopup(sp.x, sp.y - 12, "+100", currentPalette.gold);
    } else if (ev.kind === "shield_break") {
      sound.playShieldBreak();
      addShake(13);
      spawnBurst(sp.x, sp.y, currentPalette.secondary, 22, 300, true);
      triggerImpactFrame({
        x: sp.x,
        y: sp.y,
        angle: ev.angle || 0,
        label: "SHIELD BREAK",
        sublabel: `${ev.victim} DEFLECTED`,
        frames: 3,
        major: true,
        tier: 3,
      });
    } else if (ev.kind === "clash") {
      sound.playNova();
      addShake(16);
      spawnBurst(sp.x, sp.y, currentPalette.gold, 28, 340, true);
      spawnBurst(sp.x, sp.y, getAccent(), 16, 260, true);
      triggerImpactFrame({
        x: sp.x,
        y: sp.y,
        angle: ev.angle || 0,
        label: "DASH CLASH!!",
        sublabel: `CLASH #${padNum(ev.clashes || 1, 2)} // DASHES REFILLED`,
        frames: 4,
        major: true,
        tier: 4,
      });
    } else if (ev.kind === "ko") {
      sound.playShatter(6, 3);
      addShake(18);
      spawnBurst(sp.x, sp.y, ev.winnerSide === "p1" ? getAccent() : currentPalette.secondary, 32, 340, true);
      triggerImpactFrame({
        x: sp.x,
        y: sp.y,
        angle: ev.angle || 0,
        label: `${ev.attacker} KO!`,
        sublabel: `${ev.attacker} SHATTERED ${ev.victim}`,
        frames: 3,
        major: true,
        tier: 4,
      });
    }
  }

  function stepDuelPilot(p, inp, dt) {
    if (p.respawnTimer > 0) {
      p.respawnTimer -= dt;
      if (p.respawnTimer <= 0) {
        p.x = p.side === "p1" ? DUEL_W * 0.2 : DUEL_W * 0.8;
        p.y = rand(120, DUEL_H - 120);
        p.vx = 0;
        p.vy = 0;
        p.dashCharges = 2;
        p.invulnTime = 1.3;
      }
      return;
    }

    p.dashCharges = Math.min(p.maxDash, p.dashCharges + 0.5 * dt);
    if (p.invulnTime > 0) p.invulnTime -= dt;

    if (inp.dashQueued) {
      inp.dashQueued = false;
      if (p.dashCharges >= 1 && p.dashTime <= 0) {
        let dx = inp.ax;
        let dy = inp.ay;
        if (dx === 0 && dy === 0) {
          if (inp.useMouse) {
            dx = inp.mouseX - p.x;
            dy = inp.mouseY - p.y;
          } else {
            dx = Math.cos(p.angle);
            dy = Math.sin(p.angle);
          }
        }
        const len = Math.hypot(dx, dy);
        if (len > 0.001) { dx /= len; dy /= len; }
        else { dx = Math.cos(p.angle); dy = Math.sin(p.angle); }

        p.dashCharges = Math.max(0, p.dashCharges - 1);
        p.dashTime = p.dashDuration;
        p.dashDirX = dx;
        p.dashDirY = dy;
        p.angle = Math.atan2(dy, dx);
        emitDuelEvent({ kind: "dash", side: p.side, x: p.x, y: p.y });
      }
    }

    if (p.dashTime > 0) {
      p.dashTime -= dt;
      p.vx = p.dashDirX * 860;
      p.vy = p.dashDirY * 860;
    } else {
      const maxSpeed = 345;
      if (!inp.useMouse) {
        const mag = Math.hypot(inp.ax, inp.ay);
        if (mag > 0) {
          p.vx = lerp(p.vx, (inp.ax / mag) * maxSpeed, 1 - Math.exp(-13 * dt));
          p.vy = lerp(p.vy, (inp.ay / mag) * maxSpeed, 1 - Math.exp(-13 * dt));
          p.angle = Math.atan2(p.vy, p.vx);
        } else {
          p.vx *= Math.exp(-9.5 * dt);
          p.vy *= Math.exp(-9.5 * dt);
        }
      } else {
        const dx = inp.mouseX - p.x;
        const dy = inp.mouseY - p.y;
        const d = Math.hypot(dx, dy);
        if (d > 6) {
          const desired = Math.min(maxSpeed, d * 5.2);
          p.vx = lerp(p.vx, (dx / d) * desired, 1 - Math.exp(-14 * dt));
          p.vy = lerp(p.vy, (dy / d) * desired, 1 - Math.exp(-14 * dt));
          p.angle = Math.atan2(dy, dx);
        } else {
          p.vx *= Math.exp(-12 * dt);
          p.vy *= Math.exp(-12 * dt);
        }
      }
    }

    p.x += p.vx * dt;
    p.y += p.vy * dt;

    const pad = 20;
    if (p.x < pad) { p.x = pad; p.vx = Math.abs(p.vx) * 0.4; }
    else if (p.x > DUEL_W - pad) { p.x = DUEL_W - pad; p.vx = -Math.abs(p.vx) * 0.4; }
    if (p.y < pad) { p.y = pad; p.vy = Math.abs(p.vy) * 0.4; }
    else if (p.y > DUEL_H - pad) { p.y = DUEL_H - pad; p.vy = -Math.abs(p.vy) * 0.4; }

    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > 12) p.trail.shift();
  }

  function resolveDuelKO(attacker, victim) {
    if (victim.shield > 0) {
      victim.shield = 0;
      victim.invulnTime = 0.85;
      const a = Math.atan2(victim.y - attacker.y, victim.x - attacker.x);
      victim.vx = Math.cos(a) * 420;
      victim.vy = Math.sin(a) * 420;
      attacker.vx = -Math.cos(a) * 320;
      attacker.vy = -Math.sin(a) * 320;
      emitDuelEvent({ kind: "shield_break", x: victim.x, y: victim.y, angle: attacker.angle, victim: victim.name });
      return;
    }

    attacker.ko += 1;
    attacker.score += 300;
    attacker.dashCharges = attacker.maxDash;
    victim.respawnTimer = 1.1;
    victim.dashTime = 0;
    victim.trail = [];

    emitDuelEvent({
      kind: "ko",
      x: victim.x,
      y: victim.y,
      angle: attacker.angle,
      attacker: attacker.name,
      victim: victim.name,
      winnerSide: attacker.side,
    });

    if (duel.mode === "duel" && attacker.ko >= duel.targetKOs) {
      concludeDuel(attacker.side);
    }
  }

  function concludeDuel(winnerSide) {
    const payload = {
      type: "match_over",
      winnerSide,
      mode: duel.mode,
      p1: { name: duel.p1.name, ko: duel.p1.ko, score: duel.p1.score },
      p2: { name: duel.p2.name, ko: duel.p2.ko, score: duel.p2.score },
      clashes: duel.clashes,
    };
    netSend(payload);
    finishDuelUI(payload);
  }

  function finishDuelUI(res) {
    mode = "duel_over";
    const iAmP1 = net.role === "host";
    const iWon = (res.winnerSide === "p1" && iAmP1) || (res.winnerSide === "p2" && !iAmP1);
    const isDraw = res.winnerSide === "draw";

    duelOverMode.textContent = res.mode === "score" ? "90S SCORE DUEL" : "KO DUEL";
    duelOverTitle.textContent = isDraw ? "DRAW" : iWon ? "VICTORY" : "DEFEAT";
    duelOverSub.textContent = isDraw
      ? "DEADLOCK"
      : `${res.winnerSide === "p1" ? res.p1.name : res.p2.name} WINS THE SECTOR`;

    duelResP1Name.textContent = res.p1.name;
    duelResP2Name.textContent = res.p2.name;
    duelResP1Val.textContent = res.mode === "score" ? padNum(res.p1.score, 5) : padNum(res.p1.ko, 2);
    duelResP2Val.textContent = res.mode === "score" ? padNum(res.p2.score, 5) : padNum(res.p2.ko, 2);
    duelResClashes.textContent = padNum(res.clashes || 0, 2);
    duelRematchBtn.textContent = net.role === "host" ? "REMATCH" : "REQUEST REMATCH";

    const delay = impactFrame
      ? Math.round((impactFrame.holdLeft + impactFrame.strobeLeft * impactFrame.frameDur) * 1000) + 250
      : 350;
    setTimeout(() => {
      if (mode === "duel_over") duelOverOverlay.classList.remove("hidden");
    }, delay);
  }

  function updateDuelHud() {
    if (!duel) return;
    duelP1Score.textContent = duel.mode === "score" ? padNum(duel.p1.score, 5) : padNum(duel.p1.ko, 2);
    duelP2Score.textContent = duel.mode === "score" ? padNum(duel.p2.score, 5) : padNum(duel.p2.ko, 2);
    duelP1Shield.classList.toggle("hidden", duel.p1.shield <= 0);
    duelP2Shield.classList.toggle("hidden", duel.p2.shield <= 0);

    if (duel.mode === "score") {
      const secs = Math.max(0, Math.ceil(duel.timeLeft));
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      duelTimerEl.textContent = `${padNum(m, 2)}:${padNum(s, 2)}`;
    } else {
      duelTimerEl.textContent = "VS";
    }
  }

  function updateDuel(dt) {
    if (!duel) return;
    if (waveBanner.timer > 0) waveBanner.timer = Math.max(0, waveBanner.timer - dt);
    collectLocalDuelInput();

    if (net.role === "guest") {
      // Send guest inputs to Host at ~60Hz
      net.inputSendAccum += dt;
      if (net.inputSendAccum >= 0.016 || localDuelInput.dashQueued) {
        net.inputSendAccum = 0;
        netSend({
          type: "input",
          ax: localDuelInput.ax,
          ay: localDuelInput.ay,
          mx: Math.round(localDuelInput.mouseX),
          my: Math.round(localDuelInput.mouseY),
          um: localDuelInput.useMouse,
          dash: localDuelInput.dashQueued,
        });
        localDuelInput.dashQueued = false;
      }
      // Subtle guest client trail smoothing
      [duel.p1, duel.p2].forEach((p) => {
        if (p.respawnTimer <= 0) {
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 12) p.trail.shift();
        }
      });
      updateDuelHud();
      return;
    }

    // HOST AUTHORITATIVE 1V1 SIMULATION
    if (duel.clashCooldown > 0) duel.clashCooldown -= dt;

    if (duel.mode === "score") {
      duel.timeLeft -= dt;
      if (duel.timeLeft <= 0) {
        duel.timeLeft = 0;
        const w = duel.p1.score > duel.p2.score ? "p1" : duel.p2.score > duel.p1.score ? "p2" : "draw";
        concludeDuel(w);
        return;
      }
    }

    stepDuelPilot(duel.p1, localDuelInput, dt);
    stepDuelPilot(duel.p2, remoteGuestInput, dt);

    // Pilot-vs-Pilot Dash-Clash & KO resolution
    const p1 = duel.p1;
    const p2 = duel.p2;
    if (p1.respawnTimer <= 0 && p2.respawnTimer <= 0) {
      const d2 = distSq(p1.x, p1.y, p2.x, p2.y);
      const hitR = p1.radius + p2.radius + (p1.dashTime > 0 || p2.dashTime > 0 ? 12 : 0);
      if (d2 <= hitR * hitR) {
        if (p1.dashTime > 0 && p2.dashTime > 0) {
          if (duel.clashCooldown <= 0) {
            duel.clashCooldown = 0.4;
            duel.clashes += 1;
            const mx = (p1.x + p2.x) / 2;
            const my = (p1.y + p2.y) / 2;
            const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            p1.dashTime = 0;
            p2.dashTime = 0;
            p1.dashCharges = p1.maxDash;
            p2.dashCharges = p2.maxDash;
            p1.invulnTime = 0.45;
            p2.invulnTime = 0.45;
            p1.vx = -Math.cos(ang) * 480;
            p1.vy = -Math.sin(ang) * 480;
            p2.vx = Math.cos(ang) * 480;
            p2.vy = Math.sin(ang) * 480;
            emitDuelEvent({ kind: "clash", x: mx, y: my, angle: ang, clashes: duel.clashes });
          }
        } else if (p1.dashTime > 0 && p2.invulnTime <= 0) {
          resolveDuelKO(p1, p2);
        } else if (p2.dashTime > 0 && p1.invulnTime <= 0) {
          resolveDuelKO(p2, p1);
        }
      }
    }

    // Starlight Shards
    duel.shardTimer -= dt;
    if (duel.shardTimer <= 0 && duel.shards.length < 5) {
      spawnDuelShard();
      duel.shardTimer = rand(1.6, 2.6);
    }

    for (let i = duel.shards.length - 1; i >= 0; i--) {
      const s = duel.shards[i];
      s.phase += dt * 4;
      s.life -= dt;
      if (s.life <= 0) { duel.shards.splice(i, 1); continue; }
      for (const p of [p1, p2]) {
        if (p.respawnTimer > 0) continue;
        if (distSq(p.x, p.y, s.x, s.y) <= (p.radius + s.r + 10) ** 2) {
          duel.shards.splice(i, 1);
          p.score += 75;
          p.dashCharges = Math.min(p.maxDash, p.dashCharges + 0.35);
          p.shardCharge += 1;
          let label = "+75";
          if (p.shardCharge >= 4 && p.shield < 1) {
            p.shardCharge = 0;
            p.shield = 1;
            label = "SHIELD READY!";
          }
          emitDuelEvent({ kind: "shard", x: s.x, y: s.y, label, combo: p.shardCharge + 1 });
          break;
        }
      }
    }

    // Optional Arena Hazards
    if (duel.hazardsEnabled) {
      duel.hazardTimer -= dt;
      if (duel.hazardTimer <= 0 && duel.hazards.length < 4) {
        spawnDuelHazard();
        duel.hazardTimer = rand(3.2, 4.8);
      }

      for (let i = duel.hazards.length - 1; i >= 0; i--) {
        const h = duel.hazards[i];
        // Track nearest alive pilot
        let target = null;
        let bestD = Infinity;
        for (const p of [p1, p2]) {
          if (p.respawnTimer > 0) continue;
          const d = distSq(h.x, h.y, p.x, p.y);
          if (d < bestD) { bestD = d; target = p; }
        }
        if (target && h.type === "seeker") {
          const a = Math.atan2(target.y - h.y, target.x - h.x);
          h.vx = lerp(h.vx, Math.cos(a) * h.speed, 1 - Math.exp(-2.6 * dt));
          h.vy = lerp(h.vy, Math.sin(a) * h.speed, 1 - Math.exp(-2.6 * dt));
        }
        h.x += h.vx * dt;
        h.y += h.vy * dt;
        h.angle = Math.atan2(h.vy, h.vx);
        if (h.x < 18 || h.x > DUEL_W - 18) h.vx *= -1;
        if (h.y < 18 || h.y > DUEL_H - 18) h.vy *= -1;

        let removed = false;
        for (const p of [p1, p2]) {
          if (p.respawnTimer > 0) continue;
          const r = p.radius + h.radius + (p.dashTime > 0 ? 10 : -2);
          if (distSq(p.x, p.y, h.x, h.y) <= r * r) {
            if (p.dashTime > 0) {
              duel.hazards.splice(i, 1);
              p.score += 100;
              p.dashCharges = Math.min(p.maxDash, p.dashCharges + 0.55);
              emitDuelEvent({ kind: "hazard_kill", x: h.x, y: h.y });
              removed = true;
              break;
            } else if (p.invulnTime <= 0) {
              duel.hazards.splice(i, 1);
              removed = true;
              const rival = p === p1 ? p2 : p1;
              if (p.shield > 0) {
                p.shield = 0;
                p.invulnTime = 0.8;
                emitDuelEvent({ kind: "shield_break", x: p.x, y: p.y, angle: h.angle, victim: p.name });
              } else {
                p.respawnTimer = 0.9;
                if (duel.mode === "score") rival.score += 100;
                emitDuelEvent({ kind: "hazard_kill", x: p.x, y: p.y });
              }
              break;
            }
          }
        }
        if (removed) continue;
      }
    }

    // Stream authoritative snapshot to Guest (~30Hz)
    net.stateSendAccum += dt;
    if (net.stateSendAccum >= 0.032) {
      net.stateSendAccum = 0;
      netSend({
        type: "state",
        t: Number(duel.timeLeft.toFixed(1)),
        cl: duel.clashes,
        p1: packPilot(p1),
        p2: packPilot(p2),
        sh: duel.shards.map((s) => [Math.round(s.x), Math.round(s.y)]),
        hz: duel.hazards.map((h) => [h.type === "seeker" ? 0 : 1, Math.round(h.x), Math.round(h.y), Number(h.angle.toFixed(2))]),
      });
    }

    updateDuelHud();
  }

  function packPilot(p) {
    return [
      Math.round(p.x),
      Math.round(p.y),
      Number(p.angle.toFixed(2)),
      Number(p.dashCharges.toFixed(2)),
      p.dashTime > 0 ? 1 : 0,
      p.invulnTime > 0 ? 1 : 0,
      Number(p.respawnTimer.toFixed(2)),
      p.shield,
      p.ko,
      p.score,
    ];
  }

  function applyGuestSnapshot(s) {
    duel.timeLeft = s.t;
    duel.clashes = s.cl;
    unpackPilot(duel.p1, s.p1);
    unpackPilot(duel.p2, s.p2);
    duel.shards = (s.sh || []).map(([x, y]) => ({ x, y, r: 8, phase: performance.now() * 0.004 }));
    duel.hazards = (s.hz || []).map(([tp, x, y, angle]) => ({
      type: tp === 0 ? "seeker" : "orbiter",
      x,
      y,
      angle,
      radius: 13,
    }));
  }

  function unpackPilot(p, arr) {
    if (!arr) return;
    p.x = lerp(p.x, arr[0], 0.55);
    p.y = lerp(p.y, arr[1], 0.55);
    p.angle = arr[2];
    p.dashCharges = arr[3];
    p.dashTime = arr[4] ? 0.1 : 0;
    p.invulnTime = arr[5] ? 0.2 : 0;
    p.respawnTimer = arr[6];
    p.shield = arr[7];
    p.ko = arr[8];
    p.score = arr[9];
  }

  function renderDuel() {
    if (!duel) return;
    const tf = getDuelTransform();
    ctx.save();
    ctx.translate(tf.ox, tf.oy);
    ctx.scale(tf.scale, tf.scale);

    // Crisp 960x600 Normalized Arena Frame
    ctx.fillStyle = currentPalette.bg;
    ctx.fillRect(0, 0, DUEL_W, DUEL_H);

    // Center court dividing line
    ctx.strokeStyle = currentPalette.cross;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(DUEL_W / 2, 0);
    ctx.lineTo(DUEL_W / 2, DUEL_H);
    ctx.stroke();
    ctx.setLineDash([]);

    // Center geometric circle/square
    ctx.strokeStyle = currentPalette.grid;
    ctx.lineWidth = 2;
    if (currentPalette.brutalMode) {
      ctx.strokeRect(DUEL_W / 2 - 58, DUEL_H / 2 - 58, 116, 116);
    } else {
      ctx.beginPath();
      ctx.arc(DUEL_W / 2, DUEL_H / 2, 62, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Outer Arena Structural Border
    ctx.strokeStyle = currentPalette.ink;
    ctx.lineWidth = currentPalette.brutalMode ? 4 : 2.5;
    ctx.strokeRect(0, 0, DUEL_W, DUEL_H);

    // Shards
    for (const s of duel.shards) {
      if (useAsciiRender()) {
        ctx.fillStyle = currentPalette.gold;
        ctx.font = "900 16px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("✦", s.x, s.y);
      } else {
        drawPixelSprite(PIXEL_SPRITES.shard, s.x, s.y, s.phase * 0.4, 2.6, currentPalette.gold, currentPalette.ink);
      }
    }

    // Neutral Hazards
    for (const h of duel.hazards) {
      const col = enemyColor(h.type);
      if (useAsciiRender()) {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.angle);
        ctx.fillStyle = col;
        ctx.font = "900 18px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(h.type === "seeker" ? "▲" : "◆", 0, 1);
        ctx.restore();
      } else {
        drawPixelSprite(PIXEL_SPRITES[h.type], h.x, h.y, h.angle, 3.4, col, currentPalette.bg);
      }
    }

    // Pilots (P1 Accent vs P2 Secondary)
    [duel.p1, duel.p2].forEach((p) => {
      if (p.respawnTimer > 0) return;
      const pCol = p.side === "p1" ? getAccent() : currentPalette.secondary;

      // Trail
      for (let i = 0; i < p.trail.length; i += 2) {
        const pt = p.trail[i];
        const t = (i + 1) / p.trail.length;
        ctx.save();
        ctx.globalAlpha = t * (p.dashTime > 0 ? 0.85 : 0.3);
        ctx.fillStyle = pCol;
        const sz = Math.max(2, Math.round(t * (p.dashTime > 0 ? 8 : 5)));
        ctx.fillRect(pt.x - sz / 2, pt.y - sz / 2, sz, sz);
        ctx.restore();
      }

      if (p.shield > 0) {
        ctx.save();
        ctx.strokeStyle = currentPalette.gold;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.strokeRect(p.x - 22, p.y - 22, 44, 44);
        ctx.restore();
      }

      if (p.invulnTime > 0) {
        ctx.save();
        ctx.strokeStyle = pCol;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x - 18, p.y - 18, 36, 36);
        ctx.restore();
      }

      const sprite = PIXEL_SPRITES[p.skin] || PIXEL_SPRITES.vector;
      if (useAsciiRender() || p.skin === "ascii0") {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.dashTime > 0 ? currentPalette.gold : pCol;
        ctx.font = "900 18px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.dashTime > 0 ? "»█»" : "[>]", 0, 1);
        ctx.restore();
      } else {
        drawPixelSprite(sprite, p.x, p.y, p.angle, 4, p.dashTime > 0 ? pCol : currentPalette.ink, pCol);
      }

      // Pilot callsign + tiny dash bar beneath ship
      ctx.save();
      ctx.font = "900 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = pCol;
      ctx.fillText(p.name, p.x, p.y - 24);
      // 2 mini dash pips under pilot
      for (let d = 0; d < 2; d++) {
        const fill = clamp(p.dashCharges - d, 0, 1);
        const bx = p.x - 15 + d * 16;
        const by = p.y + 22;
        ctx.strokeStyle = currentPalette.ink;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, 14, 4);
        ctx.fillStyle = fill >= 1 ? pCol : currentPalette.muted;
        ctx.fillRect(bx, by, Math.round(14 * fill), 4);
      }
      ctx.restore();
    });

    ctx.restore();

    // Screen-space particles, rings, popups, and wave banner on top of duel arena
    for (const r of rings) {
      ctx.save();
      ctx.globalAlpha = clamp(r.alpha, 0, 1);
      ctx.strokeStyle = r.color;
      ctx.lineWidth = r.width;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.arc(snap(r.x, 1), snap(r.y, 1), Math.round(r.r), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    for (const p of particles) {
      const a = clamp(p.life / p.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      if (p.char) {
        ctx.font = "900 12px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(p.char, snap(p.x, 1), snap(p.y, 1));
      } else {
        const s = Math.max(2, Math.round(p.size * a));
        ctx.fillRect(snap(p.x, 1), snap(p.y, 1), s, s);
      }
      ctx.restore();
    }
    ctx.save();
    ctx.font = "900 12px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "center";
    for (const p of popups) {
      ctx.globalAlpha = clamp(p.life / p.maxLife, 0, 1);
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, snap(p.x, 1), snap(p.y, 1));
    }
    ctx.restore();
  }

  // Private Room UI Event Listeners
  openRoomBtn.addEventListener("click", () => openRoomOverlay());
  closeRoomBtn.addEventListener("click", closeRoomOverlay);

  createRoomBtn.addEventListener("click", () => {
    connectSocket(() => {
      netSend({
        type: "create_room",
        name: callsignInput.value || profile.callsign,
        skin: profile.skin,
        mode: "duel",
      });
    });
  });

  joinRoomBtn.addEventListener("click", () => {
    const code = (joinCodeInput.value || "").trim().toUpperCase();
    if (code.length < 3) {
      showRoomError("ENTER A 4-LETTER ROOM CODE");
      return;
    }
    connectSocket(() => {
      netSend({
        type: "join_room",
        code,
        name: callsignInput.value || profile.callsign,
        skin: profile.skin,
      });
    });
  });

  copyLinkBtn.addEventListener("click", () => {
    if (!net.roomCode) return;
    const base = window.location.origin && window.location.origin !== "null"
      ? `${window.location.origin}${window.location.pathname}`
      : "";
    const shareText = base ? `${base}?room=${net.roomCode}` : `ROOM CODE: ${net.roomCode}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    copyLinkBtn.textContent = "COPIED ■";
    sound.click(820);
    setTimeout(() => { copyLinkBtn.textContent = "COPY INVITE LINK"; }, 1400);
  });

  leaveRoomBtn.addEventListener("click", () => {
    netSend({ type: "leave_room" });
    net.roomCode = null;
    net.roomState = null;
    renderLobbyView();
  });

  roomModeSeg.querySelectorAll(".seg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (net.role !== "host") return;
      sound.click(700);
      netSend({ type: "room_settings", mode: btn.getAttribute("data-rmode") });
    });
  });

  roomHazardsSeg.querySelectorAll(".seg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (net.role !== "host") return;
      sound.click(700);
      netSend({ type: "room_settings", hazards: btn.getAttribute("data-rhaz") === "true" });
    });
  });

  lobbyReadyBtn.addEventListener("click", () => {
    sound.click(740);
    netSend({ type: "ready_toggle" });
  });

  lobbyStartBtn.addEventListener("click", () => {
    hostLaunchMatch();
  });

  duelLeaveBtn.addEventListener("click", () => {
    duelHudEl.classList.add("hidden");
    duelOverOverlay.classList.add("hidden");
    openRoomOverlay();
  });

  duelRematchBtn.addEventListener("click", () => {
    if (net.role === "host") {
      hostLaunchMatch();
    } else {
      duelRematchBtn.textContent = "REQUEST SENT...";
      netSend({ type: "rematch_vote" });
    }
  });

  duelLobbyBtn.addEventListener("click", () => {
    duelHudEl.classList.add("hidden");
    duelOverOverlay.classList.add("hidden");
    openRoomOverlay();
  });

  // Boot
  let lastTime = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    update(dt);
    render();
    requestAnimationFrame(frame);
  }

  resize();
  applyPalette(profile.palette);
  syncSettingsEffects();
  renderArchiveUI();

  // Auto-open Private Room join panel if opened via invite link (?room=ABCD)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("room");
    if (inviteCode) {
      joinCodeInput.value = inviteCode.toUpperCase().slice(0, 6);
      openRoomOverlay();
    }
  } catch {
    // ignore URL parsing errors
  }

  requestAnimationFrame(frame);
})();
