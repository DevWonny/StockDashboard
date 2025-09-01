import axios from "axios";

export const symbolList = async () => {
  const res = await axios.get("/api/v1/stock/symbol");
  console.log("🚀 ~ symbolList ~ res:", res);
};
