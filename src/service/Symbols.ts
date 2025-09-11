import axios from 'axios'
export async function symbolList() {
  const key = process.env.FINNHUB_TOKEN;
  if (!key) {
    throw new Error('Service Symbol List Error!');
  }

  try {
    const res = await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`)

    // console.log("🚀 ~ symbolList ~ res:", res)
    const test = res.data.filter((item: any) => item.symbol === 'NVDA' || item.symbol === 'AAPL')
    console.log("🚀 ~ symbolList ~ test:", test)

    return res.data;
  } catch (err) {
    console.log("🚀 ~ symbolList ~ err:", err);
    return
  }

};

// ! 미국 증시 주요 50개 회사 -> 필터링 걸어야 함...
// AAPL – Apple

// MSFT – Microsoft

// GOOGL – Alphabet(Google, Class A)

// GOOG – Alphabet(Google, Class C)

// AMZN – Amazon

// TSLA – Tesla

// META – Meta Platforms(Facebook)

// NVDA – NVIDIA

// BRK.B – Berkshire Hathaway

// JPM – JPMorgan Chase

// JNJ – Johnson & Johnson

// V – Visa

// PG – Procter & Gamble

// XOM – Exxon Mobil

// UNH – UnitedHealth Group

// MA – Mastercard

// HD – Home Depot

// CVX – Chevron

// AVGO – Broadcom

// PFE – Pfizer

// MRK – Merck & Co.

//   ABBV – AbbVie

// KO – Coca - Cola

// PEPSI – PepsiCo(PEP)

// COST – Costco

// DIS – Disney

// WMT – Walmart

// BAC – Bank of America

// INTEL – Intel(INTC)

// CSCO – Cisco Systems

// ORCL – Oracle

// NFLX – Netflix

// TSM – Taiwan Semiconductor(ADR)

// NKE – Nike

// MCD – McDonald’s

// VZ – Verizon

// PEP – PepsiCo

// CRM – Salesforce

// ADBE – Adobe

// IBM – IBM

// AMD – Advanced Micro Devices

// QCOM – Qualcomm

// TXN – Texas Instruments

// CAT – Caterpillar

// HON – Honeywell

// GS – Goldman Sachs

// AMGN – Amgen

// LLY – Eli Lilly

// BMY – Bristol - Myers Squibb

// UPS – United Parcel Service