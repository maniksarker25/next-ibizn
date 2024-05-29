import { useTheme } from "@emotion/react";
import { ArrowDropDown } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";

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

const Banner = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="bg-primary">
      <div className="w-[90%] sm:w-[85%] mx-auto py-20">
        <div>
          <div className="flex items-center gap-2 md:gap-5">
            <div>
              <button className="button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]">
                Liveaboards
              </button>
            </div>
            <div>
              <button className="button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]">
                Resorts
              </button>
            </div>
            <div>
              <button className="button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]">
                Special Offers
              </button>
            </div>
          </div>
          
          <form className="mt-10 md:flex md:space-y-0 space-y-5 gap-3 justify-between items-center pb-10">
            <div className="w-full md:w-3/12 lg:w-6/12">
              <FormControl className=" w-full">
                <InputLabel
                  style={{ color: "#f1f2f2", }}
                  id="demo-multiple-name-label"
                >
                  Destinations
                </InputLabel>
                <Select
                  className="border-2 border-white"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  IconComponent={() => (
                    <ArrowDropDown className="text-white cursor-pointer" />
                  )}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full md:w-3/12 lg:w-3/12">
              <FormControl className="w-full">
                <InputLabel
                  style={{ color: "#f1f2f2" }}
                  id="demo-multiple-name-label"
                >
                  Year/Month
                </InputLabel>
                <Select
                  className="border-2 border-white"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  IconComponent={() => (
                    <ArrowDropDown className="text-white cursor-pointer" />
                  )}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full md:w-3/12 lg:w-3/12">
              <FormControl className=" w-full" style={{ color: "#f1f2f2" }}>
                <InputLabel
                  style={{ color: "#f1f2f2" }}
                  id="demo-multiple-name-label"
                >
                  Vegan rating
                </InputLabel>
                <Select
                  className="border-2 border-white"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  IconComponent={() => (
                    <ArrowDropDown className="text-white cursor-pointer" />
                  )}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="text-center lg:ms:[30px] xl:ms-[60px]">
              <button className="rounded-full border-2 hover:bg-white text-[20px] duration-300 hover:text-[#0080ff] text-white px-14 py-4 font-normal border-white cursor-pointer">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
