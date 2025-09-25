import axios from 'axios';
export const TOP10_TICKERS = [
  'BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:BNBUSDT',
  'BINANCE:SOLUSDT', 'BINANCE:XRPUSDT', 'BINANCE:ADAUSDT',
  'BINANCE:DOGEUSDT', 'BINANCE:AVAXUSDT', 'BINANCE:TRXUSDT',
  'BINANCE:DOTUSDT'
]

export async function cryptoSymbolList() {
  const key = process.env.FINNHUB_TOKEN;
  if (!key) {
    throw new Error('Service Crypto Symbol List Error!');
  }

  try {
    const res = await axios.get(`https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=${key}`);
    const filterData = res.data.filter((item: any) => TOP10_TICKERS.includes(item.symbol));
    return filterData.sort((a: any, b: any) => a.description.localeCompare(b.description))
  } catch (err) {
    console.log("🚀 ~ cryptoSymbolList ~ err):", err);
    return;
  }
}
// * 가상화폐 주요 기업 10개
// Bitcoin → BINANCE: BTCUSDT
// Ethereum → BINANCE: ETHUSDT
// BNB → BINANCE: BNBUSDT
// Solana → BINANCE: SOLUSDT
// XRP → BINANCE: XRPUSDT
// Cardano(ADA) → BINANCE: ADAUSDT
// Dogecoin(DOGE) → BINANCE: DOGEUSDT
// Avalanche(AVAX) → BINANCE: AVAXUSDT
// TRON(TRX) → BINANCE: TRXUSDT
// Polkadot(DOT) → BINANCE: DOTUSDT