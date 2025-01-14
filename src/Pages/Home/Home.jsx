import Banner from "./Banner";
import BloodCompatibilityChart from "./BloodCompatibilityChart";
import ContactUs from "./ContactUs";
import ExtraSection1 from "./ExtraSection1";

const Home = () => {
    return (
        <div className='text-xl font-bold text-red-500 text-center'>
           <Banner/>
           <ExtraSection1/>
           <BloodCompatibilityChart/>
           <ContactUs/>
        </div>
    );
};

export default Home;