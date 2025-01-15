import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import TopWorker from "./TopWorkers/TopWorker";
import Container from "../../components/Shared/Container";
import Testimonials from "./Testimonial/Testimonials";
import Tasks from "../../components/Home/Tasks";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Earnify | Buy Your Desired Plant</title>
      </Helmet>
      <Banner></Banner>

      <Container>
        <TopWorker></TopWorker>
        <Tasks></Tasks>
        <Testimonials></Testimonials>
      </Container>
    </div>
  );
};

export default Home;
