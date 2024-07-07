// utils/api.ts

const API_BASE_URL = "http://localhost:3001/api"; // Replace with your actual API URL

interface SupportedChainsResponse {
  supportedChains: Array<{ chainId: string; name: string }>;
}

interface RecommendedTokensResponse {
  recommendedTokens: Array<{
    name: string;
    logoURI: string;
    decimals: number;
    address: string;
  }>;
}

interface BuildTxDetailsResponse {
  buildTxDetails: Record<string, any>;
}

interface QuoteResponse {
  [key: string]: any;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "An error occurred");
  }
  return response.json();
};

export const fetchSupportedChains =
  async (): Promise<SupportedChainsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tokens`, {
        method: "GET",
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching supported chains:", error);
      throw error;
    }
  };

export const fetchRecommendedTokens = async (
  chainId: string
): Promise<RecommendedTokensResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tokens/recommended?chainId=${chainId}`,
      {
        method: "GET",
      }
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching recommended tokens:", error);
    throw error;
  }
};

export const fetchBuildTx = async (
  params: Record<string, any>
): Promise<BuildTxDetailsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/params`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching build transaction:", error);
    throw error;
  }
};

export const fetchQuote = async (
  params: Record<string, any>
): Promise<QuoteResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};
