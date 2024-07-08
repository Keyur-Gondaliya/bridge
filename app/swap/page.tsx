import { fetchRecommendedTokens, fetchSupportedChains } from "@/utils/api";
import { Box, Typography } from "@mui/material";
import SwapHeader from "@/components/Swap/SwapHeader";
import BlockChainListView from "@/components/Swap/BlockChainList";
import SwapTokensList from "@/components/Swap/SwapTokensList";

interface SearchParams {
  type: "input" | "output";
  selectedChainId: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const type = searchParams.type;
  const selectedChainId = searchParams.selectedChainId;

  let chains, tokens, chainsError, tokensError;

  try {
    chains = await fetchSupportedChains();
  } catch (error: any) {
    chainsError = error?.message || "Failed to fetch supported chains.";
  }

  try {
    tokens = await fetchRecommendedTokens(selectedChainId);
  } catch (error: any) {
    tokensError = error?.message || "Failed to fetch recommended tokens.";
  }

  return (
    <Box bgcolor="#000" width="100%" minHeight="100vh" color="text.secondary">
      <Box
        display="flex"
        justifyContent="center"
        py={{ xs: "30px", md: "60px" }}
      >
        <Box
          p="4vh 4vw"
          bgcolor="rgb(20,20,20)"
          borderRadius="20px"
          maxWidth="500px"
          mx="auto"
          display="flex"
          flexDirection="column"
          gap="12px"
          width="100%"
        >
          <SwapHeader />
          <Box display="flex" flexDirection="column" gap="18px">
            {chainsError ? (
              <Typography color="error">{chainsError}</Typography>
            ) : (
              <BlockChainListView
                selectedChainId={selectedChainId}
                type={type}
                blockchainList={chains?.supportedChains}
              />
            )}

            {tokensError ? (
              <Typography color="error">{tokensError}</Typography>
            ) : (
              <SwapTokensList
                blockchainList={chains?.supportedChains}
                selected={tokens?.recommendedTokens}
                selectedChainId={selectedChainId}
                type={type}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
