// import { baseUrl } from "@/src/config/serverConfig";
// import React, { useContext, useState } from "react";
// import Swal from "sweetalert2";
// import CloseIcon from "@mui/icons-material/Close";
// import { useRouter } from "next/router";
// import { userContext } from "@/src/storage/contextApi";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// const AddItenary = () => {
//   const [error, setError] = useState("");
//   const [itineraryData, setItineraryData] = useState({});
//   const [cabins, setCabins] = useState([{ cabinName: "", cabinPrice: "" }]);
//   const router = useRouter();
//   const { country } = useContext(userContext);
//   const [region, setRegion] = useState("");
//   const countryList = country.filter((item) => item.region === region);
//   // console.log(cabins);
//   // console.log(itineraryData, { region });
//   const handleItineraryDataChange = (e) => {
//     const newItineraryData = { ...itineraryData };
//     newItineraryData[e.target.name] = e.target.value;
//     setItineraryData(newItineraryData);
//   };

//   const handleCabinChange = (index, e) => {
//     const updatedCabins = [...cabins];
//     updatedCabins[index][e.target.name] = e.target.value;
//     setCabins(updatedCabins);
//   };

//   const addMoreCabin = () => {
//     setCabins([...cabins, { cabinName: "", cabinPrice: "" }]);
//   };

//   const removeCabin = (index) => {
//     const updatedCabins = [...cabins];
//     updatedCabins.splice(index, 1);
//     setCabins(updatedCabins);
//   };

//   // handle itinerary submit ------------
//   const handleItinerarySubmit = (e) => {
//     setError("");
//     e.preventDefault();
//     const form = e.target;
//     fetch(`${baseUrl}/itineraries/create-itinerary`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         Authorization: localStorage.getItem("access-token"),
//       },
//       body: JSON.stringify({
//         country: itineraryData.country,
//         disembarkationPoints: itineraryData.disembarkationPoints,
//         district: itineraryData.district,
//         embarkationPoints: itineraryData.embarkationPoints,
//         itineraryDescription: itineraryData.itineraryDescription,
//         itineraryName: itineraryData.itineraryName,
//         numberOfDays: parseInt(itineraryData.numberOfDays),
//         numberOfDives: parseInt(itineraryData.numberOfDivies),
//         numberOfNights: parseInt(itineraryData.numberOfNights),
//         // boatDailySchedule: itineraryData.boatDailySchedule,
//         region: region,
//         cabins: cabins,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.success) {
//           // console.log("nice");
//           form.reset();
//           Swal.fire({
//             position: "top-center",
//             icon: "success",
//             title: "Awesome, Your Itinerary Has Been Successfully Created.",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           router.push("/dashboard/boat");
//         } else {
//           setError(data.message);
//         }
//       })
//       .catch((err) => console.log(err));
//   };
//   // console.log(itineraryData);
//   return (
//     <div className="max-w-screen-lg mx-auto ">
//       <h3 className="text-center font-semibold text-3xl">
//         Please Add an Itinerary For Your Boat
//       </h3>
//       <form onSubmit={handleItinerarySubmit}>
//         <div className="lg:flex gap-3 items-center">
//           <div className="mt-4 w-full">
//             <p className="text-lg font-semibold">Itinerary Name</p>
//             <input
//               onChange={handleItineraryDataChange}
//               type="text"
//               name="itineraryName"
//               required
//               placeholder="Itinerary Name"
//               className="w-full rounded-md"
//             />
//           </div>
//         </div>
//         {/* new region country  */}
//         <div className="grid grid-cols-3 gap-x-2 mt-8">
//           <div>
//             <FormControl fullWidth>
//               <InputLabel id="region">Region</InputLabel>
//               <Select
//                 labelId="region"
//                 id="region"
//                 name="region"
//                 label="region"
//                 onChange={(e) => {
//                   setRegion(e.target.value);
//                 }}
//               >
//                 {country?.map((item, index) => (
//                   <MenuItem key={index} value={item?.region}>
//                     {item?.region}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//           <div>
//             <FormControl
//               disabled={countryList?.length === 0 ? true : false}
//               fullWidth
//             >
//               <InputLabel id="country">Country</InputLabel>
//               <Select
//                 labelId="country"
//                 id="country"
//                 name="country"
//                 label="country"
//                 onChange={handleItineraryDataChange}
//               >
//                 {countryList[0]?.countries?.map((item, index) => (
//                   <MenuItem key={index} value={item}>
//                     {item}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>

//           <div>
//             <FormControl fullWidth>
//               <TextField
//                 id="district"
//                 InputProps={{
//                   style: {
//                     padding: "8px ",
//                   },
//                 }}
//                 name="district"
//                 label="District"
//                 variant="outlined"
//                 onChange={handleItineraryDataChange}
//               />
//             </FormControl>
//           </div>
//         </div>
//         <div className="lg:flex gap-3 items-center">
//           <div className="mt-4 w-full">
//             <p className="text-lg font-semibold">Embarkation Point</p>
//             <input
//               onChange={handleItineraryDataChange}
//               type="text"
//               name="embarkationPoints"
//               required
//               placeholder="Embarkation Point"
//               className="w-full rounded-md"
//             />
//           </div>
//           <div className="mt-3 w-full">
//             <p className="text-lg font-semibold">Disembarkation Point</p>
//             <input
//               onChange={handleItineraryDataChange}
//               type="text"
//               required
//               name="disembarkationPoints"
//               placeholder="Disembarkation Point"
//               className="w-full rounded-md"
//             />
//           </div>
//         </div>
//         <div className="lg:flex gap-3 items-center">
//           <div className="mt-4 w-full">
//             <p className="text-lg font-semibold">Number of Days</p>
//             <input
//               onChange={handleItineraryDataChange}
//               type="number"
//               name="numberOfDays"
//               required
//               placeholder="Number of Days"
//               className="w-full rounded-md"
//             />
//           </div>
//           <div className="mt-3 w-full">
//             <p className="text-lg font-semibold">Number of Nights</p>
//             <input
//               onChange={handleItineraryDataChange}
//               type="number"
//               required
//               name="numberOfNights"
//               placeholder="Number of Nights"
//               className="w-full rounded-md"
//             />
//           </div>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mt-2 mb-1 border-b-2">
//             Add Cabins
//           </h3>
//           {cabins.map((cabin, index) => (
//             <div className="lg:flex gap-3 items-center" key={index}>
//               <div className="mt-3 w-full">
//                 <p className="text-lg font-semibold">Cabin Name</p>
//                 <input
//                   type="text"
//                   value={cabin.cabinName}
//                   onChange={(e) => handleCabinChange(index, e)}
//                   name="cabinName"
//                   placeholder="Cabin Name"
//                   className="w-full rounded-md"
//                 />
//               </div>
//               <div className="mt-3 w-full">
//                 <p className="text-lg font-semibold">Cabin Price</p>
//                 <input
//                   type="text"
//                   value={cabin.cabinPrice}
//                   onChange={(e) => handleCabinChange(index, e)}
//                   name="cabinPrice"
//                   placeholder="Cabin Price"
//                   className="w-full rounded-md"
//                 />
//               </div>
//               <button
//                 onClick={() => removeCabin(index)}
//                 className="text-white  mt-10  py-2 rounded"
//               >
//                 <CloseIcon sx={{ color: "black" }} />
//               </button>
//             </div>
//           ))}
//           <div
//             onClick={addMoreCabin}
//             className="text-white bg-green-500 mt-2 flex justify-center py-2  rounded w-24"
//           >
//             Add More
//           </div>
//         </div>
//         <div className="mt-3 w-full">
//           <p className="text-lg font-semibold">Number of Dives</p>
//           <input
//             onChange={handleItineraryDataChange}
//             type="number"
//             required
//             name="numberOfDivies"
//             placeholder="Number of Dives"
//             className="w-full rounded-md"
//             min={0}
//           />
//         </div>
//         <div className="mt-3 w-full">
//           <p className="text-lg font-semibold">Itinerary Description</p>
//           <textarea
//             onChange={handleItineraryDataChange}
//             type="text"
//             required
//             name="itineraryDescription"
//             placeholder="Itinerary Description"
//             className="w-full h-20 rounded-md"
//           />
//         </div>
//         {/* <div className="mt-3">
//           <p className="text-lg font-semibold">Boat daily schedule</p>
//           <textarea
//             onChange={handleItineraryDataChange}
//             type="text"
//             required
//             name="boatDailySchedule"
//             placeholder="Boat daily schedule"
//             className="w-full h-20 rounded-md"
//           />
//         </div> */}
//         {error && <p className="text-red-600 text-xl mb-3">{error}</p>}

//         <input
//           className="w-full rounded-md cursor-pointer custom_red_color py-3 my-4 text-white font-semibold"
//           type="submit"
//           value="Submit"
//         />
//       </form>
//     </div>
//   );
// };

// export default AddItenary;

// another try
import { baseUrl } from "@/src/config/serverConfig";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { userContext } from "@/src/storage/contextApi";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { compressAndConvertToBase64 } from "@/src/config/base64";

const AddItenary = () => {
  const [error, setError] = useState("");
  const [itineraryData, setItineraryData] = useState({});
  const [cabins, setCabins] = useState([
    { cabinName: "", cabinPrice: "", cabinPicture: "" },
  ]);
  const router = useRouter();
  const { country } = useContext(userContext);
  const [region, setRegion] = useState("");
  const countryList = country.filter((item) => item.region === region);

  const handleItineraryDataChange = (e) => {
    const newItineraryData = { ...itineraryData };
    newItineraryData[e.target.name] = e.target.value;
    setItineraryData(newItineraryData);
  };

  const handleCabinChange = (index, e) => {
    const updatedCabins = [...cabins];
    updatedCabins[index][e.target.name] = e.target.value;
    setCabins(updatedCabins);
  };

  const handleCabinPictureChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      compressAndConvertToBase64(file, 800, 600, 0.7)
        .then((base64String) => {
          const updatedCabins = [...cabins];
          updatedCabins[index].cabinPicture = base64String;
          setCabins(updatedCabins);
        })
        .catch((error) => {
          console.error("Error converting image to base64:", error);
        });
    }
  };

  const addMoreCabin = () => {
    setCabins([...cabins, { cabinName: "", cabinPrice: "", cabinPicture: "" }]);
  };

  const removeCabin = (index) => {
    const updatedCabins = [...cabins];
    updatedCabins.splice(index, 1);
    setCabins(updatedCabins);
  };

  const handleItinerarySubmit = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    fetch(`${baseUrl}/itineraries/create-itinerary`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        country: itineraryData.country,
        disembarkationPoints: itineraryData.disembarkationPoints,
        district: itineraryData.district,
        embarkationPoints: itineraryData.embarkationPoints,
        itineraryDescription: itineraryData.itineraryDescription,
        itineraryName: itineraryData.itineraryName,
        numberOfDays: parseInt(itineraryData.numberOfDays),
        numberOfDives: parseInt(itineraryData.numberOfDivies),
        numberOfNights: parseInt(itineraryData.numberOfNights),
        region: region,
        cabins: cabins,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          form.reset();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Awesome, Your Itinerary Has Been Successfully Created.",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/dashboard/boat");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h3 className="text-center font-semibold text-3xl">
        Please Add an Itinerary For Your Boat
      </h3>
      <form onSubmit={handleItinerarySubmit}>
        <div className="lg:flex gap-3 items-center">
          <div className="mt-4 w-full">
            <p className="text-lg font-semibold">Itinerary Name</p>
            <input
              onChange={handleItineraryDataChange}
              type="text"
              name="itineraryName"
              required
              placeholder="Itinerary Name"
              className="w-full rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-2 mt-8">
          <div>
            <FormControl fullWidth>
              <InputLabel id="region">Region</InputLabel>
              <Select
                labelId="region"
                id="region"
                name="region"
                label="region"
                onChange={(e) => {
                  setRegion(e.target.value);
                }}
              >
                {country?.map((item, index) => (
                  <MenuItem key={index} value={item?.region}>
                    {item?.region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              disabled={countryList?.length === 0 ? true : false}
              fullWidth
            >
              <InputLabel id="country">Country</InputLabel>
              <Select
                labelId="country"
                id="country"
                name="country"
                label="country"
                onChange={handleItineraryDataChange}
              >
                {countryList[0]?.countries?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                id="district"
                InputProps={{
                  style: {
                    padding: "8px ",
                  },
                }}
                name="district"
                label="District"
                variant="outlined"
                onChange={handleItineraryDataChange}
              />
            </FormControl>
          </div>
        </div>
        <div className="lg:flex gap-3 items-center">
          <div className="mt-4 w-full">
            <p className="text-lg font-semibold">Embarkation Point</p>
            <input
              onChange={handleItineraryDataChange}
              type="text"
              name="embarkationPoints"
              required
              placeholder="Embarkation Point"
              className="w-full rounded-md"
            />
          </div>
          <div className="mt-3 w-full">
            <p className="text-lg font-semibold">Disembarkation Point</p>
            <input
              onChange={handleItineraryDataChange}
              type="text"
              required
              name="disembarkationPoints"
              placeholder="Disembarkation Point"
              className="w-full rounded-md"
            />
          </div>
        </div>
        <div className="lg:flex gap-3 items-center">
          <div className="mt-4 w-full">
            <p className="text-lg font-semibold">Number of Days</p>
            <input
              onChange={handleItineraryDataChange}
              type="number"
              name="numberOfDays"
              required
              placeholder="Number of Days"
              className="w-full rounded-md"
            />
          </div>
          <div className="mt-3 w-full">
            <p className="text-lg font-semibold">Number of Nights</p>
            <input
              onChange={handleItineraryDataChange}
              type="number"
              required
              name="numberOfNights"
              placeholder="Number of Nights"
              className="w-full rounded-md"
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-2 mb-1 border-b-2">
            Add Cabins
          </h3>
          {cabins.map((cabin, index) => (
            <div className="lg:flex gap-3 items-center" key={index}>
              <div className="mt-3 w-full">
                <p className="text-lg font-semibold">Cabin Name</p>
                <input
                  type="text"
                  value={cabin.cabinName}
                  onChange={(e) => handleCabinChange(index, e)}
                  name="cabinName"
                  placeholder="Cabin Name"
                  className="w-full rounded-md"
                />
              </div>
              <div className="mt-3 w-full">
                <p className="text-lg font-semibold">Cabin Price</p>
                <input
                  type="text"
                  value={cabin.cabinPrice}
                  onChange={(e) => handleCabinChange(index, e)}
                  name="cabinPrice"
                  placeholder="Cabin Price"
                  className="w-full rounded-md"
                />
              </div>
              <div className="mt-3 w-full">
                <p className="text-lg font-semibold">Cabin Picture</p>
                <input
                  type="file"
                  onChange={(e) => handleCabinPictureChange(index, e)}
                  name="cabinPicture"
                  className="w-full rounded-md"
                />
              </div>
              <button
                onClick={() => removeCabin(index)}
                className="text-white  mt-10  py-2 rounded"
              >
                <CloseIcon sx={{ color: "black" }} />
              </button>
            </div>
          ))}
          <div
            onClick={addMoreCabin}
            className="text-white bg-green-500 mt-2 flex justify-center py-2  rounded w-24"
          >
            Add More
          </div>
        </div>
        <div className="mt-3 w-full">
          <p className="text-lg font-semibold">Number of Dives</p>
          <input
            onChange={handleItineraryDataChange}
            type="number"
            required
            name="numberOfDivies"
            placeholder="Number of Dives"
            className="w-full rounded-md"
            min={0}
          />
        </div>
        <div className="mt-3 w-full">
          <p className="text-lg font-semibold">Itinerary Description</p>
          <textarea
            onChange={handleItineraryDataChange}
            type="text"
            required
            name="itineraryDescription"
            placeholder="Itinerary Description"
            className="w-full h-20 rounded-md"
          />
        </div>
        {error && <p className="text-red-600 text-xl mb-3">{error}</p>}

        <input
          className="w-full rounded-md cursor-pointer custom_red_color py-3 my-4 text-white font-semibold"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default AddItenary;
