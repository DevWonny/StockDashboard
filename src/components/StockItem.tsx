"use client";
// style
import "@/styles/components/StockItem.scss";

export default function StockItem() {
  return (
    <div className="stock-item-container w-100 flex text-sm">
      {/* Name | Last Price | Change Price | Change Price Percentage */}
      <p className="stock-name">Name</p>
      <p className="last-price">Last Price</p>
      <p className="change-price">Change Price</p>
      <p className="percentage">Change Percentage</p>
    </div>
  );
}
