import { Link } from "react-router-dom";
import bannerImg from "../../assets/bannerBg.JPG";
import Button from "../../Shared/Button/Button";

const Banner = () => {
  return (
    <div
      className="lg:h-[75vh] md:h-[50vh] h-[55vh] md:mt-[82px] mt-[65px] relative overflow-hidden"
      style={{
        // backgroundImage: `url(${bannerImg})`,
        backgroundImage: `url("https://i.pinimg.com/736x/01/60/c9/0160c9a03eff9cea0d3ba7b4980a59b4.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // height: '70vh',
        width: "100%",
        position: "relative",
        // marginTop: '82px'
      }}
    >
      {/* Animated overlay gradient */}
      <div className="z-0 absolute top-0 right-0 inset-0 bg-gradient-to-r from-Crimson-Red/90 to-Crimson-Red/70"></div>

      {/* Floating blood drop decoration */}
      <div className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full bg-white/10 animate-float"></div>
      <div className="absolute top-[20%] left-[35%] w-10 h-10 rounded-full bg-white/15 animate-float animation-delay-2000"></div>
      <div className="absolute top-[15%] right-[10%] w-12 h-12 rounded-full bg-white/10 animate-float animation-delay-1000"></div>
      <div className="absolute top-[30%] right-[20%] w-8 h-8 rounded-full bg-white/20 animate-float animation-delay-3000"></div>
      <div className="absolute bottom-[20%] left-[10%] w-14 h-14 rounded-full bg-white/15 animate-float animation-delay-1500"></div>
      <div className="absolute bottom-[15%] right-[35%] w-9 h-9 rounded-full bg-white/20 animate-float animation-delay-2500"></div>
      <div className="absolute bottom-[30%] right-[5%] w-11 h-11 rounded-full bg-white/10 animate-float"></div>
      <div className="absolute top-[40%] left-[40%] w-7 h-7 rounded-full bg-white/15 animate-float animation-delay-1800"></div>
      <div className="absolute bottom-[25%] left-[30%] w-13 h-13 rounded-full bg-white/10 animate-float animation-delay-2200"></div>

      {/* content div */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="text-white text-center px-4 max-w-6xl">
          <h1 className="md:text-5xl text-3xl font-bold mb-6 drop-shadow-lg animate-fadeIn">
            Together, We Create a World Where{" "}
            <span className="text-white/90">No One Waits</span> for Blood
          </h1>
          <p className="md:text-xl text-lg mb-8 max-w-3xl mx-auto text-white/90 animate-fadeIn animation-delay-300">
            Hope is Restored, and Lives are Saved Through Your Generosity
          </p>
          <div className="flex flex-row justify-center gap-4 mt-6 animate-fadeIn animation-delay-500">
            <Link to="/register">
              <Button
                buttonText="Join As A Donor"
                className="hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <Link to="search">
              <Button
                buttonText="Search Donor"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-Crimson-Red transition-colors duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Scrolling animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
