"use client";
import FromBox from "@/components/Home/FromBox";
import HomeHeader from "@/components/Home/HomeHeader";
import KeyValueBox from "@/components/Home/KeyValueBox";
import ParameterList from "@/components/Home/ParameterList";
import ToBox from "@/components/Home/ToBox";
import { SLIPPAGE } from "@/constants/defaultValues";
import { Quote, QuoteParams } from "@/types/Home.types";
import { fetchBuildTx, fetchQuote } from "@/utils/api";
import { ChainContext, ChainContextProps } from "@/utils/context/ChainContext";
import {
  convertToDecimal,
  debounce,
  padAmount,
} from "@/utils/supportFunctions";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";

export default function Home() {
  const context = useContext<ChainContextProps | undefined>(ChainContext);
  const [quote, setQuote] = useState<Quote[]>([]);
  const [isParamsVisible, setIsParamsVisible] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parameterList, setParameterList] = useState<string[]>([]);
  if (!context) {
    setError("Home component must be used within a ChainContextProvider");
  }
  const { currentChains, setCurrentChains } = context as ChainContextProps;

  const loadQuote = async (amount: number) => {
    const quoteParams: QuoteParams = {
      srcChainId: currentChains.from.blockchain.chainId,
      srcQuoteTokenAddress: currentChains.from.token.address,
      srcQuoteTokenAmount: padAmount(amount, currentChains.from.token.decimals),
      dstChainId: currentChains.to.blockchain.chainId,
      dstQuoteTokenAddress: currentChains.to.token.address,
      slippage: SLIPPAGE,
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
  };
  const debouncedLoadQuote = debounce(loadQuote, 1300);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setIsParamsVisible(false);
    if (!isNaN(value) && value !== 0) {
      setCurrentChains({ ...currentChains, amount: value });
      debouncedLoadQuote(value);
    } else setCurrentChains({ ...currentChains, amount: 0 });
  };

  const loadBuildTxDetails = async () => {
    setIsParamsVisible(true);
    try {
      const data = await fetchBuildTx({});
      setParameterList(data?.buildTxDetails as string[]);
    } catch (error: any) {
      setError(error?.message || "An error occurred while fetching the quote.");
      console.error("Failed to load build transaction Parameter :", error);
    }
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
          <HomeHeader
            amount={currentChains.amount}
            isLoading={isLoading}
            loadQuote={loadQuote}
          />
          <Box display="flex" flexDirection="column" gap="4px">
            <FromBox
              isLoading={isLoading}
              currentChains={currentChains}
              quote={quote}
              handleChange={handleChange}
            />
            <ToBox
              isLoading={isLoading}
              currentChains={currentChains}
              quote={quote}
            />
            <Box display="flex" flexDirection="column" gap="10px" mt="6px">
              <KeyValueBox
                isLoading={isLoading}
                value={
                  quote.length > 0
                    ? `1 ${quote[0].srcQuoteToken.symbol} = ${(
                        quote[0].dstQuoteTokenAmount /
                        quote[0].srcQuoteTokenAmount
                      ).toFixed(6)} ${quote[0].dstQuoteToken.symbol}`
                    : ""
                }
                quote={quote}
                name="Exchange rate"
                key="1"
              />
              <KeyValueBox
                isLoading={isLoading}
                value={
                  quote.length > 0
                    ? `${convertToDecimal(
                        quote[0].bridgeDescription.bridgeFeeAmount,
                        quote[0].bridgeDescription.bridgeFeeToken.decimals,
                        6
                      )} ${quote[0].bridgeDescription.bridgeFeeToken.symbol}`
                    : ""
                }
                quote={quote}
                name="Bridge Fee"
                key="2"
              />

              <KeyValueBox
                isLoading={isLoading}
                quote={quote}
                value={quote.length > 0 ? quote[0].estimatedGas : ""}
                name="Estimated gas"
                key="3"
              />
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
            onClick={loadBuildTxDetails}
          >
            Bridge
          </Button>
          {isParamsVisible && <ParameterList parameterList={parameterList} />}
        </Box>
      </Box>
    </Box>
  );
}
