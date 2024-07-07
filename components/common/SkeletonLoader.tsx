import { Skeleton } from "@mui/material";

export const SkeletonLoader: React.FC<{ sx?: any }> = ({ sx }) => (
  <Skeleton
    animation="wave"
    sx={{
      bgcolor: "rgb(36,41,46)",
      "&::after": {
        bgcolor: "rgba(36,41,46,0.4)",
      },
      ...sx,
    }}
  />
);
