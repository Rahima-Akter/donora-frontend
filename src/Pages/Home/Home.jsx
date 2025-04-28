import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import BloodCompatibilityChart from "./BloodCompatibilityChart";
import ContactUs from "./ContactUs";
import ExtraSection1 from "./ExtraSection1";
import ExtraSection2 from "./ExtraSection2";
import Faq from "./Faq";
import Testimonial from "./Testimonial";
import DonationProcess from "./DonationProcess";
import T from "./T";

const Home = () => {
  return (
    <div className="text-xl font-bold text-red-500 text-center w-full min-w-full dark:bg-gray-900">
      <Helmet>
        <title>DONORA || Home</title>
      </Helmet>
      <Banner />
      <T/>
      <ExtraSection1 />
      <BloodCompatibilityChart />
      <DonationProcess/>
      <Faq />
      <ExtraSection2 />
      <Testimonial />
      <ContactUs />
    </div>
  );
};

export default Home;
