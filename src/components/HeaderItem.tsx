"use client";
// type
import { CryptoSymbol } from "@/types/symbols";
// style
import "@/styles/components/HeaderItem.scss";

interface HeaderItemProps {
  item: CryptoSymbol;
  cryptoData?: any;
  onSetCrypto: (crypto: any) => void;
}

export default function HeaderItem({
  item,
  cryptoData,
  onSetCrypto,
}: HeaderItemProps) {
  const onItemClick = (crypto: string) => {
    onSetCrypto(crypto);
  };

  return (
    <div
      className="header-item-container py-[5px] px-[20px] cursor-pointer"
      onClick={() => {
        onItemClick(item.symbol);
      }}
    >
      <div className="top-container flex justify-between text-sm">
        <h1>{item && item.displaySymbol}</h1>
      </div>

      <div className="bot-container text-center text-2xl">
        <span>{cryptoData && cryptoData.price}</span>
        <span className="text-xs">USDT</span>
      </div>
    </div>
  );
}
