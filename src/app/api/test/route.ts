import { NextResponse } from 'next/server';

import { symbolList } from '@/service/Symbols';

export async function GET() {
  console.log('aklhdslf')
  try {
    console.log(222)
    const data = await symbolList();
    return NextResponse.json(data)
  } catch (err) {
    console.log("🚀 ~ GET ~ err:", err)
    console.log(333)
    return NextResponse.json({ error: err }, { status: 500 })
  }
}