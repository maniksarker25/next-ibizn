import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PendingBoatOrder from "@/src/components/app/Dashboard/PendingOrders/PendingBoatOrder/PendingBoatOrder";
import PendingResortOrder from "@/src/components/app/Dashboard/PendingOrders/PendingResortOrder/PendingResortOrder";

const PendingOrders = () => {
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

export default PendingOrders;
