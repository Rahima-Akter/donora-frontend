import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import BloodCompatibilityChart from "./BloodCompatibilityChart";
import ContactUs from "./ContactUs";
import ExtraSection1 from "./ExtraSection1";
import ExtraSection2 from "./ExtraSection2";
import Faq from "./Faq";
import Testimonial from "./Testimonial";
import DonationProcess from "./DonationProcess";
import TrustedHosppitals from "./TrustedHosppitals";
import MythBusters from "./MythBusters";
import LiveDonationTracker from "./LiveDonationTracker";

const Home = () => {
  return (
    <div className="text-xl font-bold text-red-500 text-center w-full min-w-full dark:bg-black">
      <Helmet>
        <title>DONORA || Home</title>
      </Helmet>
      <Banner />
      <LiveDonationTracker/>
      <MythBusters/>
      <ExtraSection1 />
      <BloodCompatibilityChart />
      <DonationProcess/>
      <Faq />
      <ExtraSection2 />
      <Testimonial />
      <ContactUs />
      <TrustedHosppitals/>
    </div>
  );
};

export default Home;
