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
      height: chartRef.current.clientHeight - 100,
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width: chartRef.current?.clientWidth,
        height: chartRef.current?.clientHeight,
        // timeScale: {
        //   timeVisible: true,
        //   secondsVisible: true,
        //   tickMarkFormatter: (time: any, tickMarkType: any, locale: any) => {
        //     const date = new Date(time * 1000); // 초 단위 timestamp
        //     return `${
        //       date.getMonth() + 1
        //     }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        //   },
        // },
      });
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
  return <div ref={chartRef} className="chart h-full"></div>;
}
