import { React, useState, useEffect, useContext } from "react";
import Spinner from "@/src/components/core/shared/Loader/Spinner";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import Swal from "sweetalert2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "70vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const EditItenaries = ({
  itinerariesData,
  handleClose,
  open,
  setItineraryControl,
}) => {
  const [loader, setLoader] = useState(true);
  const [itineraries, setItineraries] = useState({});
  // console.log({ itineraries });
  const { country } = useContext(userContext);
  const [cabins, setCabins] = useState([{ cabinName: "", cabinPrice: "" }]);
  const [regiion, setRegion] = useState(itineraries?.region || "");
  const [countryList, setCountryList] = useState([]);

  const handleItinerariesSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setItineraryControl(false);
    const { region, ...feildData } = itineraries;
    fetch(`${baseUrl}/itineraries/${itinerariesData.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        ...feildData,
        region: regiion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Awesome, Your Package Has Been Successfully updated.",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          setItineraryControl(true);
          handleClose();
        } else {
          //   setError(data.message);
          console.log(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const countryItem = country.filter((item) => item.region === regiion);
    setCountryList(countryItem);
  }, [regiion]);

  useEffect(() => {
    fetch(`${baseUrl}/itineraries/${itinerariesData.id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItineraries(data?.data);
        setRegion(data?.data?.region);
        setCabins(data?.data?.cabins);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setItineraries({ ...cabins, cabins: cabins });
  }, [cabins]);

  if (loader) <Spinner />;

  const addMoreCabin = () => {
    setCabins([...cabins, { cabinName: "", cabinPrice: "" }]);
  };

  const removeCabin = (index) => {
    const updatedCabins = [...cabins];
    updatedCabins.splice(index, 1);
    setCabins(updatedCabins);
  };

  const handleCabinChange = (index, e) => {
    const updatedCabins = [...cabins];
    updatedCabins[index][e.target.name] = e.target.value;
    setCabins(updatedCabins);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loader ? (
          <Spinner />
        ) : (
          <div>
            <h3 className="text-center font-semibold text-3xl">
              Please Edit an Itinerary For Your Boat
            </h3>
            <div className="mt-10">
              <form onSubmit={handleItinerariesSubmit}>
                <div className="lg:flex gap-3 items-center">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Itinerary Name</p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          itineraryName: e.target.value,
                        })
                      }
                      defaultValue={itineraries?.itineraryName}
                      type="text"
                      name="itineraryName"
                      required
                      placeholder="Itinerary Name"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
                {/* new region country  */}
                <div className="grid grid-cols-3 gap-x-2 mt-8">
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="region">Region</InputLabel>
                      <Select
                        labelId="region"
                        defaultValue={regiion}
                        id="region"
                        name="region"
                        label="region"
                        onChange={
                          (e) => setRegion(e.target.value)
                          // setItineraries({
                          //   ...itineraries,
                          //   region: e.target.value,
                          // })
                        }
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
                        defaultValue={itineraries?.country}
                        id="country"
                        name="country"
                        label="country"
                        onChange={(e) =>
                          setItineraries({
                            ...itineraries,
                            country: e.target.value,
                          })
                        }
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
                        defaultValue={itineraries?.district}
                        name="district"
                        label="District"
                        variant="outlined"
                        onChange={(e) =>
                          setItineraries({
                            ...itineraries,
                            district: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="lg:flex gap-3 items-center">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Embarkation Point</p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          embarkationPoints: e.target.value,
                        })
                      }
                      defaultValue={itineraries?.embarkationPoints}
                      type="text"
                      name="embarkationPoints"
                      required
                      placeholder="Embarkation Point"
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <p className="text-lg font-semibold">
                      Disembarkation Point
                    </p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          disembarkationPoints: e.target.value,
                        })
                      }
                      type="text"
                      required
                      defaultValue={itineraries?.disembarkationPoints}
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
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          numberOfDays: Number(e.target.value),
                        })
                      }
                      type="number"
                      name="numberOfDays"
                      defaultValue={itineraries?.numberOfDays}
                      required
                      placeholder="Number of Days"
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <p className="text-lg font-semibold">Number of Nights</p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          numberOfNights: Number(e.target.value),
                        })
                      }
                      type="number"
                      defaultValue={itineraries?.numberOfNights}
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
                          type="number"
                          value={cabin.cabinPrice}
                          onChange={(e) => handleCabinChange(index, e)}
                          name="cabinPrice"
                          placeholder="Cabin Price"
                          className="w-full rounded-md"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCabin(index)}
                        className="text-white  mt-10 cursor-pointer  py-2 rounded"
                      >
                        <CloseIcon sx={{ color: "black" }} />
                      </button>
                    </div>
                  ))}
                  <div
                    onClick={addMoreCabin}
                    className="text-white bg-green-500 cursor-pointer mt-2 flex justify-center py-2  rounded w-24"
                  >
                    Add More
                  </div>
                </div>
                <div className="mt-3 w-full">
                  <p className="text-lg font-semibold">Number of Dives</p>
                  <input
                    onChange={(e) =>
                      setItineraries({
                        ...itineraries,
                        numberOfDives: Number(e.target.value),
                      })
                    }
                    type="number"
                    required
                    defaultValue={parseInt(itineraries?.numberOfDives)}
                    name="numberOfDives"
                    placeholder="Number of Dives"
                    className="w-full rounded-md"
                    min={0}
                  />
                </div>
                <div className="mt-3 w-full">
                  <p className="text-lg font-semibold">Itinerary Description</p>
                  <textarea
                    onChange={(e) =>
                      setItineraries({
                        ...itineraries,
                        itineraryDescription: e.target.value,
                      })
                    }
                    type="text"
                    required
                    defaultValue={itineraries?.itineraryDescription}
                    name="itineraryDescription"
                    placeholder="Itinerary Description"
                    className="w-full h-20 rounded-md"
                  />
                </div>
                {/* <div className="mt-3">
                  <p className="text-lg font-semibold">Boat daily schedule</p>
                  <textarea
                    onChange={(e) =>
                      setItineraries({
                        ...itineraries,
                        boatDailySchedule: e.target.value,
                      })
                    }
                    defaultValue={itineraries?.boatDailySchedule}
                    type="text"
                    required
                    name="boatDailySchedule"
                    placeholder="Boat daily schedule"
                    className="w-full h-20 rounded-md"
                  />
                </div> */}
                {/* {error && <p className="text-red-600 text-xl mb-3">{error}</p>} */}

                <input
                  className="w-full rounded-md cursor-pointer custom_red_color py-3 my-4 text-white font-semibold"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default EditItenaries;
