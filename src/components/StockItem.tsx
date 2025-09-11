"use client";
// type
import { Symbol } from "@/types/symbols";
// style
import "@/styles/components/StockItem.scss";

interface StockProps {
  data: Symbol;
}
export default function StockItem({ data }: StockProps) {
  // ! 이름만 사용할수 있음... 데이터 내용 부실 -> 드롭다운 형태로 변경
  console.log("🚀 ~ StockItem ~ data:", data);

  const onItemClick = () => {
    console.log("123", data);
  };

  return (
    <div
      className="stock-item-container w-100 flex text-sm cursor-pointer"
      onClick={onItemClick}
    >
      {/* Name | Last Price | Change Price | Change Price Percentage */}
      <p className="stock-name">Name</p>
      <p className="last-price">Last Price</p>
      <p className="change-price">Change Price</p>
      <p className="percentage">Change Percentage</p>
    </div>
  );
}
