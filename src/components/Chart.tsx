"use client";
import { AreaSeries, createChart, ColorType } from "lightweight-charts";
import { useRef, useEffect } from "react";
import dayjs from "dayjs";

import { LineData } from "lightweight-charts";

interface ChartData {
  time: any;
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
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: any, tickMarkType: any, locale: any) => {
          const formatTime = dayjs(time).format("MM/DD HH:mm:ss");
          return formatTime;
        },
      },
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width: chartRef.current?.clientWidth,
        height: chartRef.current?.clientHeight,
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
