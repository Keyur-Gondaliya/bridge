"use client";

import { chains } from "@/constants/imageList";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  blockchainList:
    | {
        chainId: string;
        name: string;
      }[]
    | undefined;
  selectedChainId: string;
  type: string;
};

function BlockChainListView({ blockchainList, selectedChainId, type }: Props) {
  const router = useRouter();
  const [isBlockchainAllVisible, setIsBlockchainAllVisible] =
    useState<boolean>(false);

  return (
    <>
      <Box display="flex" gap="10px" flexWrap="wrap">
        {blockchainList
          ?.filter(
            (blockchain) =>
              blockchain.chainId.toString() === selectedChainId.toString()
          )
          .concat(
            blockchainList.filter(
              (blockchain) =>
                blockchain.chainId.toString() !== selectedChainId.toString()
            )
          )
          .slice(0, isBlockchainAllVisible ? blockchainList.length : 4)
          .map((blockchain, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              gap="10px"
              alignItems="center"
              justifyContent="space-between"
              onClick={() => {
                router.push(
                  `/swap?type=${type}&selectedChainId=${blockchain.chainId}`
                );
              }}
              bgcolor={
                selectedChainId === blockchain.chainId
                  ? "#2752E722"
                  : "rgb(31,36,40)"
              }
              p="10px 20px"
              borderRadius="8px"
              minWidth="50px"
              flex={1}
              sx={{ cursor: "pointer" }}
              border={
                selectedChainId.toString() === blockchain.chainId.toString()
                  ? "1px solid #2752E7"
                  : ""
              }
            >
              <Image
                src={
                  chains[blockchain.chainId].imagePath || "/images/unknown.jpg"
                }
                alt={blockchain.name}
                height={32}
                width={32}
                style={{ borderRadius: "100%" }}
              />
              <Typography>{chains[blockchain.chainId].shortName}</Typography>
            </Box>
          ))}
      </Box>
      <Button
        onClick={() => setIsBlockchainAllVisible(!isBlockchainAllVisible)}
        sx={{
          bgcolor: "rgb(31,36,40)",
          fontSize: "14px",
          fontWeight: 500,
          display: "flex",
          gap: "10px",
        }}
      >
        {!isBlockchainAllVisible ? "Show More" : "Show Less"}
        <Image
          src="/images/dropdown.svg"
          alt="down"
          height={18}
          width={18}
          style={{
            transform: isBlockchainAllVisible ? "rotate(180deg)" : "",
          }}
        />
      </Button>
    </>
  );
}

export default BlockChainListView;
