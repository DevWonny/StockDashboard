"use client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import dayjs from "dayjs";
// component
import HeaderItem from "@/components/HeaderItem";
import Chart from "@/components/Chart";
import StockDropdown from "@/components/StockDropdown";
import StockDetail from "@/components/StockDetail";
// type
import { Symbol, CryptoSymbol } from "@/types/symbols";
import { Company, Surprises, Quote, Financial } from "@/types/stockInfo";
// style
import "swiper/css";
import "@/styles/app/main.scss";

interface ChartData {
  time: string;
  value: number;
}

export default function Home() {
  const socketRef = useRef<Socket | null>(null);
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [data, setData] = useState<any>([]);
  const [symbolList, setSymbolList] = useState<Symbol[]>([]);
  const [cryptoList, setCryptoList] = useState<CryptoSymbol[]>([]);
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [financialInfo, setFinancialInfo] = useState<Financial | null>(null);
  const [surprisesInfo, setSurprisesInfo] = useState<Surprises[] | null>(null);
  const [quoteInfo, setQuoteInfo] = useState<Quote | null>(null);
  const [isAllInfo, setIsAllInfo] = useState(false);
  // * Header 가상화폐 데이터
  const [cryptoData, setCryptoData] = useState<any>();
  // * Test Data -> 추후 제거 예정
  const [test, setTest] = useState<any>(null);

  useEffect(() => {
    const symbols = async () => {
      try {
        const res = await axios.get("/api/symbols");
        setSymbolList(res.data);
      } catch (err) {
        console.log("🚀 ~ symbols ~ err:", err);
        return;
      }
    };
    symbols();

    const cryptos = async () => {
      try {
        const res = await axios.get("/api/cryptoSymbols");
        setCryptoList(res.data);
      } catch (err) {
        console.log("🚀 ~ cryptos ~ err:", err);
        return;
      }
    };
    cryptos();

    // * Socket
    socketRef.current = io("http://localhost:4000");
    const socket = socketRef.current;

    // * 소켓이 연결되면 실행. 연결 성공 로그 등 추가 로직(예: 인증 토큰 전송)에 쓸 수 있습니다.
    socket.on("connect", () => {
      console.log("Socket Connect", socket.id, socket);
    });

    socket.on("cryptoSymbolUpdate", (trade: any) => {
      setCryptoData(trade);
    });

    socket.on("stockUpdate", (trade: any) => {
      setData((prev: any) => [trade, ...prev].slice(0, 50));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("🚀 ~ Home ~ data:", data);
  }, [data]);

  // * Test 진행중
  // useEffect(() => {
  //   const item = cryptoData ? cryptoData["BINANCE:BTCUSDT"] : null;
  //   if (item) {
  //     setTest((prev) => {
  //       const newMap = new Map(prev);
  //       newMap.set(item.timestamp, {
  //         time: item.timestamp,
  //         value: item.price,
  //       });
  //       return newMap;
  //     });
  //   }
  // }, [cryptoData]);

  useEffect(() => {
    if (companyInfo && financialInfo && quoteInfo && surprisesInfo) {
      setIsAllInfo(true);
    } else {
      setIsAllInfo(false);
    }
  }, [companyInfo, financialInfo, quoteInfo, surprisesInfo]);

  const onSetSymbol = async (symbol: string) => {
    // * 기존 심볼 구독 해지
    if (currentSymbol) {
      socketRef.current?.emit("unsubscribe", currentSymbol);
      setData([]);
    }

    // * 새로운 심볼 구독
    socketRef.current?.emit("subscribe", symbol);
    setCurrentSymbol(symbol);
    const promises = [
      await axios.get(`/api/stock/${symbol}/company`),
      await axios.get(`/api/stock/${symbol}/financial`),
      await axios.get(`/api/stock/${symbol}/surprises`),
      await axios.get(`/api/stock/${symbol}/quote`),
    ];

    Promise.all(promises)
      .then((result) => {
        setCompanyInfo(result[0].data);
        setFinancialInfo(result[1].data);
        setSurprisesInfo(result[2].data);
        setQuoteInfo(result[3].data);
        return;
      })
      .catch((err) => {
        console.log("🚀 ~ onSetSymbol ~ err:", err);
        return;
      });
  };

  const onSetCrypto = async (symbol: string) => {
    // * 기존 심볼 구독 해지
    if (currentSymbol) {
      socketRef.current?.emit("unsubscribe", currentSymbol);
      setData([]);
    }

    console.log(test);

    if (symbol) {
      const item = cryptoData[symbol];
      if (item) {
        setTest((prev: any) => {
          const newMap = new Map(prev);
          newMap.set(item.timestamp, {
            time: item.timestamp,
            value: item.price,
          });
          return newMap;
        });
      }
    }
  };

  useEffect(() => {
    console.log("🚀 ~ Home ~ test:", test);
  }, [test]);

  return (
    <>
      {cryptoList.length > 0 && symbolList.length > 0 ? (
        <div className="main-wrap">
          <Swiper className="header-container w-full" slidesPerView={8}>
            {cryptoList.length > 0 &&
              cryptoList.map((item: CryptoSymbol, index: number) => {
                const data = cryptoData ? cryptoData[item.symbol] : null;
                return (
                  <SwiperSlide
                    key={`header-swiper-slide-index-${item.symbol}-${index}`}
                  >
                    <HeaderItem
                      item={item}
                      cryptoData={data}
                      onSetCrypto={onSetCrypto}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>

          <div className="chart-wrap  flex justify-between h-screen">
            {data.length > 0 || test ? (
              <div className="chart-container w-[1040px]">
                <Chart
                  data={
                    Array.from(test.values()).sort(
                      (a: any, b: any) => a.time - b.time
                    ) as any
                  }
                />
              </div>
            ) : (
              <div className="chart-text flex justify-center items-center w-[1040px]">
                심볼을 선택하세요.
              </div>
            )}

            <div className="stock-container flex flex-col">
              {symbolList.length > 0 ? (
                <div className="stock-list-container flex flex-col w-full">
                  <StockDropdown data={symbolList} onSetSymbol={onSetSymbol} />
                </div>
              ) : (
                <div>Loading...</div>
              )}

              {isAllInfo ? (
                <StockDetail
                  company={companyInfo!}
                  financial={financialInfo!}
                  quote={quoteInfo!}
                  surprises={surprisesInfo!}
                />
              ) : (
                <div className="stock-no-data flex items-center justify-center h-full">
                  No Data
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading w-screen h-screen flex items-center justify-center text-9xl">
          ... Loading
        </div>
      )}
    </>
  );
}
