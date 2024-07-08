export type Quote = {
  srcQuoteTokenUsdValue: string;
  dstQuoteTokenAmount: number;
  dstQuoteToken: {
    decimals: number;
    symbol: string;
  };
  dstQuoteTokenUsdValue: string;
  srcQuoteToken: {
    symbol: string;
  };
  srcQuoteTokenAmount: number;
  bridgeDescription: {
    bridgeFeeAmount: number;
    bridgeFeeToken: {
      decimals: number;
      symbol: string;
    };
  };
  estimatedGas: string;
};

export type QuoteParams = {
  srcChainId: string;
  srcQuoteTokenAddress: string;
  srcQuoteTokenAmount: string;
  dstChainId: string;
  dstQuoteTokenAddress: string;
  slippage: string;
};
