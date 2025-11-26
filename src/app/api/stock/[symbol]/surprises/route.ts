import { NextResponse, NextRequest } from "next/server";
import { surprises } from "@/service/Stock";

export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const { symbol } = await params;
    const data = await surprises(symbol);
    return NextResponse.json(data);
  } catch (err) {
    console.log("🚀 ~ Financial GET ~ err:", err)
    return NextResponse.json({ error: err }, { status: 500 });
  }
}