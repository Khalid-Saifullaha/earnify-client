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
        <TopWorker></TopWorker>

        <div>
          <script
            src="https://kit.fontawesome.com/a076d05399.js"
            crossorigin="anonymous"
          ></script>
        </div>

        <Faq />

        <WhyChooseUs />

        <section className="bg-white py-16">
          <div className=" text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              About Earnify
            </h2>
            <p className="text-lg text-gray-700 ">
              Earnify is a micro-tasking platform that connects people with
              small jobs they can complete online to earn money. Our mission is
              to make it easy for anyone, anywhere, to start earning by
              completing simple tasks.
            </p>
            <p className="text-lg text-gray-700 ">
              Whether you're a skilled worker or a beginner, Earnify offers a
              variety of tasks suitable for everyone. With fast payments, secure
              transactions, and a supportive community, Earnify is the perfect
              platform to get started and start earning.
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
