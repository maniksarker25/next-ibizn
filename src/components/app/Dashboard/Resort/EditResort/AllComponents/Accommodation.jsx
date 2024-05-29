import { compressAndConvertToBase64 } from "@/src/config/base64";
import React from "react";

const Accommodation = ({ resortData, handleResortDataChange }) => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Accommodation</h2>
      <form>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            for="accommodationImage"
          >
            Accommodation Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
            name="image"
            id="accommodationImage"
            type="file"
            required={resortData?.accommodation?.image ? false : true}
            // onChange={async (e) =>
            //   setAccommodation({
            //     ...accommodation,
            //     image: await compressAndConvertToBase64(
            //       e.target.files[0],
            //       800,
            //       600,
            //       0.8
            //     ),
            //   })
            // }
            onChange={(e) => handleResortDataChange(e, "accommodation")}
          />
          {resortData?.accommodation?.image && (
            <img
              width={120}
              className="mt-5"
              src={resortData?.accommodation?.image}
            />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="propertyDesc"
          >
            Accommodation Description
          </label>
          <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="propertyDesc"
            rows="4"
            name="description"
            defaultValue={resortData?.accommodation?.description}
            required
            // onChange={(e) => handleAccommodationChange(e)}
            onChange={(e) => handleResortDataChange(e, "accommodation")}
          />
        </div>
      </form>
    </div>
  );
};

export default Accommodation;
