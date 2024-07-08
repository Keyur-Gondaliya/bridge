"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SwapHeader() {
  const router = useRouter();
  return (
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
  );
}

export default SwapHeader;
