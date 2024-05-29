import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Filtering = () => {
  return (
    <div className="bg-gray-100">
      <div className="md:w-[85%] px-5 md:px-0 mx-auto py-[30px]">
        <form className="md:flex  gap-7 mt-5 space-y-3 md:space-y-0 md:flex-wrap lg:flex-row items-center ">
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
        </form>
      </div>
    </div>
  );
};

export default Filtering;
