import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { baseUrl } from "@/src/config/serverConfig";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControlLabel, Switch, TextField, Zoom } from "@mui/material";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteOutline, EditNoteOutlined } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
const initialState = {
  tripStart: null,
  tripEnd: null,
  itinerary: "",
  cost: 0,
  discount: {
    name: "",
    percent: 0,
  },
  special: false,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BoardTable = ({ boatData, setBoatData }) => {
  console.log("boatData", boatData);
  const [row, setRow] = useState(0);
  const [open, setOpen] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  // console.log(itinerary);
  const [formData, setFormData] = useState(initialState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const incrementRow = () => {
    setRow(row + 1);
    handleOpen();
  };

  /// update row functionality
  const [updateItem, setUpdateItem] = useState({});
  const [updatedStartTrip, setUpdatedStartTrip] = useState(null);
  const [updatedEndTrip, setUpdatedEndTrip] = useState(null);
  // console.log("date", updatedStartTrip, updatedEndTrip);
  const [updatedItinerary, setUpdatedItinerary] = useState(null);
  const [updatedCost, setUpdatedCost] = useState(null);
  const [updatedDiscountName, setUpdatedDiscountName] = useState(null);
  const [updatedDiscountPercent, setUpdatedDiscountPercent] = useState(null);
  const [updatedSpecial, setUpdatedSpecial] = useState(null);

  const [index, setIndex] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleUpdateModalOpen = (item, index) => {
    setUpdateItem(item);
    setIndex(index);
    setUpdateModalOpen(true);
  };
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  //
  const handleUpdatedDateChange = (newValue) => {
    setUpdatedStartTrip(newValue[0]);
    setUpdatedEndTrip(newValue[1]);
  };

  const handleUpdateScheduleRow = () => {
    // Clone the boatData object
    const updatedBoatData = { ...boatData };

    // Clone the schedules array to avoid mutating the original state directly
    const updatedSchedules = [...updatedBoatData.schedules];

    // Find the targeted schedule object using the index
    const targetedSchedule = updatedSchedules[index];

    if (targetedSchedule) {
      // Update the properties of the targeted schedule object
      updatedSchedules[index] = {
        ...targetedSchedule,
        tripStart:
          updatedStartTrip !== null
            ? updatedStartTrip
            : targetedSchedule.startTrip,
        tripEnd:
          updatedEndTrip !== null ? updatedEndTrip : targetedSchedule.endTrip,
        itinerary:
          updatedItinerary !== null
            ? updatedItinerary
            : targetedSchedule.itinerary,
        cost: updatedCost !== null ? updatedCost : targetedSchedule.cost,
        discount: {
          name:
            updatedDiscountName !== null
              ? updatedDiscountName
              : targetedSchedule.discount.name,
          percent:
            updatedDiscountPercent !== null
              ? updatedDiscountPercent
              : targetedSchedule.discount.percent,
        },
        special:
          updatedSpecial !== null ? updatedSpecial : targetedSchedule.special,
      };

      // Update the schedules array in the cloned boatData object
      updatedBoatData.schedules = updatedSchedules;

      // Set the state with the updated boatData
      setBoatData(updatedBoatData);

      // Close the update modal
      setUpdateModalOpen(false);
    }
  };

  useEffect(() => {
    fetch(`${baseUrl}/itineraries/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setItinerary(data?.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      tripStart: newValue[0],
      tripEnd: newValue[1],
    });
  };

  const handleItineraryChange = (event) => {
    setFormData({
      ...formData,
      itinerary: event.target.value,
    });
  };

  const handleCostChange = (event) => {
    setFormData({
      ...formData,
      cost: event.target.value,
    });
  };

  const handleDiscountChange = (field) => (event) => {
    setFormData({
      ...formData,
      discount: {
        ...formData.discount,
        [field]: event.target.value,
      },
    });
  };

  const handleSpecialChange = (event) => {
    setFormData({
      ...formData,
      special: event.target.checked,
    });
  };

  const handleDone = () => {
    // setItineraryData((prevent) => [...prevent, formData]);
    setBoatData({
      ...boatData,
      schedules: [...boatData.schedules, formData],
    });
    handleClose();
  };

  const removeRow = (index) => {
    console.log(index);
    const newIteneraryData = boatData.schedules.filter(
      (item, i) => i !== index
    );

    setBoatData((boatData) => ({
      ...boatData,
      schedules: [...newIteneraryData],
    }));
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Itinerary</h1>
      <div className="overflow-x-auto">
        <form>
          <Button onClick={incrementRow}>(+) add new row</Button>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-1 border-b">TRIP START </th>
                <th className="py-2 px-1 border-b">TRIP END DATE</th>
                <th className="py-2 px-1 border-b">ITINERARY</th>
                <th className="py-2 px-1 border-b">TRIP COST</th>
                <th className="py-2 px-1 border-b">Discount </th>
                <th className="py-2 px-1 border-b">Special </th>
                <th className="py-2 px-1 border-b">Action </th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {boatData?.schedules?.length > 0 &&
                boatData?.schedules?.map((items, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="py-2 text-center border-b">
                      {dayjs(items?.tripStart).format("MMMM D, YYYY")}
                    </td>
                    <td className="py-2 text-center border-b">
                      {dayjs(items?.tripEnd).format("MMMM D, YYYY")}
                    </td>
                    <td className="py-2 text-center border-b">
                      {
                        itinerary?.find(
                          (item) => item?._id === items?.itinerary
                        )?.itineraryName
                      }
                    </td>
                    <td className="py-2 text-center border-b">{items?.cost}</td>
                    <td className="py-2 text-center border-b">
                      {items?.discount?.name} - {items?.discount?.percent}%
                    </td>
                    <td className="py-2 text-center border-b">
                      {items?.special ? (
                        <CheckIcon className="text-green-500" />
                      ) : (
                        <CloseIcon className="text-red-500" />
                      )}
                    </td>
                    <td className="py-2  border-b flex justify-center">
                      <div className="flex gap-3 items-center">
                        <EditNoteIcon
                          className="cursor-pointer"
                          onClick={() => handleUpdateModalOpen(items, index)}
                        />
                        <DeleteIcon
                          className="cursor-pointer"
                          onClick={() => removeRow(index)}
                        />
                      </div>
                    </td>

                    {/* Add more columns as needed */}
                  </tr>
                ))}
            </tbody>
          </table>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                <h1 className="font-bold text-xl border-b mb-2 pb-2">
                  Trip Start And End Date
                </h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    value={[formData.tripStart, formData.tripEnd]}
                    onChange={handleDateChange}
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </>
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <h1 className="font-bold text-xl border-b mb-2 mt-3 pb-2">
                  Itinerary
                </h1>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    itinerary
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleItineraryChange}
                    label="itinerary"
                  >
                    {itinerary?.map((items) => (
                      <MenuItem value={items?._id}>
                        {items?.itineraryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <h1 className="font-bold text-xl border-b mb-2 mt-3 pb-2">
                  Trip Cost
                </h1>
                <TextField
                  id="outlined-basic"
                  label="Trip Cost"
                  type="number"
                  onChange={handleCostChange}
                  variant="outlined"
                />
              </div>
              <div>
                <h1 className="font-bold mt-2 text-xl border-b mb-2">
                  Discount
                </h1>
                <div className="flex gap-2">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={handleDiscountChange("name")}
                  />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Percentage"
                    variant="outlined"
                    onChange={handleDiscountChange("percent")}
                  />
                </div>
              </div>
              <div>
                <h1 className="font-bold mt-2 text-xl border-b mb-2">
                  Sepecial
                </h1>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData?.special}
                      onChange={handleSpecialChange}
                    />
                  }
                  label="SPECIAL FEATURE?"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="px-8 py-2 rounded-md text-white bg-red-500"
                >
                  Cancel
                </button>
                <button
                  className="px-8 py-2 rounded-md text-white bg-green-500"
                  onClick={handleDone}
                >
                  Done
                </button>
              </div>
            </Box>
          </Modal>

          <Modal
            open={updateModalOpen}
            onClose={handleUpdateModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                <h1 className="font-bold text-xl border-b mb-2 pb-2">
                  Trip Start And End Date
                </h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    value={[
                      dayjs(updateItem.tripStart),
                      dayjs(updateItem.tripEnd),
                    ]}
                    onChange={handleUpdatedDateChange}
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </>
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <h1 className="font-bold text-xl border-b mb-2 mt-3 pb-2">
                  Itinerary
                </h1>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    itinerary
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={updateItem.itinerary}
                    onChange={(e) => setUpdatedItinerary(e.target.value)}
                    label="itinerary"
                  >
                    {itinerary?.map((items) => (
                      <MenuItem value={items?._id}>
                        {items?.itineraryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <h1 className="font-bold text-xl border-b mb-2 mt-3 pb-2">
                  Trip Cost
                </h1>
                <TextField
                  id="outlined-basic"
                  label="Trip Cost"
                  type="number"
                  defaultValue={updateItem?.cost}
                  onChange={(e) => setUpdatedCost(e.target.value)}
                  variant="outlined"
                />
              </div>
              <div>
                <h1 className="font-bold mt-2 text-xl border-b mb-2">
                  Discount
                </h1>
                <div className="flex gap-2">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    defaultValue={updateItem?.discount?.name}
                    onChange={(e) => setUpdatedDiscountName(e.target.value)}
                  />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Percentage"
                    variant="outlined"
                    defaultValue={updateItem?.discount?.percent}
                    onChange={(e) => setUpdatedDiscountPercent(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <h1 className="font-bold mt-2 text-xl border-b mb-2">
                  Sepecial
                </h1>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={updatedSpecial || updateItem?.special}
                      onChange={(e) => setUpdatedSpecial(e.target.checked)}
                    />
                  }
                  label="SPECIAL FEATURE?"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateModalClose}
                  className="px-8 py-2 rounded-md text-white bg-red-500"
                >
                  Cancel
                </button>
                <button
                  className="px-8 py-2 rounded-md text-white bg-green-500"
                  onClick={handleUpdateScheduleRow}
                >
                  Done
                </button>
              </div>
            </Box>
          </Modal>
        </form>
      </div>
    </div>
  );
};

export default BoardTable;
