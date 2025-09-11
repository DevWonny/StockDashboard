import axios from 'axios'
// type
import { Symbol } from '@/types/symbols';
export const TOP50_TICKERS = [
  'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'TSLA', 'META', 'NVDA', 'BRK.B',
  'JPM', 'JNJ', 'V', 'PG', 'XOM', 'UNH', 'MA', 'HD', 'CVX', 'AVGO', 'PFE', 'MRK', 'ABBV', 'KO',
  'COST', 'DIS', 'WMT', 'BAC', 'INTC', 'CSCO', 'ORCL', 'NFLX', 'TSM', 'NKE', 'MCD', 'VZ', 'PEP',
  'CRM', 'ADBE', 'IBM', 'AMD', 'QCOM', 'TXN', 'CAT', 'HON', 'GS', 'AMGN', 'LLY', 'BMY', 'UPS', 'MS'
]
export async function symbolList() {
  const key = process.env.FINNHUB_TOKEN;
  if (!key) {
    throw new Error('Service Symbol List Error!');
  }

  try {
    const res = await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`)
    const filterData = res.data.filter((item: Symbol) => TOP50_TICKERS.includes(item.symbol))
    return filterData.sort((a: Symbol, b: Symbol) => a.description.localeCompare(b.description));
  } catch (err) {
    console.log("🚀 ~ symbolList ~ err:", err);
    return
  }

};

// ! 미국 증시 주요 50개 회사 -> 필터링 걸어야 함...
// AAPL – Apple O
// MSFT – Microsoft O
// GOOGL – Alphabet(Google, Class A) O
// GOOG – Alphabet(Google, Class C) O
// AMZN – Amazon O
// TSLA – Tesla O
// META – Meta Platforms(Facebook) O
// NVDA – NVIDIA O
// BRK.B – Berkshire Hathaway O
// JPM – JPMorgan Chase O
// JNJ – Johnson & Johnson O
// V – Visa O
// PG – Procter & Gamble O
// XOM – Exxon Mobil O
// UNH – UnitedHealth Group o
// MA – Mastercard o
// HD – Home Depot o
// CVX – Chevron o
// AVGO – Broadcom o
// PFE – Pfizer o
// MRK – Merck & Co. o
//   ABBV – AbbVie o
// KO – Coca - Cola o
// COST – Costco o
// DIS – Disney o
// WMT – Walmart o
// BAC – Bank of America o
// INTC – Intel(INTC) o
// CSCO – Cisco Systems o
// ORCL – Oracle o
// NFLX – Netflix o
// TSM – Taiwan Semiconductor(ADR) o
// NKE – Nike o
// MCD – McDonald’s o
// VZ – Verizon o
// PEP – PepsiCo o
// CRM – Salesforce o
// ADBE – Adobe o
// IBM – IBM o
// AMD – Advanced Micro Devices o
// QCOM – Qualcomm o
// TXN – Texas Instruments o
// CAT – Caterpillar o
// HON – Honeywell o
// GS – Goldman Sachs o
// AMGN – Amgen o
// LLY – Eli Lilly o
// BMY – Bristol - Myers Squibb o
// UPS – United Parcel Service o
// MS – Morgan Stanley