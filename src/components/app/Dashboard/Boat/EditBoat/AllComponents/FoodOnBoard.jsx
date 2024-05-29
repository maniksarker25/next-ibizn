import React from "react";

const FoodOnBoard = ({ boatData, setBoatData, handleBoatDataChange }) => {
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">FoodOnBoard</h1>
      <form>
        <div className="mb-4">
          <label
            className="block mb-2 text-xl font-medium text-gray-900"
            for="foodAttheResortImage"
          >
            Image of Plant-Based Food Onboard
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            name="Picture"
            id="foodAttheResortImage"
            type="file"
            required={boatData?.foodOnboard?.Picture ? false : true}
            onChange={(e) => handleBoatDataChange(e, "foodOnboard")}
          />
          {boatData?.foodOnboard?.Picture && (
            <img
              width={120}
              className="mt-5"
              src={boatData?.foodOnboard?.Picture}
            />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl  mb-2"
            htmlFor="foodAtTheResortDesc"
          >
            Food Description
          </label>
          <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="foodAtTheResortDesc"
            rows="4"
            required
            defaultValue={boatData?.foodOnboard?.description || ""}
            name="description"
            onChange={(e) => handleBoatDataChange(e, "foodOnboard")}
          />
        </div>
      </form>
    </div>
  );
};

export default FoodOnBoard;
