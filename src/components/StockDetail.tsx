"use client";

export default function StockDetail() {
  // ! Company Profile 2
  // * 회사 로고(클릭시 사이트 새탭) + 이름 + 국가
  // * 시가 총액(Market Capitalization) + 상장 거래소
  // ! Basic Financial
  // * 10일간 평균 거래량
  // * 52주 최고가 + 최저가
  // ! EPS Surprises
  // * 최근 분기 실적
  // ! Quote
  // * 금일 최고가 + 최저가
  return (
    <div className="stock-detail-container flex flex-col">
      <div className="company-info"></div>
      <div className="finance-info"></div>
      <div className="recent-performance-info"></div>
      <div className="quote-info"></div>
    </div>
  );
}
