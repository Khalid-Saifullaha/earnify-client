import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import TopWorker from "./TopWorkers/TopWorker";
import Container from "../../components/Shared/Container";
import Testimonials from "./Testimonial/Testimonials";
import Faq from "../../components/Home/Faq";
import Contact from "../../components/Home/Contact";
import HeroSection from "./Banner/HeroSection";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Earnify </title>
      </Helmet>
      <HeroSection />

      <Container>
        <TopWorker />
      </Container>

      <div>
        <script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossorigin="anonymous"
        ></script>
      </div>
      <Container>
        <Faq />
      </Container>

      <WhyChooseUs />

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-600 mb-8">
            Discover Earnify: Your Gateway to Earning Online
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <span className="font-semibold text-blue-500">Earnify</span>{" "}
            connects you with a world of opportunities to earn money by
            completing simple online tasks. Whether you're looking to make extra
            income or start a new career, our platform provides everything you
            need to succeed.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            No matter your skill level,{" "}
            <span className="font-semibold text-blue-500">Earnify</span> offers
            a wide range of tasks tailored to your abilities. With fast, secure
            payments, and a community of supportive workers, you can start
            earning today and build your reputation with trusted buyers.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Join thousands of satisfied users who trust{" "}
            <span className="font-semibold text-blue-500">Earnify</span> for
            their micro-tasking needs. It's easy to get started, and with our
            reliable system, you can focus on what you do best — while we take
            care of the rest.
          </p>
        </div>
      </section>

      <Contact />
      <Container>
        <Testimonials />
      </Container>
    </div>
  );
};

export default Home;
