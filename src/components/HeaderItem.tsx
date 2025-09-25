"use client";
// type
import { CryptoSymbol } from "@/types/symbols";
// style
import "@/styles/components/HeaderItem.scss";

interface HeaderItemProps {
  item: CryptoSymbol;
}

export default function HeaderItem({ item }: HeaderItemProps) {
  return (
    <div className="header-item-container py-[5px] px-[20px]">
      <div className="top-container flex justify-between text-sm">
        <h1>{item && item.displaySymbol}</h1>
        <h2>Last Price</h2>
      </div>

      <div className="bot-container text-center text-2xl">
        {/* //! 증가일때는 녹색, 감소일때는 빨간색으로  */}
        <p>Percentage</p>
      </div>
    </div>
  );
}
