// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

export default function Carousel() {
  return (
    <div className="w-full px-6 py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={img1}
            text="Craving Something? Discover Your Food Now."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={img2}
            text="Order, Relax, and Let the Food Come to You."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={img3}
            text="Find Your Favorite Food with Just One Click!"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
