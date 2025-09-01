"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("stockUpdate", (data) =>
      setData((prev: any) => [...data, ...prev].slice(0, 50))
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("🚀 ~ Home ~ data:", data);
  }, [data]);

  return (
    <div className="test-page">
      {data.map((item: any, index: any) => (
        <p key={`test-index-${index}`}>{item.price}</p>
      ))}
    </div>
  );
}
