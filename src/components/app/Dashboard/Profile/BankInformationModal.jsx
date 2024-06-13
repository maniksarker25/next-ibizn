import React, { use, useState, useContext } from "react";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { ClipLoader } from "react-spinners";
import { userContext } from "@/src/storage/contextApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  Height: "100%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// for tabs
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { baseUrl } from "@/src/config/serverConfig";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BankInformationModal = ({
  openBankInfoModal,
  setOpenBankInfoModal,
  controlBank,
  setControlBank,
}) => {
  const handleClose = () => setOpenBankInfoModal(false);
  const [value, setValue] = React.useState(0);
  const { submitLoader, setSubmitLoader } = useContext(userContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // add bank information
  const handleAddLocalBank = (e) => {
    e.preventDefault();
    const form = e.target;
    const bankName = form.bankName.value;
    const accountNumber = form.accountNumber.value;
    const routingNumber = form.routingNumber.value;
    const accountHolderName = form.accountHolderName.value;
    const accountHolderAddress = form.accountHolderAddress.value;
    const accountIbanNumber = form.accountIbanNumber.value;
    const swiftCode = form.swiftCode.value;
    const accountHolderContact = form.accountHolderContact.value;
    const localBank = {
      bankName,
      accountNumber,
      routingNumber,
      accountHolderName,
      accountHolderAddress,
      accountIbanNumber,
      swiftCode,
      accountHolderContact,
    };
    setSubmitLoader(true);
    fetch(`${baseUrl}/bank-information`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ localBank }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("Bank Information added successfully");
          setControlBank(!controlBank);
          setOpenBankInfoModal(false);
          setSubmitLoader(false);
        } else {
          setSubmitLoader(false);
          toast.error(data.message);
        }
      })
      .catch((err) => {
        setSubmitLoader(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <Modal
        open={openBankInfoModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Local Bank" {...a11yProps(0)} />
                  <Tab label="Wise Bank" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className="h-[60vh] overflow-scroll">
                  <form onSubmit={handleAddLocalBank}>
                    <div className="mt-3">
                      <p className="text-lg font-semibold">Bank Name:</p>
                      <input
                        type="text"
                        name="bankName"
                        className="w-full rounded-md"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-semibold">Routing Number:</p>
                      <input
                        type="number"
                        name="routingNumber"
                        className="w-full rounded-md"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-semibold">Account Number:</p>
                      <input
                        type="text"
                        name="accountNumber"
                        className="w-full rounded-md"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-semibold">
                        Account Holder Name:
                      </p>
                      <input
                        type="text"
                        name="accountHolderName"
                        className="w-full rounded-md"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-semibold">
                        Account Holder Address:
                      </p>
                      <input
                        type="text"
                        name="accountHolderAddress"
                        className="w-full rounded-md"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-semibold">
                        Account IBAN number :
                      </p>
                      <input
                        type="number"
                        name="accountIbanNumber"
                        className="w-full rounded-md"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-semibold">BIC/Swift Code :</p>
                      <input
                        type="text"
                        name="swiftCode"
                        className="w-full rounded-md"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-semibold">
                        Account Holder Contact :
                      </p>
                      <input
                        type="text"
                        name="accountHolderContact"
                        className="w-full rounded-md"
                        required
                      />
                    </div>
                    <button
                      disabled={submitLoader}
                      type="submit"
                      className="w-full cursor-pointer rounded-md custom_red_color py-3 my-4 text-white font-semibold"
                    >
                      {submitLoader ? <ClipLoader color="#ffff" /> : "Submit"}
                    </button>
                  </form>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div>
                  <div className="mt-3">
                    <p className="text-lg font-semibold">Email:</p>
                    <input
                      type="email"
                      name="email"
                      className="w-full rounded-md"
                    />
                  </div>
                  <button
                    disabled={submitLoader}
                    type="submit"
                    className="w-full cursor-pointer rounded-md custom_red_color py-3 my-4 text-white font-semibold"
                  >
                    {submitLoader ? <ClipLoader color="#ffff" /> : "Submit"}
                  </button>
                </div>
              </CustomTabPanel>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BankInformationModal;
