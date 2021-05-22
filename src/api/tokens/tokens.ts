import { getBundle, getBundles, getTokenByAddress } from "../../utils";
import { getAddress } from "@ethersproject/address";
import BigNumber from "bignumber.js";

export default async (_address: string): Promise<any> => {
  if (!_address || typeof _address !== "string" || !_address.match(/^0x[0-9a-fA-F]{40}$/)) {
    return null;
  }

  try {
    const address = getAddress(_address);
    const token = await getTokenByAddress(address.toLowerCase());
    const bundles = await getBundles();
    const bundleEth = await getBundle(bundles[0].id);

    return {
      updated_at: new Date().getTime(),
      data: {
        name: token?.name,
        symbol: token?.symbol,
        price_BNB: new BigNumber(token?.derivedETH).toFixed(7).toString(),
      },
    };
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
