import { NextResponse } from "next/server";
import { quote } from "@/service/Stock";

export async function GET(req: Request, context: { params: { symbol: string } }) {
  try {
    const { symbol } = context.params;
    const data = await quote(symbol);
    return NextResponse.json(data);
  } catch (err) {
    console.log("🚀 ~ Financial GET ~ err:", err)
    return NextResponse.json({ error: err }, { status: 500 });
  }
}