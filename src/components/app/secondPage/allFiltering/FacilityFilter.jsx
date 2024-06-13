import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

const FacilityFilter = () => {
  const [facilities, setFacilities] = useState([]);
  const names = facilities?.map((facility) => facility.name);
  const [facility, setFacility] = React.useState([]);
  const { searchValues } = useContext(userContext);
  console.log(searchValues);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFacility(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    fetch(
      `${baseUrl}/${
        searchValues?.tabValue === "Resorts" ||
        searchValues?.property === "resort"
          ? "resort-facilities"
          : "boat-facilities"
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchValues]);
  return (
    <div>
      {/* <FormControl sx={{ width: { xs: "100%", sm: 250 } }}>
        <InputLabel id="demo-multiple-checkbox-label">
          Select Facilities
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={facility}
          onChange={handleChange}
          input={<OutlinedInput label="Select Facilities" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          width="100%"
          //   size="small"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "40px",
          }}
        >
          {names?.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={facility.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <FormControl
        sx={{
          width: { xs: "100%", sm: 250 },
        }}
      >
        <InputLabel
          id="demo-multiple-checkbox-label"
          sx={{
            transform:
              facility.length > 0
                ? "translate(14px, -9px) scale(0.75)"
                : "translate(14px, 12px) scale(1)",
            transition: "0.2s ease-out",
          }}
        >
          Select Facilities
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={facility}
          onChange={handleChange}
          input={<OutlinedInput label="Select Facilities" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          sx={{
            height: 40,
            display: "flex",
            alignItems: "center",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={facility.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FacilityFilter;
