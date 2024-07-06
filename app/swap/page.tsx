"use client";
import { chains } from "@/constants/imageList";
import {
  Blockchain,
  ChainContext,
  CurrentChains,
  Token,
} from "@/utils/context/ChainContext";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const context = useContext(ChainContext);

  if (!context) {
    throw new Error("SomeComponent must be used within an AppContextProvider");
  }
  const { currentChains, setCurrentChains } = context;

  const selectedChainId = searchParams.get("selectedChainId");
  const currentBlockchain = selectedChainId
    ? chains[selectedChainId].name || "ETHEREUM"
    : "ETHEREUM";
  const type = searchParams.get("type");
  const [blockchainList, setBlockchainList] = useState<
    { name: string; chainId: string }[]
  >([]);
  const [selected, setSelected] = useState<
    { name: string; logoURI: string; decimals: number; address: string }[]
  >([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBlockchianAllVisible, setIsBlockchianAllVisible] =
    useState<boolean>(false);
  useEffect(() => {
    async function fetchSupportedChains() {
      const url = "https://aggregator-api.xy.finance/v1/supportedChains";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlockchainList(data.supportedChains);
        return data;
      } catch (error) {
        console.error("Error fetching supported chains:", error);
      }
    }
    if (!((type === "input" || type === "output") && selectedChainId)) {
      router.push("/");
    } else fetchSupportedChains();
  }, []);

  useEffect(() => {
    async function fetchRecommendedTokens(chainId: string | null) {
      if (!chainId) return; // Ensure chainId is valid before making the request
      const url = `https://aggregator-api.xy.finance/v1/recommendedTokens?chainId=${chainId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setSelected(data.recommendedTokens);
          setError("");
        } else setError(data.errorMsg);
        return data;
      } catch (error) {
        console.error("Error fetching recommended tokens:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (!((type === "input" || type === "output") && selectedChainId)) {
      router.push("/");
    } else {
      setIsLoading(true);
      fetchRecommendedTokens(selectedChainId);
    }
  }, [selectedChainId]);

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
          <Box display="flex" gap="10px" alignItems="baseline">
            <Box
              sx={{
                padding: "8px",
                background: "rgb(31,36,40)",
                borderRadius: "5px",
                cursor: "pointer",
                height: "18px",
              }}
            >
              <Image
                src="/images/left.svg"
                alt="go-back"
                height={18}
                width={18}
                onClick={() => {
                  router.push("/");
                }}
              />
            </Box>
            <Typography fontSize={{ xs: "22px" }} fontWeight={600}>
              Select a Token
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap="18px">
            <Box display="flex" gap="10px" flexWrap="wrap">
              {blockchainList
                .slice(0, isBlockchianAllVisible ? blockchainList.length : 4)
                .map((b, i) => (
                  <Box
                    key={i}
                    display="flex"
                    flexDirection="column"
                    gap="10px"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => {
                      router.push(
                        `/swap?type=${type}&selectedChainId=${b.chainId}`
                      );
                    }}
                    bgcolor={
                      selectedChainId && selectedChainId == b.chainId
                        ? "#2752E722"
                        : "rgb(31,36,40)"
                    }
                    p="10px 20px"
                    borderRadius="8px"
                    minWidth="50px"
                    flex={1}
                    sx={{ cursor: "pointer" }}
                    border={
                      selectedChainId && selectedChainId == b.chainId
                        ? "1px solid #2752E7"
                        : ""
                    }
                  >
                    <Image
                      src={chains[b.chainId].imagePath || "/images/unknown.jpg"}
                      alt={b.name}
                      height={32}
                      width={32}
                      style={{ borderRadius: "100%" }}
                    />
                    <Typography>{chains[b.chainId].shortName}</Typography>
                  </Box>
                ))}
            </Box>
            <Button
              onClick={() => setIsBlockchianAllVisible(!isBlockchianAllVisible)}
              sx={{
                bgcolor: "rgb(31,36,40)",
                fontSize: "14px",
                fontWeight: 500,
                display: "flex",
                gap: "10px",
              }}
            >
              {!isBlockchianAllVisible ? "Show More" : "Show Less"}
              <Image
                src="/images/dropdown.svg"
                alt="down"
                height={18}
                width={18}
                style={{
                  transform: isBlockchianAllVisible ? "rotate(180deg)" : "",
                }}
              />
            </Button>
            {isLoading ? (
              <Typography textAlign="center" width="100%">
                Loading...
              </Typography>
            ) : !!error ? (
              <Box color="red">{error}</Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                gap="12px"
                maxHeight="400px"
                overflow="scroll"
              >
                <Typography fontSize="12px">on {currentBlockchain}</Typography>
                {selected.map((t, i) => (
                  <Box
                    key={i}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p="10px 20px 10px 10px"
                    borderRadius="10px"
                    bgcolor={
                      (currentChains.from.token.address === t.address &&
                        type === "input") ||
                      (currentChains.to.token.address === t.address &&
                        type === "output")
                        ? "#2752E722"
                        : ""
                    }
                    border={
                      (currentChains.from.token.address === t.address &&
                        type === "input") ||
                      (currentChains.to.token.address === t.address &&
                        type === "output")
                        ? "1px solid #2752E7"
                        : ""
                    }
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      if (selectedChainId)
                        if (type === "input") {
                          setCurrentChains({
                            ...currentChains,
                            from: {
                              blockchain: {
                                chainId: selectedChainId,
                                logo: chains[selectedChainId]?.imagePath || "",
                                name: currentBlockchain,
                              },
                              token: {
                                address: t.address,
                                decimals: t.decimals,
                                logo: t.logoURI,
                                name: t.name,
                              },
                            },
                          });
                        } else {
                          setCurrentChains({
                            ...currentChains,
                            to: {
                              blockchain: {
                                chainId: selectedChainId,
                                logo: chains[selectedChainId]?.imagePath || "",
                                name: currentBlockchain,
                              },
                              token: {
                                address: t.address,
                                decimals: t.decimals,
                                logo: t.logoURI,
                                name: t.name,
                              },
                            },
                          });
                        }
                      router.push(`/`);
                    }}
                  >
                    <Box display="flex" gap="5px" alignItems="center">
                      <Box position="relative">
                        <Image
                          src={t.logoURI}
                          alt={t.name}
                          height={32}
                          width={32}
                          style={{ borderRadius: "100%" }}
                        />
                        <Image
                          src={
                            selectedChainId
                              ? chains[selectedChainId].imagePath
                              : ""
                          }
                          alt={currentChains.from.blockchain.name}
                          height={16}
                          width={16}
                          style={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            borderRadius: "100%",
                          }}
                        />
                      </Box>
                      <Box display="flex" flexDirection="column" gap="4px">
                        <Typography
                          fontWeight={700}
                          fontSize="18px"
                          lineHeight="22px"
                        >
                          {t.name}
                        </Typography>
                        <Typography
                          color="rgba(198,204,210,0.8)"
                          fontSize="13px"
                          lineHeight="18px"
                        >
                          {currentBlockchain}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography>0</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
