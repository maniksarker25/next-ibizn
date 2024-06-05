import { baseUrl } from "@/src/config/serverConfig";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { compressAndConvertToBase64 } from "@/src/config/base64";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { userContext } from "@/src/storage/contextApi";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
const BasicInfo = ({
  setDeactivitionDate,
  deactivitionDate,
  caruselImages,
  setCaruselImages,
  setListOfPackages,
  listofPackages,
  resortdata,
  setResortData,
  handleInputChange,
  handleImageChanges,
  minImages = 5,
  maxImages = 15,
  setDiscountTimeFrameDate,
  discountTimeFrameDate,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  decreaseProgress,
  resortData,
}) => {
  console.log({ resortData });
  const [packages, setPackages] = useState([]);
  const { country } = useContext(userContext);
  const [region, setRegion] = useState("");
  console.log({ region });

  useEffect(() => {
    if (resortData?.region) {
      setRegion(resortData?.region);
    }
  }, [resortData?.region]);

  const handleDeactivitionChange = (newValue) => {
    setDeactivitionDate({
      startDate: newValue[0],
      endDate: newValue[1],
    });
  };
  const handleDiscountTimeFrame = (newValue) => {
    setDiscountTimeFrameDate({
      startDate: newValue[0],
      endDate: newValue[1],
    });
  };
  // carusel images code here
  const onDrop = async (acceptedFiles) => {
    if (caruselImages.length + acceptedFiles.length <= maxImages) {
      let fileError = false;
      const base64Images = await Promise.all(
        acceptedFiles.map((file) => {
          if (file.size > 2 * 1024 * 1024) {
            return (fileError = true);
          } else {
            return compressAndConvertToBase64(file, 800, 600, 0.8);
          }
        })
      );

      if (fileError) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer:
            "File size exceeds the limit (2MB). Please choose a smaller file.",
        });
      } else {
        setCaruselImages([...caruselImages, ...base64Images]);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //   fetching  all packages
  useEffect(() => {
    fetch(`${baseUrl}/packages/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPackages(data?.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log({country});
  /* 

     */

  const [openCalender, setOpenCalender] = useState(false);

  // handle open calender--------------
  const handleOpenCalender = () => {
    setOpenCalender(!openCalender);
  };
  //handle calender state ---------------
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [discountState, setDiscountState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  // console.log(state)
  // console.log(discountState);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleSelect = (ranges) => {
    const startDateFormatted = formatDate(ranges.selection.startDate);
    const endDateFormatted = formatDate(ranges.selection.endDate);

    console.log("Selected start date:", startDateFormatted);
    console.log("Selected end date:", endDateFormatted);
    setStartDate(startDateFormatted);
    setEndDate(endDateFormatted);

    setOpenCalender(false);
  };
  // set resortData state carusel image here
  // useEffect(() => {
  //     setResortData(prevState => ({
  //         ...prevState,

  //         deactivationPeriod: {
  //             startDate: state[0].startDate,
  //             endDate: state[0].endDate
  //         }
  //     }));
  // }, [ state])
  const countryList = country.filter((item) => item.region === region);
  console.log({ countryList });

  // go to next step ------------
  const goToNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
    increaseProgress();
  };
  // go to previous step ------------
  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
    decreaseProgress();
  };

  return (
    <>
      <h2 className="my-4 text-xl pb-2 border-b-2">Basic Information</h2>
      <form onSubmit={goToNextStep}>
        <div className="grid grid-cols-3 gap-x-2">
          <div className="mb-4">
            <FormControl fullWidth>
              <InputLabel id="region">Region</InputLabel>
              <Select
                labelId="region"
                id="region"
                name="region"
                label="region"
                defaultValue={resortData?.region}
                required
                onChange={(e) => {
                  setRegion(e.target.value);
                  handleInputChange(e);
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
          <div className="mb-4">
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
                value={resortData?.country}
                required
                onChange={(e) => handleInputChange(e)}
              >
                {countryList[0]?.countries?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="mb-4">
            <FormControl fullWidth>
              <TextField
                id="district"
                InputProps={{
                  style: {
                    padding: "8px ", // Adjust the padding as needed
                  },
                }}
                name="district"
                label="District"
                defaultValue={resortData?.district || ""}
                required
                variant="outlined"
                onChange={(e) => handleInputChange(e)}
              />
            </FormControl>
          </div>
        </div>

        {/* Feature Image */}
        {/* Add your feature image input here */}

        <div className="my-4">
          <h4 className="block mb-2 text-xl font-medium text-gray-900">
            {" "}
            Feature Image
          </h4>
          <label className=" flex gap-4 w-full items-center px-4 py-2 bg-white text-blue rounded-lg border  tracking-wide uppercase  cursor-pointer ">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              accept=".jpg,.png,.jpeg,.webp"
              name="featureImage"
              required={resortData?.featureImage ? false : true}
              onChange={(e) =>
                handleImageChanges("featureImage", e.target.files[0])
              }
            />
          </label>
          {resortData?.featureImage && (
            <img width={120} className="mt-5" src={resortData?.featureImage} />
          )}
        </div>

        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Carousal images</h2>

          <div>
            <div {...getRootProps()} style={dropzoneStyles}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the images here...</p>
              ) : (
                <p>Drag and drop images here, or click to select files</p>
              )}
            </div>

            {caruselImages.length > 0 && (
              <div>
                <h4>Uploaded Carusel Images:</h4>
                <ul className="grid grid-cols-5 gap-x-4 mt-4">
                  {caruselImages.map((image, index) => (
                    <li key={index}>
                      <img
                        src={image}
                        alt={`uploaded-${index}`}
                        style={imageStyles}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {caruselImages.length < minImages && caruselImages.length !== 0 && (
              <p style={{ color: "red" }}>
                Please upload a minimum of {minImages} images.
              </p>
            )}

            {caruselImages.length > maxImages && (
              <p style={{ color: "red" }}>
                You can't upload more than {maxImages} images.
              </p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="my-4 text-xl">Period of Closure</h2>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              defaultValue={[
                deactivitionDate?.startDate || "",
                deactivitionDate?.endDate || "",
              ]}
              onChange={handleDeactivitionChange}
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
        <div className="mb-4">
          <label
            htmlFor="propertyName"
            className="block text-xl font-medium text-gray-700"
          >
            Name of the Resort
          </label>
          <input
            type="text"
            id="propertyName"
            name="propertyName"
            defaultValue={resortData?.propertyName || ""}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="mb-4">
          <h2 className="my-4 text-xl"> Discount </h2>

          <label
            htmlFor="propertyName"
            className="block text-sm font-medium text-gray-700"
          >
            Percentage
          </label>
          <input
            type="number"
            id="propertyName"
            name="discount"
            defaultValue={resortData?.discount || ""}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleInputChange(e)}
          />

          <div className="my-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                defaultValue={[
                  discountTimeFrameDate?.startDate || "",
                  discountTimeFrameDate?.endDate || "",
                ]}
                onChange={handleDiscountTimeFrame}
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
          <div className="mt-6">
            <p className="text-lg font-semibold">Resort daily schedule</p>
            <textarea
              type="text"
              required
              name="resortDailySchedule"
              placeholder="Type here"
              className="w-full h-20 rounded-md"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div className="flex justify-between mt-10">
          {currentStep > 1 && (
            <button
              onClick={goToPrevStep}
              className="custom_red_color  px-10 py-3 text-white rounded-md font-semibold"
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              // onClick={submitData}
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Finish
            </button>
          )}
        </div>
      </form>
    </>
  );
};
const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyles = {
  maxWidth: "100px",
  maxHeight: "100px",
  margin: "5px",
};
export default BasicInfo;
