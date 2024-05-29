import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Itineraries from "./Itineraries";
import Boats from "./Boats";
import Swal from "sweetalert2";
import { baseUrl } from "@/src/config/serverConfig";
// import { userContext } from "@/src/storage/contextApi";
// import Spinner from "../../../core/shared/Loader/Spinner";

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

const Boat = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  // const { loader, setLoader } = useContext(userContext);

  const [itineraries, setItineraries] = useState([]);

  // get packages for this user
  useEffect(() => {
    // setLoader(true)
    fetch(`${baseUrl}/itineraries/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItineraries(data?.data)
        // setLoader(false)
      })
      .catch((err) => {
        // setLoader(false)
      });
  }, []);
  // for tabs -----------

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // add board
  const handleAddBoard = ()=> {
    if(itineraries.length ===0){
      Swal.fire("To add a boat, kindly add an itinerary first");
    }else{

      router.push("/dashboard/boat/add-boat")
    }
  }
  //----------------



  return (
    <div>
      
      <h1 className="text-2xl text-center my-3 text-black font-bold">
        Boat
      </h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/dashboard/boat/add-itenary")}
          className="px-6 py-2 bg-red-500 rounded-md text-white"
        >
          Add an Itinerary
        </button>
        <button
          onClick={handleAddBoard}
          className="px-6 py-2 bg-red-500 rounded-md text-white"
        >
          Add a Boat
        </button>
      </div>

      {/* boat and itineraries data  */}
      <div className="mt-8">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Itineraries" {...a11yProps(0)} />
              <Tab label="Boats" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Itineraries />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Boats />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Boat;
