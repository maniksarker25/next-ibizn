import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  minHeight: "500px", // Minimum height for the element
  p: 4,
  "@media (max-width: 600px)": {
    width: "90%", // Width for devices with a maximum width of 600px (e.g., mobile phones)
  },
  "@media (min-width: 601px) and (max-width: 1024px)": {
    width: "70%", // Width for devices with a width between 601px and 1024px (e.g., tablets)
  },
  "@media (min-width: 1025px)": {
    width: 1000, // Width for devices with a minimum width of 1025px (e.g., desktops)
  },
};

export default function SearchItemModal({ isModalOpen, setIsModalOpen }) {
  const handleClose = () => setIsModalOpen(false);
  const [searchItems, setSearchItems] = useState([]);
  const { searchValues, setSearchValues } = useContext(userContext);
  //   console.log(searchItems);
  //   const [updatedSearchItems, setUpdatedSearchItems] = useState([]);
  //   console.log(updatedSearchItems);
  // Function to create unique regions with unique countries
  const getUniqueRegionsWithCountries = (searchItems) => {
    const result = [];

    searchItems.forEach((item) => {
      let region = result.find((r) => r.region === item.region);

      if (!region) {
        region = { region: item.region, countries: [] };
        result.push(region);
      }

      if (!region.countries.includes(item.country)) {
        region.countries.push(item.country);
      }
    });
    return result;
  };

  // customize search item ------------
  const updateSearchItem = getUniqueRegionsWithCountries(searchItems);
  // get search item
  useEffect(() => {
    fetch(`${baseUrl}/resorts/search-item`)
      .then((res) => res.json())
      .then((data) => setSearchItems(data?.data));
  }, []);

  const handleDestination = (destination) => {
    setSearchValues({ ...searchValues, destination });
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {updateSearchItem?.map((item, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-3">{item?.region}</h4>
                {item?.countries?.map((country, i) => (
                  <p
                    onClick={() => handleDestination(country)}
                    className="my-2 cursor-pointer hover:text-blue-500"
                    key={i}
                  >
                    {country}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
