import { useRouter } from "next/router";
import { useState } from "react";

function Liveaboards() {
  const [activeButton, setActiveButton] = useState("Liveaboard");
  const router = useRouter()
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
        <div className="w-full h-3/4 md:w-full md:h-full">
          <img
            className="w-full h-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1661925114893-25ed8b336213?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Liveaboard"
          />
        </div>
        <div className=" w-full h-full">
          <div className="absolute bottom-0 w-full flex flex-col md:absolute md:flex-col md:flex md:w-full">
            <div className="bg-[#0080FF] text-white p-4 md:w-1/2 md:rounded-tr-xl md:p-8">
              <h1 className="text-3xl md:text-2xl md:font-light font-semibold">
                Raja Ampat | Liveaboards
              </h1>
              <h1 className="text-4xl  md:block md:text-8xl font-light mt-2">
                MSY Ilike
              </h1>
            </div>

            <div className="bg-[#0080FF] text-white p-2 md:border-t-[1px] md:border-white md:flex md:items-center md:justify-between md:pl-8 md:w-full md:py-8 md:px-8">
              <div className="flex flex-wrap justify-start md:justify-start gap-2 md:gap-4">
                {buttons.map((button) => (
                  <button
                    key={button}
                    className={`rounded-full border border-white text-sm md:text-lg p-2 md:px-4 ${
                      activeButton === button
                        ? "bg-white text-[#0080FF]"
                        : "hover:bg-white hover:text-[#0080FF] cursor-pointer transition duration-300"
                    }`}
                    onClick={() => {
                      setActiveButton(button);
                      scrollToSection(button.toLowerCase());
                    }}
                  >
                    {button}
                  </button>
                ))}
              </div>
              <div onClick={()=>router.push("/secondPage")} className="text-white mt-2 md:mt-0 md:ml-8">
                <ul className="underline px-2 py-8 cursor-pointer text-nowrap">Back to results</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Liveaboards;
