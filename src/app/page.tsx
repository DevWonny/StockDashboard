"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
// component
import HeaderItem from "@/components/HeaderItem";
import Chart from "@/components/Chart";
// style
import "swiper/css";
import "@/styles/app/main.scss";

export default function Home() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const symbols = async () => {
      try {
        const res = await axios.get("/api/symbols");
        console.log("🚀 ~ symbols ~ res:", res);
      } catch (err) {
        console.log("🚀 ~ symbols ~ err:", err);
        return;
      }
    };

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

      <div className="chart-wrap  flex justify-between">
        <div className="chart-container w-full">
          <Chart />
        </div>

        <div className="stock-list-container">Stock List</div>
      </div>
    </div>
  );
}
