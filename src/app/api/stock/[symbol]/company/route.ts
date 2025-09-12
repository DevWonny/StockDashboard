import { NextResponse } from "next/server";
import { company } from "@/service/Stock";
// type
import StockParams from "@/types/stockSymbol";


export async function GET(req: Request, { params }: StockParams) {
  try {
    const data = await company(params.symbol);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}