import { Box, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  loadQuote: (amount: number) => void;
  isLoading: boolean;
  amount: number;
};

function HomeHeader({ loadQuote, isLoading, amount }: Props) {
  return (
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
        onClick={() => loadQuote(amount)}
      />
    </Box>
  );
}

export default HomeHeader;
