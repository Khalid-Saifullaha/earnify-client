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
        <title> Earnify | Buy Your Desired Plant</title>
      </Helmet>
      <Banner></Banner>

      <Container>
        <TopWorker></TopWorker>

        <div>
          {/* <!-- How It Works Section --> */}
          <section class="mt-10 py-12">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
              {/* <!-- Section Header --> */}
              <div class="text-center mb-12">
                <h2 class="text-3xl font-extrabold text-gray-800 sm:text-4xl">
                  How It Works
                </h2>
                <p class="mt-4 text-lg text-gray-600">
                  Discover how the platform operates for Workers, Buyers, and
                  Admins.
                </p>
              </div>

              {/* <!-- Steps --> */}
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* <!-- Worker Card --> */}
                <div class="bg-white shadow-lg rounded-lg p-6">
                  <div class="flex items-center justify-center h-16 w-16 mx-auto bg-blue-500 text-white rounded-full">
                    <i class="fas fa-tasks text-2xl"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-center mt-4 text-gray-800">
                    Worker
                  </h3>
                  <p class="mt-4 text-gray-600 text-center">
                    Browse tasks, complete them, and submit for review. Earn
                    coins and withdraw them easily.
                  </p>
                </div>

                {/* <!-- Buyer Card --> */}
                <div class="bg-white shadow-lg rounded-lg p-6">
                  <div class="flex items-center justify-center h-16 w-16 mx-auto bg-green-500 text-white rounded-full">
                    <i class="fas fa-clipboard-list text-2xl"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-center mt-4 text-gray-800">
                    Buyer
                  </h3>
                  <p class="mt-4 text-gray-600 text-center">
                    Create tasks, review submissions, pay Workers, and manage
                    task reports with ease.
                  </p>
                </div>

                {/* <!-- Admin Card --> */}
                <div class="bg-white shadow-lg rounded-lg p-6">
                  <div class="flex items-center justify-center h-16 w-16 mx-auto bg-red-500 text-white rounded-full">
                    <i class="fas fa-user-shield text-2xl"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-center mt-4 text-gray-800">
                    Admin
                  </h3>
                  <p class="mt-4 text-gray-600 text-center">
                    Oversee the platform, manage user roles, address reports,
                    and ensure system integrity.
                  </p>
                </div>
              </div>

              {/* <!-- Call-to-Action Buttons --> */}
              <div class="text-center mt-12">
                <a
                  href="#get-started"
                  class="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium"
                >
                  Get Started
                </a>
                <a
                  href=""
                  class="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg text-lg font-medium"
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>

          {/* <!-- Add FontAwesome for Icons --> */}
          <script
            src="https://kit.fontawesome.com/a076d05399.js"
            crossorigin="anonymous"
          ></script>
        </div>
        <Faq />
        <Contact />

        <Testimonials></Testimonials>
      </Container>
    </div>
  );
};

export default Home;
