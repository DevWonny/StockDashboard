"use client";
// style
import "@/styles/components/StockItem.scss";

export default function StockItem() {
  const onItemClick = () => {
    console.log("Stock Item Click!");
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
