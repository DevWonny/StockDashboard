"use client";
import { AreaSeries, createChart, ColorType } from "lightweight-charts";
import { useRef, useEffect } from "react";

import { LineData } from "lightweight-charts";

interface ChartData {
  time: string;
  value: number;
}

interface ChartProps {
  data: ChartData[];
}

export default function Chart({ data }: ChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const initialData = [
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
    const backgroundColor = "white";
    const lineColor = "#2962ff";
    const textColor = "black";
    const areaTopColor = "#2962ff";
    const areaBottomColor = "rgba(41,98,255,0.28)";

    // * chart 생성
    if (!chartRef.current) {
      console.log("Chart Component Error!");
      return;
    }

    const chart = createChart(chartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartRef.current.clientWidth,
      height: 300,
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({ width: chartRef.current?.clientWidth });
    };

    const newSeries = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);
  return <div ref={chartRef} className="chart"></div>;
}
