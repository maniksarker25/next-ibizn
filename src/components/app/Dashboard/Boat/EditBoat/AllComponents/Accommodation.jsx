import React from "react";

const Accommodation = ({ boatData, setBoatData, handleBoatDataChange }) => {
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Accommodation</h1>
      <form>
        <div className="mb-4">
          <label
            className="block mb-2 text-xl font-medium text-gray-900"
            for="accommodationImage"
          >
            Accommodation Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
            name="Picture"
            id="accommodationImage"
            required={boatData?.accommodation?.Picture ? false : true}
            type="file"
            onChange={(e) => handleBoatDataChange(e, "accommodation")}
          />
          {boatData?.accommodation?.Picture && (
            <img
              width={120}
              className="mt-5"
              src={boatData?.accommodation?.Picture}
            />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl  mb-2"
            htmlFor="propertyDesc"
          >
            Accommodation Description
          </label>
          <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="propertyDesc"
            rows="4"
            defaultValue={boatData?.accommodation?.description || ""}
            name="description"
            required
            onChange={(e) => handleBoatDataChange(e, "accommodation")}
          />
        </div>
      </form>
    </div>
  );
};

export default Accommodation;
