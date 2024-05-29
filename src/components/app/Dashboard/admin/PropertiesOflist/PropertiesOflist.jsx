import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import ResortTable from './ResortTable';
import BoatTable from './BoatTable';

const PropertiesOflist = () => {
  const [value, setValue] = useState('resorts');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="resorts" label="Resort"  />
          <Tab value="boats" label="Boat" />
        </Tabs>
      </Box>

      {value === 'resorts' ? <ResortTable /> : <BoatTable />}

    </div>
  );
};

export default PropertiesOflist;