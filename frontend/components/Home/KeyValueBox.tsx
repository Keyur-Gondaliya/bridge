import { Box, Typography } from "@mui/material";
import { SkeletonLoader } from "../common/SkeletonLoader";

type Props = {
  isLoading: boolean;
  quote: any;
  value: string;
  name: string;
};

function KeyValueBox({ isLoading, quote, value, name }: Props) {
  return isLoading ? (
    <SkeletonLoader sx={{ width: "100% " }} />
  ) : (
    <Box display="flex" gap="10px" justifyContent="space-between">
      <Typography>{name}</Typography>
      <Box>
        {quote && quote.length > 0 && quote[0].srcQuoteToken.symbol
          ? value
          : "-"}
      </Box>
    </Box>
  );
}

export default KeyValueBox;
