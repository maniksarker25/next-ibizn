import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Packages from "./Packages";
import Resorts from "./Resorts";
import Swal from "sweetalert2";
import { baseUrl } from "@/src/config/serverConfig";

// for tabs -----
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
const Resort = () => {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch(`${baseUrl}/packages/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPackages(data?.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // for tabs -----------
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* handle Addd Resort */
  const handleAddResort = () => {
    if (packages?.length === 0) {
      // console.log('gdfyteg');
      Swal.fire("To add a resort, kindly add a package first");
    } else {
      router.push("/dashboard/resort/add-resort");
    }
  };
  // console.log({packages});
  //----------------
  return (
    <div>
      <h1 className="text-2xl text-center my-3 text-black font-bold">Resort</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/dashboard/resort/add-package")}
          className="px-6 py-2 bg-red-500 rounded-md text-white"
        >
          Add a Package
        </button>
        <button
          onClick={handleAddResort}
          className="px-6 py-2 bg-red-500 rounded-md text-white"
        >
          Add a Resort
        </button>
      </div>
      {/* Resort and packages data  */}
      <div className="mt-8">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Packages" {...a11yProps(0)} />
              <Tab label="Resorts" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Packages />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Resorts />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Resort;
