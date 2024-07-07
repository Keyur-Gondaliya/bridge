import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SkeletonLoader } from "../common/SkeletonLoader";
import { convertToDecimal } from "@/utils/supportFunctions";

type Props = {
  isLoading: boolean;
  currentChains: any;
  quote: any;
};
function ToBox({ isLoading, currentChains, quote }: Props) {
  const router = useRouter();

  return (
    <Box
      bgcolor="rgba(27,31,34,0.9)"
      display="flex"
      gap="10px"
      justifyContent="space-between"
      p="12px 16px"
      borderRadius="10px"
    >
      <Box display="flex" flexDirection="column">
        <Typography fontSize="12px" fontWeight={200} color="rgb(198,204,210)">
          To
        </Typography>
        {isLoading ? (
          <SkeletonLoader sx={{ width: "150px " }} />
        ) : (
          <Typography py="10px" fontSize="24px" color="#FFF" fontWeight={500}>
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
          <SkeletonLoader sx={{ width: "150px " }} />
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
            <Typography fontWeight={700} fontSize="18px" lineHeight="22px">
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
        <Image src="/images/dropdown.svg" alt="down" height={18} width={18} />
      </Box>
    </Box>
  );
}

export default ToBox;
