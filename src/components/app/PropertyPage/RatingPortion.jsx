import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function RatingPortion() {
  const [value, setValue] = React.useState(5); // Remove the type annotation

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >


      <Typography component="legend" className="md:text-2xl md:text-[#0080FF]"><span className="font-semibold">Vegan rating</span> :{value}</Typography>
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
}
