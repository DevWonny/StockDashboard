
import axios from 'axios'
export async function symbolList() {
  const key = process.env.FINNHUB_TOKEN;
  if (!key) {
    throw new Error('Service Symbol List Error!');
  }

  try {
    const res = await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`)
    return res.data;
  } catch (err) {
    console.log("🚀 ~ symbolList ~ err:", err);
    return
  }

};
