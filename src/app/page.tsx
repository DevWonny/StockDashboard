"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
// component
import HeaderItem from "@/components/HeaderItem";
// style
import "swiper/css";

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
      <Swiper className="header-container">
        {Array.from({ length: 10 }, (_, i) => (
          <SwiperSlide key={`swiper-slide-index-${i}`}>
            <HeaderItem />
          </SwiperSlide>
        ))}
      </Swiper>
      {data.map((item: any, index: any) => (
        <p key={`test-index-${index}`}>{item.price}</p>
      ))}
    </div>
  );
}
