import React, { useEffect, useState, useContext } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { baseUrl } from "@/src/config/serverConfig";
import toast from "react-hot-toast";
import Model from "../ResortItems/Model";
import { userContext } from "@/src/storage/contextApi";
import Loader from "../../../../core/shared/Loader/Loader";
const Facility = () => {
  const {loader, setLoader, setSubmitLoader}=useContext(userContext)
  const [data, setData] = useState([]);
  const [controlData, setControlData] = useState(false);
  // console.log(resortFacilities);

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // get all resort facility
  useEffect(() => {
    setLoader(true)
    fetch(`${baseUrl}/boat-facilities`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data?.data)
        setLoader(false)
      })
      .catch((err)=>setLoader(false))
  }, [controlData]);
  // handle add facility
  const handleAdd = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log({ name });
    setSubmitLoader(true)
    fetch(`${baseUrl}/boat-facilities`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("Data added successfully");
          setControlData(!controlData);
          handleClose();
          setSubmitLoader(false)
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        setSubmitLoader(false)
        toast.error("Something went wrong , try again later");
      });
  };
  // handle delete
  const handleDelete = (id) => {
    fetch(`${baseUrl}/boat-facilities/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.success) {
          toast.success("Data deleted successfully");
          setControlData(!controlData);
          handleClose();
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong , try again later");
      });
  };

if(loader){
  return <Loader/>
}

  return (
    <div className="max-w-screen-lg mx-auto px-2 md:px-6">
      <div>
        {data?.length > 0 ? (
          data?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between mt-3 border-b-2 pb-2"
            >
              <h3>{item?.name}</h3>
              <button onClick={() => handleDelete(item?._id)}>
                <DeleteOutlinedIcon />
              </button>
            </div>
          ))
        ) : (
          <h3 className="text-center text-2xl font-semibold">
            There is not data available , please add{" "}
          </h3>
        )}
        <div className="flex justify-end  my-4">
          <button
            onClick={handleOpen}
            className="bg-green-500 px-4 py-2 rounded-md text-white"
          >
            {data?.length > 0 ? "Add more" : "Add"}
          </button>
        </div>
      </div>
      <Model
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        handleAdd={handleAdd}
      />
    </div>
  );
};

export default Facility;
