import React from "react";
import { Carousel } from "react-responsive-carousel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const board = [1, 2, 3];

const SpecialOffer = () => {
  return (
    <div className="px-5 md:px-0 customContainer  ">
      <h1 className="lg:text-title md:text-5xl text-4xl font-extralight font-outfit text-primary mb-5">
        Special Offer
      </h1>
      <div className="relative">
        <Carousel
          showStatus={false}
          infiniteLoop={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                onClick={onClickHandler}
                title={label}
                className="absolute -bottom-10 lg:left-[20%] left-[10%] z-20 transform -translate-y-1/2 text-primary px-4 py-2 rounded shadow-md"
              >
                <KeyboardArrowLeftIcon sx={{ fontSize: "40px" }} />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                onClick={onClickHandler}
                title={label}
                className="absolute -bottom-10 lg:right-[20%] right-[10%] z-20 transform -translate-y-1/2 text-primary px-4 py-2 rounded shadow-md"
              >
                <KeyboardArrowRightIcon sx={{ fontSize: "40px" }} />
              </button>
            )
          }
          // renderIndicator={(onClickHandler, isSelected, index, label) => {
          //   const indicatorStyles = {
          //     background: isSelected ? "bg-blue-500" : "bg-black", // Replace with desired color
          //     width: 12,
          //     height: 12,
          //     marginTop: 10,
          //     display: "inline-block",
          //     margin: "0 8px",
          //     borderRadius: "50%",
          //   };

          //   return (
          //     <li
          //       style={indicatorStyles}
          //       onClick={onClickHandler}
          //       onKeyDown={onClickHandler}
          //       value={index}
          //       key={index}
          //       role="button"
          //       tabIndex={0}
          //       title={label}
          //     />
          //   );
          // }}
        >
          {board.map((i, item) => (
            <div key={i} className="lg:flex mb-10 w-full">
              <div className="lg:flex items-center border border-primary lg:w-[80%] md:w-full gap-10">
                <div className="h-full">
                  <img
                    className={` h-full inline-block lg:w-96 w-full object-cover`}
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="lg:w-[65%] w-full p-5 lg:p-0  text-left">
                  <div>
                    <h1 className="text-gray font-medium font-outfit text-xl md:text-xl lg:text-subtitle">
                      Liveboard / Engyp
                    </h1>
                    <h2 className="  md:text-[32px] mt-3 text-2xl font-light text-primary">
                      Emperor Elite Liveaboard
                    </h2>
                    <p className="text-secondary mt-2 xl:pe-12 lg:pe-5 font-light md:text-lg text-base md:w-full">
                      Operating from Sharm El Sheikh, this liveaboard boasts a
                      professional and knowledgeable team of dive guides, ready
                      to take you to the best dive sites in the northern Red
                      Sea.
                    </p>
                  </div>
                  <div className="md:flex gap-10 mt-5">
                    <h1 className="text-primary text-xl font-outfit font-light md:text-2xl ">
                      15 Mar — 21 Mar
                    </h1>
                    <h1 className="text-primary text-xl font-outfit font-light md:text-2xl ">
                      Vegan Raiting : 4.6
                    </h1>
                  </div>
                </div>
              </div>
              <div className="p-5 lg:p-0 border border-primary flex flex-col justify-center lg:w-[20%]">
                <div className="text-center">
                <div>
                  <h1 className="text-gray text-xl md:text-3xl font-semibold line-through">
                    890 USD
                  </h1>
                  <div className="text-primary ">
                    <span className="text-2xl md:text-4xl font-semibold font-outfit">655</span> 
                    <span className="font-extralight inline-block mt-5 ms-1 font-outfit text-2xl">USD</span>
                  </div>
                </div>
                </div>
                <div className="mt-5 bottom-0">
                  <button className="button3 text-xl text-[#f1f2f2]">Details</button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SpecialOffer;
