import { compressAndConvertToBase64 } from "@/src/config/base64";
import React from "react";

const Diving = ({ resortData, handleResortDataChange }) => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">Diving</h2>
      <form>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            for="divingImage"
          >
            Diving Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
            name="image"
            id="divingImage"
            type="file"
            required={resortData?.diving?.image ? false : true}
            // onChange={(e) => handleDivingChange(e)}
            onChange={(e) => handleResortDataChange(e, "diving")}
          />
          {resortData?.diving?.image && (
            <img width={120} className="mt-5" src={resortData?.diving?.image} />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="divingDesc"
          >
            Diving Description
          </label>
          <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="divingDesc"
            name="description"
            defaultValue={resortData?.diving?.description}
            rows="4"
            required
            // onChange={(e) => handleDivingChange(e)}
            onChange={(e) => handleResortDataChange(e, "diving")}
          />
        </div>
      </form>
    </div>
  );
};

export default Diving;
