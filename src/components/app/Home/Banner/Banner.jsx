import React from "react";
import { ArrowDropDown } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
      <div className=" customContainer px-5 xl:px-0">
        <div className="lg:flex justify-between pt-10">
          <div className="md:flex flex-col justify-between">
            <div>
              <h1 className="md:text-title text-4xl text-white font-extralight lg:leading-[70px] font-outfit">
                Inclusive dive <br />
                adventures start here
              </h1>
              <h2 className="text-xl md:text-3xl font-medium mt-3 text-white tracking-wide">
                Book your diving trip online
              </h2>
            </div>
            {/* test */}
            <div className="flex items-center gap-2 md:gap-5 mt-10">
              <div>
                <button className=" button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]">Liveaboards</button>
              </div>
              <div >
                <button className=" button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]">Resorts</button>
              </div>
              <div >
                <button className=" button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]">Special Offers</button>
              </div>
            </div>
          </div>
          <div className="md:mt-10 xl:block hidden lg:mt-0 mt-10">
            <img className="h-80" src="/images/client/bannerImage.png" alt="" />
          </div>
        </div>
        <form className="mt-10 flex flex-col md:flex-row md:space-y-0 space-y-5 gap-3 justify-between md:items-center pb-10">
          <div className="w-full md:w-3/12 lg:w-6/12">
            <FormControl className=" w-full">
              <InputLabel style={{color: '#f1f2f2'}} id="demo-multiple-name-label">
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
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full md:w-3/12 lg:w-3/12">
            <FormControl className="w-full">
              <InputLabel style={{color: '#f1f2f2'}} id="demo-multiple-name-label">
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
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full md:w-3/12 lg:w-3/12">
            <FormControl className=" w-full" style={{color: '#f1f2f2'}}>
              <InputLabel  style={{color: '#f1f2f2'}} id="demo-multiple-name-label">
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
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className=" lg:ms:[30px] xl:ms-[60px]">
            <button className="rounded-full border-2 bg-white text-[20px]  duration-300 text-[#0080ff]  px-14 py-4 font-normal border-white cursor-pointer">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
