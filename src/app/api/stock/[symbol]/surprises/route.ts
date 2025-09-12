import { NextResponse } from "next/server";
import { surprises } from "@/service/Stock";
// type
import StockParams from "@/types/stockSymbol";

export async function GET(req: Request, { params }: StockParams) {
  try {
    const { symbol } = await params;
    console.log("🚀 ~ GET ~ symbol:", symbol)
    const data = await surprises(symbol);
    return NextResponse.json(data);
  } catch (err) {
    console.log("🚀 ~ Financial GET ~ err:", err)
    return NextResponse.json({ error: err }, { status: 500 });
  }
}