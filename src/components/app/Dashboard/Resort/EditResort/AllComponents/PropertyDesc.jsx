import React from "react";

const PropertyDesc = ({ resortData, handleImageChanges }) => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">
        Brief description of the Resort
      </h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl  mb-2"
            htmlFor="propertyDesc"
          >
            Brief description
          </label>
          <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="propertyDesc"
            rows="4"
            required
            defaultValue={resortData?.briefDescription || ""}
            name="briefDescription"
            // onChange={(e) => handleInputChange(e)}
            // onChange={(e)=>}
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-xl font-medium text-gray-900"
            for="propertyImage"
          >
            Resort Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
            name="briefImage"
            id="propertyImage"
            type="file"
            required={resortData?.briefImage ? false : true}
            onChange={(e) =>
              handleImageChanges("briefImage", e.target.files[0])
            }
          />
          {resortData?.briefImage && (
            <img width={120} className="mt-5" src={resortData?.briefImage} />
          )}
        </div>
      </form>
    </div>
  );
};

export default PropertyDesc;
