import { compressAndConvertToBase64 } from "@/src/config/base64";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

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
  handleInputChange,
  caruselImages,
  setCaruselImages,
  minImages = 5,
  maxImages = 15,
  handleImageChanges,
  setCabinsData,
  cabinsData,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  boardData
}) => {
  const [open, setOpen] = useState(false);
  const [cabinName, setCabinName] = useState("");
  const [cabinImage, setCabinImage] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // carusel images code here
  const onDrop = async (acceptedFiles) => {

    
    if (caruselImages.length + acceptedFiles.length <= maxImages) {
      let fileError = false
      const base64Images = await Promise.all(
        acceptedFiles.map((file) => {
          if (file.size > (2 * 1024 * 1024)) {

            return fileError = true
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
          footer: 'File size exceeds the limit (2MB). Please choose a smaller file.'
        });
      } else {

        setCaruselImages([...caruselImages, ...base64Images]);
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
        footer: 'File size exceeds the limit (2MB). Please choose a smaller file.',
        customClass: {
          container: 'custom-swal' // Apply custom CSS class to the container
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

  const handleDone = () => {
    setCabinsData((prevent) => [
      ...prevent,
      { name: cabinName, pictures: cabinImage },
    ]);
    setCabinImage(null);
    setCabinName("");
    handleClose();
  };

  // go to next step ------------
  const goToNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
    increaseProgress();
  };

  return (
    <div>
      <form onSubmit={goToNextStep}>
        <div>
          <div className="my-4">
            <h4 className="block mb-2 text-xl font-medium text-gray-900">Feature Image</h4>
            <label className=" flex gap-4 w-full items-center px-4 py-2 bg-white text-blue rounded-lg border  tracking-wide uppercase  cursor-pointer ">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Select a file</span>
              <input type='file' className="hidden" accept=".png,.jpg" name="featureImage" required={boardData?.featuredImage ? false : true}
                onChange={(e) =>
                  handleImageChanges("featuredImage", e.target.files[0])
                } />
            </label>
            {
              boardData?.featuredImage && <img width={120} className="mt-5" src={boardData?.featuredImage} />
            }
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
              value={boardData?.nameOfProperty || ''}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => handleInputChange(e)}
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

              {caruselImages.length < minImages &&
                caruselImages.length !== 0 && (
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
          <h1 className="text-xl border-b mb-5">Cabins</h1>
          <Button onClick={handleOpen}>(+) Add Cabin Info</Button>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-1 border-b">Name</th>
                <th className="py-2 px-1 border-b">Image</th>

                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {cabinsData?.map((item, index) => (
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
                </tr>
              ))}
            </tbody>
          </table>
           <div className="my-4">
            
            </div>       
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
          <div className="flex justify-between mt-10">
            {currentStep > 1 && (
              <button
                type="submit"
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
                onClick={submitData}
                className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
              >
                Finish
              </button>
            )}
          </div>
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
