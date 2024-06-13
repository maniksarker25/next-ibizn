import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function CabinModal({ cabins, setOpen, open }) {
  const handleClose = () => setOpen(false);

  return (
    <div className="xl:w-1/4 relative lg:mt-10 xl:mt-0 mx-4">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto max-h-[80vh] overflow-y-auto bg-white shadow-lg outline-none p-4"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
        >
          <div className="p-6">
            <Typography
              variant="h6"
              id="modal-modal-title"
              className="text-xl md:text-3xl text-primary font-[400]"
            >
              Cabins
            </Typography>
            <div className="w-full h-[1px] bg-slate-400 mt-2"></div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {cabins && cabins.length > 0 ? (
                cabins.map((cabin) => (
                  <div
                    key={cabin._id}
                    className="mb-4 flex flex-col md:flex-row md:items-center justify-between outline-none border-b-primary border-b-[1px] py-4"
                  >
                    <Typography
                      variant="subtitle1"
                      className="text-xl md:text-2xl"
                    >
                      {cabin.cabinName}
                    </Typography>
                    <Typography variant="subtitle2" className="text-xl">
                      <span className="text-primary text-xl font-light md:text-2xl">
                        price
                      </span>{" "}
                      : ${cabin.cabinPrice}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography>No cabins available</Typography>
              )}
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CabinModal;
