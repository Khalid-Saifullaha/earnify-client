import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <section className="bg-white min-h-screen px-4 md:px-6 lg:px-20 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10">
          How It Works
        </h1>

        <p className="text-center text-lg text-gray-600 mb-14">
          Getting started is simple. Follow the steps below and start earning
          from the comfort of your home.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <StepCard
            step="1"
            title="Create an Account"
            description="Sign up with your email to create your profile. It only takes a minute to get started."
          />
          <StepCard
            step="2"
            title="Find a Task"
            description="Explore a variety of micro-tasks and choose the ones that suit your interest and skills."
          />
          <StepCard
            step="3"
            title="Submit Your Work"
            description="Complete the task as per the instructions and submit it for review with just a click."
          />
          <StepCard
            step="4"
            title="Get Paid Instantly"
            description="Once verified by our admin, your payment will be released directly to your account."
          />
        </div>

        <p className="mt-14 text-center text-gray-700 text-md max-w-3xl mx-auto">
          Whether you're a student, freelancer, or someone looking to earn extra
          income, our platform offers a simple and transparent way to make money
          online — no prior experience needed.
        </p>

        <div className="mt-10 text-center text-sm text-gray-500">
          Need help? Visit our{" "}
          <Link to="/faq" className="text-blue-600 hover:underline">
            FAQ
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="text-blue-600 hover:underline">
            contact support
          </Link>
          .
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step, title, description }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 bg-gray-50">
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-white bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
          {step}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-base">{description}</p>
    </div>
  );
};

export default HowItWorks;
