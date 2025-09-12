import axios from 'axios';

const key = process.env.FINNHUB_TOKEN;
export async function company(symbol: string) {
  // * Symbol


  if (!key) {
    throw new Error('Service Stock Company Error!');
  }

  try {
    const res = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${key}`)
    return res.data;
  } catch (err) {
    console.log("🚀 ~ company ~ err:", err)
    return;
  }
}

export async function financial() {
  // * Symbol

}

export async function surprises() {
  // * Symbol
}

export async function quote() {
  // * Symbol
}