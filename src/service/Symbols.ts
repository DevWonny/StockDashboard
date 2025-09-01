import finnhub from 'finnhub';
export const symbolList = async () => {
  const key = process.env.FINNHUB_TOKEN;

  if (!key) {
    throw new Error('Service Symbol List Error!');
  }

  const finnhubClient = finnhub.ApiClient.instance.authentications['apiKey'];
  finnhubClient.apiKey = key;

  const client = new finnhubClient.DefaultApi();

  client.stockSymbol('US', (error: any, data: any, responses: any) => {
    console.log("🚀 ~ symbolList ~ error:", error)
    console.log("🚀 ~ symbolList ~ responses:", responses)
    console.log("🚀 ~ symbolList ~ data:", data)
    return data;
  })
};
