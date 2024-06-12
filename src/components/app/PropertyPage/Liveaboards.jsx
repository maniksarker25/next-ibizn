import { useRouter } from "next/router";
import { useState } from "react";

function Liveaboards({ propertyData }) {
  const [activeButton, setActiveButton] = useState("Liveaboard");
  const router = useRouter();
  const buttons = [
    "Liveaboard",
    "Accommodation",
    "Facilities",
    "Food",
    "Diving",
    "Exclusions",
    "Itineraries and prices",
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="w-full h-[90vh] relative overflow-hidden">
        <div className="w-full h-3/4  md:h-full">
          <img
            className="w-full h-full object-cover"
            src={propertyData?.featuredImage || propertyData?.featureImage}
            alt="Liveaboard"
          />
        </div>
        <div className=" w-full h-full">
          <div className="absolute bottom-0 w-full flex flex-col md:absolute md:flex-col md:flex md:w-full">
            <div className="bg-[#0080FF] text-white p-4 lg:w-1/2 md:rounded-tr-xl md:p-8">
              <h1 className="md:text-3xl md:font-light ">
                Raja Ampat | Liveaboards
              </h1>
              <h1 className="text-4xl  md:block md:text-8xl font-light mt-2">
                {propertyData?.nameOfProperty || propertyData?.propertyName}
              </h1>
            </div>

            <div className=" bg-[#0080FF] text-white p-2 border-t-[1px] md:border-white md:flex md:items-center md:justify-between md:pl-8 md:w-full md:py-8 md:px-8">
              <div className="flex flex-wrap justify-start md:justify-start  gap-4 mt-4">
                {buttons.map((button) => (
                  <button
                    key={button}
                    className={`rounded-full border border-white text-sm md:text-lg  px-5 py-1.5 ${
                      activeButton === button
                        ? "bg-white text-[#0080FF]"
                        : "hover:bg-white hover:text-[#0080FF] cursor-pointer transition duration-300"
                    }`}
                    onClick={() => {
                      setActiveButton(button);
                      scrollToSection(button.toLowerCase());
                      if (button.includes(" ")) {
                        scrollToSection(
                          button.replace(/\s+/g, "").toLocaleLowerCase()
                        );
                      }
                    }}
                  >
                    {button}
                  </button>
                ))}
              </div>
              <div
                onClick={() => router.push("/secondPage")}
                className="text-white mt-2 md:mt-0 md:ml-8"
              >
                <ul className="underline px-2 py-8 cursor-pointer text-nowrap">
                  Back to results
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Liveaboards;
