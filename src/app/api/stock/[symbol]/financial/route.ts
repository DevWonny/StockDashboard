import { NextResponse } from "next/server";
import { financial } from "@/service/Stock";
// type
import type { StockParams } from "@/types/stockSymbol";

export async function GET(req: Request, context: StockParams) {
  try {
    const { symbol } = context.params;
    const data = await financial(symbol);
    return NextResponse.json(data);
  } catch (err) {
    console.log("🚀 ~ Financial GET ~ err:", err)
    return NextResponse.json({ error: err }, { status: 500 });
  }
}