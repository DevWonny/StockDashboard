import { NextResponse } from "next/server";
import { cryptoSymbolList } from "@/service/CryptoSymbols";

export async function GET() {
  try {
    const data = await cryptoSymbolList();
    return NextResponse.json(data);
  } catch (err) {
    console.log("🚀 ~ Crypto Symbols GET ~ err:", err)
    return NextResponse.json({ error: err }, { status: 500 })
  }
}