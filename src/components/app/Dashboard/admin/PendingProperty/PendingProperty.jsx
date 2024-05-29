import { baseUrl } from '@/src/config/serverConfig';
import React, { useState } from 'react';
import ResortTable from './ResortTable';
import BoatTable from './BoatTable';
import { Box, Tab, Tabs } from '@mui/material';

const PendingProperty = () => {
  const [value, setValue] = React.useState('resorts');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <div>
      {/* <div className="flex items-center gap-2">
        <button
          className="px-6 py-2 bg-red-500 rounded-md text-white"
          onClick={()=> setPropertyName('resorts')}
        >
          Resorts
        </button>
        <button
          className="px-6 py-2 bg-red-500 rounded-md text-white"
          onClick={()=> setPropertyName('boat')}
        >
          Boat
        </button>
      </div> */}
      <Box sx={{ width: '100%' }}>
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

      {value === 'resorts' ? <ResortTable /> : <BoatTable />}


    </div>
  );
};

export default PendingProperty;