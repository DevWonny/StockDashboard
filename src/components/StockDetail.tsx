"use client";
import { useState, useEffect } from "react";
// type
import { Company, Surprises, Quote, Financial } from "@/types/stockInfo";
// style
import "@/styles/components/StockDetail.scss";

interface StockDetailProps {
  company: Company;
  financial: Financial;
  quote: Quote;
  surprises: Surprises[];
}

export default function StockDetail({
  company,
  financial,
  quote,
  surprises,
}: StockDetailProps) {
  const onQuarterConvert = (year: number, quarter: number) => {
    const convertYear = year % 100;
    return `${convertYear}년도 ${quarter}분기 실적`;
  };

  const onCheckSurprise = (surprise: number) => {
    if (surprise < 0) {
      return "check-red";
    } else {
      return "check-green";
    }
  };

  return (
    <div className="stock-detail-container flex flex-col px-[10px] py-[20px]">
      <div className="company-info flex flex-col">
        <div className="name-container flex flex-row items-center">
          <div className="logo">
            <img src={company.logo} alt="Company Logo" />
          </div>
          <h1 className="text-lg font-bold">{company.name}</h1>
          <h2 className="text-xs ">{company.country}</h2>
        </div>

        <div className="market-container flex flex-row items-center">
          <h1 className="text-2xl">{company.marketCapitalization}</h1>
          <p className="text-sm">{company.exchange}</p>
        </div>
      </div>

      <div className="finance-info flex flex-col ">
        <div className="top-finance flex flew-row justify-between">
          {/* 10일간 평균 거래량 */}
          <div className="average-volume flex flex-col">
            <p>10일 평균 거래량</p>
            <span>{financial.day10AverageTradingVolume}</span>
          </div>
          {/* 52주 최고가 */}
          <div className="week-high flex flex-col">
            <p>52주 최고가</p>
            <span>{financial.week52High}</span>
          </div>
          {/* 52주 최저가 */}
          <div className="week-low flex flex-col">
            <p>52주 최저가</p>
            <span>{financial.week52Low}</span>
          </div>
        </div>

        <div className="bot-finance flex flex-row justify-around">
          {/* 금일 최고가 */}
          <div className="today-high flex flex-col">
            <p>금일 최고가</p>
            <span>{quote.h}</span>
          </div>
          {/* 금일 최저가 */}
          <div className="today-low flex flex-col">
            <p>금일 최저가</p>
            <span>{quote.l}</span>
          </div>
        </div>
      </div>

      <div className="performance-info flex flex-col">
        {surprises.map((item, index) => (
          <div
            className="performance-item flex flex-col"
            key={`stock-detail-performance-item-surprise-${item.symbol}-${index}`}
          >
            <div className="title-container flex flex-row items-center">
              <p className="title">
                {onQuarterConvert(item.year, item.quarter)}
              </p>

              <p className="period">{`(${item.period})`}</p>
            </div>

            <p className="estimate">{`예상 수입 : ${item.estimate}`}</p>
            <p className="actual">{`실제 수입 : ${item.actual}`}</p>
            {/* 음수일 경우 붉은색으로, 양수일 경우 녹색으로 */}
            <p
              className={`surprise ${onCheckSurprise(item.surprise)}`}
            >{`Surprise : ${item.surprise}`}</p>
            <p
              className={`surprise-percentage ${onCheckSurprise(
                item.surprisePercent
              )}`}
            >
              {`Surprise Percentage : ${item.surprisePercent}%`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
