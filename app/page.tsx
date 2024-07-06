"use client";
import { ChainContext, ChainContextProps } from "@/utils/context/ChainContext";
import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

// Define the Quote and related types
type Quote = {
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

type QuoteParams = {
  srcChainId: string;
  srcQuoteTokenAddress: string;
  srcQuoteTokenAmount: string;
  dstChainId: string;
  dstQuoteTokenAddress: string;
  slippage: string;
};

type QuoteResponse = {
  success: boolean;
  routes: Quote[];
  errorMsg?: string;
  [key: string]: any;
};
async function fetchBuildTx() {
  const url = "https://aggregator-api.xy.finance/v1/buildTx";

  try {
    const response = await fetch(url);

    const data = await response.json();
    return data.detail.map((e: { loc: string[] }) => e.loc[1]);
  } catch (error) {
    console.error("Error fetching buildTx:", error);
  }
}

// Fetch quote function with proper typing
async function fetchQuote(params: QuoteParams): Promise<QuoteResponse> {
  const baseUrl = "https://aggregator-api.xy.finance/v1/quote";

  const query = new URLSearchParams(params as any).toString();

  const url = `${baseUrl}?${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: QuoteResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { success: false, routes: [], errorMsg: "Failed to fetch quote" };
  }
}

// Utility functions
function padAmount(amount: number, decimals: number): string {
  const multiplier = Math.pow(10, decimals);
  const paddedAmount = amount * multiplier;
  return paddedAmount.toString();
}

function convertToDecimal(
  val: number,
  decimal: number,
  precision: number
): string {
  const factor = Math.pow(10, decimal);
  const decimalValue = val / factor;
  return decimalValue.toFixed(precision);
}

// Main component
export default function Home() {
  const context = useContext<ChainContextProps | undefined>(ChainContext);
  const router = useRouter();
  const [quote, setQuote] = useState<Quote[]>([]);
  const [isParamsVisible, setIsParamsVisible] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parameterList, setParameterList] = useState<string[]>([]);
  if (!context) {
    throw new Error(
      "Home component must be used within a ChainContextProvider"
    );
  }
  const { currentChains, setCurrentChains } = context;

  // Utility function to debounce a function call
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Debounced fetch quote function
  const debouncedFetchQuote = useCallback(
    debounce((amount: number) => {
      const quoteParams: QuoteParams = {
        srcChainId: currentChains.from.blockchain.chainId,
        srcQuoteTokenAddress: currentChains.from.token.address,
        srcQuoteTokenAmount: padAmount(
          amount,
          currentChains.from.token.decimals
        ),
        dstChainId: currentChains.to.blockchain.chainId,
        dstQuoteTokenAddress: currentChains.to.token.address,
        slippage: "1",
      };
      setIsLoading(true);
      fetchQuote(quoteParams)
        .then((data) => {
          if (data.success) {
            setQuote(data.routes);
            setError("");
          } else {
            setError(data.errorMsg || "An error occurred");
            setQuote([]);
          }
        })
        .catch((error) => {
          setQuote([]);

          setError(
            error.message || "An error occurred while fetching the quote."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1300),
    [currentChains]
  );

  // Handle change event for the text field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);

    if (!isNaN(value)) {
      setIsParamsVisible(false);

      setCurrentChains({ ...currentChains, amount: value });
      debouncedFetchQuote(value);
    } else setCurrentChains({ ...currentChains, amount: 0 });
  };

  return (
    <Box bgcolor="#000" minHeight="100vh" width="100%" color="#FFF">
      <Box padding="8vh 8vw">
        <Box
          p="4vh 4vw"
          bgcolor="rgb(20,20,20)"
          borderRadius="20px"
          maxWidth="500px"
          mx="auto"
          display="flex"
          flexDirection="column"
          gap="25px"
        >
          <Box
            display="flex"
            gap="10px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={{ xs: "25px" }} fontWeight={600}>
              Transfer
            </Typography>
            <Image
              src="/images/reload.svg"
              alt="reload"
              title="Refresh"
              height={16}
              width={16}
              style={{
                padding: "8px",
                background: "rgb(31,36,40)",
                borderRadius: "5px",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? "0.6" : 1,
              }}
              onClick={() => {
                const quoteParams: QuoteParams = {
                  srcChainId: currentChains.from.blockchain.chainId,
                  srcQuoteTokenAddress: currentChains.from.token.address,
                  srcQuoteTokenAmount: padAmount(
                    currentChains.amount,
                    currentChains.from.token.decimals
                  ),
                  dstChainId: currentChains.to.blockchain.chainId,
                  dstQuoteTokenAddress: currentChains.to.token.address,
                  slippage: "1",
                };
                setIsLoading(true);
                fetchQuote(quoteParams)
                  .then((data) => {
                    if (data.success) {
                      setQuote(data.routes);
                      setError("");
                    } else {
                      setError(data.errorMsg || "An error occurred");
                      setQuote([]);
                    }
                  })
                  .catch((error) => {
                    setQuote([]);

                    setError(
                      error.message ||
                        "An error occurred while fetching the quote."
                    );
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="4px">
            <Box
              bgcolor="rgba(27,31,34,0.9)"
              display="flex"
              gap="10px"
              justifyContent="space-between"
              p="12px 16px"
              borderRadius="10px"
            >
              <Box display="flex" flexDirection="column">
                <Typography
                  fontSize="12px"
                  fontWeight={200}
                  color="rgb(198,204,210)"
                >
                  From
                </Typography>
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    sx={{
                      width: "150px",

                      bgcolor: "rgb(36,41,46)",
                      "&::after": {
                        bgcolor: "rgba(36,41,46,0.4)",
                      },
                    }}
                  />
                ) : (
                  <TextField
                    required
                    id="amount"
                    placeholder="0.0"
                    value={currentChains.amount}
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: 0,
                        height: "40px",
                        fontSize: "24px",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "#FFF",
                        fontWeight: 500,
                      },
                    }}
                  />
                )}
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    sx={{
                      width: "150px",

                      bgcolor: "rgb(36,41,46)",
                      "&::after": {
                        bgcolor: "rgba(36,41,46,0.4)",
                      },
                    }}
                  />
                ) : (
                  <Typography color="rgb(141,152,165)" fontSize="12px">
                    ≈ $ {quote.length > 0 && quote[0].srcQuoteTokenUsdValue}
                  </Typography>
                )}
              </Box>
              <Box
                onClick={() =>
                  router.push(
                    `/swap?type=input&selectedChainId=${currentChains.from.blockchain.chainId}`
                  )
                }
                bgcolor="rgb(31,36,40)"
                p="8px 15px"
                borderRadius="8px"
                display="flex"
                alignItems="center"
                gap="15px"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "rgb(36,41,46)",
                  },
                }}
                minWidth="150px"
                justifyContent="space-between"
              >
                <Box display="flex" gap="15px" alignItems="center">
                  <Box position="relative">
                    <Image
                      src={currentChains.from.token.logo}
                      alt={currentChains.from.token.name}
                      height={28}
                      width={28}
                    />
                    <Image
                      src={currentChains.from.blockchain.logo}
                      alt={currentChains.from.blockchain.name}
                      height={16}
                      width={16}
                      style={{ position: "absolute", top: 16, left: 16 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontWeight={700}
                      fontSize="18px"
                      lineHeight="22px"
                    >
                      {currentChains.from.token.name}
                    </Typography>
                    <Typography
                      color="rgba(198,204,210,0.8)"
                      fontSize="13px"
                      lineHeight="18px"
                    >
                      {currentChains.from.blockchain.name}
                    </Typography>
                  </Box>
                </Box>
                <Image
                  src="/images/dropdown.svg"
                  alt="down"
                  height={18}
                  width={18}
                />
              </Box>
            </Box>
            <Box
              bgcolor="rgba(27,31,34,0.9)"
              display="flex"
              gap="10px"
              justifyContent="space-between"
              p="12px 16px"
              borderRadius="10px"
            >
              <Box display="flex" flexDirection="column">
                <Typography
                  fontSize="12px"
                  fontWeight={200}
                  color="rgb(198,204,210)"
                >
                  To
                </Typography>
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    sx={{
                      width: "150px",

                      bgcolor: "rgb(36,41,46)",
                      "&::after": {
                        bgcolor: "rgba(36,41,46,0.4)",
                      },
                    }}
                  />
                ) : (
                  <Typography
                    py="10px"
                    fontSize="24px"
                    color="#FFF"
                    fontWeight={500}
                  >
                    {quote.length > 0 && quote[0].dstQuoteTokenAmount
                      ? convertToDecimal(
                          quote[0].dstQuoteTokenAmount,
                          quote[0].dstQuoteToken.decimals,
                          10
                        )
                      : "0"}
                  </Typography>
                )}
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    sx={{
                      bgcolor: "rgb(36,41,46)",
                      "&::after": {
                        bgcolor: "rgba(36,41,46,0.4)",
                      },
                      width: "150px",
                    }}
                  />
                ) : (
                  <Typography color="rgb(141,152,165)" fontSize="12px">
                    ≈ ${" "}
                    {quote.length > 0 &&
                      Number(quote[0].dstQuoteTokenUsdValue).toFixed(2)}
                  </Typography>
                )}
              </Box>
              <Box
                onClick={() =>
                  router.push(
                    `/swap?type=output&selectedChainId=${currentChains.to.blockchain.chainId}`
                  )
                }
                bgcolor="rgb(31,36,40)"
                p="8px 15px"
                borderRadius="8px"
                display="flex"
                alignItems="center"
                gap="15px"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "rgb(36,41,46)",
                  },
                }}
                minWidth="150px"
                justifyContent="space-between"
              >
                <Box display="flex" gap="15px" alignItems="center">
                  <Box position="relative">
                    <Image
                      src={currentChains.to.token.logo}
                      alt={currentChains.to.token.name}
                      height={28}
                      width={28}
                    />
                    <Image
                      src={currentChains.to.blockchain.logo}
                      alt={currentChains.to.blockchain.name}
                      height={16}
                      width={16}
                      style={{ position: "absolute", top: 16, left: 16 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontWeight={700}
                      fontSize="18px"
                      lineHeight="22px"
                    >
                      {currentChains.to.token.name}
                    </Typography>
                    <Typography
                      color="rgba(198,204,210,0.8)"
                      fontSize="13px"
                      lineHeight="18px"
                    >
                      {currentChains.to.blockchain.name}
                    </Typography>
                  </Box>
                </Box>
                <Image
                  src="/images/dropdown.svg"
                  alt="down"
                  height={18}
                  width={18}
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap="10px" mt="6px">
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  sx={{
                    bgcolor: "rgba(27,31,34,0.7)",
                    "&::after": {
                      bgcolor: "rgba(27,31,34,1)",
                    },
                  }}
                />
              ) : (
                <Box display="flex" gap="10px" justifyContent="space-between">
                  <Typography>Exchange rate</Typography>
                  <Box>
                    {quote.length > 0 && quote[0].srcQuoteToken.symbol
                      ? `1 ${quote[0].srcQuoteToken.symbol} = ${(
                          quote[0].dstQuoteTokenAmount /
                          quote[0].srcQuoteTokenAmount
                        ).toFixed(6)} ${quote[0].dstQuoteToken.symbol}`
                      : "--"}
                  </Box>
                </Box>
              )}
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  sx={{
                    bgcolor: "rgba(27,31,34,0.7)",
                    "&::after": {
                      bgcolor: "rgba(27,31,34,1)",
                    },
                  }}
                />
              ) : (
                <Box display="flex" gap="10px" justifyContent="space-between">
                  <Typography>Bridge Fee</Typography>
                  <Box>
                    {quote.length > 0 &&
                    quote[0].bridgeDescription.bridgeFeeAmount
                      ? `${convertToDecimal(
                          quote[0].bridgeDescription.bridgeFeeAmount,
                          quote[0].bridgeDescription.bridgeFeeToken.decimals,
                          6
                        )} ${quote[0].bridgeDescription.bridgeFeeToken.symbol}`
                      : "-"}
                  </Box>
                </Box>
              )}
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  sx={{
                    bgcolor: "rgba(27,31,34,0.7)",
                    "&::after": {
                      bgcolor: "rgba(27,31,34,1)",
                    },
                  }}
                />
              ) : (
                <Box display="flex" gap="10px" justifyContent="space-between">
                  <Typography>Estimated gas</Typography>
                  <Box>
                    {quote.length > 0 && quote[0].estimatedGas
                      ? quote[0].estimatedGas
                      : "-"}
                  </Box>
                </Box>
              )}
            </Box>
            {!!error && !isLoading && (
              <Typography color="red">{error}</Typography>
            )}
          </Box>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: "8px",
              "&.Mui-disabled": {
                color: "#ffffff55",
                bgcolor: "rgba(27,31,34,1)",
                cursor: "not-allowed",
              },
            }}
            disabled={!currentChains.amount || isLoading}
            onClick={async () => {
              setIsParamsVisible(true);
              setParameterList(await fetchBuildTx());
            }}
          >
            Bridge
          </Button>
          {isParamsVisible && (
            <Box>
              <Typography fontSize="18px" fontWeight={700}>
                Required Parameters :
              </Typography>
              {parameterList.length > 0 ? (
                parameterList.map((e, i) => (
                  <Typography key={i} fontSize="14px" fontWeight={400}>
                    - {e}
                  </Typography>
                ))
              ) : (
                <Typography fontSize="14px" fontWeight={400}>
                  No Params
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
