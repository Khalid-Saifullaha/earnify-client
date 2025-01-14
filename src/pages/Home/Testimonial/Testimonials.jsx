import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

// A simple star rating component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= rating ? "text-yellow-500" : "text-gray-300"}
      >
        ★
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Jane Smith",
      image: "https://i.ibb.co/B4JcC6J/pexels-pixabay-262391.jpg",
      details:
        "Amazing experience! The tasks are easy to complete and rewarding. The support team is also very responsive and helpful when I encounter issues. A wonderful platform!",
      location: "Los Angeles, USA",
      rating: 5,
    },
    {
      id: 2,
      name: "John Doe",
      image: "https://i.ibb.co/x22gcjv/pexels-olly-3760373.jpg",
      details:
        "This platform has changed my life. Highly recommended! The tasks are clear and the earning potential is great. I’ve been able to pay off debts thanks to this platform.",
      location: "New York, USA",
      rating: 4,
    },
    {
      id: 3,
      name: "Michael Brown",
      image: "https://i.ibb.co/k1D1WJf/pexels-olly-3778603.jpg",
      details:
        "I've earned so much from this platform. Thank you! The system is smooth and user-friendly. I've been able to use the earnings to support my family, and it's all thanks to this site.",
      location: "London, UK",
      rating: 5,
    },
  ];

  return (
    <section className="my-20">
      <h2 className="text-2xl font-bold text-gray-500 text-center mb-6">
        Testimonial
      </h2>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="flex flex-col items-center m-24 my-16 bg-white p-8 rounded-lg shadow-lg">
              {/* User Image */}
              <img
                src={review.image}
                alt={review.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              {/* User Rating */}
              <StarRating rating={review.rating} />
              {/* User Quote */}
              <p className="py-3 text-center text-gray-700">{review.details}</p>
              {/* User Name and Location */}
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.location}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
