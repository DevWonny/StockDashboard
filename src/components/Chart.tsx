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
      // localization: {
      //   dateFormat: "YYYY-MM-DD HH:mm:ss",
      // },
      timeScale: {
        tickMarkFormatter: (time: any) => {
          const dateStr = dayjs(time).format("YYYY-MM-DD");
          if (dateStr === lastDate) return "";
          lastDate = dateStr;
          return dateStr;
        },
      },
    });

    // const tooltip = document.createElement("div");
    // tooltip.style.background = "red";
    // chartRef.current.appendChild(tooltip);

    // chart.subscribeCrosshairMove((params) => {
    //   // console.log("🚀 ~ Chart ~ params:", params);
    //   // if (!param.time || !param.seriesData.size) return;
    //   // const utcDate = new Date(param.time * 1000);
    //   // const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
    //   // const formatted = dayjs(kstDate).format("YYYY-MM-DD HH:mm:ss");
    //   if (!params.time) {
    //     tooltip.style.display = "none";
    //     return;
    //   }
    //   tooltip.style.display = "block";

    //   const formatTime = dayjs(params.time as number).format(
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    //   console.log("🚀 ~ Chart ~ formatTime:", formatTime);

    //   // const value = param.seriesData.get(series)?.value;
    //   tooltip.innerHTML = `<b>${formatTime}</b>`;
    // });

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
