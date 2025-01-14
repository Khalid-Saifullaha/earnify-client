import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "./Carousel";
import img1 from "../../../public/javascript-736400_1280.webp";
import img2 from "../../../public/react-icon-512x512-u6e60ayf.png";
import img3 from "../../../public/react-icon-512x512-u6e60ayf.png";

const HeroSlider = ({ image, text }) => {
  return (
    <Carousel>
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img3} />
      </div>
    </Carousel>
  );
};

export default HeroSlider;
