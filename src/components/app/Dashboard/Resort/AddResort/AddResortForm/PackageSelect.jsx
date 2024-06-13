import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { baseUrl } from "@/src/config/serverConfig";
import { Typography } from "@mui/material";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function PackageSelect({
  resortData,
  setResortData,
  packageError,
}) {
  const [packageData, setPackageData] = useState([]);
  const [packages, setPackages] = useState([]);
  //   console.log(packageData);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPackages(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    fetch(`${baseUrl}/packages/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackageData(data?.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    setResortData({
      ...resortData,
      listOfPackages: packages,
    });
  }, [packages]);
  return (
    <div>
      <Typography my={"10px"} fontWeight={500} fontSize={"20px"}>
        Select packages from your own packages
      </Typography>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Select Package</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={packages}
          onChange={handleChange}
          input={<OutlinedInput label="Select Package" />}
          MenuProps={MenuProps}
        >
          {packageData?.map((p) => (
            <MenuItem key={p?._id} value={p?._id}>
              {p?.packageName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {packageError && (
        <Typography color={"red"} mt={"10px"}>
          {packageError}
        </Typography>
      )}
    </div>
  );
}
