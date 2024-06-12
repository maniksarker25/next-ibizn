import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ResortOrder from "./ResortOrder/ResortOrder";
import BoatOrder from "./BoatOrder/BoatOrder";

const Orders = () => {
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

      {value === "resorts" ? <ResortOrder /> : <BoatOrder />}
    </div>
  );
};

export default Orders;
