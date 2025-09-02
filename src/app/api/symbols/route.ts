import { NextResponse } from 'next/server';

import { symbolList } from '@/service/Symbols';

export async function GET() {
  try {
    const data = await symbolList();
    return NextResponse.json(data)
  } catch (err) {
    console.log("🚀 ~ GET ~ err:", err)
    return NextResponse.json({ error: err }, { status: 500 })
  }
}