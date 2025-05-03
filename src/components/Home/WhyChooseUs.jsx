import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsHeadphones, BsLayers, BsShieldCheck } from "react-icons/bs";
import { FaUserSecret, FaBolt, FaUsers } from "react-icons/fa";

const features = [
  {
    title: "Fast Payments",
    description:
      "Receive your earnings instantly through secure and reliable payment channels.",
    icon: <FaBolt className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "User-Friendly Interface",
    description:
      "Enjoy a smooth and intuitive user experience, whether you're a task poster or a worker.",
    icon: <TbLayoutDashboardFilled className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Trusted Buyers",
    description:
      "Collaborate with verified and fair buyers who value your contributions.",
    icon: <FaUserSecret className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Secure Transactions",
    description:
      "Your data and payments are protected with industry-standard security protocols.",
    icon: <BsShieldCheck className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Variety of Tasks",
    description:
      "Access a diverse selection of tasks suited to your expertise and preferences.",
    icon: <BsLayers className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "24/7 Support",
    description:
      "Reach out to our friendly support team any time for quick and effective help.",
    icon: <BsHeadphones className="w-8 h-8 text-blue-500" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Why Choose Us?
        </h2>

        <p className="text-center text-gray-600 text-lg md:text-xl mb-14 max-w-2xl mx-auto">
          Discover what sets our platform apart and why thousands trust us every
          day.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 text-center border border-gray-200"
            >
              <div className="flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
