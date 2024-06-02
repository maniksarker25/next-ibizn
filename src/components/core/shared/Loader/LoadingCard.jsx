import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const LoadingCard = () => {
  return (
    <Box className="w-full mx-auto p-4  rounded-md shadow-md bg-white">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Box mt={2}>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="40%" height={20} />
      </Box>
      <Box mt={2}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
      </Box>
    </Box>
  );
};

export default LoadingCard;
