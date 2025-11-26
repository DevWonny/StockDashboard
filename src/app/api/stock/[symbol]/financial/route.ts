import { NextResponse } from "next/server";
import { financial } from "@/service/Stock";


export async function GET(req: Request, { params }: { params: { symbol: string } }) {
  try {
    const { symbol } = params;
    const data = await financial(symbol);
    return NextResponse.json(data);
  } catch (err) {
    console.log("🚀 ~ Financial GET ~ err:", err)
    return NextResponse.json({ error: err }, { status: 500 });
  }
}