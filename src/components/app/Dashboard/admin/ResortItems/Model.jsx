import { React, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { userContext } from "@/src/storage/contextApi";
import { ClipLoader } from "react-spinners";


const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px", // Default width for larger screens
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 600px)": {
    width: "90%", // Adjust width for screens smaller than 600px
  },
};

const Model = ({ open, handleClose, handleAdd }) => {
  const { submitLoader, setSubmitLoader } = useContext(userContext);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <form onSubmit={handleAdd}>
            <textarea
              name="name"
              id=""
              placeholder="Type here"
              style={{ width: "100%", height: "50px" }}
            ></textarea>
            <div className="flex justify-end ">
              <button
                disabled={submitLoader}
                type="submit"
                className="bg-green-500 px-4 py-2 rounded-md text-white"
              >
                {submitLoader ? <ClipLoader color="#ffff" /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default Model;
