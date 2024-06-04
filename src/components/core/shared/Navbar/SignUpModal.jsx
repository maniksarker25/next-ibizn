import React, { useState } from "react";
import UseBasicModal from "../../UI/Modal/UseBasicModal";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { Button } from "flowbite-react";
import SendIcon from "@mui/icons-material/Send";
const SignUpModal = ({ isModalOpen, setIsModalOpen }) => {
  //   console.log(isModalOpen);
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
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
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
                    autoComplete="email"
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
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Button
                className="mt-3"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 6, mb: 2, backgroundColor: "blue" }}
                endIcon={<SendIcon />}
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </UseBasicModal>
  );
};

export default SignUpModal;
