import React, { useEffect, useRef, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { TextField } from "@mui/material";
import FacilityFilter from "./FacilityFilter";

const Filtering = () => {
  const [isShowPriceField, setIsShowPriceField] = useState(false);
  const priceFieldRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      priceFieldRef.current &&
      !priceFieldRef.current.contains(event.target)
    ) {
      setIsShowPriceField(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-gray-100">
      <div className="md:w-[85%] px-5 md:px-0 mx-auto py-[30px]">
        {/* <form className="md:flex  gap-7 mt-5 space-y-3 md:space-y-0 md:flex-wrap lg:flex-row items-center ">
          <div>
            <select
              className="block w-full p-3 border-2 space-y-5 border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[#0080ff] xl:text-xl bg-white "
              defaultValue="0"
            >
              <option
                className="bg-white text-[#0080ff] md:text-[10px] xl:text-[17px]"
                value="0"
                disabled
                hidden
              >
                Price
              </option>
              <option
                className="bg-white text-[#0080ff] xl:text-[16px]"
                value="1"
              >
                Option 1
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="2">
                Option 2
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="3">
                Option 3
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="4">
                Option 4
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="5">
                Option 5
              </option>
            </select>
          </div>
          <div>
            <select
              className="block w-full p-3 border-2 space-y-5 border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[#0080ff] bg-white xl:text-xl"
              defaultValue="0"
            >
              <option
                className="bg-white text-[#0080ff] md:text-[10px] xl:text-[17px]"
                value="0"
                disabled
                hidden
              >
                Duration
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="1">
                Option 1
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="2">
                Option 2
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="3">
                Option 3
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="4">
                Option 4
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="5">
                Option 5
              </option>
            </select>
          </div>
          <div>
            <select
              className="block w-full p-3 border-2 space-y-5 border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[#0080ff] bg-white xl:text-xl"
              defaultValue="0"
            >
              <option
                className="bg-white text-[#0080ff] md:text-[10px] xl:text-[17px]"
                value="0"
                disabled
                hidden
              >
                Deeparture port
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="1">
                Option 1
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="2">
                Option 2
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="3">
                Option 3
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="4">
                Option 4
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="5">
                Option 5
              </option>
            </select>
          </div>
          <div>
            <select
              className="block w-full p-3 border-2 space-y-5 border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[#0080ff] bg-white xl:text-xl"
              defaultValue="0"
            >
              <option
                className="bg-white text-[#0080ff] md:text-[10px] xl:text-[17px]"
                value="0"
                disabled
                hidden
              >
                Facilities
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="1">
                Option 1
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="2">
                Option 2
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="3">
                Option 3
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="4">
                Option 4
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="5">
                Option 5
              </option>
            </select>
          </div>
          <div>
            <select
              className="block w-full p-3 border-2 space-y-5 border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[#0080ff] bg-white xl:text-xl"
              defaultValue="0"
            >
              <option
                className="bg-white text-[#0080ff] md:text-[10px] xl:text-[17px]"
                value="0"
                disabled
                hidden
              >
                Capacity
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="1">
                Option 1
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="2">
                Option 2
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="3">
                Option 3
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="4">
                Option 4
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="5">
                Option 5
              </option>
            </select>
          </div>
          <div>
            <select
              className="block w-full p-3 border-2 space-y-5 border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[#0080ff] bg-white xl:text-xl"
              defaultValue="0"
            >
              <option
                className="bg-white text-[#0080ff] md:text-[10px] xl:text-[17px]"
                value="0"
                disabled
                hidden
              >
                Charter
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="1">
                Option 1
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="2">
                Option 2
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="3">
                Option 3
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="4">
                Option 4
              </option>
              <option className="bg-white text-[#0080ff] text-[16px]" value="5">
                Option 5
              </option>
            </select>
          </div>
          <div className="text-center">
            <button className=" border border-[#0080ff] lg:text-[10px] xl:text-lg rounded-full md:px-2 xl:px-8 px-8 py-3 md:py-2 xl:py-3 bg-[#0080ff] text-white font-semibold hover:bg-white hover:text-[#0080ff] duration-500 transition-all">
              Sort by <FilterAltIcon sx={{ fontSize: "20px" }} />
            </button>
          </div>
        </form> */}
        <div className="md:flex  gap-7 mt-5 space-y-3 md:space-y-0 md:flex-wrap lg:flex-row items-center">
          <div>
            <div className="relative">
              <TextField
                id="outlined-basic"
                label="Price Range"
                variant="outlined"
                size="small"
                onClick={() => setIsShowPriceField(true)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    // "& fieldset": {
                    //   borderColor: "#0080ff",
                    // },
                    "&:hover fieldset": {
                      borderColor: "#0080ff", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused
                    },
                  },
                  // "& .MuiInputBase-input": {
                  //   height: "35px", // Height of the input element
                  //   color: "white", // Text color
                  // },

                  width: "100%", // Width of the entire TextField
                }}
              />
              {isShowPriceField && (
                <div
                  ref={priceFieldRef}
                  className="w-full md:w-[760] h-56 rounded-md shadow-md absolute z-30 bg-white px-2"
                >
                  {" "}
                  <input
                    type="text"
                    placeholder="Min Price"
                    className="input input-bordered w-full max-w-xs mt-3"
                  />
                  <input
                    type="text"
                    placeholder="Max Price"
                    className="input input-bordered w-full max-w-xs mt-3"
                  />
                  <button
                    onClick={() => setIsShowPriceField(false)}
                    className="bg-[#0080ff] text-white rounded-md  my-3 py-2 w-full"
                  >
                    Search
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <FacilityFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtering;
