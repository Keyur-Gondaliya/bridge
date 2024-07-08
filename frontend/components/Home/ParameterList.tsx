import { Box, Typography } from "@mui/material";

type Props = { parameterList: string[] };

function ParameterList({ parameterList }: Props) {
  return (
    <Box>
      <Typography fontSize="18px" fontWeight={700}>
        Required Parameters :
      </Typography>
      {parameterList.length > 0 ? (
        parameterList.map((e, i) => (
          <Typography key={i} fontSize="14px" fontWeight={400}>
            - {e}
          </Typography>
        ))
      ) : (
        <Typography fontSize="14px" fontWeight={400}>
          No Params
        </Typography>
      )}
    </Box>
  );
}

export default ParameterList;
