"use client";
// style
import "@/styles/components/StockDetail.scss";

export default function StockDetail() {
  // ! Company Profile 2
  // * 회사 로고(클릭시 사이트 새탭) + 이름 + 국가
  // * 시가 총액(Market Capitalization) + 상장 거래소
  // ! Basic Financial
  // * 10일간 평균 거래량
  // * 52주 최고가 + 최저가
  // ! EPS Surprises
  // * 최근 4분기 실적
  // ! Quote
  // * 금일 최고가 + 최저가
  return (
    <div className="stock-detail-container flex flex-col px-[10px] py-[20px]">
      <div className="company-info flex flex-col">
        <div className="name-container flex flex-row items-center">
          <div className="logo"></div>
          <h1 className="text-lg font-bold">Name</h1>
          <h2 className="text-xs ">Nation</h2>
        </div>

        <div className="market-container flex flex-row items-center">
          <h1 className="text-2xl">Capitalization</h1>
          <p className="text-sm">Exchange</p>
        </div>
      </div>

      <div className="finance-info flex flex-col ">
        <div className="top-finance flex flew-row justify-between">
          {/* 10일간 평균 거래량 */}
          <div className="average-volume flex flex-col">
            <p>10일 평균 거래량</p>
            <span>10.423</span>
          </div>
          {/* 52주 최고가 */}
          <div className="week-high flex flex-col">
            <p>52주 최고가</p>
            <span>23.3</span>
          </div>
          {/* 52주 최저가 */}
          <div className="week-low flex flex-col">
            <p>52주 최저가</p>
            <span>19.5</span>
          </div>
        </div>

        <div className="bot-finance flex flex-row justify-around">
          {/* 금일 최고가 */}
          <div className="today-high flex flex-col">
            <p>금일 최고가</p>
            <span>234.1</span>
          </div>
          {/* 금일 최저가 */}
          <div className="today-low flex flex-col">
            <p>금일 최저가</p>
            <span>103.4</span>
          </div>
        </div>
      </div>

      <div className="performance-info flex flex-col">
        <div className="performance-item flex flex-col">
          <div className="title-container flex flex-row items-center">
            <p className="title">25년 2분기 실적</p>
            <p className="period">(2025-06-30)</p>
          </div>

          <p className="estimate">예상 수입 : 1.9744</p>
          <p className="actual">실제 수입 : 1.88</p>
          {/* 음수일 경우 붉은색으로, 양수일 경우 녹색으로 */}
          <p className="surprise">Surprise : -0.0944</p>
          <p className="surprise-percentage">Surprise Percentage : -4.7812%</p>
        </div>

        <div className="performance-item flex flex-col">
          <div className="title-container flex flex-row items-center">
            <p className="title">25년 1분기 실적</p>
            <p className="period">(2025-03-31)</p>
          </div>

          <p className="estimate">예상 수입 : 1.9744</p>
          <p className="actual">실제 수입 : 1.88</p>
          {/* 음수일 경우 붉은색으로, 양수일 경우 녹색으로 */}
          <p className="surprise">Surprise : -0.0944</p>
          <p className="surprise-percentage">Surprise Percentage : -4.7812%</p>
        </div>

        <div className="performance-item flex flex-col">
          <div className="title-container flex flex-row items-center">
            <p className="title">24년 4분기 실적</p>
            <p className="period">(2024-12-31)</p>
          </div>

          <p className="estimate">예상 수입 : 1.9744</p>
          <p className="actual">실제 수입 : 1.88</p>
          {/* 음수일 경우 붉은색으로, 양수일 경우 녹색으로 */}
          <p className="surprise">Surprise : -0.0944</p>
          <p className="surprise-percentage">Surprise Percentage : -4.7812%</p>
        </div>

        <div className="performance-item flex flex-col">
          <div className="title-container flex flex-row items-center">
            <p className="title">24년 3분기 실적</p>
            <p className="period">(2024-09-31)</p>
          </div>

          <p className="estimate">예상 수입 : 1.9744</p>
          <p className="actual">실제 수입 : 1.88</p>
          {/* 음수일 경우 붉은색으로, 양수일 경우 녹색으로 */}
          <p className="surprise">Surprise : -0.0944</p>
          <p className="surprise-percentage">Surprise Percentage : -4.7812%</p>
        </div>
      </div>
    </div>
  );
}
