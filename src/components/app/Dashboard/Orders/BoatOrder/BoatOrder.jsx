import { baseUrl } from "@/src/config/serverConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "flowbite-react";
import Loader from "@/src/components/core/shared/Loader/Loader";
import toast from "react-hot-toast";
const BoatOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [control, setControl] = useState(false);
  const [boatOrders, setBoatOrders] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl}/boat-booking/confirm-booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBoatOrders(data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [control]);

  // handle booking status update
  const handleBookingStatusUpdate = (id, status) => {
    fetch(`${baseUrl}/boat-booking/update-status-by-admin/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success(`Booking ${data?.data?.bookingStatus} successfully`);
          setControl(!control);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="text-center">
            <th className="py-2 px-1 border-b">Booking Id</th>
            <th className="py-2 px-1 border-b">Booking Status</th>
            <th className="py-2 px-1 border-b">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {boatOrders?.map((booking, index) => (
            <tr
              key={booking?._id}
              className={
                index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
              }
            >
              <td className="py-2 px-4 border-b">{booking?._id}</td>
              <td className="py-2 px-4 border-b">{booking?.bookingStatus}</td>

              <td className="py-2 px-4 border-b">
                <div className="space-x-3 flex justify-end">
                  <button
                    className="bg-green-500 text-white rounded-md px-2 py-1"
                    onClick={() =>
                      router.push(
                        `pending-orders/boat-order-details/${booking?._id}`
                      )
                    }
                  >
                    View
                  </button>
                  {booking?.bookingStatus === "pending" && (
                    <Dropdown label="Action" dismissOnClick={false}>
                      <Dropdown.Item
                        onClick={() =>
                          handleBookingStatusUpdate(booking?._id, "approved")
                        }
                      >
                        Approve
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleBookingStatusUpdate(booking?._id, "rejected")
                        }
                      >
                        Reject
                      </Dropdown.Item>
                    </Dropdown>
                  )}
                  {booking?.bookingStatus == "accepted" && (
                    <button
                      onClick={() =>
                        handleBookingStatusUpdate(booking?._id, "confirmed")
                      }
                      className="bg-blue-500 rounded-md px-4 py-1 text-white"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoatOrder;
