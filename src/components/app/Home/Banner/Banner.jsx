import React, { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchItemModal from "./SearchItemModal";

const tabItems = ["Liveaboards", "Resorts", "Special Offers"];

const Banner = () => {
  const [tabValue, setTabValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destination, setDestination] = useState("");
  console.log(destination);
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
              {tabItems?.map((item, index) => (
                <div
                  onClick={() => setTabValue(item)}
                  key={index}
                  className={`${
                    tabValue === item && `bg-white text-black`
                  } button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="md:mt-10 xl:block hidden lg:mt-0 mt-10">
            <img className="h-80" src="/images/client/bannerImage.png" alt="" />
          </div>
        </div>
        {/* <form className="mt-10 flex flex-col md:flex-row md:space-y-0 space-y-5 gap-3 justify-between md:items-center pb-10">
          <div className="w-full md:w-3/12 lg:w-6/12">
            <FormControl className=" w-full">
              <TextField
                className="border-2 border-white bg-none"
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
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
        </form> */}
        <div className="mt-10 flex flex-col md:flex-row md:space-y-0 space-y-5 gap-3 justify-between md:items-center pb-10">
          <TextField
            onClick={() => setIsModalOpen(true)}
            id="outlined-basic"
            label="Destination"
            value={destination}
            variant="outlined"
            size="large"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "lightblue", // Border color
                  background: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                  background: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                  background: "transparent",
                },
              },
              "& .MuiInputBase-input": {
                height: "35px", // Height of the input element
                color: "white", // Text color
                backgroundColor: "transparent", // Ensure input background is transparent
              },
              "& .MuiInputLabel-root": {
                color: "white", // Label color
                background: "transparent",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Label color when focused
                background: "transparent",
              },
              "& .MuiInputBase-input::selection": {
                background: "transparent", // Remove background color when text is selected
              },
              width: "100%", // Width of the entire TextField
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Select Month and Year"}
              views={["month", "year"]}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "lightblue", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Border color when focused
                  },
                },
                "& .MuiInputBase-input": {
                  height: "35px", // Height of the input element
                  color: "white", // Text color
                  backgroundColor: "transparent", // Ensure input background is transparent
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white", // Label color when focused
                },
                width: "100%", // Width of the entire TextField
              }}
            />
          </LocalizationProvider>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            size="large"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "lightblue", // Border color
                  background: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                  background: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                  background: "transparent",
                },
              },
              "& .MuiInputBase-input": {
                height: "35px", // Height of the input element
                color: "white", // Text color
                backgroundColor: "transparent", // Ensure input background is transparent
              },
              "& .MuiInputLabel-root": {
                color: "white", // Label color
                background: "transparent",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Label color when focused
                background: "transparent",
              },
              "& .MuiInputBase-input::selection": {
                background: "transparent", // Remove background color when text is selected
              },
              width: "100%", // Width of the entire TextField
            }}
          />
          <div
            className={`button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]`}
          >
            Search
          </div>
        </div>
        <SearchItemModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setDestination={setDestination}
        />
      </div>
    </div>
  );
};

export default Banner;
