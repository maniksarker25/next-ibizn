import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PendingBoatOrder from "./PendingBoatOrder";
import PendingResortOrder from "./PendingResortOrder";

const PendingOrder = () => {
  const [value, setValue] = useState("resorts");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="resorts" label="Resort" />
          <Tab value="boats" label="Boat" />
        </Tabs>
      </Box>

      {value === "resorts" ? <PendingResortOrder /> : <PendingBoatOrder />}
    </div>
  );
};

export default PendingOrder;
