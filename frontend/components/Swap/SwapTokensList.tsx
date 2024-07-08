"use client";

import { chains } from "@/constants/imageList";
import { ChainContext } from "@/utils/context/ChainContext";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

type Props = {
  blockchainList: { name: string; chainId: string }[] | undefined;
  selected:
    | {
        name: string;
        logoURI: string;
        decimals: number;
        address: string;
      }[]
    | undefined;
  selectedChainId: string;
  type: string;
};

export default function SwapTokensList({
  selected,
  selectedChainId,
  type,
}: Props) {
  const context = useContext(ChainContext);
  const router = useRouter();

  if (!context) {
    alert("Something Went Wrong, Please Connect Provider");
    return;
  }

  const { currentChains, setCurrentChains } = context;
  const currentBlockchain = selectedChainId
    ? chains[selectedChainId].name || "ETHEREUM"
    : "ETHEREUM";

  const handleTokenClick = (token: {
    address: string;
    decimals: number;
    logoURI: string;
    name: string;
  }) => {
    if (selectedChainId) {
      const updatedChains = {
        ...currentChains,
        [type === "input" ? "from" : "to"]: {
          blockchain: {
            chainId: selectedChainId,
            logo: chains[selectedChainId]?.imagePath || "",
            name: currentBlockchain,
          },
          token: {
            address: token.address,
            decimals: token.decimals,
            logo: token.logoURI,
            name: token.name,
          },
        },
      };
      setCurrentChains(updatedChains);
      router.push(`/`);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="12px"
      maxHeight="400px"
      overflow="scroll"
    >
      <Typography fontSize="12px">on {currentBlockchain}</Typography>
      {selected && selected?.length === 0 ? (
        <Typography textAlign="center" width="100%">
          No Token Available
        </Typography>
      ) : (
        selected?.map((token, index) => {
          const isSelected =
            (currentChains.from.token.address === token.address &&
              type === "input") ||
            (currentChains.to.token.address === token.address &&
              type === "output");

          return (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="10px 20px 10px 10px"
              borderRadius="10px"
              bgcolor={isSelected ? "#2752E722" : ""}
              border={isSelected ? "1px solid #2752E7" : ""}
              sx={{ cursor: "pointer" }}
              onClick={() => handleTokenClick(token)}
            >
              <Box display="flex" gap="5px" alignItems="center">
                <Box position="relative">
                  <Image
                    src={token.logoURI}
                    alt={token.name}
                    height={32}
                    width={32}
                    style={{ borderRadius: "100%" }}
                  />
                  <Image
                    src={
                      selectedChainId ? chains[selectedChainId].imagePath : ""
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
                    {token.name}
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
          );
        })
      )}
    </Box>
  );
}
