import axios from 'axios';
// type
import { Financial } from '@/types/stockInfo';

const key = process.env.FINNHUB_TOKEN;

const checkKey = () => {
  if (!key) {
    throw new Error('Service Stock Company Error!');
  }
}

export async function company(symbol: string) {
  checkKey();
  try {
    const res = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${key}`)
    return res.data;
  } catch (err) {
    console.log("🚀 ~ company ~ err:", err)
    return;
  }
}

export async function financial(symbol: string) {
  // * Symbol
  checkKey();
  try {
    const res = await axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${key}`)
    const data = res.data.metric;
    const financialData = {
      day10AverageTradingVolume: data['10DayAverageTradingVolume'],
      week52High: data['52WeekHigh'],
      week52Low: data['52WeekLow']
    }
    return financialData as Financial;
  } catch (err) {
    console.log("🚀 ~ financial ~ err:", err)
    return;
  }
}

export async function surprises(symbol: string) {
  // * Symbol
  checkKey();
  try {
    const res = await axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${key}`)
    return res.data;
  } catch (err) {
    console.log("🚀 ~ surprises ~ err:", err)
    return;
  }
}

export async function quote(symbol: string) {
  // * Symbol
  checkKey();
  try {
    const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`)
    return res.data;
  } catch (err) {
    console.log("🚀 ~ quote ~ err:", err);
    return;
  }
}