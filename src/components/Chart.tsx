"use client";
import { AreaSeries, createChart, ColorType } from "lightweight-charts";
import { useRef, useEffect } from "react";
import dayjs from "dayjs";

interface ChartData {
  time: any;
  value: number;
}

interface ChartProps {
  data: ChartData[];
}

export default function Chart({ data }: ChartProps) {
  console.log("🚀 ~ Chart ~ data:", data);
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
      },
      localization: {
        timeFormatter: (time: number) => {
          return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        },
      },
    });

    chart.timeScale().fitContent();

    // chart Marker Option
    let lastDate: string | null = null;
    chart.applyOptions({
      timeScale: {
        tickMarkFormatter: (time: any) => {
          const dateStr = dayjs(time).format("YYYY-MM-DD");
          if (dateStr === lastDate) return "";
          lastDate = dateStr;
          return dateStr;
        },
      },
    });

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
