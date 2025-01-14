import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../../../public/img1.png";
import img2 from "../../../../public/img2.png";
import img3 from "../../../../public/img3.png";

const Banner = () => {
  return (
    <Carousel>
      <div className="h-[500px] lg:h-[600px] w-full object-cover relative">
        <img src={img1} />
        <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
        {/* Dark overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          <h2>Earn by Completing Tasks – Start Today!</h2>
        </div>
      </div>
      <div className="h-[500px] lg:h-[600px] w-full object-cover relative">
        <img src={img2} />
        <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
        {/* Dark overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          <h2>Create, Manage, and Earn – A Platform for Buyers and Workers</h2>
        </div>
      </div>
      <div className="h-[500px] lg:h-[600px] w-full object-cover relative">
        <img src={img3} />
        <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
        {/* Dark overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          <h2>Streamlined Task Management for Admins, Buyers, and Workers</h2>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
