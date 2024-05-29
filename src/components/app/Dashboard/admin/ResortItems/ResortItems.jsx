import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Facility from "./Facility";
import Inclusion from "./Inclusion";
import Exclusion from "./Exclusion";
import Equipment from "./Equipment";
import DiveCourse from "./DiveCourse";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ResortItems = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <h1 className="text-2xl text-center my-3 text-black font-bold">
        Add Resort Item
      </h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Facility" {...a11yProps(0)} />
            <Tab label="Inclusion" {...a11yProps(1)} />
            <Tab label="Exclusion" {...a11yProps(2)} />
            <Tab label="Equipment" {...a11yProps(3)} />
            <Tab label="Dive course" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Facility />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Inclusion />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Exclusion />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Equipment />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <DiveCourse />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ResortItems;
