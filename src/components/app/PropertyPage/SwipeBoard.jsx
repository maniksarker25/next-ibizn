import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
const SwipeBoard = () => {
  return (
    <div className="mt-12 ">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={2} // Default to 3 slides per view
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className="h-56 w-full md:w-96"
            src="https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?cs=srgb&dl=pexels-pixabay-163236.jpg&fm=jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-56 w-full md:w-96"
            src="https://www.shutterstock.com/image-photo/sailboat-sea-evening-sunlight-over-600nw-717244969.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-56 w-full md:w-96"
            src="https://www.shutterstock.com/image-photo/sailboat-sea-evening-sunlight-over-600nw-717244969.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-56 w-full md:w-96"
            src="https://www.shutterstock.com/image-photo/sailboat-sea-evening-sunlight-over-600nw-717244969.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-56 w-full md:w-96"
            src="https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?cs=srgb&dl=pexels-pixabay-163236.jpg&fm=jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="h-56 w-full md:w-96"
            src="https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?cs=srgb&dl=pexels-pixabay-163236.jpg&fm=jpg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwipeBoard;
