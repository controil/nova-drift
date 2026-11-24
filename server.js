"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { WebSocketServer } = require("ws");

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const ALLOWED_FILES = new Set(["/index.html", "/style.css", "/game.js"]);

// HTTP server: serves the static game files + health check
const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];

  if (urlPath === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, rooms: rooms.size }));
    return;
  }

  const target = urlPath === "/" ? "/index.html" : urlPath;
  if (!ALLOWED_FILES.has(target)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return;
  }

  const filePath = path.join(PUBLIC_DIR, target);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
      return;
    }
    const ext = path.extname(target);
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
});

// WebSocket Private 1v1 Room Relay
const wss = new WebSocketServer({ server });

// roomCode -> { code, host, guest, settings, createdAt }
const rooms = new Map();
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateRoomCode() {
  for (let tries = 0; tries < 50; tries++) {
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    }
    if (!rooms.has(code)) return code;
  }
  return String(Math.floor(1000 + Math.random() * 9000));
}

function sendJSON(ws, payload) {
  if (ws && ws.readyState === 1) {
    ws.send(JSON.stringify(payload));
  }
}

function broadcastRoomState(room) {
  const summary = {
    type: "room_state",
    code: room.code,
    settings: room.settings,
    host: room.host
      ? { name: room.host.playerName, skin: room.host.playerSkin, ready: room.host.ready }
      : null,
    guest: room.guest
      ? { name: room.guest.playerName, skin: room.guest.playerSkin, ready: room.guest.ready }
      : null,
  };
  sendJSON(room.host, { ...summary, role: "host" });
  sendJSON(room.guest, { ...summary, role: "guest" });
}

function leaveCurrentRoom(ws) {
  const code = ws.roomCode;
  if (!code) return;
  const room = rooms.get(code);
  ws.roomCode = null;
  ws.role = null;
  ws.ready = false;
  if (!room) return;

  if (room.host === ws) {
    room.host = null;
    if (room.guest) {
      // Promote guest to host cleanly
      room.host = room.guest;
      room.guest = null;
      room.host.role = "host";
      room.host.ready = false;
      sendJSON(room.host, { type: "peer_left", promoted: true });
      broadcastRoomState(room);
    } else {
      rooms.delete(code);
    }
  } else if (room.guest === ws) {
    room.guest = null;
    if (room.host) {
      room.host.ready = false;
      sendJSON(room.host, { type: "peer_left", promoted: false });
      broadcastRoomState(room);
    } else {
      rooms.delete(code);
    }
  }
}

function sanitizeName(name, fallback) {
  const clean = String(name || "")
    .toUpperCase()
    .replace(/[^A-Z0-9 _-]/g, "")
    .trim()
    .slice(0, 12);
  return clean || fallback;
}

wss.on("connection", (ws) => {
  ws.isAlive = true;
  ws.roomCode = null;
  ws.role = null;
  ws.playerName = "PILOT";
  ws.playerSkin = "vector";
  ws.ready = false;

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (!msg || typeof msg.type !== "string") return;

    if (msg.type === "ping") {
      sendJSON(ws, { type: "pong", t: msg.t });
      return;
    }

    if (msg.type === "create_room") {
      leaveCurrentRoom(ws);
      const code = generateRoomCode();
      ws.roomCode = code;
      ws.role = "host";
      ws.playerName = sanitizeName(msg.name, "PILOT-01");
      ws.playerSkin = String(msg.skin || "vector").slice(0, 16);
      ws.ready = false;

      const room = {
        code,
        host: ws,
        guest: null,
        settings: {
          mode: msg.mode === "score" ? "score" : "duel",
          targetKOs: 5,
          hazards: true,
        },
        createdAt: Date.now(),
      };
      rooms.set(code, room);
      broadcastRoomState(room);
      return;
    }

    if (msg.type === "join_room") {
      leaveCurrentRoom(ws);
      const code = String(msg.code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
      const room = rooms.get(code);
      if (!room) {
        sendJSON(ws, { type: "error", message: `ROOM ${code || "----"} NOT FOUND` });
        return;
      }
      if (room.guest) {
        sendJSON(ws, { type: "error", message: `ROOM ${code} IS FULL (2/2)` });
        return;
      }
      ws.roomCode = code;
      ws.role = "guest";
      ws.playerName = sanitizeName(msg.name, "PILOT-02");
      ws.playerSkin = String(msg.skin || "piston").slice(0, 16);
      ws.ready = false;
      room.guest = ws;
      broadcastRoomState(room);
      return;
    }

    if (msg.type === "leave_room") {
      leaveCurrentRoom(ws);
      return;
    }

    const room = ws.roomCode ? rooms.get(ws.roomCode) : null;
    if (!room) return;

    if (msg.type === "update_profile") {
      ws.playerName = sanitizeName(msg.name, ws.role === "host" ? "PILOT-01" : "PILOT-02");
      ws.playerSkin = String(msg.skin || "vector").slice(0, 16);
      broadcastRoomState(room);
      return;
    }

    if (msg.type === "room_settings" && ws === room.host) {
      if (msg.mode === "duel" || msg.mode === "score") room.settings.mode = msg.mode;
      if (typeof msg.hazards === "boolean") room.settings.hazards = msg.hazards;
      if ([3, 5, 7].includes(Number(msg.targetKOs))) room.settings.targetKOs = Number(msg.targetKOs);
      broadcastRoomState(room);
      return;
    }

    if (msg.type === "ready_toggle") {
      ws.ready = !ws.ready;
      broadcastRoomState(room);
      return;
    }

    // Relay real-time gameplay packets directly between Host <-> Guest
    const peer = ws === room.host ? room.guest : room.host;
    if (!peer) return;

    if (
      msg.type === "start_match" ||
      msg.type === "state" ||
      msg.type === "input" ||
      msg.type === "event" ||
      msg.type === "match_over" ||
      msg.type === "rematch_vote"
    ) {
      sendJSON(peer, msg);
    }
  });

  ws.on("close", () => leaveCurrentRoom(ws));
  ws.on("error", () => leaveCurrentRoom(ws));
});

// Heartbeat to drop dead connections
const heartbeat = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) {
      leaveCurrentRoom(ws);
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 25000);

wss.on("close", () => clearInterval(heartbeat));

server.listen(PORT, () => {
  console.log(`NOVA DRIFT online server listening on http://localhost:${PORT}`);
});
