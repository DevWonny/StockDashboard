export interface Company {
  country: string, // 국가
  currency: string, // 통화
  exchange: string, // 상장 거래소
  finnhubIndustry: string, // 산업 분류(finnhub에서 제공)
  ipo: string, // IPO 날짜
  logo: string,
  marketCapitalization: number, // 시가 총액
  name: string,
  shareOutstanding: number, // 유통 주식 수
  ticker: string, //상장된 거래소에서 사용하는 회사 심볼
  weburl: string,
}

export interface Financial {
  // 대기
  day10AverageTradingVolume: number, // 10일 평균 거래량
  week52High: number, // 52주 최고가
  week52Low: number // 52주 최저가
}

export interface Surprises {
  actual: number, // 실제 수익 결과
  estimate: number, // 예상 수입
  period: string, // 보고 기간
  quarter: number, // 분기 
  surprise: number, // 실제와 추정 편차
  surprisePercent: number, // 실제와 추정 편차 퍼센트
  year: number, // 회계연도
}

export interface Quote {
  c: number, // 현재 가격
  d: number, // 변화
  dp: number, // 변화율
  h: number, // 금일 최고가
  l: number, // 금일 최저가
  o: number, // 금일 오픈가
  pc: number, // 이전 종료가
}