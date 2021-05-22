import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../../utils";

interface ReturnShape {
  [tokenAddress: string]: {
    name: string;
    symbol: string;
    price_BNB: string;
  };
}

export default async (): Promise<any> => {
  try {
    const topPairs = await getTopPairs();

    const tokens = topPairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
      for (const token of [pair.token0, pair.token1]) {
        const tId = getAddress(token.id);

        accumulator[tId] = {
          name: token.name,
          symbol: token.symbol,
          price_BNB: token.derivedETH,
        };
      }

      return accumulator;
    }, {});

    return { updated_at: new Date().getTime(), data: tokens };
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
