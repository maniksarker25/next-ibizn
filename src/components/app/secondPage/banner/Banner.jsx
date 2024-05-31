import React, { useContext, useEffect, useState } from "react";
import { userContext } from "@/src/storage/contextApi";
import { ArrowDropDown } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import SearchItemModal from "../../Home/Banner/SearchItemModal";

const tabItems = ["Liveaboards", "Resorts", "Special Offers"];
const ratings = [
  { minRating: 1, maxRating: 2 },
  { minRating: 2, maxRating: 3 },
  { minRating: 3, maxRating: 4 },
  { minRating: 4, maxRating: 5 },
];
const Banner = () => {
  const { searchValues, setSearchValues } = useContext(userContext);
  const [error, setError] = useState("");
  const router = useRouter();
  // const [tabValue, setTabValue] = useState("Liveaboards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [destination, setDestination] = useState("");
  const [rating, setRating] = useState({ minRating: "", maxRating: "" });
  const [formattedDate, setFormattedDate] = useState("");
  // const [property, setProperty] = useState("");
  const renderSelectedValue = (value) => {
    return `${value.minRating}-${value.maxRating}`;
  };

  const handleDateChange = (date) => {
    const formatted = date ? dayjs(date).format("YYYY-MM-DD") : "";

    setSearchValues({ ...searchValues, date: formatted });
  };

  const handleSearchValues = () => {
    if (rating?.minRating) {
      searchValues.minRating = rating?.minRating;
      searchValues.maxRating = rating?.maxRating;
    }
  };

  useEffect(() => {
    // Set the default value for rating when the component mounts
    setRating({
      minRating: searchValues.minRating,
      maxRating: searchValues.maxRating,
    });
  }, []);
  return (
    <div className="bg-primary">
      <div className="w-[90%] sm:w-[85%] mx-auto py-20">
        <div>
          <div className="flex items-center gap-2 md:gap-5 mt-10">
            {tabItems?.map((item, index) => (
              <div
                onClick={() =>
                  setSearchValues({
                    ...searchValues,
                    tabValue: item,
                  })
                }
                key={index}
                className={`${
                  searchValues?.tabValue === item && `bg-white text-black`
                } button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* nice to meet you man */}
          <div className="mt-10 flex flex-col md:flex-row md:space-y-0 space-y-5 gap-3 justify-between md:items-center pb-10 text-white">
            <TextField
              onClick={() => setIsModalOpen(true)}
              id="outlined-basic"
              label="Destination"
              value={searchValues?.destination}
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
            {searchValues?.tabValue === "Special Offers" ? (
              <div className="w-full">
                <FormControl className=" w-full" style={{ color: "#f1f2f2" }}>
                  <InputLabel
                    style={{ color: "#f1f2f2" }}
                    id="demo-simple-select-label"
                  >
                    Select Property
                  </InputLabel>
                  <Select
                    className="border-2 border-white"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchValues?.property}
                    input={<OutlinedInput label="Name" />}
                    onChange={(e) =>
                      setSearchValues({
                        ...searchValues,
                        property: e.target.value,
                      })
                    }
                    IconComponent={() => (
                      <ArrowDropDown className="text-white cursor-pointer" />
                    )}
                    sx={{
                      borderWidth: "0.5px",
                      height: 52,
                      color: "white",
                      ".MuiSelect-icon": {
                        color: "white",
                      },
                    }}
                  >
                    <MenuItem value={"boat"}>Boat</MenuItem>
                    <MenuItem value={"resort"}>Resort</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={handleDateChange}
                  disablePast
                  value={
                    searchValues?.date
                      ? dayjs(new Date(searchValues.date).toISOString())
                      : null
                  }
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
            )}

            <div className="w-full">
              <FormControl className=" w-full" style={{ color: "#f1f2f2" }}>
                <InputLabel
                  style={{ color: "#f1f2f2" }}
                  id="demo-simple-select-label"
                >
                  Vegan rating
                </InputLabel>
                <Select
                  className="border-2 border-white"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rating}
                  renderValue={renderSelectedValue}
                  input={<OutlinedInput label="Name" />}
                  onChange={(e) => setRating(e.target.value)}
                  IconComponent={() => (
                    <ArrowDropDown className="text-white cursor-pointer" />
                  )}
                  sx={{
                    borderWidth: "0.5px",
                    height: 52, // Customize the height of the select field
                    color: "white", // Customize the text color of the select field
                    ".MuiSelect-icon": {
                      color: "white", // Customize the color of the dropdown icon
                    },
                  }}
                >
                  {ratings.map((r) => (
                    <MenuItem key={`${r.minRating}-${r.maxRating}`} value={r}>
                      {r.minRating}-{r.maxRating}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div
              className={`button2 text-[#f1f2f2] hover:text-[#0080ff] text-[14px] md:text-[22px] font-[400]`}
              onClick={handleSearchValues}
            >
              Search
            </div>
          </div>
          <SearchItemModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
