import Banner from "./Banner";
import BloodCompatibilityChart from "./BloodCompatibilityChart";
import ContactUs from "./ContactUs";
import ExtraSection1 from "./ExtraSection1";
import ExtraSection2 from "./ExtraSection2";
import Faq from "./Faq";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div className='text-xl font-bold text-red-500 text-center'>
            <Banner />
            <ExtraSection1 />
            <Faq />
            <BloodCompatibilityChart />
            <ExtraSection2 />
            <Testimonial />
            <ContactUs />
        </div>
    );
};

export default Home;