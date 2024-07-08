import { Box, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { SkeletonLoader } from "../common/SkeletonLoader";
import { useRouter } from "next/navigation";
import { Quote } from "@/types/Home.types";

type Props = {
  isLoading: boolean;
  currentChains: any;
  activeQuote: Quote | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FromBox({
  isLoading,
  currentChains,
  activeQuote,
  handleChange,
}: Props) {
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
          From
        </Typography>
        {isLoading ? (
          <SkeletonLoader sx={{ width: "150px " }} />
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
          <SkeletonLoader sx={{ width: "150px " }} />
        ) : (
          <Typography color="rgb(141,152,165)" fontSize="12px">
            ≈ $ {activeQuote && activeQuote.srcQuoteTokenUsdValue}
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
              style={{ borderRadius: "100%" }}
            />
            <Image
              src={currentChains.from.blockchain.logo}
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
          <Box>
            <Typography fontWeight={700} fontSize="18px" lineHeight="22px">
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
        <Image src="/images/dropdown.svg" alt="down" height={18} width={18} />
      </Box>
    </Box>
  );
}

export default FromBox;
