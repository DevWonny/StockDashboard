"use client";
import { useState, useEffect } from "react";
// type
import { Symbol } from "@/types/symbols";
// component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// style
import "@/styles/components/StockItem.scss";

interface StockProps {
  data: Symbol[];
}
export default function StockItem({ data }: StockProps) {
  // ! 이름만 사용할수 있음... 데이터 내용 부실 -> 드롭다운 형태로 변경
  const [dataDescription, setDataDescription] = useState<string>("");

  const onItemClick = (item: Symbol) => {
    setDataDescription(item.description);
  };

  useEffect(() => {
    if (data.length > 0) {
      setDataDescription(data[0].description);
    } else {
      setDataDescription("");
    }
  }, [data]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {dataDescription ? dataDescription : "심볼을 선택하세요."}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>심볼을 선택하세요.</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        {data.length > 0 &&
          data.map((item, index) => (
            <DropdownMenuItem
              key={`stock-dropdown-item-${item.figi}-${index}`}
              onClick={() => onItemClick(item)}
            >
              {item.description}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
