"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
// component
import HeaderItem from "@/components/HeaderItem";
import Chart from "@/components/Chart";
import StockDropdown from "@/components/StockDropdown";
import StockDetail from "@/components/StockDetail";
// type
import { Symbol } from "@/types/symbols";
// style
import "swiper/css";
import "@/styles/app/main.scss";

interface ChartData {
  time: string;
  value: number;
}

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [symbolList, setSymbolList] = useState<Symbol[]>([]);
  // * Test
  const initialData: ChartData[] = [
    { time: "2025-08-25", value: 32.51 },
    { time: "2025-08-26", value: 31.11 },
    { time: "2025-08-27", value: 27.02 },
    { time: "2025-08-28", value: 27.32 },
    { time: "2025-08-29", value: 25.17 },
    { time: "2025-08-30", value: 28.89 },
    { time: "2025-08-31", value: 25.46 },
    { time: "2025-09-01", value: 23.92 },
    { time: "2025-09-02", value: 22.68 },
    { time: "2025-09-03", value: 22.67 },
  ];

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

    // symbolList();
    // const socket = io("http://localhost:4000");
    // socket.on("stockUpdate", (data) =>
    //   setData((prev: any) => [...data, ...prev].slice(0, 50))
    // );
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // useEffect(() => {
  //   console.log("🚀 ~ Home ~ data:", data);
  // }, [data]);

  return (
    <div className="main-wrap">
      <Swiper className="header-container w-full" slidesPerView={8}>
        {Array.from({ length: 10 }, (_, i) => (
          <SwiperSlide key={`swiper-slide-index-${i}`}>
            <HeaderItem />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="chart-wrap  flex justify-between h-screen">
        <div className="chart-container ">
          <Chart data={initialData} />
        </div>

        <div className="stock-container flex flex-col">
          {symbolList.length > 0 ? (
            <div className="stock-list-container flex flex-col">
              <StockDropdown data={symbolList} />
            </div>
          ) : (
            <div>Loading...</div>
          )}

          <StockDetail />
        </div>
      </div>
    </div>
  );
}
