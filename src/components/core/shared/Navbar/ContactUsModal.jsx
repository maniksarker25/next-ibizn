import React, { useState } from "react";
import UseBasicModal from "../../UI/Modal/UseBasicModal";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
// import { Button } from "flowbite-react";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import { baseUrl } from "@/src/config/serverConfig";
const ContactUsModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleContactUsEmail = (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Accessing form field values
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const body = { name, email, message };
    fetch(`${baseUrl}/send-email/contact-us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setIsLoading(false);
          toast.success("Successfully send your message");
          setIsModalOpen(false);
        } else {
          setIsLoading(false);
          toast.error("Something went wrong. Please try later");
        }
      });
  };
  return (
    <UseBasicModal open={isModalOpen} setOpen={setIsModalOpen}>
      <div>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleContactUsEmail} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="message"
                    label="Message"
                    id="message"
                    type="text"
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <button
                className="mt-3 bg-[#2563eb] px-4 py-2 rounded-md text-white"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 6, mb: 2, backgroundColor: "blue" }}
                endIcon={<SendIcon />}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Box>
        </Container>
      </div>
    </UseBasicModal>
  );
};

export default ContactUsModal;
