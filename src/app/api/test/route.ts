import { NextResponse } from 'next/server';
import axios from 'axios';

export default async function GET() {
  const key = process.env.FINNHUB_TOKEN;
  if (!key) {
    return NextResponse.json({ error: 'Key Not Found!' }, { status: 500 });
  }

  try {
    const res = await axios.get('https://finnhub.io/api/v1/stock/symbol?exhange=US&token=')
  } catch (err: any) {
    return NextResponse.json({ error: `Axios Error`, massage: err.massage }, { status: 500 })
  }
}