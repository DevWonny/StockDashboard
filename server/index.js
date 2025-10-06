// import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import WebSocket from "ws";
import dayjs from "dayjs";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    // ! 개발단계에서는 전체 허용. 실제 배포시에는 특정 도메인만 넣어야 함!
    origin: "*",
  },
});

const FINNHUB_URL = `wss://ws.finnhub.io?token=d2nqnr1r01qsrqkpn0p0d2nqnr1r01qsrqkpn0pg`;
const ws = new WebSocket(FINNHUB_URL);

// Client별 구독 관리
const clientSubscribe = {};

const symbols = ["AAPL", "BINANCE:BTCUSDT", "OANDA:EUR_USD"];

// Finnhub Connect
ws.on("open", () => {
  console.log("Connect to Finnhub WebSocket!");
  symbols.forEach((symbol) => {
    ws.send(JSON.stringify({ type: "subscribe", symbol }));
  });
});

// Finnhub -> Data 수신 -> 가공 -> Client
ws.on("message", (msg) => {
  const data = JSON.parse(msg.toString());
  if (data.type === "trade") {
    data.data.forEach((d) => {
      const trade = {
        symbol: d.s,
        price: d.p,
        timestamp: dayjs(d.t).format("YYYY-MM-DD HH:mm:ss"),
        volume: d.v,
      };

      // 심볼 구독중인 클라이언트에게만 전달
      for (const [clientId, symbols] of Object.entries(clientSubscribe)) {
        if (symbols.has(trade.symbol)) {
          io.to(clientId).emit("stockUpdate", trade);
        }
      }
    });
  }
});

// Client Connect Event
io.on("connection", (socket) => {
  console.log("Client Connect!", socket.id, socket);
  clientSubscribe[socket.id] = new Set();

  // Symbol 구독 요청
  socket.on("subscribe", (symbol) => {
    console.log(`Client ${socket.id} Subscribe to ${symbol}`);
    clientSubscribe[socket.id].add(symbol);
    ws.send(JSON.stringify({ type: "subscribe", symbol }));
  });

  // Symbol 구독 해지 요청
  socket.on("unsubscribe", (symbol) => {
    console.log(`Client ${socket.id} Unsubscribe to ${symbol}`);
    clientSubscribe[socket.id].delete(symbol);
    ws.send(JSON.stringify({ type: "unsubscribe", symbol }));
  });

  // Client Disconnect
  socket.on("disconnect", () => {
    console.log(`Client Disconnect ${socket.id}`);
    delete clientSubscribe[socket.id];
  });
});

// Express 기본 라우트 -> 추후 제거 예정
app.get("/", (req, res) => {
  res.send("Backend Server is running!");
});

// Server 실행
server.listen(4000, () => {
  console.log("Backend listening on http://localhost:4000");
});
