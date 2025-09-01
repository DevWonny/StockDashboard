// import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import WebSocket from "ws";

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

// 주요 심볼
// const symbols = ["AAPL", "BTC-USD", "ETH-USD", "EUR/USD", "GBP/USD"];
const symbols = ["AAPL", "BINANCE:BTCUSDT", "OANDA:EUR_USD"];

ws.on("open", () => {
  console.log("Connect to Finnhub WebSocket!");
  symbols.forEach((s) => {
    ws.send(JSON.stringify({ type: "subscribe", symbol: s }));
  });
});

// Finnhub -> Data 수신 -> 가공 -> Client
ws.on("message", (msg) => {
  const data = JSON.parse(msg.toString());

  if (data.type === "trade") {
    const trades = data.data.map((d) => ({
      symbol: d.s,
      price: d.p,
      timestamp: d.t,
      volume: d.v,
    }));

    // socket.io Broadcast
    io.emit("stockUpdate", trades);
  }
});

// Express 기본 라우트
app.get("/", (req, res) => {
  res.send("Backend Server is running!");
});

server.listen(4000, () => {
  console.log("Backend listening on http://localhost:4000");
});
