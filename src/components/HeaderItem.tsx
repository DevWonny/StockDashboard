"use client";
// type
import { CryptoSymbol } from "@/types/symbols";
// style
import "@/styles/components/HeaderItem.scss";

interface HeaderItemProps {
  item: CryptoSymbol;
  test?: any;
}

export default function HeaderItem({ item, test }: HeaderItemProps) {
  return (
    <div className="header-item-container py-[5px] px-[20px]">
      <div className="top-container flex justify-between text-sm">
        <h1>{item && item.displaySymbol}</h1>
      </div>

      <div className="bot-container text-center text-2xl">
        <p>{test.price}</p>
      </div>
    </div>
  );
}
