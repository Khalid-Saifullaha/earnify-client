import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import TopWorker from "./TopWorkers/TopWorker";
import Container from "../../components/Shared/Container";
import Testimonials from "./Testimonial/Testimonials";
import Faq from "../../components/Home/Faq";
import Contact from "../../components/Home/Contact";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Earnify </title>
      </Helmet>
      <Banner></Banner>

      <Container>
        <TopWorker></TopWorker>

        <div>
          <section class="mt-16 py-16">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-extrabold text-gray-700 sm:text-5xl">
                  How It Works
                </h2>
                <p class="mt-4 text-xl text-gray-700">
                  Discover how the platform operates for Workers, Buyers, and
                  Admins.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl rounded-lg p-8 hover:scale-105 transform transition-all duration-300">
                  <div class="flex items-center justify-center h-20 w-20 mx-auto bg-white text-white rounded-full shadow-xl transform hover:scale-110 transition-all">
                    <i class="fas fa-tasks text-3xl text-gray-800"></i>
                  </div>
                  <h3 class="text-2xl font-semibold text-center mt-6 text-white">
                    Worker
                  </h3>
                  <p class="mt-4 text-gray-200 text-center">
                    Browse tasks, complete them, and submit for review. Earn
                    coins and withdraw them easily.
                  </p>
                </div>

                <div class="bg-gradient-to-r from-green-600 to-teal-600 shadow-2xl rounded-lg p-8 hover:scale-105 transform transition-all duration-300">
                  <div class="flex items-center justify-center h-20 w-20 mx-auto bg-white text-white rounded-full shadow-xl transform hover:scale-110 transition-all">
                    <i class="fas fa-clipboard-list text-3xl text-gray-800"></i>
                  </div>
                  <h3 class="text-2xl font-semibold text-center mt-6 text-white">
                    Buyer
                  </h3>
                  <p class="mt-4 text-gray-200 text-center">
                    Create tasks, review submissions, pay Workers, and manage
                    task reports with ease.
                  </p>
                </div>

                <div class="bg-gradient-to-r from-red-600 to-pink-600 shadow-2xl rounded-lg p-8 hover:scale-105 transform transition-all duration-300">
                  <div class="flex items-center justify-center h-20 w-20 mx-auto bg-white text-white rounded-full shadow-xl transform hover:scale-110 transition-all">
                    <i class="fas fa-user-shield text-3xl text-gray-800"></i>
                  </div>
                  <h3 class="text-2xl font-semibold text-center mt-6 text-white">
                    Admin
                  </h3>
                  <p class="mt-4 text-gray-200 text-center">
                    Oversee the platform, manage user roles, address reports,
                    and ensure system integrity.
                  </p>
                </div>
              </div>

              <div class="text-center mt-12 space-x-4">
                <a
                  href="#"
                  class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white py-3 px-8 rounded-lg text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  class="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-8 rounded-lg text-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>

          <script
            src="https://kit.fontawesome.com/a076d05399.js"
            crossorigin="anonymous"
          ></script>
        </div>

        <Faq />

        <section className=" py-16">
          <div className=" ">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Why Choose Us?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  Fast Payments
                </h3>
                <p className="text-gray-600">
                  Get your earnings quickly and securely with fast payment
                  processing.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  User-Friendly Interface
                </h3>
                <p className="text-gray-600">
                  Navigate the platform effortlessly, whether you're a worker or
                  a buyer.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  Trusted Buyers
                </h3>
                <p className="text-gray-600">
                  Work with reliable buyers who value your effort and pay
                  fairly.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  Secure Transactions
                </h3>
                <p className="text-gray-600">
                  Your personal and payment details are always kept safe and
                  secure.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  Variety of Tasks
                </h3>
                <p className="text-gray-600">
                  Choose from a wide range of tasks that match your skills and
                  interests.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Our support team is always ready to assist you, anytime,
                  anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              About Earnify
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Earnify is a micro-tasking platform that connects people with
              small jobs they can complete online to earn money. Our mission is
              to make it easy for anyone, anywhere, to start earning by
              completing simple tasks.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Whether you're a skilled worker or a beginner, Earnify offers a
              variety of tasks suitable for everyone. With fast payments, secure
              transactions, and a supportive community, Earnify is the perfect
              platform to get started and start earning.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              We believe in the power of technology to create opportunities and
              empower individuals. Our platform is designed to be user-friendly,
              providing a seamless experience for both workers and buyers. The
              flexibility of Earnify allows you to choose tasks that suit your
              skills and schedule, making it easier than ever to earn money on
              your own terms.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              As part of our commitment to transparency and trust, Earnify
              provides detailed task descriptions and clear payment structures,
              so you always know what to expect. Whether you’re looking for a
              side hustle or a way to make extra income, Earnify is here to help
              you achieve your financial goals.
            </p>
            <p className="text-lg text-gray-700">
              Join thousands of satisfied users who have already unlocked new
              earning opportunities through Earnify. Get started today and see
              how simple it can be to earn money online!
            </p>
          </div>
        </section>

        <Contact />

        <Testimonials></Testimonials>
      </Container>
    </div>
  );
};

export default Home;
