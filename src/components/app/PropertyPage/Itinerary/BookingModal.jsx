import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { baseUrl } from "@/src/config/serverConfig";
import toast from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", sm: 450 }, // 'xs' for small devices, 'sm' and larger for medium/large devices
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const BookingModal = ({ open, setOpen, propertyData, schedule }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // handle booking boat
  const handleBookingBoat = (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value;
    const email = form.email.value;
    const whatsapp = form.whatsapp.value;
    const numberOfGuest = form.numberOfGuest.value;
    const bookingData = {
      property: propertyData?._id,
      operator: propertyData?.user?._id,
      scheduleId: schedule?._id,
      startDate: schedule?.tripStart,
      endDate: schedule?.tripEnd,
      price: schedule?.cost,
      phone,
      email,
      whatsapp,
      numberOfGuest,
    };
    fetch(`${baseUrl}/boat-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("Booking successful");
          setOpen(false);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleBookingBoat}>
            <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
              Booking Schedule
            </Typography>
            <div className="mt-3">
              <p className="text-lg font-semibold">Phone:</p>
              <input
                type="text"
                name="phone"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-3">
              <p className="text-lg font-semibold">Email:</p>
              <input
                type="email"
                name="email"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-3">
              <p className="text-lg font-semibold">whatsapp:</p>
              <input
                type="text"
                name="whatsapp"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-3">
              <p className="text-lg font-semibold">Number Of Guest:</p>
              <input
                type="text"
                name="numberOfGuest"
                className="w-full rounded-md"
                required
              />
            </div>
            <div>
              <button type="submit" className="main-button py-3 w-full mt-4">
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingModal;
