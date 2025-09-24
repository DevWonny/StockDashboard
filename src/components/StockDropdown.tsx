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
import "@/styles/components/StockDropdown.scss";

interface StockProps {
  data: Symbol[];
  onSetSymbol: (symbol: string) => void;
}
export default function StockDropdown({ data, onSetSymbol }: StockProps) {
  // ! 이름만 사용할수 있음... 데이터 내용 부실 -> 드롭다운 형태로 변경
  const [dataDescription, setDataDescription] = useState<string>("");

  const onItemClick = (item: Symbol) => {
    setDataDescription(item.description);
    onSetSymbol(item.symbol);
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
      <DropdownMenuTrigger className="dropdown-trigger cursor-pointer outline-none h-[50px] text-xl font-bold">
        {dataDescription ? dataDescription : "심볼을 선택하세요."}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dropdown-content">
        <DropdownMenuLabel className="cursor-default">
          심볼을 선택하세요.
        </DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={`stock-dropdown-div-${index}`}>
              <DropdownMenuItem
                key={`stock-dropdown-item-${item.figi}-${index}`}
                className="cursor-pointer"
                onClick={() => onItemClick(item)}
              >
                {item.description}
              </DropdownMenuItem>
              <DropdownMenuSeparator
                key={`stock-dropdown-item-separator-${index}`}
              />
            </div>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
