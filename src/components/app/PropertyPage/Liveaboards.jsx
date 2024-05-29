import { useState } from "react";
function Liveaboards() {
  const [activeButton, setActiveButton] = useState("Liveaboard");

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
      <div className="w-full h-[90vh] overflow-hidden">
        <div className="w-full h-full relative">
          <img
            className="w-[100%] h-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1661925114893-25ed8b336213?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="w-[50vw] h-[35vh] bg-[#0080FF] rounded-tr-xl pl-28 pt-5 absolute bottom-0">
            <h1 className="text-[40px] text-white font-semi">
              Raja Ampat | Liveaboards
            </h1>
            <h1 className="text-[100px] text-white font-light">MSY Ilike</h1>
          </div>
          <div className="w-full h-[10vh] flex justify-between border-t-[1px] border-white bg-[#0080FF] absolute bottom-0 left-0">
            <div className="w-[75%] h-full px-28 flex items-center justify-between text-white text-2xl gap-4">
              {buttons.map((button) => (
                <h1
                  key={button}
                  className={`px-4 py-2 inline rounded-full border-white border-[1px] ${
                    activeButton === button
                      ? "bg-white text-[#0080FF]"
                      : "hover:bg-white hover:text-[#0080FF] cursor-pointer transition delay-75 duration-300 ease-in-out"
                  }`}
                  onClick={() => {
                    setActiveButton(button);
                    scrollToSection(button.toLowerCase());
                  }}
                >
                  {button}
                </h1>
              ))}
            </div>
            <div className="w-[25%] h-full flex items-center justify-center">
              <a href="#" className="text-white">
                <ul className="underline decoration-1 decoration-solid">
                  Back to results
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Liveaboards;
