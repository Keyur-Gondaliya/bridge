import { XYFinanceBaseURL } from "../constants/XYFinance.constant";
import { BadRequestError, InternalServerError } from "../utils/errors";

export const fetchSupportedChains = async () => {
  const url = `${XYFinanceBaseURL}/supportedChains`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new BadRequestError(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.supportedChains;
  } catch (error) {
    console.error("Error fetching supported chains:", error);
    throw new InternalServerError("Failed to fetch supported chains");
  }
};

export const fetchRecommendedTokens = async (chainId: string) => {
  const url = `${XYFinanceBaseURL}/recommendedTokens?chainId=${chainId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new BadRequestError(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      return data.recommendedTokens;
    } else {
      throw new BadRequestError(data.errorMsg);
    }
  } catch (error: any) {
    console.error("Error fetching recommended tokens:", error?.message);
    throw new InternalServerError(
      error?.message || "Failed to fetch recommended tokens"
    );
  }
};

export const fetchBuildTx = async () => {
  const url = `${XYFinanceBaseURL}/buildTx`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.detail.map((e: { loc: string[] }) => e.loc[1]);
  } catch (error) {
    console.error("Error fetching buildTx:", error);
    throw new InternalServerError("Failed to fetch buildTx details");
  }
};

export const fetchQuote = async (params: Record<string, any>) => {
  const baseUrl = `${XYFinanceBaseURL}/quote`;
  const query = new URLSearchParams(params as any).toString();
  const url = `${baseUrl}?${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new BadRequestError(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw new InternalServerError("Failed to fetch quote");
  }
};
