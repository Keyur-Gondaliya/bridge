import axios from "axios";
import * as xyFinanceService from "../../services/XYFinance.service";
import { BadRequestError, InternalServerError } from "../../utils/errors";
import { XYFinanceBaseURL } from "../../constants/XYFinance.constant";

jest.mock("axios");

describe("xyFinanceService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetchSupportedChains should return supported chains", async () => {
    const mockResponse = {
      supportedChains: [
        {
          chainId: 1,
          name: "ETHEREUM",
        },
      ],
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockResponse,
    });

    const result = await xyFinanceService.fetchSupportedChains();
    expect(result[0]).toEqual({
      chainId: 1,
      name: "ETHEREUM",
    });
  }, 10000);

  it("fetchRecommendedTokens should return recommended tokens", async () => {
    const chainId = "1";
    const mockResponse = {
      success: true,
      recommendedTokens: {
        address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
        chainId: 1,
        decimals: 18,
        logoURI:
          "https://assets.coingecko.com/coins/images/863/small/0x.png?1547034672",
        name: "ZRX",
        symbol: "ZRX",
      },
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockResponse,
    });

    const result = await xyFinanceService.fetchRecommendedTokens(chainId);
    const expected = mockResponse.recommendedTokens;
    expect(result[result.length - 1]).toEqual(expected);
  }, 10000);

  it("fetchBuildTx should return buildTx details", async () => {
    const mockResponse = {
      detail: [
        "srcChainId",
        "srcQuoteTokenAddress",
        "srcQuoteTokenAmount",
        "dstChainId",
        "dstQuoteTokenAddress",
        "slippage",
        "receiver",
      ],
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockResponse,
    });

    const result = await xyFinanceService.fetchBuildTx();
    expect(result).toEqual(mockResponse.detail);
  }, 10000);

  it("fetchQuote should return quote data", async () => {
    const mockParams = {
      srcChainId: "1",
      srcQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      srcQuoteTokenAmount: "6000000000000000000",
      dstChainId: "56",
      dstQuoteTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      slippage: "1",
    };
    const mockResponse = {
      success: true,
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
      data: mockResponse,
    });

    const result = await xyFinanceService.fetchQuote(mockParams);
    expect({ success: result.success }).toEqual(mockResponse);
  }, 10000);
});
