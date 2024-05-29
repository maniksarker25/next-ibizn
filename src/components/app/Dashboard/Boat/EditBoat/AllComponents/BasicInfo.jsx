import { compressAndConvertToBase64 } from "@/src/config/base64";
import { Close } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicInfo = ({
  boatData,
  minImages = 5,
  maxImages = 15,
  setCabinsData,
  cabinsData,
  setBoatData,
  handleImageChanges,
}) => {
  // console.log({ boatData });
  const [caruselImages, setCaruselImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [cabinName, setCabinName] = useState("");
  const [cabinImage, setCabinImage] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// update row functionality
  const [updatedCabinName, setUpdatedCabinName] = useState("");
  const [updatedCabinImage, setUpdatedCabinImage] = useState(null);
  const [item, setItem] = useState({});
  const [index, setIndex] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleUpdateModalOpen = (item, index) => {
    setItem(item);
    setIndex(index);
    setUpdateModalOpen(true);
  };
  const handleUpdateModalClose = () => setUpdateModalOpen(false);
  const handleUpdateCabinRow = () => {
    // Clone the boatData object
    const updatedBoatData = { ...boatData };

    // Clone the cabins array to avoid mutating the original state directly
    const updatedCabins = [...updatedBoatData.cabins];

    // Find the targeted cabin object using the index
    const targetedCabin = updatedCabins[index];

    if (targetedCabin) {
      // Update the properties of the targeted cabin object
      updatedCabins[index] = {
        ...targetedCabin,
        name: updatedCabinName || targetedCabin.name,
        pictures: updatedCabinImage || targetedCabin.pictures,
      };

      // Update the cabins array in the cloned boatData object
      updatedBoatData.cabins = updatedCabins;

      // Set the state with the updated boatData
      setBoatData(updatedBoatData);

      // Close the update modal
      setUpdateModalOpen(false);
    }
  };

  const onDrop = async (acceptedFiles) => {
    if (boatData?.carousal.length + acceptedFiles.length <= maxImages) {
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
        setBoatData({
          ...boatData,
          carousal: [...boatData?.carousal, ...base64Images],
        });
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCabinImageOnChange = async (event) => {
    const files = event.target.files[0];
    if (files && files.size > 2 * 1024 * 1024) {
      // setFileError('File size exceeds the limit (2MB). Please choose a smaller file.');

      return Swal.fire({
        position: "top",
        timer: 1500,
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer:
          "File size exceeds the limit (2MB). Please choose a smaller file.",
        customClass: {
          container: "custom-swal", // Apply custom CSS class to the container
        },
      });
    } else {
      const compressedBase64 = await compressAndConvertToBase64(
        files,
        800,
        600,
        0.8
      );
      setCabinImage(compressedBase64);
    }
  };

  // image for update
  const handleUpdatedCabinImageOnChange = async (event) => {
    const files = event.target.files[0];
    if (files && files.size > 2 * 1024 * 1024) {
      // setFileError('File size exceeds the limit (2MB). Please choose a smaller file.');

      return Swal.fire({
        position: "top",
        timer: 1500,
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer:
          "File size exceeds the limit (2MB). Please choose a smaller file.",
        customClass: {
          container: "custom-swal", // Apply custom CSS class to the container
        },
      });
    } else {
      const compressedBase64 = await compressAndConvertToBase64(
        files,
        800,
        600,
        0.8
      );
      setUpdatedCabinImage(compressedBase64);
    }
  };

  const handleDone = () => {
    // setCabinsData((prevent) => [
    //   ...prevent,
    //   { name: cabinName, pictures: cabinImage },
    // ]);
    setBoatData({
      ...boatData,
      cabins: [...boatData.cabins, { name: cabinName, pictures: cabinImage }],
    });
    setCabinImage(null);
    setCabinName("");
    handleClose();
  };
  const removeImage = (index) => {
    const newImageData = boatData?.carousal.filter((image, i) => i !== index);
    setBoatData({
      ...boatData,
      carousal: [...newImageData],
    });
  };

  // delete cabin row from cabin row
  const removeRow = (index) => {
    const newCabinData = boatData.cabins.filter((item, i) => i !== index);

    setBoatData((boatData) => ({
      ...boatData,
      cabins: [...newCabinData],
    }));
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Basic Info</h1>
      <form>
        <div>
          <div className="mb-4">
            <label
              className="block mb-2 text-xl font-medium text-gray-900"
              for="featureImage"
            >
              Feature Image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
              name="featureImage"
              id="featureImage"
              type="file"
              required={boatData?.featuredImage ? false : true}
              onChange={(e) =>
                handleImageChanges("featuredImage", e.target.files[0])
              }
            />
            {boatData?.featuredImage && (
              <img width={120} className="mt-5" src={boatData?.featuredImage} />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="propertyName"
              className="block text-xl font-medium text-gray-700"
            >
              Name of the Boat
            </label>
            <input
              type="text"
              id="propertyName"
              name="nameOfProperty"
              value={boatData?.nameOfProperty || ""}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) =>
                setBoatData({ ...boatData, nameOfProperty: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <h2 className="my-4 text-xl pb-2 border-b-2">
              Add Carousal Images
            </h2>

            <div>
              <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the images here...</p>
                ) : (
                  <p>Drag and drop images here, or click to select files</p>
                )}
              </div>

              {boatData?.carousal?.length > 0 && (
                <div>
                  <h4>Uploaded Carusel Images:</h4>
                  <div className="grid grid-cols-5 gap-x-4 space-y-4 mt-4">
                    {boatData?.carousal.map((image, index) => (
                      <div key={index} className="relative w-full h-[200px]">
                        <img
                          src={image}
                          alt={`uploaded-${index}`}
                          className="w-full h-full object-fit scale-90"
                        />
                        <div
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 size-8 bg-green-500 text-white rounded-full flex justify-center items-center cursor-pointer"
                        >
                          <Close />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {boatData?.carousal?.length < minImages &&
                boatData?.carousal.length !== 0 && (
                  <p style={{ color: "red" }}>
                    Please upload a minimum of {minImages} images.
                  </p>
                )}

              {boatData?.carousal?.length > maxImages && (
                <p style={{ color: "red" }}>
                  You can't upload more than {maxImages} images.
                </p>
              )}
            </div>
          </div>
          <h1 className="text-xl border-b mb-5">Cabins</h1>
          <Button onClick={handleOpen}>(+) Add Cabin Info</Button>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-1 border-b">Name</th>
                <th className="py-2 px-1 border-b">Image</th>
                <th className="py-2 px-1 border-b">Action</th>

                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {boatData?.cabins?.map((item, index) => (
                <tr>
                  <td className="py-2 px-4 border-b text-center">
                    {item?.name}
                  </td>
                  <td className="py-2 px-4 border-b flex justify-center">
                    <img
                      className="w-[100px] h-[100px]"
                      src={item?.pictures}
                      alt=""
                    />
                  </td>
                  <td className=" border-b ">
                    <div className="flex justify-center gap-6">
                      <EditNoteIcon
                        onClick={() => handleUpdateModalOpen(item, index)}
                        className="cursor-pointer"
                      />
                      <DeleteIcon
                        onClick={() => removeRow(index)}
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
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
                <div>
                  <h1 className="text-xl border-b mb-2">Cabin Information</h1>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => setCabinName(e.target.value)}
                  />
                </div>

                <h2 className="text-xl my-2 ">Upload Image</h2>
                {!cabinImage && (
                  <div class="flex items-center justify-center w-full mt-2">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Click to upload{" "}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        required
                        class="hidden"
                        onChange={handleCabinImageOnChange}
                      />
                    </label>
                  </div>
                )}
                {cabinImage && <img className="mt-2" src={cabinImage} alt="" />}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDone}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
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
                <div>
                  <h1 className="text-xl border-b mb-2">Cabin Information</h1>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => setUpdatedCabinName(e.target.value)}
                    defaultValue={item?.name}
                  />
                </div>

                <h2 className="text-xl my-2 ">Upload Image</h2>
                <img
                  className="w-full h-52"
                  src={updatedCabinImage || item?.pictures}
                  alt=""
                />
                {!cabinImage && (
                  <div class="flex items-center justify-center w-full mt-2">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Click to upload{" "}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        required
                        class="hidden"
                        onChange={handleUpdatedCabinImageOnChange}
                      />
                    </label>
                  </div>
                )}
                {cabinImage && <img className="mt-2" src={cabinImage} alt="" />}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleUpdateModalClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCabinRow}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Done
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </form>
    </div>
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
