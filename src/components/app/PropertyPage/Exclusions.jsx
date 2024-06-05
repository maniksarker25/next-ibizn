import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function Exclusions() {
  return (
    <>
      <div className=" md:mt-16 lg:mt-20  customContainer gap-5 py-5 flex flex-col-reverse items-start justify-around md:flex-row md:gap-5  md:flex md:items-center md:justify-center md:py-20 md:bg-white px-4 lg:px-0">
        <div className="md:w-1/2 md:h-full flex flex-col items-start">
          <h1 className="md:text-[3vw] md:text-[#0080FF] mb-6 text-[#0080FF] text-3xl">
            <CheckCircleOutlineIcon
              sx={{ fontSize: "50px", color: "#3a95ea" }}
            />
            {"Trip Inclusions"}
          </h1>
          <p className="md:text-3xl md:font-light text-[#2f2f30] md:text-[16px]">
            Kindly note trip cost excludes Marine Park | Port | Fuel surcharge
            (payable onboard), equipment rental (if any), and PADI course fees
            (if any).
          </p>
          <p className="md:text-3xl md:font-light text-[#2f2f30] md:text-[16px]">
            Don’t hesitate to contact us for exact details, as the above charges
            may alter depending on which dive cruise itinerary interests you.
          </p>
        </div>
        <div className="md:w-1/2 md:h-full flex flex-col items-start">
          <h1 className="md:text-[3vw] md:text-[#0080FF] mb-6 text-[#0080FF] text-3xl">
            <CancelOutlinedIcon sx={{ fontSize: "50px", color: "#3a95ea" }} />
            {"Trip Exclusions"}
          </h1>
          <p className="md:text-3xl md:font-light text-[#2f2f30] md:text-[16px]">
            Kindly note trip cost excludes Marine Park | Port | Fuel surcharge
            (payable onboard), equipment rental (if any), and PADI course fees
            (if any).
          </p>
          <p className="md:text-3xl md:font-light text-[#2f2f30] md:text-[16px]">
            Don’t hesitate to contact us for exact details, as the above charges
            may alter depending on which dive cruise itinerary interests you.
          </p>
        </div>
      </div>
    </>
  );
}

export default Exclusions;
