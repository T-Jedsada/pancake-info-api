import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../utils";

interface ReturnShape {
  [tokenIds: string]: {
    price: string;
    base_volume: string;
    quote_volume: string;
    liquidity: string;
    liquidity_BNB: string;
  };
}

export const getSummary = async (): Promise<any> => {
  try {
    const topPairs = await getTopPairs();

    const pairs = topPairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
      const t0Id = getAddress(pair.token0.id);
      const t1Id = getAddress(pair.token1.id);

      accumulator[`${t0Id}_${t1Id}`] = {
        price: pair.price,
        base_volume: pair.volumeToken0,
        quote_volume: pair.volumeToken1,
        liquidity: pair.reserveUSD,
        liquidity_BNB: pair.reserveETH,
      };

      return accumulator;
    }, {});

    return { updated_at: new Date().getTime(), data: pairs };
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
