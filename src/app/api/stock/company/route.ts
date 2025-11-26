import { NextResponse } from "next/server";
import { company } from "@/service/Stock";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const symbol = url.searchParams.get('symbol');
    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is Required!' }, { status: 400 });
    }
    const data = await company(symbol);
    return NextResponse.json(data);
  } catch (err) {
    console.log("🚀 ~ Financial GET ~ err:", err)
    return NextResponse.json({ error: err }, { status: 500 });
  }
}