"use client";
export default function HeaderItem() {
  return (
    <div className="header-item-container">
      <div className="top-container flex justify-between text-sm">
        <h1>Name</h1>
        <h2>Last Price</h2>
      </div>

      <div className="bot-container text-center text-2xl">
        {/* //! 증가일때는 녹색, 감소일때는 빨간색으로  */}
        <p>Percentage</p>
      </div>
    </div>
  );
}
