import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { userContext } from "@/src/storage/contextApi";
import Loader from "../../../core/shared/Loader/Loader";
import EditItenaries from "./EditItenareis/EditItenaries"
import { DeleteOutline, EditNoteOutlined, } from "@mui/icons-material";

const Itineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [itineraryControl, setItineraryControl] = useState(false);
  const { loader, setLoader } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [itinerariesData, setItinerariesData] = useState({});
  const handleOpen = (data) => {
    setItinerariesData({ id: data });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // console.log(packages);

  // get packages for this user
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/itineraries/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItineraries(data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [itineraryControl]);

  // handle itinerary delete
  const handleItineraryDelete = (id) => {
    fetch(`${baseUrl}/itineraries/delete-itinerary/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItineraryControl(!itineraryControl);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Itinerary deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-center">
              <th className="py-2 px-1 border-b">ITINERARY NAME</th>
              <th className="py-2 px-1 border-b">REGION</th>
              <th className="py-2 px-1 border-b">COUNTRY</th>
              <th className="py-2 px-1 border-b">DISTRICT</th>

              <th className="py-2 px-1 border-b">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {itineraries?.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
                }
              >
                <td className="py-2 px-4 border-b">{item?.itineraryName}</td>
                <td className="py-2 px-4 border-b">{item?.region}</td>
                <td className="py-2 px-4 border-b">{item?.country}</td>
                <td className="py-2 px-4 border-b">{item?.district}</td>


                <td className="py-2 px-4 border-b flex justify-center">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpen(item?._id)}
                      className="px-3 py-1 rounded text-white bg-indigo-600 flex gap-2 items-center"
                    >
                      <span className="font-bold">Edit</span> <EditNoteOutlined />
                    </button>
                    <button
                      onClick={() => handleItineraryDelete(item?._id)}
                      className="px-3 py-1 rounded bg-red-500 text-white flex gap-2 items-center"
                    >
                      <span className="font-bold">Delete</span> <DeleteOutline />
                    </button>
                  </div>

                </td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        open && <EditItenaries itinerariesData={itinerariesData} open={open} setItineraryControl={setItineraryControl} handleClose={handleClose} />
      }
    </>
  );
};

export default Itineraries;
